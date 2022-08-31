const GAME_THUMBS = document.getElementsByClassName('game');
let onMobile = (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
);

const thumbClicks = new Array(GAME_THUMBS.length);

for (let i = 0; i < GAME_THUMBS.length; i++) {
    const g = GAME_THUMBS[i];
    const thumbnail = g.querySelector('.thumbnail');
    thumbClicks[i] = false;
    const link = g.querySelector('a');

    if (!onMobile) {
        g.addEventListener('mouseover', (event) => {
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
    } else {
        // oops
        link.style.pointerEvents = 'none';
        g.addEventListener('touchstart', (event) => {
            with (thumbnail.style) {
                animationName = thumbClicks[i] ? null : 'darken';
                animationDuration = thumbClicks[i] ? null : '0.25s';
                animationFillMode = thumbClicks[i] ? null : 'forward';

                if (thumbClicks[i])
                    filter = 'brightness(100%)';
            }
            g.children['info'].style.color = thumbClicks[i] ? 'transparent' : 'white';

            thumbClicks[i] = !thumbClicks[i];
            thumbnail.style.pointerEvents = !thumbClicks[i] ? 'auto' : 'none';
        });
        thumbnail.addEventListener('animationend', (event) => {
            thumbnail.style.filter = "brightness(50%)";
        });
    }
}