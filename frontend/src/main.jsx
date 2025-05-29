import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx';
import Welcome from './pages/Welcome.jsx';

import './styles/globals.css'
import { StrictMode } from 'react';
import Navbar from './Navbar.jsx';

function FooterLogo({ link, imgSrc }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} className="footer-logo" />
    </a>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-logos">
        <FooterLogo
          link="https://github.com/migmoog"
          imgSrc="img/ghlogo.png"
        />
        <FooterLogo
          link="https://www.linkedin.com/in/jlgdev/"
          imgSrc="img/linlogo.png"
        />
      </div>
      <p>&copy; {new Date().getFullYear()} Jeremy Gordon</p>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
