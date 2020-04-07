import {
  Lazy, Mousewheel, Navigation, Scrollbar, Swiper,
} from 'swiper/js/swiper.esm';


Swiper.use([Navigation, Scrollbar, Mousewheel, Lazy]);

export default function initBestArticles(selector) {
  return new Swiper(selector, {
    slidesPerView: 'auto',
    freeMode: true,
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

    mousewheel: {
      forceToAxis: true,
      invert: true,
    },

    scrollbar: {
      el: '.slider-scrollbar',
      hide: false,
      draggable: true,
      dragSize: 80,
      dragClass: 'slider-scrollbar-track',
      snapOnRelease: false,
    },

    on: {
      setTranslate(arg) {
        this.$el
          .find('.slider-scrollbar-note')
          .css('opacity', Math.max(Math.min((arg / 90) + 1, 1), 0));
      },
    },
  });
}
