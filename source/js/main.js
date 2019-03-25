import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  Swiper,
  Virtual,
  Scrollbar,
} from 'swiper/dist/js/swiper.esm';

import Header from './modules/Header';
import Input from './modules/Input';
import HeaderSlider from './modules/HeaderSlider';

import './modules/Maps';

Swiper.use([Navigation, Pagination, Scrollbar, EffectFade, Autoplay, Mousewheel, Virtual]);
Swiper.use([HeaderSlider]);

function initMain() {
  const mainHeroSliderEl = document.querySelector('.hero-slider');
  const mainStarSliderEl = document.querySelector('#stars-slider');
  const mainBestArticlesEl = document.querySelector('.best-articles__slider');
  const $mainSetSliderEl = $('.set-block__slider');

  $mainSetSliderEl.owlCarousel({
    loop: true,
    items: 1,
    center: true,
    autoWidth: true,
    // stagePadding: 10,
    nav: false,
    dots: false,
    margin: 10,
    navContainerClass: 'slider-nav',
    navText: [
      `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z"/>
      </svg>`,
      `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z"/>
      </svg>`,
    ],
    navClass: [
      'btn slider-nav__button slider-nav__button_left',
      'btn slider-nav__button slider-nav__button_right',
    ],
    responsive: {
      768: {
        autoWidth: false,
        center: false,
        margin: 0,
        nav: true,
      },
    },
  });


  const mainHeroSlider = new Swiper(mainHeroSliderEl, {
    touchEventsTarget: 'wrapper',
    effect: 'hero-slider',
    // runCallbacksOnInit: false,
    // watchSlidesVisibility: true,
    // resistance: false,
    // loop: true,
    // speed: 0,

    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    //   waitForTransition: false,
    // },

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


    // heroSliderEffect: {
    //   duration: 1000,
    // },
    pagination: {
      el: '.hero-slider-control',
      clickable: true,
      bulletClass: 'hero-slider-control__item',
      bulletActiveClass: 'active',

      renderBullet(index, className) {
        return `
            <div class="${className}">
              <div class="hero-slider-control__title">${this.slides[index].querySelector('.hero-slider__title').innerHTML}</div>
              <div class="hero-slider-control__loader">
                <div class="hero-slider-control__loader-line"></div>
              </div>
            </div>`;
      },
    },
  });
  const mainStarSlider = new Swiper(mainStarSliderEl, {
    slidesPerView: 'auto',
    freeMode: true,
    freeModeMomentum: false,
    // freeModeSticky: false,

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
        if (document.documentElement.clientWidth > 768) {
          arg = (arg / 90) + 1;
          if (arg < 0) arg = 0;
          if (arg > 1) arg = 1;

          document.querySelector('.stars__info').style.opacity = arg;
          this.el.querySelector('.slider__explanation_tablet').style.opacity = arg;
          this.el.querySelector('.slider__explanation_desktop').style.opacity = arg;
        }
      },

      touchStart() {
        this.scrollbar.el.classList.add('active');
      },
      scrollbarDragStart() {
        this.scrollbar.el.classList.add('active');
      },

      touchEnd() {
        this.scrollbar.el.classList.remove('active');
      },
      scrollbarDragEnd() {
        this.scrollbar.el.classList.remove('active');
      },
    },
  });
  const mainBestArticles = new Swiper(mainBestArticlesEl, {
    slidesPerView: 'auto',
    freeMode: true,
    freeModeMomentum: false,
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

    breakpointsInverse: true,
    breakpoints: {
      on: {
        setTranslate(arg) {
          if (document.documentElement.clientWidth > 768) {
            arg = (arg / 90) + 1;
            if (arg < 0) arg = 0;
            if (arg > 1) arg = 1;

            this.el.querySelector('.slider__explanation_tablet').style.opacity = arg;
            this.el.querySelector('.slider__explanation_desktop').style.opacity = arg;
          }
        },

        touchStart() {
          this.scrollbar.el.classList.add('active');
        },
        scrollbarDragStart() {
          this.scrollbar.el.classList.add('active');
        },

        touchEnd() {
          this.scrollbar.el.classList.remove('active');
        },
        scrollbarDragEnd() {
          this.scrollbar.el.classList.remove('active');
        },
      },
    },
  });
}

$(document).ready(() => {
  Header();
  Input();

  const bodyClass = document.body.classList;
  if (bodyClass.contains('main')) {
    initMain();
  }
});
