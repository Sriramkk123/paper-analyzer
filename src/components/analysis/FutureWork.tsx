import React from 'react'
import { motion } from 'framer-motion'

interface FutureWorkProps {
  futureWork: string[]
}

const FutureWork = ({ futureWork }: FutureWorkProps) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-semibold text-navy">Future Work and Limitations</h3>
        
        <div className="flex items-center space-x-1 text-xs">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="text-gray-600">Future</span>
        </div>
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4">
            {futureWork.slice(0, Math.ceil(futureWork.length / 2)).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="bg-yellow-50 p-4 rounded-md flex items-start"
              >
                <span className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col space-y-4">
            {futureWork.slice(Math.ceil(futureWork.length / 2)).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + Math.ceil(futureWork.length / 2) + 1) }}
                className="bg-yellow-50 p-4 rounded-md flex items-start"
              >
                <span className="bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + Math.ceil(futureWork.length / 2) + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default FutureWork