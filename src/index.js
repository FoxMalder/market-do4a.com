import ready from 'domready';

import App from '@/App';

import {
  initBestArticles,
  initHeroSlider,
  initSetsSlider,
  initStarSlider,
} from '@/components/sliders';
import Parallax from '@/modules/Parallax';


ready(() => {
  App.init();

  initHeroSlider('.hero-slider');
  initSetsSlider('.set-block__slider');
  initStarSlider({
    slider: '#stars-slider',
    info: '.stars__info',
    control: '#stars-slider .slider__controls',
  });

  if (document.documentElement.clientWidth >= 768) {
    [].forEach.call(document.querySelectorAll('.arnold'), (el) => {
      Parallax.add(el.querySelector('.arnold__bg'), { y: -0.08, x: 0 });
      Parallax.add(el.querySelector('.arnold__img'), { y: 0.08, x: 0 });
    });

    initBestArticles('.best-articles__slider');

    import('@/modules/Maps')
      .then(({ default: YandexMaps }) => new YandexMaps('#map'));
  }
});
