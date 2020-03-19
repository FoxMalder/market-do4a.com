import {
  Swiper,
  Mousewheel,
  Navigation,
  Pagination,
  Virtual,
  Scrollbar,
  Lazy,
} from 'swiper/js/swiper.esm';
import $$ from 'dom7';


import YandexMaps from '@/modules/Maps';
import Parallax from '@/modules/Parallax';


Swiper.use([Navigation, Scrollbar, Mousewheel, Lazy]);


export default class MainPage {
  constructor() {
    MainPage.initHeroSlider();
    MainPage.initSetsSlider();
    MainPage.initStarSlider('#stars-slider', '.stars__info');

    if (document.documentElement.clientWidth >= 768) {
      [].forEach.call(document.querySelectorAll('.arnold'), (el) => {
        Parallax.add(el.querySelector('.arnold__bg'), { y: -0.08, x: 0 });
        Parallax.add(el.querySelector('.arnold__img'), { y: 0.08, x: 0 });
      });

      MainPage.initMaps();
      MainPage.initBestArticles();
    }
  }

  static initSetsSlider() {
    Array.prototype.forEach.call(document.querySelectorAll('.set-block__slider'), (el) => {
      const buttonPrev = document.createElement('button');
      buttonPrev.className = 'btn btn-red slider-button slider-button_prev';
      buttonPrev.innerHTML = '<svg viewBox="0 0 9 6" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9 3.26664L4.2 3.26664L4.2 5.17604L0.2 2.86664L4.2 0.557238L4.2 2.46664L9 2.46664L9 3.26664Z" /></svg>';

      el.appendChild(buttonPrev);

      const buttonNext = document.createElement('button');
      buttonNext.className = 'btn btn-red slider-button slider-button_next';
      buttonNext.innerHTML = '<svg viewBox="0 0 9 6" focusable="false" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M-1.66925e-07 2.73336L4.8 2.73336L4.8 0.82396L8.8 3.13336L4.8 5.44276L4.8 3.53336L-2.36863e-07 3.53336L-1.66925e-07 2.73336Z" /></svg>';

      el.appendChild(buttonNext);

      new Swiper(el.querySelector('.slider'), {
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
        loopedSlides: 6,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,

        navigation: {
          nextEl: buttonNext,
          prevEl: buttonPrev,
          disabledClass: 'slider-button_disabled',
          hiddenClass: 'slider-button_hidden',
        },

        a11y: {
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
        },

        breakpoints: {
          768: {
            loopedSlides: null,
            slidesPerView: 1,
            spaceBetween: 0,
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

    new YandexMaps(mapEl, window.app);
  }

  static initBestArticles() {
    new Swiper('.best-articles__slider', {
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

  static initStarSlider(el, infoEl) {
    const mainStarSliderEl = document.querySelector(el);
    if (!mainStarSliderEl) return;

    // TODO: Обновить шаблон в cms и убрать
    // mainStarSliderEl.classList.add('slider_container');


    if (document.documentElement.clientWidth >= 768) {
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

            $$(infoEl)
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
    }
  }

  static initHeroSlider() {
    const heroSliderEl = document.querySelector('.hero-slider');

    if (!heroSliderEl || heroSliderEl.querySelectorAll('.slider__slide').length < 2) {
      return;
    }
    heroSliderEl.classList.add('slider');

    import('@/modules/HeaderSlider')
      .then((module) => {
        const HeaderSlider = module.default;

        Swiper.use([Pagination, HeaderSlider, Virtual]);


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

        heroSlider.init();
      });
  }
}
