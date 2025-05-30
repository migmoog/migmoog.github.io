import '../styles/about.css';

function About() {
  return (
    <div>
      <div className='about-header'>
        <h1>Jeremy Gordon is a</h1>
        <img src="/img/welcome.png" id="welcome-face" />
      </div>
      <div className="description">
        <p> Software developer with a knack for learning.
          I've made games, websites, low level systems, distributed systems, and etc.
          I'm a fast learner and keep up to date in whatever is happening with software. I love trying out new tools!</p>
        <br/>
        <p> I built this website with ReactJS and a custom Go backend. More is to come here!</p>
      </div>
    </div>
  );
}

export default About;