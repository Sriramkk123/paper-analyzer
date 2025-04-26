import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { PaperProvider } from './context/PaperContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PaperProvider>
        <App />
      </PaperProvider>
    </BrowserRouter>
  </React.StrictMode>
)