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

  /* Karakter butonu */
  .character-floating {
    position: fixed;
    z-index: 10;
    top: calc(50% + 144px);
    right: 18px;
    width: 54px;
    height: 54px;
    padding: 0;
    display: grid;
    place-items: center;
    color: var(--text);
    font-size: 24px;
    background: rgba(25, 12, 48, .94);
    border: 2px solid var(--green);
    outline: 2px solid var(--black);
    box-shadow: 0 5px 0 var(--black), 0 0 16px rgba(83, 252, 24, .35);
    cursor: pointer;
    transition: .2s ease;
  }

  .character-floating:hover {
    color: #fff;
    background: rgba(72, 34, 120, .95);
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 8px 0 var(--black), 0 0 22px rgba(83, 252, 24, .55);
  }

  .character-floating:active {
    transform: translateY(2px) scale(.96);
    box-shadow: 0 2px 0 var(--black);
  }

  .character-floating::after {
    content: "KARAKTER";
    position: absolute;
    right: 62px;
    white-space: nowrap;
    padding: 5px 7px;
    color: var(--green);
    font: 10px 'Press Start 2P', monospace;
    background: rgba(13, 7, 24, .95);
    border: 1px solid var(--green);
    opacity: 0;
    pointer-events: none;
    transition: .2s ease;
  }

  .character-floating:hover::after {
    opacity: 1;
  }

  .character-overlay {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(3, 1, 8, .78);
    backdrop-filter: blur(5px);
  }

  .character-overlay.open {
    display: flex;
  }

  .character-popup {
    width: min(620px, 100%);
    max-height: 90vh;
    overflow: auto;
    background: linear-gradient(145deg, #21113e, #0d0718);
    border: 3px solid var(--green);
    box-shadow: 0 0 0 4px var(--black), 0 0 35px rgba(83, 252, 24, .35);
  }

  .character-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 13px 15px;
    color: var(--green);
    font: 12px 'Press Start 2P', monospace;
    border-bottom: 2px solid rgba(83, 252, 24, .35);
  }

  .character-close {
    padding: 3px 7px;
    color: var(--pink);
    font-size: 18px;
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--pink);
  }

  .character-close:hover {
    color: var(--black);
    background: var(--pink);
  }

  .character-body {
    padding: 18px;
  }

  .character-image {
    display: block;
    width: min(100%, 340px);
    height: 230px;
    margin: 0 auto 18px;
    object-fit: cover;
    object-position: center;
    border: 2px solid var(--green);
    box-shadow: 0 4px 0 var(--black), 0 0 18px rgba(83, 252, 24, .3);
  }

  .character-name {
    margin: 0 0 10px;
    color: var(--green);
    font: 18px/1.5 'Press Start 2P', monospace;
    text-align: center;
    text-shadow: 2px 2px 0 var(--black);
  }

  .character-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    margin-bottom: 18px;
  }

  .character-info-item {
    padding: 9px;
    color: var(--text-dim);
    font-size: 18px;
    background: rgba(5, 2, 8, .5);
    border: 1px dashed rgba(240, 171, 252, .35);
  }

  .character-info-item strong {
    display: block;
    margin-top: 4px;
    color: var(--pink);
  }

  .character-story {
    color: var(--text-dim);
    font-size: 19px;
    line-height: 1.35;
  }

  .character-story h3 {
    margin: 20px 0 8px;
    color: var(--pink);
    font: 12px/1.6 'Press Start 2P', monospace;
  }

  .character-story p {
    margin: 0 0 13px;
  }

  @media(max-width: 420px) {
    .advanced-stream-details {
      grid-template-columns: 1fr;
    }

    .character-floating {
      top: auto;
      right: 14px;
      bottom: 138px;
      width: 50px;
      height: 50px;
    }

    .character-floating::after {
      display: none;
    }

    .character-info {
      grid-template-columns: 1fr;
    }

    .character-header {
      font-size: 10px;
    }

    .character-image {
      height: 190px;
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

  setTimeout(() => particle.remove(), effect.speed + 3000);
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

/* Kick son yayın bilgisi */

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

  if (!stream || !lastStream || !lastTitle || !lastCategory || !lastDate) {
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
  const validDate = startDate && !Number.isNaN(startDate.getTime());

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

/* Jale Saral karakter bölümü */

const jaleStory = [
  {
    title: 'Ailesi ve Çocukluğu',
    text: 'Jale, İstanbulda mühendis bir anne ve babanın çocuğu olarak dünyaya geldi. Orta ve üst gelir seviyesine sahip ve eğitimin önemsendiği bir aile ortamında büyüdü. Küçük yaşlardan itibaren iyi bir eğitim aldı ve kültürel açıdan zengin bir çevrede yetişti. Evlerinde başarı tesadüf değil, disiplinli çalışmanın doğal sonucu olarak görülürdü. Ailesi ona hiçbir zaman sevgisini başarıyla ölçmese de, Jale başarılı olmanın kendisinden beklenen doğal bir sorumluluk olduğunu hissederek büyüdü.'
  },
  {
    title: 'Eğitim Hayatı',
    text: 'Jale, okul hayatı boyunca başarılı bir öğrenciydi. Özellikle yabancı dillere ve sosyal bilimlere ilgi duyuyordu. Üniversite eğitimini yüksek bir dereceyle tamamladıktan sonra Almanyada yüksek lisans yapma fırsatı elde etti. Bu fırsatı hem akademik hem de kişisel gelişimi için önemli bir adım olarak gördü ve hiç düşünmeden kabul etti.'
  },
  {
    title: 'Almanya Yılları',
    text: 'Almanyaya taşınması, Jalenin hayatındaki en büyük dönüm noktalarından biri oldu. İlk zamanlarda tek amacı eğitimini başarıyla tamamlamak ve kariyerine güçlü bir başlangıç yapmaktı. Ancak zaman geçtikçe farklı ülkelerden insanlarla tanıştı, farklı kültürleri yakından tanıdı ve kendi yaşam tarzını sorgulamaya başladı. Daha önce hayatını başarı, diploma ve kariyer üzerine kurarken, Almanyada insanların sosyal yaşama verdiği değeri gördü. Çevresindeki insanların yalnızca çalışmak yerine hayatın tadını çıkarmaya da zaman ayırdığını fark etti. Yüksek lisansını tamamladıktan sonra bir süre daha Almanyada yaşadı. Ancak zamanla ailesine ve ülkesine duyduğu özlem ağır basınca Türkiyeye dönmeye karar verdi.'
  },
  {
    title: 'Türkiye Yılları',
    text: 'Türkiyeye döndükten sonra kurumsal hayata adım attı ve kendi alanında çalışmaya başladı. Dışarıdan bakıldığında her şeye sahip gibi görünüyordu. İyi bir işi, düzenli bir hayatı ve başarılı bir kariyeri vardı. Ama zamanla bu düzenin ona beklediği mutluluğu vermediğini fark etti. Yeni insanlar tanımayı, farklı kültürleri keşfetmeyi ve hayatın sunduğu deneyimleri yaşamayı özlediğini hissetti. Uzun süre düşündükten sonra kendisi için yeni bir sayfa açmaya karar verdi. Sahip olduğu düzeni geride bırakarak, hayatına farklı bir yön vermek ve yeni bir başlangıç yapmak amacıyla Los Santosa gitmeye karar verdi.'
  },
  {
    title: 'Jalenin Karakteri',
    text: 'Jale dışarıdan bakıldığında soğuk ama sakin, kendinden emin ve kontrollü biri gibi görünür. İlk tanışmalarda mesafeli olsa da, güven duyduğu insanlara karşı oldukça samimi ve esprili bir kişiliğe sahiptir. Yeni tanıştığı insanlara önyargıyla yaklaşmaz, herkesin anlatacak bir hikayesi olduğuna inanır. Plan yapmayı sever ancak eskisi kadar katı değildir. Hayatın her zaman planlandığı gibi gitmediğini öğrendikten sonra daha spontane yaşamaya başlamıştır. Kolay kolay öfkelenmez. Sorunları konuşarak çözmeye çalışır ve insan ilişkilerinde empati kurmaya önem verir. Jalenin en büyük zaafı kadınlara ve erkeklere karşı duyduğu ilgidir. Flört etmeyi, yeni insanlarla tanışmayı ve karşılıklı çekim hissettiği kişilerle vakit geçirmeyi sever. Ancak bunu ciddi bir ilişki arayışıyla yapmaz. Duygusal bağ kurmaktan ve uzun süreli ilişkilerden bilinçli olarak uzak durmayı tercih eder. Bu durum zaman zaman çevresindeki insanlar tarafından yanlış anlaşılmasına veya ilişkilerinde karmaşık durumlar yaşamasına neden olabiliyor.'
  },
  {
    title: 'Güçlü ve Zayıf Yönleri',
    text: 'Karşılaştığı sorunlarda paniğe kapılmak yerine sakin kalmayı tercih eder. İnsanlarla kolay iletişim kurar ve farklı ortamlara hızlı uyum sağlar. Eğitim hayatı ve yurt dışı deneyimi sayesinde farklı bakış açılarını anlamakta zorlanmaz fakat mükemmeliyetçi yapısı nedeniyle zaman zaman kendine gereğinden fazla yüklenir ve değer verdiği insanlara karşı fazla korumacı davranabilir.'
  },
  {
    title: 'Hobi ve İlgi Alanları',
    text: 'Jale boş zamanlarını kalabalık kafelerde oturarak insanları gözlemlemeyi sever. Farklı şehirleri keşfetmek, yeni restoranlar denemek ve yerel kültürleri tanımak onun için büyük bir keyiftir. Kahve konusunda oldukça seçicidir ve gittiği her şehirde küçük butik kahvecileri keşfetmeye çalışır. Kitap okumayı özellikle kişisel gelişim alanını sever. Mutfakta yeni tarifler denemekten keyif alır. Özellikle dünya mutfaklarına ilgi duyar ve farklı kültürlerin yemeklerini öğrenmeyi sever.'
  },
  {
    title: 'Jalenin Bakış Açısı',
    text: 'Jale, çocukluğundan itibaren başarı odaklı yetişmiş olsa da zaman içinde mutluluğun yalnızca kariyer veya maddi başarıyla ölçülemeyeceğini öğrendi. Onun için bugün en değerli şey yeni insanlar tanımak, farklı hayatlara dokunmak ve unutulmayacak anılar biriktirmektir. Los Santosa gelmesindeki en büyük amacı da tam olarak budur. Yeni bir hayat kurmak, kendi sınırlarını yeniden keşfetmek ve bu şehirde yaşayacağı deneyimlerle kendisini geliştirmek istemesidir.'
  }
];

function createJaleCharacterSection() {
  if (document.getElementById('jaleCharacterButton')) {
    return;
  }

  const button = document.createElement('button');
  button.id = 'jaleCharacterButton';
  button.className = 'character-floating';
  button.type = 'button';
  button.setAttribute('aria-label', 'Jale Saral karakter hikayesini aç');
  button.textContent = '🧍';

  const overlay = document.createElement('div');
  overlay.id = 'jaleCharacterOverlay';
  overlay.className = 'character-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const storyHtml = jaleStory.map(section => `
    <h3>${section.title}</h3>
    <p>${section.text}</p>
  `).join('');

  overlay.innerHTML = `
    <section class="character-popup" role="dialog" aria-modal="true" aria-labelledby="jaleCharacterTitle">
      <header class="character-header">
        <span>KNGLRP // KARAKTER</span>
        <button class="character-close" type="button" aria-label="Karakter penceresini kapat">X</button>
      </header>

      <div class="character-body">
        <img
          class="character-image"
          src="https://i.ibb.co/5xjy63Vx/36c54bd6-3ef3-4f3b-9987-8c269777761b.jpg"
          alt="Jale Saral karakter görseli"
          draggable="false"
        >

        <h2 class="character-name" id="jaleCharacterTitle">JALE SARAL</h2>

        <div class="character-info">
          <div class="character-info-item">
            Sunucu
            <strong>KNGLRP</strong>
          </div>
          <div class="character-info-item">
            Meslek
            <strong>Belirtilmedi</strong>
          </div>
        </div>

        <div class="character-story">
          ${storyHtml}
        </div>
      </div>
    </section>
  `;

  document.body.append(button, overlay);

  const closeButton = overlay.querySelector('.character-close');

  function openJaleCharacter() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');
  }

  function closeJaleCharacter() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');

    if (!document.querySelector('.popup-overlay.open')) {
      document.body.classList.remove('modal-active');
    }
  }

  button.addEventListener('click', openJaleCharacter);
  closeButton.addEventListener('click', closeJaleCharacter);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeJaleCharacter();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeJaleCharacter();
    }
  });
}

const characterScrollbarStyle = document.createElement('style');

characterScrollbarStyle.textContent = `
  .character-popup {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .character-popup::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

document.head.appendChild(characterScrollbarStyle);

createJaleCharacterSection();
