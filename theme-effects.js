const themeEffects = {
  offline: {
    name: 'Mor Neon',
    background: 'radial-gradient(circle at 50% 15%, rgba(168,85,247,.22), transparent 28%), linear-gradient(180deg,#130a25,#050309)',
    particle: '✦',
    color: '#f0abfc',
    glow: 'rgba(168,85,247,.8)',
    speed: 7000
  },
  cyberpunk: {
    name: 'Cyberpunk',
    background: 'linear-gradient(135deg,rgba(0,229,255,.12) 1px,transparent 1px),linear-gradient(45deg,rgba(255,0,212,.1) 1px,transparent 1px),#02050b',
    particle: '◆',
    color: '#00e5ff',
    glow: 'rgba(255,0,212,.9)',
    speed: 3500
  },
  pink: {
    name: 'Pembe Neon',
    background: 'radial-gradient(circle at 20% 20%,rgba(236,72,153,.28),transparent 25%),radial-gradient(circle at 80% 80%,rgba(249,168,212,.16),transparent 25%),#090309',
    particle: '♥',
    color: '#f9a8d4',
    glow: 'rgba(236,72,153,.9)',
    speed: 5000
  },
  green: {
    name: 'Matrix Yeşili',
    background: 'linear-gradient(rgba(34,197,94,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.08) 1px,transparent 1px),#020806',
    particle: '0',
    color: '#86efac',
    glow: 'rgba(34,197,94,.9)',
    speed: 2800
  },
  halloween: {
    name: 'Halloween',
    background: 'radial-gradient(circle at 50% 90%,rgba(249,115,22,.25),transparent 28%),linear-gradient(180deg,#241007,#050302)',
    particle: '☠',
    color: '#facc15',
    glow: 'rgba(249,115,22,.9)',
    speed: 6000
  },
  ice: {
    name: 'Buz Mavisi',
    background: 'radial-gradient(circle at 30% 20%,rgba(56,189,248,.24),transparent 28%),linear-gradient(180deg,#071a2b,#020509)',
    particle: '❄',
    color: '#bae6fd',
    glow: 'rgba(56,189,248,.9)',
    speed: 8500
  },
  red: {
    name: 'Kırmızı Gece',
    background: 'radial-gradient(circle at 50% 30%,rgba(239,68,68,.2),transparent 25%),linear-gradient(180deg,#25080e,#050203)',
    particle: '♦',
    color: '#fda4af',
    glow: 'rgba(239,68,68,.9)',
    speed: 4200
  }
};

const effectStyle = document.createElement('style');

