import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface AbstractSectionProps {
  abstract: string
}

const AbstractSection = ({ abstract }: AbstractSectionProps) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = abstract.length > 300
  const displayText = isLong && !expanded 
    ? abstract.substring(0, 300) + '...' 
    : abstract
  
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-semibold text-navy">Abstract</h3>
        
        <div className="flex items-center space-x-1 text-xs">
          <span className="w-3 h-3 bg-mint rounded-full"></span>
          <span className="text-gray-600">Summary</span>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm"
      >
        <p className="text-gray-700 leading-relaxed">
          {displayText}
        </p>
        
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-teal hover:text-navy transition-colors text-sm flex items-center"
          >
            <span>{expanded ? 'Show less' : 'Read more'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`w-4 h-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        )}
      </motion.div>
    </section>
  )
}

export default AbstractSection