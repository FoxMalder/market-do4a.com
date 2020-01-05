import {
  Mousewheel,
  Swiper,
  Scrollbar,
} from 'swiper/js/swiper.esm';
import ready from 'domready';

// import '@/App';
// import '@/common';
// import './simple';


Swiper.use([Scrollbar, Mousewheel]);


ready(() => {
  if (document.documentElement.clientWidth > 1240) {
    new Swiper(document.querySelector('.a-history-slider'), {
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
        // releaseOnEdges: true,
      },
      grabCursor: true,

      scrollbar: {
        el: '.slider__scrollbar',
        hide: false,
        draggable: true,
        dragSize: 80,
        dragClass: 'slider__track',
        snapOnRelease: false,
      },

      breakpointsInverse: true,
      // breakpoints: {
      //   on: {
      //     setTranslate(arg) {
      //       const opacity = Math.max(Math.min((arg / 90) + 1, 1), 0);
      //       this.el.querySelector('.slider__explanation_tablet').style.opacity = opacity;
      //       this.el.querySelector('.slider__explanation_desktop').style.opacity = opacity;
      //     },
      //
      //     touchStart() {
      //       this.scrollbar.el.classList.add('active');
      //     },
      //     scrollbarDragStart() {
      //       this.scrollbar.el.classList.add('active');
      //     },
      //
      //     touchEnd() {
      //       this.scrollbar.el.classList.remove('active');
      //     },
      //     scrollbarDragEnd() {
      //       this.scrollbar.el.classList.remove('active');
      //     },
      //   },
      // },
    });
  }

});
