import { motion } from 'framer-motion'

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  // Format timestamp as HH:MM
  const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`chat-bubble ${isUser ? 'user' : 'bot'}`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">
          {isUser ? 'You' : 'AI Assistant'}
        </span>
        <span className="text-xs opacity-70">{time}</span>
      </div>
      <p className="whitespace-pre-line">{message}</p>
    </motion.div>
  )
}

export default ChatMessage