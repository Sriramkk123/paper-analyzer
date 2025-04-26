import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePaper } from '../context/PaperContext'

// Analysis components
import PaperOverview from '../components/analysis/PaperOverview'
import AbstractSection from '../components/analysis/AbstractSection'
import ProblemStatement from '../components/analysis/ProblemStatement'
import ProposedSolution from '../components/analysis/ProposedSolution'
import ResultsSection from '../components/analysis/ResultsSection'
import FutureWork from '../components/analysis/FutureWork'
import BackgroundSection from '../components/analysis/BackgroundSection'
import KeyContributions from '../components/analysis/KeyContributions'
import EvaluationMetrics from '../components/analysis/EvaluationMetrics'
import DatasetSetup from '../components/analysis/DatasetSetup'
import DiscussionSection from '../components/analysis/DiscussionSection'

const AnalysisPage = () => {
  const { paperData, paperBreakdown, paperUrl, isLoading, error, exportAnalysis } = usePaper()
  const navigate = useNavigate()
  const pdfUrl = paperData ? `https://arxiv.org/pdf/${paperData.id}.pdf` : ''

  useEffect(() => {
    // If there's no paper data and not currently loading, redirect to home
    if (!paperBreakdown && !isLoading && !error) {
      navigate('/')
    }
  }, [paperBreakdown, isLoading, error, navigate])
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-teal border-t-mint rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-navy">Analyzing paper, please wait...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-red-50 text-red-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-navy text-white rounded-md hover:bg-teal transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }
  
  if (!paperBreakdown) {
    return null // This should never happen due to the redirect, but TypeScript needs it
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-navy">Paper Analysis</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/chat')}
            className="px-4 py-2 bg-mint text-navy rounded-md hover:bg-teal hover:text-white transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            Ask Questions
          </button>
          <button
            onClick={exportAnalysis}
            className="px-4 py-2 bg-navy text-white rounded-md hover:bg-teal transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
        </div>
      </div>
      
      <motion.div id="analysis-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">
              Source: <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">{paperUrl}</a>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Full Paper PDF: <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">View PDF</a>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <PaperOverview 
                title={paperBreakdown.title}
                publicationDate={paperBreakdown.publicationDate}
                authors={paperBreakdown.authors}
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <AbstractSection abstract={paperBreakdown.abstract} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <BackgroundSection backgroundRelatedWork={paperBreakdown.backgroundRelatedWork} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <KeyContributions keyContributions={paperBreakdown.keyContributions} />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <ProblemStatement 
                challenges={paperBreakdown.problemStatement.challenges}
                limitations={paperBreakdown.problemStatement.limitations}
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <ProposedSolution 
                methodologies={paperBreakdown.proposedSolution.methodologies}
                approaches={paperBreakdown.proposedSolution.approaches}
                implementation={paperBreakdown.proposedSolution.implementation}
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-10"
            >
              <ResultsSection 
                metrics={paperBreakdown.results.metrics}
                comparison={paperBreakdown.results.comparison}
                achievements={paperBreakdown.results.achievements}
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-10"
            >
              <EvaluationMetrics evaluationMetrics={paperBreakdown.evaluationMetrics} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mb-10"
            >
              <DatasetSetup datasetSetup={paperBreakdown.datasetSetup} />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <DiscussionSection discussionInsightsApplications={paperBreakdown.discussionInsightsApplications} />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <FutureWork futureWork={paperBreakdown.futureWork} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AnalysisPage