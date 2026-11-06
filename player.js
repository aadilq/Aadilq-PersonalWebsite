// ---- Add your tracks here (put the mp3 files in assets/music/) ----
const tracks = [
     { title: 'Midnight Club', src: 'assets/music/alex-morgan-lofi-midnight-club.mp3' },
      { title: 'Night Haze', src: 'assets/music/ornave-lofi-night-haze-553402.mp3' },
       { title: 'Vinyl Teapot', src: 'assets/music/ornave-lofi-vinyl-teapot-553356.mp3' }
];

const playerEl = document.querySelector('.music-player');
const toggleBtn = playerEl.querySelector('.mp-toggle');
const nextBtn = playerEl.querySelector('.mp-next');
const titleEl = playerEl.querySelector('.mp-title');
const volumeEl = playerEl.querySelector('.mp-volume');

const audio = new Audio();
audio.preload = 'none';
let current = 0;

function loadTrack(i) {
    current = i % tracks.length;
    audio.src = tracks[current].src;
    titleEl.textContent = tracks[current].title;
}

function setPlaying(on) {
    playerEl.classList.toggle('playing', on);
    toggleBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
}

if (tracks.length === 0) {
    titleEl.textContent = 'Add tracks in player.js';
    playerEl.classList.add('empty');
} else {
    loadTrack(0);
}

// Browsers block autoplay, so playback only starts from a click
toggleBtn.addEventListener('click', () => {
    if (tracks.length === 0) return;
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
});

nextBtn.addEventListener('click', () => {
    if (tracks.length === 0) return;
    const wasPlaying = !audio.paused;
    loadTrack(current + 1);
    if (wasPlaying) audio.play();
});

audio.addEventListener('play', () => setPlaying(true));
audio.addEventListener('pause', () => setPlaying(false));
audio.addEventListener('ended', () => { loadTrack(current + 1); audio.play(); });
audio.addEventListener('error', () => {
    setPlaying(false);
    titleEl.textContent = 'Track not found';
});

// Volume, remembered between visits
audio.volume = parseFloat(localStorage.getItem('lofiVolume') ?? '0.5');
volumeEl.value = audio.volume;
volumeEl.addEventListener('input', () => {
    audio.volume = parseFloat(volumeEl.value);
    localStorage.setItem('lofiVolume', volumeEl.value);
});
