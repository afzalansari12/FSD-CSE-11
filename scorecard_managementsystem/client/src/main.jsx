import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ScoreProvider } from './context/ScoreContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScoreProvider>
          <App />
        </ScoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
