const starsWrap = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
  const s = document.createElement('span');
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = (Math.random() * 2.4) + 's';
  starsWrap.appendChild(s);
}

const audio = document.getElementById('audioEl');
const playBtn = document.getElementById('playBtn');
const disc = document.getElementById('disc');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const progressTrack = document.getElementById('progressTrack');
const progressFill = document.getElementById('progressFill');
const trackName = document.getElementById('trackName');

function fmt(t) {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {
      trackName.textContent = 'no se encontró audio/1.mp3';
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener('play', () => {
  playBtn.textContent = '❚❚';
  disc.classList.add('spin');
});

audio.addEventListener('pause', () => {
  playBtn.textContent = '▶';
  disc.classList.remove('spin');
});

audio.addEventListener('ended', () => {
  playBtn.textContent = '▶';
  disc.classList.remove('spin');
});

audio.addEventListener('loadedmetadata', () => {
  durTime.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  curTime.textContent = fmt(audio.currentTime).padStart(5, '0');
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressFill.style.width = pct + '%';
});

audio.addEventListener('error', () => {
  trackName.textContent = 'coloca tu audio en audio/1.mp3';
});

progressTrack.addEventListener('click', (e) => {
  const rect = progressTrack.getBoundingClientRect();
  const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
  if (audio.duration) audio.currentTime = pct * audio.duration;
});
