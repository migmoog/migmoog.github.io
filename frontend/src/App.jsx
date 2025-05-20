import './style.css';
import { useState } from 'react';

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

  return (
    <div className="game">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={process.env.THUMBNAILS_URL + imgSrc}
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
      <p className="info"
        style={{ color: hovered ? 'white' : 'transparent' }}>{info}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2 className="section-marker">Coded By Me</h2>
      <div className="container">
        {/* <Thumbnail
          title="Sh*t Rainbows Piss Thunder"
          link="https://www.newgrounds.com/portal/view/848623"
          imgSrc="/img/game_thumbnails/SRPT.png"
          info="Made for the Pride Month Game Jam, made with my friends in Team Max Hog."
        /> */}
      </div>
      <h2 className="section-marker">Art Contributions</h2>
      <div className="container">
        {/* ...art contributions here... */}
      </div>
    </div>
  );
}

export default App;