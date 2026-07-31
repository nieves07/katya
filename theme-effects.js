const themeEffects = {
  offline: {
    particle: '✦',
    color: '#f0abfc',
    glow: 'rgba(168,85,247,.8)',
    speed: 7000
  },
  cyberpunk: {
    particle: '◆',
    color: '#00e5ff',
    glow: 'rgba(255,0,212,.9)',
    speed: 3500
  },
  pink: {
    particle: '♥',
    color: '#f9a8d4',
    glow: 'rgba(236,72,153,.9)',
    speed: 5000
  },
  green: {
    particle: '0',
    color: '#86efac',
    glow: 'rgba(34,197,94,.9)',
    speed: 2800
  },
  halloween: {
    particle: '☠',
    color: '#facc15',
    glow: 'rgba(249,115,22,.9)',
    speed: 6000
  },
  ice: {
    particle: '❄',
    color: '#bae6fd',
    glow: 'rgba(56,189,248,.9)',
    speed: 8500
  },
  red: {
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

  @keyframes themeParticleFall {
    0% {
      transform: translate3d(0, -35px, 0) rotate(0deg);
      opacity: 0;
    }

    12% {
      opacity: .9;
    }

    100% {
      transform: translate3d(var(--drift), 110vh, 0) rotate(360deg);
      opacity: 0;
    }
  }

  .advanced-stream-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 8px;
  }

  .advanced-stream-info {
    min-width: 0;
    padding: 8px;
    background: rgba(5, 2, 8, .48);
    border: 1px dashed rgba(240, 171, 252, .4);
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

let effectTimer;

function getActiveEffect() {
  if (document.body.classList.contains('theme-cyberpunk')) {
    return themeEffects.cyberpunk;
  }

  if (document.body.classList.contains('theme-pink')) {
    return themeEffects.pink;
  }

  if (document.body.classList.contains('theme-green')) {
    return themeEffects.green;
  }

  if (document.body.classList.contains('theme-halloween')) {
    return themeEffects.halloween;
  }

  if (document.body.classList.contains('theme-ice')) {
    return themeEffects.ice;
  }

  if (document.body.classList.contains('theme-red')) {
    return themeEffects.red;
  }

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
  particle.style.setProperty(
    '--effect-speed',
    `${effect.speed + Math.random() * 2500}ms`
  );
  particle.style.setProperty('--effect-size', `${10 + Math.random() * 13}px`);
  particle.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);

  if (effect === themeEffects.green) {
    particle.textContent = Math.random() > .5 ? '1' : '0';
  }

  effectLayer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, effect.speed + 3000);
}

function refreshThemeEffect() {
  clearInterval(effectTimer);
  effectLayer.innerHTML = '';

  for (let index = 0; index < 18; index++) {
    setTimeout(createThemeParticle, index * 180);
  }

  effectTimer = setInterval(createThemeParticle, 420);
}

new MutationObserver(refreshThemeEffect).observe(document.body, {
  attributes: true,
  attributeFilter: ['class']
});

refreshThemeEffect();

/* Kick son yayın bilgisi: yalnızca API kullanılır. */

function kickGetTitle(data) {
  return (
    data?.session_title ||
    data?.livestream_session_title ||
    data?.stream_title ||
    data?.title ||
    data?.livestream?.session_title ||
    data?.livestream?.title ||
    'Başlık bilgisi yok'
  );
}

function kickGetCategory(data) {
  return (
    data?.category?.name ||
    data?.category?.slug ||
    data?.category_name ||
    data?.livestream?.category?.name ||
    data?.categories?.[0]?.name ||
    'Kategori bilgisi yok'
  );
}

function kickGetDate(data) {
  const value =
    data?.created_at ||
    data?.start_time ||
    data?.started_at ||
    data?.published_at ||
    data?.date;

  if (!value) {
    return 'Tarih bilgisi yok';
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? 'Tarih bilgisi yok'
    : date.toLocaleString('tr-TR');
}

function kickNormalizeLastStream(data) {
  if (!data) {
    return null;
  }

  const candidates = [
    ...(Array.isArray(data) ? data : []),
    ...(Array.isArray(data.data) ? data.data : []),
    ...(Array.isArray(data.videos) ? data.videos : []),
    ...(Array.isArray(data.videos?.data) ? data.videos.data : []),
    ...(Array.isArray(data.streams) ? data.streams : []),
    ...(Array.isArray(data.streams?.data) ? data.streams.data : []),
    ...(Array.isArray(data.previous_livestreams)
      ? data.previous_livestreams
      : []),
    ...(Array.isArray(data.recent_streams) ? data.recent_streams : [])
  ];

  return candidates.find(item =>
    item &&
    (
      item.title ||
      item.session_title ||
      item.livestream_session_title ||
      item.created_at ||
      item.start_time ||
      item.started_at
    )
  ) || null;
}

async function kickGetLastStream() {
  const endpoints = [
    'https://kick.com/api/v2/channels/katiya/videos?limit=1',
    'https://kick.com/api/v2/channels/katiya/videos',
    'https://kick.com/api/v2/channels/katiya/streams',
    'https://kick.com/api/v2/channels/katiya'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const stream = kickNormalizeLastStream(data);

      if (stream) {
        return stream;
      }
    } catch (error) {
      console.warn('Kick son yayın endpoint hatası:', endpoint, error);
    }
  }

  return null;
}

