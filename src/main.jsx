import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId="758802300112-7cpqu2nsl9a1k7qravcn8m89869lupic.apps.googleusercontent.com">

    <AuthProvider>
    <App />
    </AuthProvider>
     </GoogleOAuthProvider>
  </StrictMode>,
)
