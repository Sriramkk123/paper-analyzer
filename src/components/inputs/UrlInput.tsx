import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState('')
  const [isValid, setIsValid] = useState(true)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation to check if the URL is from arxiv.org
    if (!url.includes('arxiv.org')) {
      setIsValid(false)
      return
    }
    
    onSubmit(url)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.div 
          className="relative flex-grow"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <input
            type="url"
            id="paper-url"
            placeholder="https://arxiv.org/abs/2305.12246"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setIsValid(true) // Reset validation on input change
            }}
            className={`
              w-full px-4 py-3 rounded-md bg-cream border-2 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isValid 
                ? 'border-teal/30 focus:border-teal focus:ring-teal/50' 
                : 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
              }
            `}
            disabled={isLoading}
          />
          {!isValid && (
            <p className="absolute text-red-500 text-sm mt-1">
              Please enter a valid arxiv.org URL
            </p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            type="submit"
            className={`
              px-6 py-3 rounded-md font-medium w-full sm:w-auto whitespace-nowrap
              ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-navy text-white hover:bg-teal transition-colors'
              }
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Analyze Paper'}
          </button>
        </motion.div>
      </div>
    </form>
  )
}

export default UrlInput