function kickShowLastStream(stream) {
  const lastStream = document.getElementById('lastStream');
  const lastTitle = document.getElementById('lastStreamTitle');
  const lastCategory = document.getElementById('lastStreamCategory');
  const lastDate = document.getElementById('lastStreamDate');

  if (
    !stream ||
    !lastStream ||
    !lastTitle ||
    !lastCategory ||
    !lastDate
  ) {
    return;
  }

  lastTitle.textContent = kickGetTitle(stream);
  lastCategory.textContent =
    stream?.category?.name ||
    stream?.category ||
    kickGetCategory(stream);
  lastDate.textContent = kickGetDate(stream);
  lastStream.classList.remove('empty');
}

async function kickRefreshLastStream() {
  const lastStream = document.getElementById('lastStream');

  // Eski kayıt veya başlangıçta gösterilen veri kullanılmaz.
  if (lastStream) {
    lastStream.classList.add('empty');
  }

  const stream = await kickGetLastStream();

  if (stream) {
    kickShowLastStream(stream);
  }
}

function getKickNumber(...values) {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      const number = Number(value.replace(/[^\d.-]/g, ''));

      if (Number.isFinite(number)) {
        return number;
      }
    }
  }

  return null;
}

function formatKickNumber(value) {
  const number = getKickNumber(value);

  return number === null
    ? '-'
    : new Intl.NumberFormat('tr-TR').format(number);
}

function getKickViewerCount(stream) {
  return getKickNumber(
    stream?.viewer_count,
    stream?.viewers_count,
    stream?.concurrent_viewers,
    stream?.viewers,
    stream?.viewerCount
  );
}

function getKickFollowerCount(channel) {
  return getKickNumber(
    channel?.followers_count,
    channel?.followersCount,
    channel?.followers?.count,
    channel?.followers?.total,
    channel?.user?.followers_count
  );
}

function createAdvancedKickPanel() {
  const streamDetails = document.querySelector('.stream-details');

  if (
    !streamDetails ||
    document.querySelector('.advanced-stream-details')
  ) {
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

function updateAdvancedKickInfo(channel) {
  createAdvancedKickPanel();

  const viewerElement = document.getElementById('advancedViewerCount');
  const followerElement = document.getElementById('advancedFollowerCount');
  const durationElement = document.getElementById('advancedStreamDuration');
  const startElement = document.getElementById('advancedStreamStart');

  if (
    !viewerElement ||
    !followerElement ||
    !durationElement ||
    !startElement
  ) {
    return;
  }

  const stream = channel?.livestream;

  if (!stream) {
    viewerElement.textContent = '-';
    durationElement.textContent = '-';
    startElement.textContent = '-';
    followerElement.textContent = formatKickNumber(
      getKickFollowerCount(channel)
    );
    return;
  }

  const startValue =
    stream.started_at ||
    stream.start_time ||
    stream.created_at;

  const startDate = startValue ? new Date(startValue) : null;
  const validDate =
    startDate && !Number.isNaN(startDate.getTime());

  const elapsed = validDate
    ? Math.max(0, Date.now() - startDate.getTime())
    : 0;

  const totalMinutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  viewerElement.textContent = formatKickNumber(
    getKickViewerCount(stream)
  );

  followerElement.textContent = formatKickNumber(
    getKickFollowerCount(channel)
  );

  startElement.textContent = validDate
    ? startDate.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '-';

  durationElement.textContent = validDate
    ? hours > 0
      ? `${hours}s ${String(minutes).padStart(2, '0')}dk`
      : `${minutes}dk`
    : '-';
}

async function refreshAdvancedKickInfo() {
  try {
    const response = await fetch(
      'https://kick.com/api/v2/channels/katiya',
      {
        headers: {
          Accept: 'application/json'
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const channel = await response.json();

    updateAdvancedKickInfo(channel);

    if (!channel?.livestream) {
      await kickRefreshLastStream();
    }
  } catch (error) {
    console.warn('Gelişmiş Kick bilgileri alınamadı:', error);
    await kickRefreshLastStream();
  }
}

createAdvancedKickPanel();
refreshAdvancedKickInfo();
setInterval(refreshAdvancedKickInfo, 30000);
setInterval(kickRefreshLastStream, 60000);
