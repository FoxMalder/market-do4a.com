import './js/common';
import enableInlineVideo from 'iphone-inline-video';
import AOS from 'aos';

import 'aos/dist/aos.css';
import './scss/main.scss';
import './scss/franchise.scss';
import Sticky from 'sticky-js';
import { Mousewheel, Scrollbar, Swiper } from 'swiper/dist/js/swiper.esm';
// import Parallax from './js/modules/Parallax';

if (process.env.NODE_ENV !== 'production') {
  require('./franchise.pug');
}

Swiper.use([Scrollbar, Mousewheel]);
AOS.init({
  duration: 500,
  easing: 'ease-in-out',
  once: true,
});

function initStarSlider() {
  const mainStarSliderEl = document.querySelector('#stars-slider');
  if (!mainStarSliderEl) return 0;

  const starSliderOverlayEl = document.querySelector('.f-section-stars__description');
  const starSliderExplanationTabletEl = document.querySelector('.slider__explanation_tablet');
  const starSliderExplanationDesktopEl = document.querySelector('.slider__explanation_desktop');

  new Sticky('#stars-slider .slider__controls', {
    marginTop: 150,
    stickyClass: 'is-sticky',
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

        if (starSliderOverlayEl) starSliderOverlayEl.style.opacity = opacity;
        if (starSliderExplanationTabletEl) starSliderExplanationTabletEl.style.opacity = opacity;
        if (starSliderExplanationDesktopEl) starSliderExplanationDesktopEl.style.opacity = opacity;

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

function initVideo() {
  try {
    const video = document.querySelector('video');
    enableInlineVideo(video, {
      iPad: true,
    });
  } catch (e) {
    console.error(e);
  }
}

function initForms() {
  $('.f-program-item__button[data-fancybox]').fancybox({
    afterShow(instance, slide) {
      slide.$slide.find('input#js-ask-more-info').val(slide.opts.$orig.data('js-ask-more-info') || '');
    },
    afterClose(instance, slide) {
      slide.$slide.find('input#js-ask-more-info').val('');
    },
  });

  $('.form-body').parent('form').on('submit', (event) => {
    event.preventDefault();

    const formEl = event.currentTarget;

    const $body = $(formEl).find('.form-body');
    const $button = $(formEl).find('[type="submit"]');

    $body.addClass('form-body_loading');
    $button.attr('disabled', 'true');

    if (global.demo) {
      console.log(event);
      setTimeout(() => {
        $body.removeClass('form-body_loading');
        $body.addClass('form-body_success');
        $button.removeClass('btn-red');
        $button.addClass('btn-green');
        $button.html(`<i class="btn-icon icon icon-done"></i>${$button.data('success')}` || 'Заявка отправлена');
      }, 2000);
    } else {
      $.ajax({
        type: $(formEl).attr('method'),
        url: $(formEl).attr('action'),
        data: $(formEl).serialize(),
      }).done(() => {
        // success
        $body.removeClass('form-body_loading');
        $body.addClass('form-body_success');
        $button.removeClass('btn-red');
        $button.addClass('btn-green');
        $button.html(`<i class="btn-icon icon icon-done"></i>${$button.data('success')}` || 'Заявка отправлена');
      }).fail(() => {
        // error
        $body.removeClass('form-body_loading');
        $body.addClass('form-body_error');
        setTimeout(() => {
          $body.removeClass('form-body_error');
          $button.removeAttr('disabled');
        }, 2000);
      });
    }
  });
}

$(() => {
  initVideo();
  initForms();


  $('.f-section-hero').addClass('animate');

  if (document.documentElement.clientWidth >= 768) {
    // [...document.querySelectorAll('.arnold')].forEach((el) => {
    //   new Parallax(el.querySelector('.arnold__bg'), [-0.08, 0]);
    //   new Parallax(el.querySelector('.arnold__img'), [0.08, 0]);
    // });

    initStarSlider();
  }
});
