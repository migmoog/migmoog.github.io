import './style.css';
import { useState, useEffect } from 'react';

function Thumbnail({ title, link, imgSrc, info }) {
  const [hovered, setHovered] = useState(false);
  const [animClass, setAnimClass] = useState('');

  function handleMouseEnter() {
    setHovered(true);
    setAnimClass('darken');
  }

  function handleMouseLeave() {
    setHovered(false);
    setAnimClass('lighten');
  }

  const imageURL = `${import.meta.env.VITE_THUMBNAILS_URL}${imgSrc}`;
  return (
    <div className="game">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={imageURL}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`thumbnail${animClass ? ' ' + animClass : ''}`}
          alt=""
          onAnimationEnd={() => {
            if (animClass === 'lighten') {
              setAnimClass('');
            }
          }}
        />
        <p className="game-title">{title}</p>
      </a>
      <p
        className="info"
        style={{
          color: hovered ? 'white' : 'transparent',
          pointerEvents: 'none'
        }}
      >
        {info}
      </p>
    </div>
  );
}

function App() {
  const [projThumbnails, setProjThumbnails] = useState([]);
  // send a request for the /projects from the backend in an effect
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + '/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjThumbnails(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <h2 className="section-marker">Coded By Me</h2>
      <div className="container">
        {projThumbnails.map((proj) => (
          <Thumbnail
            title={proj.title}
            link={proj.link}
            imgSrc={proj.img_src}
            info={proj.info}
          />
        ))}
      </div>
      <h2 className="section-marker">Art Contributions</h2>
      <div className="container">
        {/* ...art contributions here... */}
      </div>
    </div>
  );
}

export default App;