import {
  A11y, Mousewheel, Navigation, Swiper,
} from 'swiper/js/swiper.esm';


Swiper.use([Navigation, A11y, Mousewheel]);

export default function initCategorySlider() {
  new Swiper('.search-page-slider', {
    touchEventsTarget: 'wrapper',

    wrapperClass: 'slider__wrapper',
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

    slidesPerView: 'auto',
    watchSlidesVisibility: true,

    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumRatio: 0.4,
    freeModeMomentumVelocityRatio: 0.5,
    mousewheel: {
      // enabled: true,
      forceToAxis: true,
      invert: true,
      // releaseOnEdges: false,
    },
    navigation: {
      nextEl: '.slider-button_next',
      prevEl: '.slider-button_prev',
      disabledClass: 'slider-button_disabled',
      hiddenClass: 'slider-button_hidden',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
  });
}
