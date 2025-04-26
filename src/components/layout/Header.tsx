import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])
  
  return (
    <motion.header
      className={`sticky top-0 z-10 transition-colors duration-300 ${scrolled ? 'bg-navy shadow-md' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-serif font-bold ${scrolled ? 'text-cream' : 'text-navy'}`}>
              PaperAI
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-4">
            <NavLink 
              to="/" 
              isActive={location.pathname === '/'} 
              scrolled={scrolled}
            >
              Home
            </NavLink>
            <NavLink 
              to="/analysis" 
              isActive={location.pathname === '/analysis'} 
              scrolled={scrolled}
            >
              Analysis
            </NavLink>
            <NavLink 
              to="/chat" 
              isActive={location.pathname === '/chat'} 
              scrolled={scrolled}
            >
              Chat
            </NavLink>
          </nav>
          
          <MobileMenu scrolled={scrolled} />
        </div>
      </div>
    </motion.header>
  )
}

interface NavLinkProps {
  to: string
  isActive: boolean
  scrolled: boolean
  children: React.ReactNode
}

const NavLink = ({ to, isActive, scrolled, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`
        px-3 py-2 rounded-md font-medium transition-colors
        ${isActive 
          ? 'bg-teal text-white'
          : scrolled
            ? 'text-cream hover:bg-teal/20'
            : 'text-navy hover:bg-teal/20'
        }
      `}
    >
      {children}
    </Link>
  )
}

interface MobileMenuProps {
  scrolled: boolean
}

const MobileMenu = ({ scrolled }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md ${scrolled ? 'text-cream' : 'text-navy'}`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d={isOpen 
              ? "M6 18L18 6M6 6l12 12" 
              : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            } 
          />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute left-0 right-0 top-16 bg-white shadow-md rounded-b-lg overflow-hidden"
        >
          <div className="flex flex-col p-4">
            <Link
              to="/"
              className={`py-2 px-4 rounded-md ${location.pathname === '/' ? 'bg-teal text-white' : 'text-navy hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/analysis"
              className={`py-2 px-4 rounded-md ${location.pathname === '/analysis' ? 'bg-teal text-white' : 'text-navy hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Analysis
            </Link>
            <Link
              to="/chat"
              className={`py-2 px-4 rounded-md ${location.pathname === '/chat' ? 'bg-teal text-white' : 'text-navy hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Chat
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Header