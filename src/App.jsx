import './style.css';

function GameThumb({ title, link, imgSrc, info }) {
  return (
    <div className="game">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={imgSrc} className="thumbnail" alt="" />
        <p className="game-title">{title}</p>
      </a>
      <p className="info">{info}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2 className="section-marker">Coded By Me</h2>
      <div className="container">
        <GameThumb
          title="Sh*t Rainbows Piss Thunder"
          link="https://www.newgrounds.com/portal/view/848623"
          imgSrc="/img/game_thumbnails/SRPT.png"
          info="Made for the Pride Month Game Jam, made with my friends in Team Max Hog."
        />
      </div>
      <h2 className="section-marker">Art Contributions</h2>
      <div className="container">
        {/* ...art contributions here... */}
      </div>
    </div>
  );
}

export default App;