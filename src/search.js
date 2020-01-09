import ready from 'domready';

// import '@/App';
// import '@/common';
// import './simple';
// import Swiper from 'swiper';
import { Navigation, A11y, Swiper } from 'swiper/js/swiper.esm';
Swiper.use([Navigation, A11y]);

ready(() => {
  new Swiper('.search-page-slider', {
    // freeModeMomentum: false,
    // spaceBetween: 24,

    touchEventsTarget: 'wrapper',

    containerModifierClass: 'slider_',
    slideClass: 'slider__slide',
    slideBlankClass: 'slider__slide_invisible-blank',
    slideActiveClass: 'slider__slide_active',
    slideDuplicateActiveClass: 'slider__slide_duplicate-active',
    slideVisibleClass: 'slider__slide_visible',
    slideDuplicateClass: 'slider__slide_duplicate',
    slideNextClass: 'slider__slide_next',
    slideDuplicateNextClass: 'slider__slide_duplicate-next',
    slidePrevClass: 'slider__slide_prev',
    slideDuplicatePrevClass: 'slider__slide_duplicate-prev',
    wrapperClass: 'slider__wrapper',

    slidesPerView: 'auto',
    spaceBetween: 10,

    navigation: {
      nextEl: '.slider-button_next',
      prevEl: '.slider-button_prev',
      disabledClass: 'slider-button_disabled',
      hiddenClass: 'slider-button_hidden',
    },

    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 24,
      },
      1240: {
        spaceBetween: 24,
        slidesPerView: 4,
        // slidesPerGroup: 4,
      },
    },
  });
});
