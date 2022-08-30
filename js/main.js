const GAME_THUMBS = document.getElementsByClassName('game');

console.log(GAME_THUMBS)

for (let i = 0; i < GAME_THUMBS.length; i++) {
    const g = GAME_THUMBS[i];
    const thumbnail = g.querySelector('.thumbnail');
    
   /*  thumbnail.addEventListener('animationstart', (event) => {
        g.children['info'].style.color = 'white'
    }); */
    g.addEventListener('mouseover', (event) => {
        /* thumbnail.animate([
            {filter: "brightness(100%)"},
            {filter: "brightness(50%)"}
        ], 250); */
        thumbnail.style.animationName = 'darken';
        thumbnail.style.animationDuration = '0.25s';
        thumbnail.style.animationFillMode = 'forward';
        g.children['info'].style.color = 'white';
    });
    thumbnail.addEventListener('animationend', (event) => {
        thumbnail.style.filter = "brightness(50%)";
    });
    g.addEventListener('mouseleave', (event) => {
        g.children['info'].style.color = 'transparent';
        thumbnail.style.filter = "brightness(100%)";
        thumbnail.style.animationName = null;
        thumbnail.style.animationDuration = null;
        thumbnail.style.animationFillMode = null;
    });
}