import '../styles/welcome.css';

function Welcome() {
    const imageScale = 20;

    return (
        <div className='welcome-container'>
            <div className="facepic" style={{ width: `${imageScale}vw`, height: `${imageScale}vw`, position: "relative" }}>
                <img
                    src="/img/facepic.jpg"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <i><p style={{ textAlign: "center" }}>
                    I solemnly swear I had nothing to do with the destruction in the background.
                </p></i>
            </div> 
        </div>
    );
}

export default Welcome;