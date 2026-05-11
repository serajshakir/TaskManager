import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './app/configurations/useAuth'
import { ToasterProvider } from './app/components/base/Toaster'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToasterProvider>
        <App />
      </ToasterProvider>
    </AuthProvider>
  </StrictMode>,
)