import {
  Lazy, Mousewheel, Navigation, Scrollbar, Swiper,
} from 'swiper/js/swiper.esm';


Swiper.use([Navigation, Scrollbar, Mousewheel, Lazy]);

export default function initSetsSlider(selector) {
  [].forEach.call(document.querySelectorAll(selector), (el) => {
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
