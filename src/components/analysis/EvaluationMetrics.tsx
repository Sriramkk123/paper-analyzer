import React from 'react'
import { motion } from 'framer-motion'

interface EvaluationMetricsProps {
  evaluationMetrics: string[]
}

const EvaluationMetrics = ({ evaluationMetrics }: EvaluationMetricsProps) => (
  <section>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-serif font-semibold text-navy">Evaluation Metrics</h3>
      <div className="flex items-center space-x-1 text-xs">
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="text-gray-600">Metrics</span>
      </div>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm"
    >
      <ul className="space-y-2">
        {evaluationMetrics.map((metric, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className="flex items-start"
          >
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            <span className="text-gray-700">{metric}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </section>
)

export default EvaluationMetrics
