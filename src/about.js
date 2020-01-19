import ready from 'domready';
import Vue from 'vue';

import {
  Swiper,
  Mousewheel,
  Scrollbar,
} from 'swiper/js/swiper.esm';
import AOS from 'aos';

import 'aos/dist/aos.css';
import './scss/about-page.scss';

import './simple';

import AboutCity from '@/components/about/AboutCities.vue';
import store from '@/store';


Swiper.use([Scrollbar, Mousewheel]);


ready(() => {
  new Vue({
    store,
    render: (h) => h(AboutCity),
  }).$mount('#aboutCity');


  AOS.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true,
  });


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

      // simulateTouch: true,

      mousewheel: {
        // enabled: true,
        forceToAxis: true,
        invert: true,
        // releaseOnEdges: false,
      },
      // grabCursor: true,

      // preventClicks: false,
      // freeModeSticky: false,
      // watchSlidesVisibility: true,

      scrollbar: {
        el: '.slider-scrollbar',
        hide: false,
        draggable: true,
        dragSize: 80,
        dragClass: 'slider-scrollbar-track',
        snapOnRelease: false,
      },

      // breakpointsInverse: true,
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
