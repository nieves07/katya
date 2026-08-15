(() => {
  'use strict';

  const heroImage = document.querySelector('.hero img');

  if (!heroImage) return;

  heroImage.classList.add('image-loading');

  const revealImage = () => {
    heroImage.classList.remove('image-loading');
    heroImage.classList.add('image-loaded');
  };

  if (heroImage.complete && heroImage.naturalWidth > 0) {
    revealImage();
  } else {
    heroImage.addEventListener('load', revealImage, { once: true });
    heroImage.addEventListener('error', revealImage, { once: true });
  }
})();
