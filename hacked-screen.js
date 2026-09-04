(() => {
  'use strict';

  let buffer = '';
  let hackedScreen = null;

  const style = document.createElement('style');

  style.textContent = `
    #hackedScreen {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      overflow: hidden; 
      background:
        radial-gradient(circle at center, rgba(255, 0, 68, .16), transparent 35%),
        linear-gradient(135deg, #050005, #16000c 50%, #020002);
      color: #ff174f;
      font-family: 'Press Start 2P', monospace;
      text-align: center;
      animation: hackedScreenIn .35s ease forwards;
    }

    #hackedScreen.open {
      display: flex;
    }

    #hackedScreen::before {
      content: "";
      position: absolute;
      inset: 0;
      opacity: .18;
      pointer-events: none;
      background:
        linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
      background-size: 6px 6px;
      animation: hackedScan 1.8s linear infinite;
    }

    .hacked-content {
      position: relative;
      z-index: 1;
      width: min(800px, calc(100% - 32px));
      padding: 38px 20px;
      border: 3px solid #ff174f;
      box-shadow:
        0 0 0 6px #050005,
        0 0 35px rgba(255, 23, 79, .8),
        inset 0 0 30px rgba(255, 23, 79, .15);
      background: rgba(10, 0, 5, .9);
    }

    .hacked-warning {
      margin-bottom: 24px;
      color: #fff;
      font: 16px 'VT323', monospace;
      letter-spacing: 4px;
      animation: hackedBlink 1s steps(1) infinite;
    }

    .hacked-title {
      margin: 0;
      color: #ff174f;
      font-size: clamp(28px, 8vw, 76px);
      line-height: 1.2;
      letter-spacing: 4px;
      text-shadow:
        4px 4px 0 #5b001b,
        0 0 12px #ff174f,
        0 0 32px #ff174f;
      animation: hackedGlitch 1.4s infinite;
    }

    .hacked-by {
      margin: 28px 0 0;
      color: #fff;
      font-size: clamp(14px, 3vw, 26px);
      letter-spacing: 3px;
      text-shadow: 0 0 12px #fff;
    }

    @keyframes hackedScreenIn {
      from {
        opacity: 0;
        transform: scale(1.04);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes hackedScan {
      from {
        transform: translateY(-20px);
      }

      to {
        transform: translateY(20px);
      }
    }

    @keyframes hackedBlink {
      0%, 45% {
        opacity: 1;
      }

      46%, 100% {
        opacity: .35;
      }
    }

    @keyframes hackedGlitch {
      0%, 88%, 100% {
        transform: translate(0);
      }

      90% {
        transform: translate(-4px, 2px);
      }

      92% {
        transform: translate(4px, -2px);
      }

      94% {
        transform: translate(-2px, 1px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #hackedScreen,
      #hackedScreen::before,
      .hacked-title,
      .hacked-warning {
        animation: none;
      }
    }
  `;

  document.head.appendChild(style);

  function createScreen() {
    hackedScreen = document.createElement('div');
    hackedScreen.id = 'hackedScreen';
    hackedScreen.setAttribute('role', 'dialog');
    hackedScreen.setAttribute('aria-label', 'Hacked ekranı');

    hackedScreen.innerHTML = `
      <div class="hacked-content">
        <div class="hacked-warning">
          ⚠ BU SİTE NİEVES TARAFINDAN DESTURLANMIŞTIR ⚠
        </div>
        <h1 class="hacked-title">HACKED</h1>
        <p class="hacked-by">HACKED BY NIEVES</p>
      </div>
    `;

    document.body.appendChild(hackedScreen);
  }

  function openScreen() {
    if (!hackedScreen) createScreen();

    hackedScreen.classList.add('open');
    document.body.classList.add('modal-active');
  }

  function closeScreen() {
    if (!hackedScreen) return;

    hackedScreen.classList.remove('open');

    if (!document.querySelector('.popup-overlay.open, .character-overlay.open')) {
      document.body.classList.remove('modal-active');
    }
  }

  document.addEventListener('keydown', event => {
    if (event.key.length !== 1) return;

    buffer = (buffer + event.key.toUpperCase()).slice(-5);

    if (buffer === 'KATYA') {
      closeScreen();
      buffer = '';
    }
  });

  createScreen();
  openScreen();
})();
