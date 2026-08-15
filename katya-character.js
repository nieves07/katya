(() => {
  'use strict';

  document.getElementById('katyaCharacterButton')?.remove();
  document.getElementById('katyaCharacterOverlay')?.remove();
  document.getElementById('jaleCharacterButton')?.remove();
  document.getElementById('jaleCharacterOverlay')?.remove();

  const style = document.createElement('style');

  style.textContent = `
    .character-floating {
      position: fixed !important;
      z-index: 11 !important;
      right: 18px !important;
      width: 54px;
      height: 54px;
      padding: 3px;
      display: grid;
      place-items: center;
      overflow: hidden;
      background: rgba(25,12,48,.94);
      border: 2px solid var(--pink);
      outline: 2px solid var(--black);
      box-shadow: 0 5px 0 var(--black), 0 0 16px rgba(240,171,252,.35);
      cursor: none !important;
      transition: .2s ease;
    }

    .character-floating img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }

    .character-floating:hover {
      transform: translateY(-5px) scale(1.08);
      border-radius: 50%;
      box-shadow: 0 8px 0 var(--black), 0 0 22px rgba(240,171,252,.55);
    }

    #katyaCharacterButton {
      top: calc(50% + 216px) !important;
      border-color: var(--pink);
    }

    #jaleCharacterButton {
      top: calc(50% + 144px) !important;
      border-color: var(--green);
    }

    .character-floating::after {
      position: absolute;
      right: 62px;
      white-space: nowrap;
      padding: 5px 7px;
      font: 10px 'Press Start 2P', monospace;
      background: rgba(13,7,24,.96);
      opacity: 0;
      pointer-events: none;
      transition: opacity .2s ease;
    }

    #katyaCharacterButton::after {
      content: "KATYA";
      color: var(--pink);
      border: 1px solid var(--pink);
    }

    #jaleCharacterButton::after {
      content: "JALE";
      color: var(--green);
      border: 1px solid var(--green);
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
      background: rgba(3,1,8,.82);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
    }

    .character-overlay.open {
      display: flex;
    }

    .character-popup {
      width: min(620px, 100%);
      max-height: 90vh;
      overflow-y: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      color: var(--text);
      background: linear-gradient(145deg, #21113e, #0d0718);
      border: 3px solid var(--pink);
      box-shadow: 0 0 0 4px var(--black);
      animation: characterPopupIn .35s ease forwards;
    }

    .character-popup::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }

    .jale-character-overlay .character-popup {
      border-color: var(--green);
    }

    @keyframes characterPopupIn {
      from {
        opacity: 0;
        transform: translateY(18px) scale(.94);
      }
      to {
        opacity: 1;
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

    .jale-character-overlay .character-header {
      color: var(--green);
      border-bottom-color: rgba(83,252,24,.35);
    }

    .character-close {
      padding: 3px 7px;
      color: var(--green);
      font-size: 18px;
      cursor: none !important;
      background: transparent;
      border: 1px solid var(--green);
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

    .jale-character-overlay .character-image {
      border-color: var(--green);
    }

    .character-name {
      margin: 0 0 16px;
      color: var(--pink);
      font: 18px 'Press Start 2P', monospace;
      text-align: center;
    }

    .jale-character-overlay .character-name {
      color: var(--green);
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

    .jale-character-overlay .character-info-item strong {
      color: var(--green);
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

    .jale-character-overlay .character-story h3 {
      color: var(--green);
    }

    .character-story p {
      margin: 0 0 12px;
    }

    @media(max-width: 420px) {
      .character-floating {
        right: 14px !important;
        width: 50px;
        height: 50px;
      }

      #katyaCharacterButton {
        top: auto !important;
        bottom: 198px !important;
      }

      #jaleCharacterButton {
        top: auto !important;
        bottom: 138px !important;
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
  `;

  document.head.appendChild(style);

  const katyaStory = [
    ['Ailesi ve Çocukluğu', 'Katya, Almanyanın Köln şehrinde mühendis bir anne ve babanın tek çocuğu olarak dünyaya geldi. Orta üst gelir seviyesine sahip, eğitimin ve disiplinin ön planda tutulduğu geleneksel bir Alman aile ortamında büyüdü. Küçük yaşlardan itibaren sorumluluk sahibi ve çalışkan biri olarak yetiştirildi.'],
    ['Eğitim Hayatı', 'Disiplinli yapısı sayesinde okul hayatı boyunca başarılı bir öğrencilik sürdürdü. Özellikle yabancı dillere, sosyolojiye ve farklı kültürlere büyük ilgi duyuyordu. Almanyadaki üniversite eğitimini dereceyle tamamladıktan sonra Amerikada yüksek lisans yapma fırsatı elde etti.'],
    ['Amerika Yılları', 'Amerikaya taşınması Katyanın hayatındaki en büyük dönüm noktalarından biri oldu. Farklı kültürlerden insanlarla tanıştı ve hayatını yalnızca başarı, diploma ve kariyer üzerine kurmaması gerektiğini fark etti.'],
    ['Sandy Shores', 'Metropol hayatının stresinden sıkılan Katya, Los Santosun karmaşasından uzak Sandy Shores kasabasına yerleşmeye karar verdi. Kurulu düzenini ve kariyer fırsatlarını geride bırakıp tamamen yeni bir yaşam kurmaya başladı.'],
    ['Katyanın Karakteri', 'Dışarıdan sakin, kontrollü ve mesafeli görünür. Güvendiği insanlara karşı samimi, empati yeteneği yüksek ve esprilidir. Kriz anlarında paniğe kapılmaz; pratik çözümler üretir. Mükemmeliyetçi yapısı nedeniyle zaman zaman kendine fazla yüklenebilir.']
  ];

  const jaleStory = [
    ['Ailesi ve Çocukluğu', 'Jale, İstanbulda mühendis bir anne ve babanın çocuğu olarak dünyaya geldi. Eğitimin önemsendiği, kültürel açıdan zengin ve disiplinli bir aile ortamında büyüdü.'],
    ['Eğitim Hayatı', 'Okul hayatı boyunca başarılı bir öğrenciydi. Özellikle yabancı dillere ve sosyal bilimlere ilgi duydu. Üniversite eğitimini yüksek bir dereceyle tamamladıktan sonra Almanyada yüksek lisans yaptı.'],
    ['Almanya Yılları', 'Almanyaya taşınması Jalenin hayatındaki en büyük dönüm noktalarından biri oldu. Farklı kültürlerden insanlarla tanıştı ve hayatını yalnızca kariyer üzerine kurmaması gerektiğini fark etti.'],
    ['Türkiye Yılları', 'Türkiyeye döndükten sonra kurumsal hayata adım attı. İyi bir kariyere sahip olmasına rağmen zamanla bu düzenin beklediği mutluluğu vermediğini fark etti ve yeni bir başlangıç yapmak için Los Santosa gitmeye karar verdi.'],
    ['Jalenin Karakteri', 'Jale dışarıdan soğuk, sakin ve kontrollü görünür. Güvendiği insanlara karşı samimi ve esprilidir. Sorunları konuşarak çözmeye çalışır. Mükemmeliyetçi yapısı nedeniyle zaman zaman kendine fazla yüklenebilir.'],
    ['Hobi ve İlgi Alanları', 'Kalabalık kafelerde oturup insanları gözlemlemeyi, farklı şehirleri keşfetmeyi ve yeni restoranlar denemeyi sever. Kahve konusunda seçicidir; kitap okumaktan ve dünya mutfaklarını keşfetmekten hoşlanır.']
  ];

  const characters = [
    {
      id: 'katya',
      name: 'KATYA LENZ',
      buttonClass: 'katya-character-floating',
      header: 'BBL RP // KARAKTER',
      image: 'https://i.ibb.co/d01FryQQ/dfhg.png',
      imageAlt: 'Katya Lenz karakter görseli',
      server: 'BBL RP',
      birthplace: 'Köln, Almanya',
      story: katyaStory
    },
    {
      id: 'jale',
      name: 'JALE SARAL',
      buttonClass: 'jale-character-floating',
      header: 'KNGLRP // KARAKTER',
      image: 'https://i.ibb.co/5xjy63Vx/36c54bd6-3ef3-4f3b-9987-8c269777761b.jpg',
      imageAlt: 'Jale Saral karakter görseli',
      server: 'KNGLRP',
      birthplace: 'İstanbul, Türkiye',
      story: jaleStory
    }
  ];

  function createCharacter(character) {
    const button = document.createElement('button');

    button.id = `${character.id}CharacterButton`;
    button.className = `character-floating ${character.buttonClass}`;
    button.type = 'button';
    button.setAttribute('aria-label', `${character.name} karakter hikayesini aç`);
    button.innerHTML = `
      <img
        src="${character.image}"
        alt="${character.name} görseli"
        draggable="false"
      >
    `;

    const overlay = document.createElement('div');

    overlay.id = `${character.id}CharacterOverlay`;
    overlay.className = `character-overlay ${character.id}-character-overlay`;
    overlay.setAttribute('aria-hidden', 'true');

    const storyHtml = character.story.map(([title, text]) => `
      <h3>${title}</h3>
      <p>${text}</p>
    `).join('');

    overlay.innerHTML = `
      <section class="character-popup" role="dialog" aria-modal="true">
        <header class="character-header">
          <span>${character.header}</span>
          <button class="character-close" type="button" aria-label="Pencereyi kapat">X</button>
        </header>

        <div class="character-body">
          <img
            class="character-image"
            src="${character.image}"
            alt="${character.imageAlt}"
            draggable="false"
          >

          <h2 class="character-name">${character.name}</h2>

          <div class="character-info">
            <div class="character-info-item">Sunucu<strong>${character.server}</strong></div>
            <div class="character-info-item">Meslek<strong>Yok</strong></div>
            <div class="character-info-item">Yaş<strong>30</strong></div>
            <div class="character-info-item">Doğum yeri<strong>${character.birthplace}</strong></div>
          </div>

          <div class="character-story">${storyHtml}</div>
        </div>
      </section>
    `;

    document.body.append(button, overlay);

    const closeButton = overlay.querySelector('.character-close');

    function openCharacter() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-active');
    }

    function closeCharacter() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');

      if (!document.querySelector('.popup-overlay.open, .character-overlay.open')) {
        document.body.classList.remove('modal-active');
      }
    }

    button.addEventListener('click', openCharacter);
    closeButton.addEventListener('click', closeCharacter);

    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeCharacter();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && overlay.classList.contains('open')) {
        closeCharacter();
      }
    });
  }

  characters.forEach(createCharacter);
})();
