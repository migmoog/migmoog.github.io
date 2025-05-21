import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const backendUrl = import.meta.env.VITE_BACKEND_URL || null;

fetch(`${backendUrl}/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log(response)
  })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
