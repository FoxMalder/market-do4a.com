// import '@fancyapps/fancybox';
// import 'owl.carousel';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';

import svg4everybody from 'svg4everybody';

// import MreSlider from './modules/MreSlider';
import anime from 'animejs/lib/anime.es';

import {
  Swiper, Navigation, Pagination, Scrollbar, EffectFade, Autoplay, Mousewheel, Virtual,
} from 'swiper/dist/js/swiper.esm';

import Header from './modules/Header';
import Input from './modules/Input';
// import Parallax from './modules/Parallax';


Swiper.use([Navigation, Pagination, Scrollbar, EffectFade, Autoplay, Mousewheel, Virtual]);

window.Swiper = Swiper;
window.anime = anime;

svg4everybody();

function mainSlider() {
  const $controlItem = $('.hero-slider-control__item');

  function slideTo(count) {
    // $('.hero-slider__slide.last').removeClass('last');
    // $('.hero-slider__slide.active').addClass('last');

    $('.hero-slider-control__item').removeClass('active');
    $('.hero-slider-control__item').removeClass('animate');
    $(`.hero-slider-control__item[data-slide=${count}]`).addClass('active');

    $('.hero-slider__slide').removeClass('active');
    $('.hero-slider__slide').removeClass('animate');
    $(`.hero-slider__slide[data-slide=${count}]`).addClass('active');

    setTimeout(() => {
      $(`.hero-slider-control__item[data-slide=${count}]`).addClass('animate');
      $(`.hero-slider__slide[data-slide=${count}]`).addClass('animate');
    }, 1000);
  }

  $controlItem.on('click', function () {
    slideTo($(this).data('slide'));
  });
}


