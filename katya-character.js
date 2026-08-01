(() => {
  const katyaStory = `
    Katya, Almanyanın Köln şehrinde mühendis bir anne ve babanın tek çocuğu olarak dünyaya geldi. Orta üst gelir seviyesine sahip, eğitimin ve disiplinin her şeyin önünde tutulduğu geleneksel bir Alman aile ortamında büyüdü. Evlerinde başarı bir tesadüf değil, planlı ve özverili çalışmanın doğal bir sonucu olarak görülürdü. Ailesi sevgisini hiçbir zaman notlarla ölçmese de, Katya küçük yaşlardan itibaren başarılı olmanın kendisinden beklenen doğal bir sorumluluk olduğunu hissederek yetişti. Kültürel açıdan zengin bu çevre, onun küçük yaşta güçlü bir sorumluluk bilinci geliştirmesini sağladı. Dışarıdan bakıldığında tipik bir Alman soğukkanlılığına, sakin ve son derece kontrollü bir duruşa sahiptir. İlk tanışmalarda mesafeli görünse de güvendiği insanlara karşı oldukça samimi, empati yeteneği yüksek ve esprili bir kişiliğe bürünür. Kriz anlarında paniğe kapılmaz, sakin kalarak pratik çözümler üretir. Farklı kültürlerde yaşamış olmanın getirdiği yüksek uyum sağlama yeteneği vardır. Mükemmeliyetçi yapısı yüzünden bazen kendine gereğinden fazla yüklenir. Sevdiklerine karşı aşırı korumacı yaklaşabilir. Disiplinli yapısı sayesinde okul hayatı boyunca dikkat çeken başarılı bir öğrencilik sürdürdü. Özellikle yabancı dillere, sosyolojiye ve farklı kültürlere büyük bir ilgi duyuyordu. Almanyadaki prestijli üniversite eğitimini dereceyle tamamladıktan sonra, alanında uzmanlaşmak ve vizyonunu genişletmek amacıyla Amerikada yüksek lisans yapma fırsatı elde etti. Kariyeri için mükemmel bir adım olan bu fırsatı hiç düşünmeden kabul ederek ABDye yerleşti. Amerikaya taşınması Katyanın hayatındaki en büyük dönüm noktası oldu. İlk zamanlarda tek amacı akademik başarısını tamamlayıp kurumsal dünyada güçlü bir kariyer inşa etmekti. Ancak zamanla farklı kültürlerden insanlarla tanıdıkça kendi yaşam tarzını sorgulamaya başladı. O güne kadar hayatını yalnızca başarı, diplomalar ve gelecek kaygısı üzerine kurmuşken insanların anı yaşamaya ve sosyal hayata ne kadar değer verdiğini fark etti. Yıllarca sürdürdüğü metropol hayatı, bitmeyen kariyer stresi ve büyük şehirlerin mekanik temposu bir süre sonra onda derin bir bıkkınlık yarattı. İhtiyacı olan şeyin tırmanmaya çalıştığı kurumsal merdivenler değil, tamamen farklı ve keşfedilmemiş bir yaşam olduğunu anladı. Büyük şehrin gürültüsünden ve kalıplaşmış hayatından sıkılan Katya, öteden beri hayalini kurduğu o sakin kasaba yaşamını araştırmaya başladı. Haritada karşısına çıkan, Los Santosun karmaşasından uzak, kendine has atmosferiyle dikkat çeken Sandy Shores kasabası tam da aradığı kırılma noktasıydı. Şehirdeki kurulu düzenini ve parlak kariyer fırsatlarını geride bırakıp hiç denemediği bir şeyi yapmak üzere rotasını bu kasabaya çevirdi. Çocukluğu disiplin ve başarı odağında geçen Katya, Amerika tecrübesi ve Sandy Shoresa geliş kararıyla birlikte mutluluğun yalnızca unvanlardan ibaret olmadığını kavradı. Bugün onun için en değerli şey samimi insan ilişkileri kurmak, hikayeler dinlemek ve hayatın plansız sürprizlerine kucak açmaktır.
  `;

  const style = document.createElement('style');

  style.textContent = `
    .katya-character-floating {
      top: calc(50% + 216px);
      border-color: var(--pink);
      box-shadow: 0 5px 0 var(--black), 0 0 16px rgba(240, 171, 252, .35);
    }

    .katya-character-floating::after {
      content: "KATYA";
      color: var(--pink);
      border-color: var(--pink);
    }

    .katya-character-floating:hover {
      box-shadow: 0 8px 0 var(--black), 0 0 22px rgba(240, 171, 252, .55);
    }

    .katya-character-overlay .character-popup {
      border-color: var(--pink);
      box-shadow: 0 0 0 4px var(--black), 0 0 35px rgba(240, 171, 252, .35);
    }

    .katya-character-overlay .character-header {
      color: var(--pink);
      border-bottom-color: rgba(240, 171, 252, .35);
    }

    .katya-character-overlay .character-image-placeholder {
      width: min(100%, 340px);
      height: 230px;
      margin: 0 auto 18px;
      display: grid;
      place-items: center;
      color: var(--pink);
      font: 11px 'Press Start 2P', monospace;
      text-align: center;
      background: rgba(5, 2, 8, .58);
      border: 2px dashed var(--pink);
      box-shadow: 0 4px 0 var(--black), 0 0 18px rgba(240, 171, 252, .25);
    }

    .katya-character-overlay .character-name {
      color: var(--pink);
    }

    .katya-character-overlay .character-info-item strong {
      color: var(--pink);
    }

    @media(max-width: 420px) {
      .katya-character-floating {
        top: auto;
        bottom: 198px;
        right: 14px;
        width: 50px;
        height: 50px;
      }

      .katya-character-overlay .character-image-placeholder {
        height: 190px;
      }
    }
  `;

  document.head.appendChild(style);

  const button = document.createElement('button');
  button.id = 'katyaCharacterButton';
  button.className = 'character-floating katya-character-floating';
  button.type = 'button';
  button.setAttribute('aria-label', 'Katya Lenz karakter hikayesini aç');
  button.textContent = '👤';

  const overlay = document.createElement('div');
  overlay.id = 'katyaCharacterOverlay';
  overlay.className = 'character-overlay katya-character-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <section class="character-popup" role="dialog" aria-modal="true" aria-labelledby="katyaCharacterTitle">
      <header class="character-header">
        <span>BBL RP // KARAKTER</span>
        <button class="character-close" type="button" aria-label="Karakter penceresini kapat">X</button>
      </header>

      <div class="character-body">
        <div class="character-image-placeholder">
          GÖRSEL EKLENECEK
        </div>

        <h2 class="character-name" id="katyaCharacterTitle">KATYA LENZ</h2>

        <div class="character-info">
          <div class="character-info-item">
            Sunucu
            <strong>BBL RP</strong>
          </div>

          <div class="character-info-item">
            Meslek
            <strong>Yok</strong>
          </div>

          <div class="character-info-item">
            Yaş
            <strong>30</strong>
          </div>

          <div class="character-info-item">
            Doğum yeri
            <strong>Köln, Almanya</strong>
          </div>
        </div>

        <div class="character-story">
          ${katyaStory}
        </div>
      </div>
    </section>
  `;

  document.body.append(button, overlay);

  const closeButton = overlay.querySelector('.character-close');

  function openKatyaCharacter() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-active');
  }

  function closeKatyaCharacter() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');

    if (!document.querySelector('.popup-overlay.open, .character-overlay.open')) {
      document.body.classList.remove('modal-active');
    }
  }

  button.addEventListener('click', openKatyaCharacter);
  closeButton.addEventListener('click', closeKatyaCharacter);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeKatyaCharacter();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeKatyaCharacter();
    }
  });
})();
