import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto text-center py-16"
    >
      <div className="text-9xl font-serif font-bold text-navy opacity-20 mb-6">404</div>
      <h1 className="text-3xl font-serif font-bold text-navy mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-teal text-white rounded-md hover:bg-navy transition-colors"
      >
        Go Back Home
      </button>
    </motion.div>
  )
}

export default NotFoundPage