import anime from 'animejs/lib/anime.es';
import Utils from '../utils/utils';


function startHeroSlideAnimation(slide, func) {
  const leftLine = slide.querySelector('.hero-slider__left-line');
  const rightLine = slide.querySelector('.hero-slider__right-line');
  const image = slide.querySelector('.hero-slider__img');
  const text = slide.querySelector('.hero-slider__inner');

  const transformStyle = window.getComputedStyle(leftLine).transform;

  leftLine.style.transform = transformStyle;
  rightLine.style.transform = transformStyle;


  const animation = anime.timeline({
    autoplay: false,
    complete: func,
  });

  animation
    .add({
      targets: slide,
      translateX: {
        // value: [-1579, 0],
        value: ['-100%', 0],
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
    }, 800);

  // animation
  //   .add({
  //     targets: image,
  //     translateX: {
  //       value: 112,
  //       easing: 'linear',
  //     },
  //     duration: 11420,
  //   });

  return animation;
}

const HeroSliderEffect = {
  init() {
    // const animations = [];
    const swiper = this;
    const { slides } = swiper;

    swiper.heroSliderEffect.animationsArray = Array.from(slides).map(el => ({
      start: startHeroSlideAnimation(el, () => swiper.emit('transitionEnd')),
      second: anime({
        autoplay: false,
        duration: swiper.params.heroSliderEffect.duration,
        easing: 'easeInOutQuad',
        targets: el.querySelector('.hero-slider__img'),
        translateX: [0, '5%'],
        complete() {
          // console.log('sdfsdf');
          swiper.slideNext();
        },
      }),
    }));

    swiper.heroSliderEffect.animationsArray[0].start.play();
  },
  setTranslate(translate) {
    console.log(`setTranslate, active:${this.activeIndex}, prev: ${this.previousIndex}, translate: ${translate}`);

    const swiper = this;
    const { slides } = swiper;
    //
    // // if (swiper.animations.length === 0) {
    // //
    // // }
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
      // const slideOpacity = swiper.params.fadeEffect.crossFade
      //   ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
      //   : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

      const slideOpacity = 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);

      // console.log($slideEl[0].progress);
      //
      // $slideEl
      //   .css({
      //     opacity: slideOpacity,
      //   })
      //   .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
    }
  },
  setTransition(duration) {
    console.log(`setTransition, active:${this.activeIndex}, prev: ${this.previousIndex}`);
    //
    // const swiper = this;
    // const { slides, $wrapperEl } = swiper;
    //
    // for (let i = 0; i < slides.length; i += 1) {
    //   // this.animateSlide[i].reset();
    //   swiper.heroSliderEffect.animationsArray[i].start.seek(0);
    //
    //   if (i === swiper.activeIndex) {
    //     swiper.heroSliderEffect.animationsArray[i].start.play();
    //     // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
    //   } else if (i === swiper.previousIndex) {
    //     swiper.heroSliderEffect.animationsArray[i].start.seek(swiper.heroSliderEffect.animationsArray[i].start.duration);
    //   }
    // }

    // slides.transition(duration);
    // if (swiper.params.virtualTranslate && duration !== 0) {
    //   let eventTriggered = false;
    //   slides.transitionEnd(() => {
    //     if (eventTriggered) return;
    //     if (!swiper || swiper.destroyed) return;
    //     eventTriggered = true;
    //     swiper.animating = false;
    //     const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
    //     for (let i = 0; i < triggerEvents.length; i += 1) {
    //       $wrapperEl.trigger(triggerEvents[i]);
    //     }
    //   });
    // }
  },
  setTransitionStart() {
    // console.log(`transitionStart, active:${this.activeIndex}, prev: ${this.previousIndex}`);
    const swiper = this;
    const { slides } = swiper;
    const { bullets } = swiper.pagination;

    for (let i = 0; i < slides.length; i += 1) {
      // this.animateSlide[i].reset();
      const $line = bullets.eq(i).find('.hero-slider-control__loader-line');
      $line.transition(300);
      $line.removeClass('active');

      const slideAnim = swiper.heroSliderEffect.animationsArray[i];

      // console.log(slideAnim);

      slideAnim.start.seek(0);
      slideAnim.second.pause();

      if (i === swiper.activeIndex) {
        slideAnim.start.play();
        // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
      } else if (i === swiper.previousIndex) {
        slideAnim.start.seek(
          slideAnim.start.duration,
        );
      }
    }
  },
  setTransitionEnd() {
    // console.log(`transitionEnd, active:${this.activeIndex}, prev: ${this.previousIndex}`);

    const swiper = this;
    const { slides } = swiper;
    const { bullets } = swiper.pagination;

    for (let i = 0; i < slides.length; i += 1) {
      // this.animateSlide[i].reset();
      // swiper.heroSliderEffect.animationsArray[i].end.seek(0);
      // anime();
      //
      const $line = bullets.eq(i).find('.hero-slider-control__loader-line');
      $line.transition(swiper.params.heroSliderEffect.duration);

      const slideAnim = swiper.heroSliderEffect.animationsArray[i];

      slideAnim.second.pause();

      // console.log(slideAnim.second.completed);

      slideAnim.second.seek(0);
      if (i === swiper.activeIndex) {
        // slideAnim.second.seek(0);
        slideAnim.second.play();
        $line.addClass('active');
        // this.animateSlide[i].seek(this.animateSlide[i].duration * slideOpacity);
      } else if (i === swiper.previousIndex) {
        // slideAnim.second.seek(
        //   slideAnim.second.duration,
        // );
      } else {
        // slideAnim.second.seek(0);
      }
    }
  },
};

export default {
  name: 'effect-hero-slider',
  params: {
    heroSliderEffect: {
      duration: 10000,
      animationsArray: [],
      // crossFade: false,
    },
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      heroSliderEffect: {
        init: HeroSliderEffect.init.bind(swiper),
        setTranslate: HeroSliderEffect.setTranslate.bind(swiper),
        setTransition: HeroSliderEffect.setTransition.bind(swiper),
        setTransitionStart: HeroSliderEffect.setTransitionStart.bind(swiper),
        setTransitionEnd: HeroSliderEffect.setTransitionEnd.bind(swiper),
      },
    });
  },
  on: {
    beforeInit() {
      const swiper = this;
      if (swiper.params.effect !== 'hero-slider') return;

      swiper.heroSliderEffect.animationsArray = [];

      swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
      const overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      // Utils.extend(swiper.animations, animations);
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    // init() {
    //   const swiper = this;
    //   if (swiper.params.effect !== 'hero-slider') return;
    //   console.log(this.slides);
    // },
    // setTranslate(translate) {
    //   const swiper = this;
    //   if (swiper.params.effect !== 'hero-slider') return;
    //   swiper.heroSliderEffect.setTranslate(translate);
    // },
    // setTransition(duration) {
    //   const swiper = this;
    //   if (swiper.params.effect !== 'hero-slider') return;
    //   swiper.heroSliderEffect.setTransition(duration);
    // },
    init() {
      const swiper = this;
      if (swiper.params.effect !== 'hero-slider') return;
      swiper.heroSliderEffect.init();
    },
    transitionStart() {
      const swiper = this;
      if (swiper.params.effect !== 'hero-slider') return;
      swiper.heroSliderEffect.setTransitionStart();
    },
    transitionEnd() {
      const swiper = this;
      if (swiper.params.effect !== 'hero-slider') return;
      swiper.heroSliderEffect.setTransitionEnd();
    },
  },
};
