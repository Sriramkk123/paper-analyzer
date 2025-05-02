import React from 'react'
import { createContext, useContext, useState, ReactNode } from 'react'
import { validateArxivUrl, extractPaperId } from '../utils/urlValidator'
import { fetchPaperData } from '../services/paperService'
import { generateBreakdown } from '../services/analysisService'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { PaperData, PaperBreakdown, ChatMessage } from '../types/paper'

interface PaperContextType {
  paperUrl: string
  setPaperUrl: (url: string) => void
  paperData: PaperData | null
  paperBreakdown: PaperBreakdown | null
  isLoading: boolean
  error: string | null
  processPaper: (url: string) => Promise<void>
  chatMessages: ChatMessage[]
  addChatMessage: (message: string, isUser: boolean) => void
  clearChat: () => void
  exportAnalysis: () => Promise<void>
}

const PaperContext = createContext<PaperContextType | undefined>(undefined)

export const PaperProvider = ({ children }: { children: ReactNode }) => {
  const [paperUrl, setPaperUrl] = useState<string>('')
  const [paperData, setPaperData] = useState<PaperData | null>(null)
  const [paperBreakdown, setPaperBreakdown] = useState<PaperBreakdown | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const processPaper = async (url: string) => {
    setPaperUrl(url)
    setIsLoading(true)
    setError(null)

    try {
      // Validate URL
      if (!validateArxivUrl(url)) {
        throw new Error('Invalid arXiv URL. Please enter a valid URL from arxiv.org')
      }

      // Extract paper ID
      const paperId = extractPaperId(url)
      if (!paperId) {
        throw new Error('Could not extract paper ID from URL')
      }

      // Fetch paper data
      const data = await fetchPaperData(paperId)
      setPaperData(data)

      // Start background job
      const startResp = await fetch('/api/trpc-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!startResp.ok) {
        throw new Error('Failed to start analysis')
      }
      const { jobId } = await startResp.json()

      // Poll for status
      let statusObj: any
      let attempts = 0
      const maxAttempts = 10
      do {
        attempts++
        await new Promise(r => setTimeout(r, 5000))
        const statusResp = await fetch(`/api/trpc-status?jobId=${jobId}`)
        statusObj = await statusResp.json()
      } while (statusObj.status === 'processing' && attempts < maxAttempts)

      if (statusObj.status === 'done' && statusObj.result) {
        setPaperBreakdown({ ...statusObj.result, title: data.title, publicationDate: data.publicationDate, authors: data.authors, abstract: data.abstract })
      } else if (statusObj.status === 'processing') {
        throw new Error('Analysis timed out after maximum retries.')
      } else {
        throw new Error(statusObj.error || 'Analysis failed')
      }

      // Initialize chat with a greeting
      setChatMessages([
        {
          text: `I've analyzed the paper "${data.title}". Ask me any questions about it!`,
          isUser: false,
          timestamp: new Date()
        }
      ])

    } catch (err: any) {
      setError(err.message || 'An error occurred while processing the paper')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const addChatMessage = (message: string, isUser: boolean) => {
    setChatMessages(prevMessages => [
      ...prevMessages,
      {
        text: message,
        isUser,
        timestamp: new Date()
      }
    ])

    // If user message, generate a response using breakdown
    if (isUser && paperBreakdown) {
      // Simulate AI response delay
      setTimeout(() => {
        // In a real implementation, this would call an AI service
        // For demo purposes, we're generating a simple response
        const response = generateMockResponse(message, paperBreakdown)

        setChatMessages(prevMessages => [
          ...prevMessages,
          {
            text: response,
            isUser: false,
            timestamp: new Date()
          }
        ])
      }, 1000)
    }
  }

  const clearChat = () => {
    if (paperData) {
      setChatMessages([
        {
          text: `I've analyzed the paper "${paperData.title}". Ask me any questions about it!`,
          isUser: false,
          timestamp: new Date()
        }
      ])
    } else {
      setChatMessages([])
    }
  }

  const exportAnalysis = async () => {
    const input = document.getElementById('analysis-content')
    if (!input) return

    const canvas = await html2canvas(input as HTMLElement, { backgroundColor: '#ffffff', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgProps = pdf.getImageProperties(imgData)
    const imgWidthMm = pdfWidth
    const imgHeightMm = (imgProps.height * imgWidthMm) / imgProps.width

    let heightLeft = imgHeightMm
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidthMm, imgHeightMm)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeightMm
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidthMm, imgHeightMm)
      heightLeft -= pdfHeight
    }

    pdf.save(`analysis-${paperBreakdown?.title.substring(0, 30).replace(/\s+/g, '-').toLowerCase()}.pdf`)
  }

  return (
    <PaperContext.Provider
      value={{
        paperUrl,
        setPaperUrl,
        paperData,
        paperBreakdown,
        isLoading,
        error,
        processPaper,
        chatMessages,
        addChatMessage,
        clearChat,
        exportAnalysis
      }}
    >
      {children}
    </PaperContext.Provider>
  )
}

export const usePaper = () => {
  const context = useContext(PaperContext)
  if (context === undefined) {
    throw new Error('usePaper must be used within a PaperProvider')
  }
  return context
}

// Helper function to generate mock responses based on breakdown
// In a real implementation, this would be replaced with an actual AI service
function generateMockResponse(message: string, breakdown: PaperBreakdown): string {
  const messageLower = message.toLowerCase()

  if (messageLower.includes('abstract') || messageLower.includes('summary')) {
    return `The abstract of this paper is: ${breakdown.abstract}`
  }

  if (messageLower.includes('author') || messageLower.includes('who wrote')) {
    return `This paper was written by ${breakdown.authors.map(a => a.name).join(', ')}.`
  }

  if (messageLower.includes('problem') || messageLower.includes('challenge')) {
    return `The paper addresses the following challenges: ${breakdown.problemStatement.challenges.join(', ')}.`
  }

  if (messageLower.includes('method') || messageLower.includes('approach') || messageLower.includes('solution')) {
    return `The paper proposes the following methodologies: ${breakdown.proposedSolution.methodologies.join(', ')}.`
  }

  if (messageLower.includes('result') || messageLower.includes('finding') || messageLower.includes('achievement')) {
    return `The key achievements of this paper include: ${breakdown.results.achievements.join(', ')}.`
  }

  if (messageLower.includes('future') || messageLower.includes('limitation')) {
    return `The authors suggest the following future work: ${breakdown.futureWork.join(', ')}.`
  }

  return `I found information about "${message}" in the paper, but I need to be more specific to give you a better answer. Could you clarify what aspect of the paper you're interested in?`
}