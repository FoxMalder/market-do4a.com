import { Lazy, Mousewheel, Navigation, Scrollbar, Swiper } from 'swiper/js/swiper.esm';
import $$ from 'dom7';


Swiper.use([Navigation, Scrollbar, Mousewheel, Lazy]);

export default async function initStarSlider({ slider, info, control }) {
  const sliderEl = document.querySelector(slider);

  if (!sliderEl) {
    return;
  }

  if (document.documentElement.clientWidth < 768) {
    [].forEach.call(sliderEl.querySelectorAll('.swiper-lazy'), (lazyImage) => {
      lazyImage.classList.remove('swiper-lazy');
      lazyImage.classList.add('lazyload');
    });

    return;
  }

  new Swiper(sliderEl, {
    slidesPerView: 'auto',
    freeMode: true,

    watchSlidesVisibility: true,
    lazy: true,
    // freeModeMomentum: false,
    // freeModeSticky: false,
    runCallbacksOnInit: false,
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
      releaseOnEdges: true,
    },

    scrollbar: {
      el: '.slider__scrollbar',
      hide: false,
      draggable: true,
      dragSize: 80,
      dragClass: 'slider__track',
      snapOnRelease: false,
    },

    on: {
      setTranslate(arg) {
        const opacity = Math.max(Math.min((arg / 90) + 1, 1), 0);

        this.$el
          .find('.slider__explanation')
          .css('opacity', opacity);

        $$(info)
          .css('opacity', opacity);

        if (this.scrollbar.el) {
          if (arg) {
            this.scrollbar.el.classList.add('active');
          } else {
            this.scrollbar.el.classList.remove('active');
          }
        }
      },
    },
  });

  if (control) {
    const { default: Sticky } = await import('sticky-js');

    new Sticky(control, {
      marginTop: 150,
      stickyClass: 'is-sticky',
    });
  }
}
