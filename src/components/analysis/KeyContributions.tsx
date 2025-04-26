import React from 'react'
import { motion } from 'framer-motion'

interface KeyContributionsProps {
  keyContributions: string[]
}

const KeyContributions = ({ keyContributions }: KeyContributionsProps) => (
  <section>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-serif font-semibold text-navy">Key Contributions</h3>
      <div className="flex items-center space-x-1 text-xs">
        <span className="w-3 h-3 bg-pink-400 rounded-full"></span>
        <span className="text-gray-600">Contributions</span>
      </div>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm"
    >
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        {keyContributions.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </section>
)

export default KeyContributions
