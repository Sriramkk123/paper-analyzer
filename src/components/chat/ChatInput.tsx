import { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (message: string) => void
}

const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSubmit(value)
      }
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end"
    >
      <textarea
        className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal resize-none"
        placeholder="Ask a question about the paper..."
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          if (value.trim()) {
            onSubmit(value)
          }
        }}
        className="bg-teal text-white rounded-r-md px-4 py-3 hover:bg-navy transition-colors h-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </motion.div>
  )
}

export default ChatInput