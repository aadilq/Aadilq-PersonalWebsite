const container = document.querySelector('.movies-container');
const overlay = document.querySelector('.trailer-overlay');
const closeBtn = document.querySelector('.trailer-close');

let player = null;     // YouTube player instance
let apiReady = false;  // true once the YouTube API script has loaded
let pendingId = null;  // trailer clicked before the API finished loading

// 1. Load the YouTube IFrame API (it calls onYouTubeIframeAPIReady when done)
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    if (pendingId) createPlayer(pendingId);
};

// 2. Build the player for a given video ID
function createPlayer(videoId) {
    pendingId = null;
    if (player) {
        player.loadVideoById(videoId);
        return;
    }
    player = new YT.Player('trailer-player', {
        width: '100%',
        height: '100%',
        videoId,
        playerVars: { autoplay: 1, rel: 0, playsinline: 1 },
        events: {
            onReady: (e) => e.target.playVideo(),
            onStateChange: (e) => {
                if (e.data === YT.PlayerState.ENDED) closeTrailer();
            },
            // embedding disabled, bad ID, etc. -> bring the posters back
            onError: closeTrailer,
        },
    });
}

// 3. Open: hide posters, show overlay, start video
function openTrailer(videoId) {
    container.classList.add('hidden');
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    if (apiReady) createPlayer(videoId);
    else pendingId = videoId;
}

// 4. Close: stop video, hide overlay, show posters
function closeTrailer() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    container.classList.remove('hidden');
    pendingId = null;
    if (player && player.stopVideo) player.stopVideo();
}

// Wire up the buttons
document.querySelectorAll('.movie-card').forEach((card) => {
    card.querySelector('.trailer-btn').addEventListener('click', () => {
        const id = card.dataset.trailer.trim();
        if (!id) {
            console.warn('No trailer ID set for', card.querySelector('img').alt);
            return;
        }
        openTrailer(id);
    });
});

closeBtn.addEventListener('click', closeTrailer);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeTrailer();
});