effectStyle.textContent = `
  #themeEffectLayer {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
  }

  .theme-effect-particle {
    position: absolute;
    top: -30px;
    color: var(--effect-color);
    font-family: monospace;
    font-size: var(--effect-size);
    text-shadow: 0 0 5px var(--effect-glow), 0 0 14px var(--effect-glow);
    animation: themeParticleFall var(--effect-speed) linear forwards;
  }

  .theme-effect-particle.matrix {
    font-family: 'VT323', monospace;
    font-weight: bold;
  }

  .theme-effect-particle.snow {
    animation-name: themeSnowFall;
  }

  .theme-effect-particle.fire {
    animation-name: themeFireRise;
  }

  @keyframes themeParticleFall {
    0% {
      transform: translate3d(0,-35px,0) rotate(0deg);
      opacity: 0;
    }
    12% {
      opacity: .9;
    }
    100% {
      transform: translate3d(var(--drift),110vh,0) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes themeSnowFall {
    0% {
      transform: translate3d(0,-35px,0) rotate(0deg);
      opacity: 0;
    }
    15% {
      opacity: .9;
    }
    50% {
      transform: translate3d(35px,50vh,0) rotate(180deg);
    }
    100% {
      transform: translate3d(-25px,110vh,0) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes themeFireRise {
    0% {
      transform: translate3d(0,110vh,0) scale(.7);
      opacity: 0;
    }
    15% {
      opacity: .9;
    }
    100% {
      transform: translate3d(var(--drift),-40px,0) scale(1.3);
      opacity: 0;
    }
  }

  body.theme-cyberpunk #themeEffectLayer {
    background-size: 42px 42px;
    animation: cyberGrid 8s linear infinite;
  }

  body.theme-green #themeEffectLayer {
    background-image:
      linear-gradient(rgba(34,197,94,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,197,94,.08) 1px, transparent 1px);
    background-size: 34px 34px;
  }

  body.theme-halloween #themeEffectLayer {
    filter: sepia(.2);
  }

  @keyframes cyberGrid {
    from {
      background-position: 0 0,0 0;
    }
    to {
      background-position: 42px 42px,-42px 42px;
    }
  }

  /* Gelişmiş Kick bilgileri */
  .advanced-stream-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 8px;
  }

  .advanced-stream-info {
    min-width: 0;
    padding: 8px;
    background: rgba(5,2,8,.48);
    border: 1px dashed rgba(240,171,252,.4);
  }

  .advanced-stream-label {
    display: block;
    margin-bottom: 4px;
    color: var(--text-dim);
    font-size: 15px;
  }

  .advanced-stream-value {
    display: block;
    overflow: hidden;
    color: var(--pink);
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .advanced-stream-value.live-viewers {
    color: var(--green);
  }

  @media(max-width:420px) {
    .advanced-stream-details {
      grid-template-columns: 1fr;
    }
  }
`;

document.head.appendChild(effectStyle);

const effectLayer = document.createElement('div');
effectLayer.id = 'themeEffectLayer';
document.body.prepend(effectLayer);

let activeEffectClass = '';
let effectTimer;

function getActiveEffect() {
  if (document.body.classList.contains('theme-cyberpunk')) return themeEffects.cyberpunk;
  if (document.body.classList.contains('theme-pink')) return themeEffects.pink;
  if (document.body.classList.contains('theme-green')) return themeEffects.green;
  if (document.body.classList.contains('theme-halloween')) return themeEffects.halloween;
  if (document.body.classList.contains('theme-ice')) return themeEffects.ice;
  if (document.body.classList.contains('theme-red')) return themeEffects.red;

  return themeEffects.offline;
}

function createThemeParticle() {
  const effect = getActiveEffect();
  const particle = document.createElement('span');

  particle.className = 'theme-effect-particle';
  particle.textContent = effect.particle;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.setProperty('--effect-color', effect.color);
  particle.style.setProperty('--effect-glow', effect.glow);
  particle.style.setProperty('--effect-speed', `${effect.speed + Math.random() * 2500}ms`);
  particle.style.setProperty('--effect-size', `${10 + Math.random() * 13}px`);
  particle.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);

  if (effect === themeEffects.green) {
    particle.classList.add('matrix');
    particle.textContent = Math.random() > .5 ? '1' : '0';
  }

  if (effect === themeEffects.ice) {
    particle.classList.add('snow');
  }

  if (effect === themeEffects.halloween) {
    particle.classList.add('fire');
  }

  effectLayer.appendChild(particle);
  setTimeout(() => particle.remove(), effect.speed + 3000);
}

function refreshThemeEffect() {
  const effect = getActiveEffect();

  document.body.style.background = effect.background;

  clearInterval(effectTimer);
  effectLayer.innerHTML = '';

  for (let i = 0; i < 18; i++) {
    setTimeout(createThemeParticle, i * 180);
  }

  effectTimer = setInterval(createThemeParticle, 420);
}

const themeObserver = new MutationObserver(refreshThemeEffect);

themeObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});

refreshThemeEffect();

/* Gelişmiş Kick bilgileri */

let advancedKickTimer;

