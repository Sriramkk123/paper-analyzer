import React from 'react'
import { motion } from 'framer-motion'

interface ProblemStatementProps {
  challenges: string[]
  limitations: string[]
}

const ProblemStatement = ({ challenges, limitations }: ProblemStatementProps) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-semibold text-navy">Problem Statement</h3>
        
        <div className="flex items-center space-x-1 text-xs">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
          <span className="text-gray-600">Challenges</span>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm"
        >
          <h4 className="font-medium text-navy mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Current Challenges
          </h4>
          
          <ul className="space-y-2">
            {challenges.map((challenge, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-start"
              >
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-gray-700">{challenge}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm"
        >
          <h4 className="font-medium text-navy mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Limitations of Existing Approaches
          </h4>
          
          <ul className="space-y-2">
            {limitations.map((limitation, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="flex items-start"
              >
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-gray-700">{limitation}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemStatement