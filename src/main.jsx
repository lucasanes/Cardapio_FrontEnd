import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import { GlobalStyles } from './styles/global'
import { AuthProvider } from './contexts/auth'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(<>
  <AuthProvider>
    <Routes/>
    <GlobalStyles/>
    <Toaster position="top-right" reverseOrder={true}/>
  </AuthProvider>
</>)
