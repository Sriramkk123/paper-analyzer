import React from 'react'
import { motion } from 'framer-motion'
import { Author } from '../../types/paper'

interface PaperOverviewProps {
  title: string
  publicationDate: string
  authors: Author[]
}

const PaperOverview = ({ title, publicationDate, authors }: PaperOverviewProps) => {
  return (
    <section>
      <motion.h2
        className="text-3xl font-serif font-bold text-navy mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      <div className="text-gray-600 mb-4">
        <span className="inline-block bg-mint/20 text-teal rounded-full px-3 py-1 text-sm mr-2">
          Published: {publicationDate}
        </span>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-serif font-semibold text-navy mb-2">Authors</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {authors.map((author, index) => (
            <motion.li
              key={index}
              className="bg-cream rounded-lg p-3 flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <div className="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-navy">{author.name}</p>
                <p className="text-sm text-gray-600">{author.affiliation}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PaperOverview