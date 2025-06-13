import '../styles/projects.css';
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

function thumbnailFromJson(json) {
  return (
    <Thumbnail
      title={json.title}
      link={json.link}
      imgSrc={json.img_src}
      info={json.info}
      key={json.title}
    />
  );
}

function Projects() {
  const [projThumbnails, setProjThumbnails] = useState([]);
  // send a request for the /projects from the backend in an effect
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);
        const data = await res.json();
        setProjThumbnails(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const sections = [
    { title: "Coded By Me", section: 0 },
    { title: "Art Contributions", section: 1 }
  ];

  if (import.meta.env.MODE == "dev") { 
    console.log(projThumbnails); 
  }
  return (
    <div>
      {sections.map(({ title, section }) => (
        <div key={section}>
          <h2 className="section-marker">{title}</h2>
          <div className="container">
            {projThumbnails.filter(d => {
              let isSectPiece = parseInt(d.section) === section
              if (!isSectPiece) {
                // print the data types
                console.log(`Filtering out ${d.title} from section ${section}`);
                console.log(`Section: ${d.section}, Title: ${d.title}, Type: ${typeof d.section}`);
              }
              return isSectPiece;
            }).map(thumbnailFromJson)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;