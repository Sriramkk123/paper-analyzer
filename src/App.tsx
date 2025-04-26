import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'
import ChatPage from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-cream">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal border-t-mint rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-serif text-navy">Loading App...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header />
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App