function createAdvancedKickPanel() {
  const streamDetails = document.querySelector('.stream-details');

  if (!streamDetails || document.querySelector('.advanced-stream-details')) {
    return;
  }

  const panel = document.createElement('div');
  panel.className = 'advanced-stream-details';
  panel.innerHTML = `
    <div class="advanced-stream-info">
      <span class="advanced-stream-label">İzleyici</span>
      <strong class="advanced-stream-value live-viewers" id="advancedViewerCount">-</strong>
    </div>
    <div class="advanced-stream-info">
      <span class="advanced-stream-label">Takipçi</span>
      <strong class="advanced-stream-value" id="advancedFollowerCount">-</strong>
    </div>
    <div class="advanced-stream-info">
      <span class="advanced-stream-label">Yayın süresi</span>
      <strong class="advanced-stream-value" id="advancedStreamDuration">-</strong>
    </div>
    <div class="advanced-stream-info">
      <span class="advanced-stream-label">Başlangıç</span>
      <strong class="advanced-stream-value" id="advancedStreamStart">-</strong>
    </div>
  `;

  streamDetails.insertAdjacentElement('afterend', panel);
}

function getNumber(...values) {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const number = Number(value.replace(/[^\d.-]/g, ''));

      if (Number.isFinite(number)) {
        return number;
      }
    }
  }

  return null;
}

function formatNumber(value) {
  const number = getNumber(value);

  if (number === null) {
    return '-';
  }

  return new Intl.NumberFormat('tr-TR').format(number);
}

function getViewerCount(stream) {
  return getNumber(
    stream?.viewer_count,
    stream?.viewers_count,
    stream?.concurrent_viewers,
    stream?.viewers,
    stream?.viewerCount
  );
}

function getFollowerCount(channel) {
  return getNumber(
    channel?.followers_count,
    channel?.followersCount,
    channel?.followers?.count,
    channel?.followers?.total,
    channel?.user?.followers_count
  );
}

function getStartDate(stream) {
  const value =
    stream?.started_at ||
    stream?.start_time ||
    stream?.created_at ||
    stream?.startTime;

  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatStartDate(date) {
  if (!date) {
    return '-';
  }

  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDuration(date) {
  if (!date) {
    return '-';
  }

  const elapsed = Math.max(0, Date.now() - date.getTime());
  const totalMinutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}s ${String(minutes).padStart(2, '0')}dk`;
  }

  return `${minutes}dk`;
}

function updateAdvancedKickInfo(channel) {
  createAdvancedKickPanel();

  const viewerElement = document.getElementById('advancedViewerCount');
  const followerElement = document.getElementById('advancedFollowerCount');
  const durationElement = document.getElementById('advancedStreamDuration');
  const startElement = document.getElementById('advancedStreamStart');

  if (!viewerElement || !followerElement || !durationElement || !startElement) {
    return;
  }

  const stream = channel?.livestream;
  const isLive = Boolean(stream);

  if (!isLive) {
    viewerElement.textContent = '-';
    durationElement.textContent = '-';
    startElement.textContent = '-';
    followerElement.textContent = formatNumber(getFollowerCount(channel));
    return;
  }

  const startDate = getStartDate(stream);

  viewerElement.textContent = formatNumber(getViewerCount(stream));
  followerElement.textContent = formatNumber(getFollowerCount(channel));
  durationElement.textContent = formatDuration(startDate);
  startElement.textContent = formatStartDate(startDate);
}

async function refreshAdvancedKickInfo() {
  try {
    const response = await fetch('https://kick.com/api/v2/channels/katiya', {
      headers: {
        Accept: 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const channel = await response.json();
    updateAdvancedKickInfo(channel);
  } catch (error) {
    createAdvancedKickPanel();

    const viewerElement = document.getElementById('advancedViewerCount');

    if (viewerElement) {
      viewerElement.textContent = '-';
    }

    console.warn('Gelişmiş Kick bilgileri alınamadı:', error);
  }
}

function startAdvancedKickInfo() {
  createAdvancedKickPanel();
  refreshAdvancedKickInfo();

  clearInterval(advancedKickTimer);
  advancedKickTimer = setInterval(refreshAdvancedKickInfo, 30000);
}

startAdvancedKickInfo();
