(() => {
  const oldButton = document.getElementById('jaleCharacterButton');
  const oldOverlay = document.getElementById('jaleCharacterOverlay');

  oldButton?.remove();
  oldOverlay?.remove();

  const style = document.createElement('style');

  style.textContent = `
    #jaleCharacterButton {
      position: fixed !important;
      z-index: 10 !important;
      top: calc(50% + 144px) !important;
      right: 18px !important;
      display: grid !important;
    }

    #katyaCharacterButton {
      position: fixed !important;
      z-index: 11 !important;
      top: calc(50% + 216px) !important;
      right: 18px !important;
      display: grid !important;
    }

    .jale-character-overlay .character-popup {
      border-color: var(--green);
    }

    .jale-character-overlay .character-header {
      color: var(--green);
      border-bottom-color: rgba(83, 252, 24, .35);
    }

    .jale-character-overlay .character-image {
      border-color: var(--green);
    }

    @media(max-width: 420px) {
      #jaleCharacterButton {
        top: auto !important;
        bottom: 138px !important;
        right: 14px !important;
        width: 50px;
        height: 50px;
      }

      #katyaCharacterButton {
        top: auto !important;
        bottom: 198px !important;
        right: 14px !important;
        width: 50px;
        height: 50px;
      }
    }
  `;

  document.head.appendChild(style);

  const story = [
    ['Ailesi ve Çocukluğu', 'Jale, İstanbulda mühendis bir anne ve babanın çocuğu olarak dünyaya geldi. Orta ve üst gelir seviyesine sahip ve eğitimin önemsendiği bir aile ortamında büyüdü. Küçük yaşlardan itibaren iyi bir eğitim aldı ve kültürel açıdan zengin bir çevrede yetişti. Evlerinde başarı tesadüf değil, disiplinli çalışmanın doğal sonucu olarak görülürdü. Ailesi ona hiçbir zaman sevgisini başarıyla ölçmese de, Jale başarılı olmanın kendisinden beklenen doğal bir sorumluluk olduğunu hissederek büyüdü.'],
    ['Eğitim Hayatı', 'Jale, okul hayatı boyunca başarılı bir öğrenciydi. Özellikle yabancı dillere ve sosyal bilimlere ilgi duyuyordu. Üniversite eğitimini yüksek bir dereceyle tamamladıktan sonra Almanyada yüksek lisans yapma fırsatı elde etti. Bu fırsatı hem akademik hem de kişisel gelişimi için önemli bir adım olarak gördü ve hiç düşünmeden kabul etti.'],
    ['Almanya Yılları', 'Almanyaya taşınması, Jalenin hayatındaki en büyük dönüm noktalarından biri oldu. Farklı ülkelerden insanlarla tanıştı, farklı kültürleri yakından tanıdı ve kendi yaşam tarzını sorgulamaya başladı. Daha önce hayatını başarı, diploma ve kariyer üzerine kurarken, Almanyada insanların sosyal yaşama verdiği değeri gördü. Yüksek lisansını tamamladıktan sonra bir süre daha Almanyada yaşadı. Ancak ailesine ve ülkesine duyduğu özlem ağır basınca Türkiyeye dönmeye karar verdi.'],
    ['Türkiye Yılları', 'Türkiyeye döndükten sonra kurumsal hayata adım attı ve kendi alanında çalışmaya başladı. İyi bir işi, düzenli bir hayatı ve başarılı bir kariyeri vardı. Ancak zamanla bu düzenin ona beklediği mutluluğu vermediğini fark etti. Yeni insanlar tanımayı, farklı kültürleri keşfetmeyi ve hayatın sunduğu deneyimleri yaşamayı özledi. Sahip olduğu düzeni geride bırakarak yeni bir başlangıç yapmak amacıyla Los Santosa gitmeye karar verdi.'],
    ['Jalenin Karakteri', 'Jale dışarıdan bakıldığında soğuk ama sakin, kendinden emin ve kontrollü biri gibi görünür. İlk tanışmalarda mesafeli olsa da güven duyduğu insanlara karşı samimi ve esprilidir. Yeni tanıştığı insanlara önyargıyla yaklaşmaz. Plan yapmayı sever ancak hayatın her zaman planlandığı gibi gitmediğini öğrendikten sonra daha spontane yaşamaya başlamıştır. Sorunları konuşarak çözmeye çalışır ve insan ilişkilerinde empatiye önem verir.'],
    ['Güçlü ve Zayıf Yönleri', 'Karşılaştığı sorunlarda paniğe kapılmak yerine sakin kalmayı tercih eder. İnsanlarla kolay iletişim kurar ve farklı ortamlara hızlı uyum sağlar. Farklı bakış açılarını anlamakta zorlanmaz fakat mükemmeliyetçi yapısı nedeniyle zaman zaman kendine gereğinden fazla yüklenir ve değer verdiği insanlara karşı fazla korumacı davranabilir.'],
    ['Hobi ve İlgi Alanları', 'Jale kalabalık kafelerde oturarak insanları gözlemlemeyi sever. Farklı şehirleri keşfetmek, yeni restoranlar denemek ve yerel kültürleri tanımak onun için büyük bir keyiftir. Kahve konusunda seçicidir. Kitap okumayı, yeni tarifler denemeyi ve dünya mutfaklarını keşfetmeyi sever.'],
    ['Jalenin Bakış Açısı', 'Jale zaman içinde mutluluğun yalnızca kariyer veya maddi başarıyla ölçülemeyeceğini öğrendi. Onun için bugün en değerli şey yeni insanlar tanımak, farklı hayatlara dokunmak ve unutulmayacak anılar biriktirmektir. Los Santosa gelmesindeki amacı yeni bir hayat kurmak, kendi sınırlarını yeniden keşfetmek ve yaşadığı deneyimlerle kendisini geliştirmektir.']
  ];

  const button = document.createElement('button');

  button.id = 'jaleCharacterButton';
  button.className = 'character-floating jale-character-floating';
  button.type = 'button';
  button.textContent = '👤';
  button.setAttribute('aria-label', 'Jale Saral karakter hikayesini aç');

  const overlay = document.createElement('div');

  overlay.id = 'jaleCharacterOverlay';
  overlay.className = 'character-overlay jale-character-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const storyHtml = story.map(([title, text]) => `
    <h3>${title}</h3>
    <p>${text}</p>
  `).join('');

  overlay.innerHTML = `
    <section class="character-popup" role="dialog" aria-modal="true" aria-labelledby="jaleCharacterTitle">
      <header class="character-header">
        <span>KNGLRP // KARAKTER</span>
        <button class="character-close" type="button" aria-label="Pencereyi kapat">X</button>
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
            <strong>Yok</strong>
          </div>

          <div class="character-info-item">
            Yaş
            <strong>30</strong>
          </div>

          <div class="character-info-item">
            Doğum yeri
            <strong>İstanbul, Türkiye</strong>
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
    if (event.target === overlay) {
      closeCharacter();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeCharacter();
    }
  });
})(); 
