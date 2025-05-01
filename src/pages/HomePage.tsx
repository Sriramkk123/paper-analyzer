import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePaper } from '../context/PaperContext'
import UrlInput from '../components/inputs/UrlInput'

const HomePage = () => {
  const { processPaper, isLoading, error } = usePaper()
  const navigate = useNavigate()
  const [showInfo, setShowInfo] = useState(false)

  const handleSubmit = async (url: string) => {
    await processPaper(url)
    // Navigate to the analysis page once processing is complete
    navigate('/analysis')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Research Paper Analyzer
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-teal max-w-3xl mx-auto"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Extract insights, analyze content, and interact with research papers using AI
        </motion.p>
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-serif font-semibold text-navy mb-4">Analyze a Paper</h2>
        <p className="mb-6 text-gray-700">
          Enter an arXiv.org URL to extract and analyze the paper content.
        </p>

        <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          <p>Example: https://arxiv.org/abs/2305.12246</p>
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, staggerChildren: 0.1 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow p-6 paper-card"
          whileHover={{ y: -5 }}
        >
          <div className="text-mint text-3xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-navy mb-2">Deep Analysis</h3>
          <p className="text-gray-700">
            Extract key information including problem statements, methodologies, and findings.
          </p>
        </motion.div>

        {/* <motion.div
          className="bg-white rounded-lg shadow p-6 paper-card"
          whileHover={{ y: -5 }}
        >
          <div className="text-mint text-3xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-navy mb-2">Interactive Q&A</h3>
          <p className="text-gray-700">
            Ask questions about the paper and get instant answers from the AI assistant.
          </p>
        </motion.div> */}

        <motion.div
          className="bg-white rounded-lg shadow p-6 paper-card"
          whileHover={{ y: -5 }}
        >
          <div className="text-mint text-3xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-navy mb-2">Export Results</h3>
          <p className="text-gray-700">
            Download your analysis in PDF format for integration with other tools.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-teal hover:text-navy transition-colors flex items-center mx-auto"
        >
          <span>How it works</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ml-1 transition-transform ${showInfo ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {showInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 max-w-3xl mx-auto text-left p-6 bg-white rounded-lg shadow"
          >
            <h3 className="text-xl font-serif font-semibold text-navy mb-3">Our Technology</h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-teal text-white rounded-full w-6 h-6 text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>We extract the paper content from arXiv.org using their API.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-teal text-white rounded-full w-6 h-6 text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Our AI analyzes the content to identify key sections, findings, and insights.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-teal text-white rounded-full w-6 h-6 text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>The paper is indexed for quick retrieval and Q&A functionality.</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center bg-teal text-white rounded-full w-6 h-6 text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Results are presented in a structured format with interactive elements.</span>
              </li>
            </ol>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default HomePage