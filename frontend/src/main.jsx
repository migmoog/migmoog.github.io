import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// connect to the backend and route to "/"
// const res = await fetch('backend:5174/');
// const data = await res.json();
// console.log(data);