function initMain() {
  const createdForMobile = $(window).width() >= 768;

  const $brandsList = $('.brands__list');
  const $starSlider = document.getElementById('stars-slider');
  const $bestArticles = document.getElementById('best-articles');

  let starSlider;
  let articlesSlider;


  function initMobile() {
    if (starSlider) starSlider.destroy();
    if (articlesSlider) articlesSlider.destroy();

    $brandsList.addClass('owl-carousel');
    $($starSlider).addClass('owl-carousel');
    $($bestArticles).addClass('owl-carousel');

    $($bestArticles).owlCarousel({
      loop: false,
      items: 1,
      nav: false,
      dots: false,
      // center: true,
      margin: 10,
      autoWidth: true,
    });

    $($starSlider).owlCarousel({
      loop: true,
      items: 1,
      nav: false,
      dots: false,
      margin: 10,
      autoWidth: true,
      autoHeight: true,
      center: true,
    });

    $brandsList.owlCarousel({
      loop: false,
      items: 1,
      nav: false,
      dots: false,
      margin: 10,
      autoWidth: true,
      autoHeight: true,
      // center: true,
    });
  }

  function initDesktop() {
    $($bestArticles).trigger('destroy.owl.carousel');
    $($starSlider).trigger('destroy.owl.carousel');
    $brandsList.trigger('destroy.owl.carousel');
    $($bestArticles).removeClass('owl-carousel');
    $($starSlider).removeClass('owl-carousel');
    $brandsList.removeClass('owl-carousel');

    // starSlider = new MreSlider($starSlider);
    // articlesSlider = new MreSlider($bestArticles);
  }

  // function init() {
  //   if ($(window).width() < 768 && !createdForMobile) {
  //     initMobile();
  //     createdForMobile = true;
  //   } else if ($(window).width() >= 768 && createdForMobile) {
  //     initDesktop();
  //     createdForMobile = false;
  //   }
  // }

  // init();
  // $(window).on('resize', init);
  // mainSlider();


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
      '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n'
      + '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z"/>\n'
      + '</svg>',
      '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n'
      + '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z"/>\n'
      + '</svg>',
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


  // .add({
  //   targets: image,
  //   translateX: {
  //     value: 112,
  //     easing: 'linear',
  //   },
  //   duration: 11420,
  // });

  const heroSlider = new Swiper('.hero-slider', {
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    spaceBetween: 0,
    virtualTranslate: true,
    // effect: 'fade',
    runCallbacksOnInit: false,
    // watchSlidesVisibility: true,
    resistance: false,
    // loop: true,


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


    pagination: {
      el: '.hero-slider-control',
      clickable: true,
      bulletClass: 'hero-slider-control__item',
      bulletActiveClass: 'active',

      renderBullet(index, className) {
        return `
            <div class="${className}">
              <div class="hero-slider-control__title">Комбо-наборы</div>
              <div class="hero-slider-control__loader">
                <div class="hero-slider-control__loader-line"></div>
              </div>
            </div>`;
      },
    },

    on: {
      beforeInit() {
        const swiper = this;
        // if (swiper.params.effect !== 'fade') return;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
      },
      init() {
        const swiper = this;
        const { slides } = swiper;

        this.animateSlide = [];

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);

          const slide = $slideEl[0].querySelector('.hero-slider__slide');

          const leftLine = slide.querySelector('.hero-slider__left-line');
          const rightLine = slide.querySelector('.hero-slider__right-line');
          const image = slide.querySelector('.hero-slider__img');
          const text = slide.querySelector('.hero-slider__inner');

          // console.log(slide);

          const transformStyle = window.getComputedStyle(leftLine).transform;

          leftLine.style.transform = transformStyle;
          rightLine.style.transform = transformStyle;


          const slideAnimation = anime.timeline({
            autoplay: false,
            complete(anim) {
              anim.reset();
              // console.log(anim);
              if (!swiper.isEnd) {
                swiper.slideNext();
              } else {
                swiper.slideTo(0);
              }
            },
          });

          slideAnimation
            .add({
              targets: slide,
              translateX: {
                value: [-1579, 0],
                easing: 'spring(1, 100, 20, 0)',
              },
              opacity: {
                value: [0, 1],
                easing: 'cubicBezier(.25, .1, .25, 1)',
                duration: 400,
              },
            })
            .add({ // Заголовки
              targets: text,
              translateX: [-160, 0],
              scale: [1.3, 1],
              easing: 'spring(1, 100, 20, 0)',
            }, 200)
            .add({ // Правая полоска
              targets: rightLine,
              translateX: {
                value: [-670, 0],
                easing: 'spring(1, 100, 20, 0)',
              },
              opacity: {
                value: [0, 1],
                easing: 'cubicBezier(.25, .1, .25, 1)',
                duration: 300,
              },
            }, 300)
            .add({ // Левая полоска
              targets: leftLine,
              translateX: {
                value: [-670, 0],
                easing: 'spring(1, 100, 20, 0)',
              },
              opacity: {
                value: [0, 1],
                easing: 'cubicBezier(.25, .1, .25, 1)',
                duration: 300,
              },
            }, 400)
            .add({
              targets: image,
              translateX: {
                value: [-110, 0],
                easing: 'spring(1, 100, 20, 0)',
              },
              opacity: {
                value: [0, 1],
                easing: 'cubicBezier(.25, .1, .25, 1)',
                duration: 300,
              },
            }, 800)
            .add({
              targets: image,
              translateX: {
                value: 112,
                easing: 'linear',
              },
              duration: 11142,
            });

          // slideAnimation.finished.then(function () {
          //   console.log('конец', i)
          //   if (!swiper.isEnd) {
          //     swiper.slideNext();
          //   } else {
          //     swiper.slideTo(0);
          //   }
          // });

          // slideAnimation.add({
          //   targets: image,
          //   translateX: {
          //     value: 112,
          //     easing: 'linear',
          //   },
          //   duration: 11420,
          // });
          //
          // slideAnimation.finished.then(function () {
          //   console.log('Вот сейчас прям совсем все');
          //   if (!swiper.isEnd) {
          //     swiper.slideNext(swiper.params.speed, true, true);
          //     // swiper.emit('autoplay');
          //   } else if (!swiper.params.autoplay.stopOnLastSlide) {
          //     swiper.slideTo(0, swiper.params.speed, true, true);
          //     // swiper.emit('autoplay');
          //   }
          // });
          //
          swiper.animateSlide[i] = slideAnimation;
        }

        swiper.animateSlide[0].play();
      },
      // slideChange() {
      //   // console.log('slideChange');
      //   this.animateSlide[this.activeIndex].play();
      // },
      // transitionEnd() {
      //   console.log('transitionEnd');
      // },
      // progress(arg) {
      //   console.log(arg);
      // },
      slideChangeTransitionStart() {
        console.log('slideChangeTransitionStart', this.activeIndex);
        this.animateSlide[this.activeIndex].play();
      },
      // slideChangeTransitionEnd() {
      //   console.log('slideChangeTransitionEnd');
      // },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset = $slideEl[0].swiperSlideOffset;
          let tx = -offset;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }

          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

          // console.log(i, slideOpacity);

          // if (this.animateSlide) {
          //   this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
          // }

          $slideEl
          // .css({
          //   opacity: slideOpacity,
          // })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },

    },
  });

  function startHeroSlideAnimation(slide) {
    const leftLine = slide.querySelector('.hero-slider__left-line');
    const rightLine = slide.querySelector('.hero-slider__right-line');
    const image = slide.querySelector('.hero-slider__img');
    const text = slide.querySelector('.hero-slider__inner');

    const transformStyle = window.getComputedStyle(leftLine).transform;

    leftLine.style.transform = transformStyle;
    rightLine.style.transform = transformStyle;


    const animation = anime.timeline();

    animation
      .add({
        targets: slide,
        translateX: {
          value: [-1579, 0],
          easing: 'spring(1, 100, 20, 0)',
        },
        opacity: {
          value: [0, 1],
          easing: 'cubicBezier(.25, .1, .25, 1)',
          duration: 400,
        },
      })
      .add({ // Заголовки
        targets: text,
        translateX: [-160, 0],
        scale: [1.3, 1],
        easing: 'spring(1, 100, 20, 0)',
      }, 200)
      .add({ // Правая полоска
        targets: rightLine,
        translateX: {
          value: [-670, 0],
          easing: 'spring(1, 100, 20, 0)',
        },
        opacity: {
          value: [0, 1],
          easing: 'cubicBezier(.25, .1, .25, 1)',
          duration: 300,
        },
      }, 300)
      .add({ // Левая полоска
        targets: leftLine,
        translateX: {
          value: [-670, 0],
          easing: 'spring(1, 100, 20, 0)',
        },
        opacity: {
          value: [0, 1],
          easing: 'cubicBezier(.25, .1, .25, 1)',
          duration: 300,
        },
      }, 400)
      .add({
        targets: image,
        translateX: {
          value: [-110, 0],
          easing: 'spring(1, 100, 20, 0)',
        },
        opacity: {
          value: [0, 1],
          easing: 'cubicBezier(.25, .1, .25, 1)',
          duration: 300,
        },
      }, 800)
      .add({
        targets: image,
        translateX: {
          value: 112,
          easing: 'linear',
        },
        duration: 11420,
      });

    return animation;
  }

  new Swiper('#stars-slider', {
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
  new Swiper('.best-articles__slider', {
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
