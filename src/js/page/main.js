// import Sticky from 'sticky-js';
// import 'owl.carousel';
import {
  // Autoplay,
  // EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  Swiper,
  Virtual,
  Scrollbar,
} from 'swiper/js/swiper.esm';

import HeaderSlider from '@/modules/HeaderSlider';
import YandexMaps from '@/modules/Maps';
import Parallax from '@/modules/Parallax';


Swiper.use([Navigation, Pagination, Scrollbar, Mousewheel, Virtual]);
Swiper.use([HeaderSlider]);


export default class MainPage {
  constructor() {
    MainPage.initHeroSlider();
    MainPage.initSetsSlider();

    if (document.documentElement.clientWidth >= 768) {
      [].forEach.call(document.querySelectorAll('.arnold'), (el) => {
        Parallax.add(el.querySelector('.arnold__bg'), { y: -0.08, x: 0 });
        Parallax.add(el.querySelector('.arnold__img'), { y: 0.08, x: 0 });
      });

      MainPage.initMaps();
      MainPage.initStarSlider();
      MainPage.initBestArticles();
    }
  }

  static initSetsSlider() {
    if (!document.querySelector('.set-block__slider')) {
      return;
    }

    import('owl.carousel').then(() => {
      // Слайдеры с содержимым наборов
      $('.set-block__slider').owlCarousel({
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
    });
  }

  static initMaps() {
    const mapEl = document.querySelector('#map');
    if (!mapEl) {
      return;
    }
    // import('../modules/Maps').then((module) => {
    //   const YandexMaps = module.default;
    //   new YandexMaps(mapEl, window.app);
    // });

    new YandexMaps(mapEl, window.app);
  }


  static initBestArticles() {
    const mainBestArticlesEl = document.querySelector('.best-articles__slider');
    if (!mainBestArticlesEl) {
      return;
    }

    new Swiper(mainBestArticlesEl, {
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
            const opacity = Math.max(Math.min((arg / 90) + 1, 1), 0);
            this.el.querySelector('.slider__explanation_tablet').style.opacity = opacity;
            this.el.querySelector('.slider__explanation_desktop').style.opacity = opacity;
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

  static initStarSlider() {
    const mainStarSliderEl = document.querySelector('#stars-slider');
    if (!mainStarSliderEl) {
      return;
    }

    import('sticky-js')
      .then((module) => {
        const Sticky = module.default;

        new Sticky('#stars-slider .slider__controls', {
          marginTop: 150,
          stickyClass: 'is-sticky',
        });
      });


    new Swiper(mainStarSliderEl, {
      slidesPerView: 'auto',
      freeMode: true,
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
          document.querySelector('.stars__info').style.opacity = opacity;
          this.el.querySelector('.slider__explanation_tablet').style.opacity = opacity;
          this.el.querySelector('.slider__explanation_desktop').style.opacity = opacity;

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
  }

  static initHeroSlider() {
    const heroSliderEl = document.querySelector('.hero-slider');

    if (!heroSliderEl || heroSliderEl.querySelectorAll('.slider__slide').length < 2) {
      return;
    }

    heroSliderEl.classList.add('slider');
    const heroSlider = new Swiper(heroSliderEl, {
      init: false,
      touchEventsTarget: 'wrapper',
      effect: 'hero-slider',

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

      pagination: {
        el: '.hero-slider-control',
        clickable: true,
        bulletClass: 'hero-slider-control__item',
        bulletActiveClass: 'active',

        renderBullet(index, className) {
          return `
            <div class="${className}">
              <div class="hero-slider-control__title">${this.slides[index].querySelector('.hero-slider__title').textContent}</div>
              <div class="hero-slider-control__loader">
                <div class="hero-slider-control__loader-line"></div>
              </div>
            </div>`;
        },
      },
    });
    heroSlider.pagination.render();

    const onLoad = () => {
      window.removeEventListener('load', onLoad);

      heroSlider.init();
    };

    window.addEventListener('load', onLoad);
  }
}
