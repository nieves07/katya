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
    text-shadow:
      0 0 5px var(--effect-glow),
      0 0 14px var(--effect-glow);
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
    from { background-position: 0 0,0 0; }
    to { background-position: 42px 42px,-42px 42px; }
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
