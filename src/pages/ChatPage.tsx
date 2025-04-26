import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePaper } from '../context/PaperContext'
import ChatMessage from '../components/chat/ChatMessage'
import ChatInput from '../components/chat/ChatInput'

const ChatPage = () => {
  const { paperData, chatMessages, addChatMessage, clearChat } = usePaper()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If there's no paper data, redirect to home
    if (!paperData) {
      navigate('/')
    }
  }, [paperData, navigate])

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSubmit = (message: string) => {
    if (!message.trim()) return

    // Add user message
    addChatMessage(message, true)

    // Clear input
    setInputValue('')
  }

  if (!paperData) {
    return null // This should never happen due to the redirect, but TypeScript needs it
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto h-[calc(100vh-12rem)]"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-serif font-bold text-navy">Paper Q&A</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/analysis')}
            className="px-4 py-2 bg-mint text-navy rounded-md hover:bg-teal hover:text-white transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            View Analysis
          </button>
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-navy text-white rounded-md hover:bg-teal transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset Chat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        <div className="p-4 bg-teal text-white">
          <h2 className="font-serif text-lg">
            Discussing: <span className="font-normal">{paperData.title}</span>
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="space-y-4">
            {chatMessages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ChatPage