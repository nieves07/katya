(() => {
  'use strict';

  const body = document.body;
  const cursor = document.getElementById('mouseGlow');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  const style = document.createElement('style');

  style.textContent = `
    :root {
      --motion-normal: 320ms;
      --ease-smooth: cubic-bezier(.22, 1, .36, 1);
      --ease-bounce: cubic-bezier(.34, 1.56, .64, 1);
    }

    body {
      isolation: isolate;
    }

    body::before {
      opacity: .55;
      background:
        radial-gradient(
          circle at var(--pointer-x, 50%) var(--pointer-y, 18%),
          color-mix(in srgb, var(--pink) 6%, transparent),
          transparent 11%
        ),
        radial-gradient(circle at 14% 20%, rgba(255,255,255,.03), transparent 16%),
        radial-gradient(circle at 86% 78%, rgba(168,85,247,.05), transparent 18%);
    }

    body::after {
      opacity: .07;
      background-size: 8px 8px;
    }

    #mouseGlow {
      position: fixed !important;
      z-index: 99999 !important;
      width: 30px !important;
      height: 30px !important;
      display: block !important;
      pointer-events: none !important;
      opacity: 0;
      border: 2px solid var(--pink);
      border-radius: 50%;
      filter: none !important;
      background: transparent !important;
      box-shadow: none !important;
      transform: translate(-50%, -50%);
      transition:
        opacity .15s ease,
        border-color .18s ease;
      mix-blend-mode: normal !important;
      will-change: left, top;
    }

    #mouseGlow::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--pink);
      transform: translate(-50%, -50%);
    }

    #mouseGlow.active {
      border-color: var(--green);
      transform: translate(-50%, -50%) scale(1.18);
    }

    #mouseGlow.active::after {
      background: var(--green);
    }

    #mouseGlow.click {
      animation: cursorClick .25s ease-out;
    }

    @keyframes cursorClick {
      0% {
        transform: translate(-50%, -50%) scale(.82);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    @media (pointer: fine) {
      body,
      button,
      a,
      .hero,
      .hero *,
      .hero img,
      .kick-live-frame,
      .kick-live-frame iframe,
      .character-image,
      .character-popup {
        cursor: none !important;
      }
    }

    #modernEffectLayer {
      position: fixed;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      contain: strict;
    }

    .modern-particle {
      position: absolute;
      top: -40px;
      left: var(--left);
      color: var(--color);
      font: var(--size)/1 monospace;
      opacity: 0;
      text-shadow: 0 0 5px var(--glow), 0 0 16px var(--glow);
      animation:
        modernParticleFall var(--speed) linear forwards,
        modernParticlePulse 1.8s ease-in-out infinite;
    }

    @keyframes modernParticleFall {
      0% {
        opacity: 0;
        transform: translate3d(0, -40px, 0) rotate(0deg) scale(.35);
      }

      12% {
        opacity: .9;
      }

      50% {
        transform: translate3d(var(--drift), 55vh, 0) rotate(180deg) scale(1);
      }

      100% {
        opacity: 0;
        transform: translate3d(calc(var(--drift) * -1), 112vh, 0)
          rotate(360deg) scale(.5);
      }
    }

    @keyframes modernParticlePulse {
      50% {
        filter: brightness(1.5);
      }
    }

    .btn {
      isolation: isolate;
      overflow: hidden;
      transform: translateZ(0);
      border-radius: 10px;
      background: linear-gradient(
        110deg,
        rgba(25,12,48,.94),
        rgba(45,20,80,.82),
        rgba(25,12,48,.94)
      );
      background-size: 220% 100%;
      transition:
        transform var(--motion-normal) var(--ease-bounce),
        box-shadow var(--motion-normal) ease,
        background-position .8s ease;
    }

    .btn::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      width: auto;
      height: auto;
      background: linear-gradient(
        115deg,
        transparent 20%,
        rgba(255,255,255,.16) 48%,
        transparent 72%
      );
      transform: translateX(-130%);
      transition: transform .75s var(--ease-smooth);
      pointer-events: none;
    }

    .btn::after {
      content: "";
      position: absolute;
      inset: 2px;
      z-index: -1;
      width: auto;
      height: auto;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,.07),
        transparent 35%,
        rgba(255,255,255,.025)
      );
      pointer-events: none;
    }

    .btn:hover {
      background-position: 100% 0;
      transform:
        translate(var(--button-x, 0), var(--button-y, -5px))
        scale(1.025);
    }

    .btn:hover::before {
      transform: translateX(130%);
    }

    .btn:active {
      transform: translateY(2px) scale(.98);
    }

    .btn:focus-visible,
    .setup-floating:focus-visible,
    .theme-floating:focus-visible,
    .character-floating:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 4px;
    }

    .modern-ripple {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      background: color-mix(in srgb, var(--button-color) 45%, white);
      transform: translate(-50%, -50%) scale(0);
      animation: modernRipple .65s ease-out forwards;
      mix-blend-mode: screen;
    }

    @keyframes modernRipple {
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(18);
      }
    }

    .setup-floating,
    .theme-floating,
    .character-floating {
      border-radius: 14px;
      backdrop-filter: blur(14px) saturate(140%);
      -webkit-backdrop-filter: blur(14px) saturate(140%);
      transition:
        transform var(--motion-normal) var(--ease-bounce),
        border-radius var(--motion-normal) ease,
        box-shadow var(--motion-normal) ease;
    }

    .setup-floating:hover,
    .theme-floating:hover,
    .character-floating:hover {
      border-radius: 50%;
      transform: translateY(-6px) scale(1.1) rotate(4deg);
    }

    .character-floating {
      position: fixed !important;
      z-index: 11 !important;
      width: 54px;
      height: 54px;
      padding: 0;
      display: grid;
      place-items: center;
      color: var(--text);
      font-size: 24px;
      background: rgba(25,12,48,.94);
      border: 2px solid var(--pink);
      outline: 2px solid var(--black);
      box-shadow: 0 5px 0 var(--black);
    }

    .character-floating::after {
      position: absolute;
      right: 62px;
      white-space: nowrap;
      padding: 5px 7px;
      color: var(--pink);
      font: 10px 'Press Start 2P', monospace;
      background: rgba(13,7,24,.96);
      border: 1px solid var(--pink);
      opacity: 0;
      pointer-events: none;
      transition: opacity .2s ease;
    }

    .character-floating:hover::after {
      opacity: 1;
    }

    .character-overlay {
      position: fixed;
      inset: 0;
      z-index: 30;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: rgba(3,1,8,.8);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
    }

    .character-overlay.open {
      display: flex;
    }

    .character-popup {
      width: min(620px, 100%);
      max-height: 90vh;
      overflow: auto;
      color: var(--text);
      background: linear-gradient(145deg, #21113e, #0d0718);
      border: 3px solid var(--pink);
      border-radius: 14px;
      box-shadow: 0 0 0 4px var(--black);
      transform: translateY(18px) scale(.94);
      animation: characterPopupIn .4s var(--ease-bounce) forwards;
    }

    @keyframes characterPopupIn {
      to {
        transform: translateY(0) scale(1);
      }
    }

    .character-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 13px 15px;
      color: var(--pink);
      font: 12px 'Press Start 2P', monospace;
      border-bottom: 2px solid rgba(240,171,252,.35);
    }

    .character-close {
      padding: 3px 7px;
      color: var(--green);
      font-size: 18px;
      cursor: none !important;
      background: transparent;
      border: 1px solid var(--green);
      border-radius: 6px;
    }

    .character-close:hover {
      color: var(--black);
      background: var(--green);
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
      border: 2px solid var(--pink);
      box-shadow: 0 4px 0 var(--black);
    }

    .character-name {
      margin: 0 0 16px;
      color: var(--pink);
      font: 18px 'Press Start 2P', monospace;
      text-align: center;
    }

    .character-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 9px;
      margin-bottom: 18px;
    }

    .character-info-item {
      padding: 9px;
      color: var(--text-dim);
      font-size: 17px;
      background: rgba(5,2,8,.5);
      border: 1px dashed rgba(240,171,252,.35);
    }

    .character-info-item strong {
      display: block;
      margin-top: 4px;
      color: var(--pink);
      font-size: 18px;
    }

    .character-story {
      color: var(--text-dim);
      font-size: 18px;
      line-height: 1.45;
    }

    .character-story h3 {
      margin: 18px 0 6px;
      color: var(--pink);
      font-size: 20px;
    }

    .character-story p {
      margin: 0 0 12px;
    }

    .hero {
      will-change: transform;
    }

    @media (max-width: 420px) {
      .character-floating {
        width: 50px;
        height: 50px;
      }

      .character-floating::after {
        display: none;
      }

      .character-body {
        padding: 14px;
      }

      .character-image {
        width: 100%;
        height: 190px;
      }

      .character-info {
        grid-template-columns: 1fr;
      }

      .character-header {
        font-size: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #mouseGlow,
      .modern-particle,
      #modernEffectLayer {
        display: none !important;
      }
    }
  `;

  document.head.appendChild(style);

  let visible = false;

  function moveCursor(event) {
    if (!cursor || !finePointer || reduceMotion) return;

    const x = event.clientX;
    const y = event.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.opacity = '1';
    visible = true;

    document.documentElement.style.setProperty('--pointer-x', `${x}px`);
    document.documentElement.style.setProperty('--pointer-y', `${y}px`);
  }

  function hideCursor() {
    if (!cursor) return;

    cursor.style.opacity = '0';
    cursor.classList.remove('active');
    visible = false;
  }

  if (finePointer && !reduceMotion && cursor) {
    document.addEventListener('pointermove', moveCursor);
    document.addEventListener('pointerleave', hideCursor);

    document.addEventListener('pointerdown', () => {
      if (!visible) return;

      cursor.classList.remove('click');
      void cursor.offsetWidth;
      cursor.classList.add('click');
    });

    document.addEventListener('pointerover', event => {
      if (event.target.closest?.('a, button, .character-popup')) {
        cursor.classList.add('active');
      }
    });

    document.addEventListener('pointerout', event => {
      if (event.target.closest?.('a, button, .character-popup')) {
        cursor.classList.remove('active');
      }
    });
  }

  const effectLayer = document.createElement('div');
  effectLayer.id = 'modernEffectLayer';
  document.body.prepend(effectLayer);

  const themes = {
    offline: ['✦', '#f0abfc', '#a855f7', 6200],
    cyberpunk: ['◆', '#00e5ff', '#ff00d4', 3800],
    pink: ['♥', '#f9a8d4', '#ec4899', 5000],
    green: ['0', '#86efac', '#22c55e', 3000],
    halloween: ['☠', '#facc15', '#f97316', 5600],
    ice: ['❄', '#bae6fd', '#38bdf8', 7600],
    red: ['♦', '#fda4af', '#ef4444', 4400]
  };

  function getActiveEffect() {
    if (body.classList.contains('theme-cyberpunk')) return themes.cyberpunk;
    if (body.classList.contains('theme-pink')) return themes.pink;
    if (body.classList.contains('theme-green')) return themes.green;
    if (body.classList.contains('theme-halloween')) return themes.halloween;
    if (body.classList.contains('theme-ice')) return themes.ice;
    if (body.classList.contains('theme-red')) return themes.red;
    return themes.offline;
  }

  function createParticle() {
    if (reduceMotion || effectLayer.childElementCount > 34) return;

    const [symbol, color, glow, speed] = getActiveEffect();
    const particle = document.createElement('span');

    particle.className = 'modern-particle';
    particle.textContent = symbol === '0'
      ? Math.random() > .5 ? '1' : '0'
      : symbol;

    particle.style.setProperty('--left', `${Math.random() * 100}%`);
    particle.style.setProperty('--color', color);
    particle.style.setProperty('--glow', glow);
    particle.style.setProperty('--size', `${10 + Math.random() * 13}px`);
    particle.style.setProperty('--drift', `${Math.random() * 150 - 75}px`);
    particle.style.setProperty('--speed', `${speed + Math.random() * 2600}ms`);

    effectLayer.appendChild(particle);
    particle.addEventListener('animationend', () => particle.remove(), { once: true });
  }

  let particleTimer;

  function refreshParticles() {
    clearInterval(particleTimer);
    effectLayer.replaceChildren();

    if (reduceMotion) return;

    for (let i = 0; i < 12; i++) {
      setTimeout(createParticle, i * 220);
    }

    particleTimer = setInterval(createParticle, 520);
  }

  function createRipple(event) {
    if (reduceMotion) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');

    ripple.className = 'modern-ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  }

  document.querySelectorAll('.btn, .support-link').forEach(button => {
    button.addEventListener('click', createRipple);
  });

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (reduceMotion || innerWidth < 700) return;

      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;

      button.style.setProperty('--button-x', `${x * 5}px`);
      button.style.setProperty('--button-y', `${y * 3 - 5}px`);
    });

    button.addEventListener('pointerleave', () => {
      button.style.removeProperty('--button-x');
      button.style.removeProperty('--button-y');
    });
  });

  new MutationObserver(refreshParticles).observe(body, {
    attributes: true,
    attributeFilter: ['class']
  });

  refreshParticles();
})();
