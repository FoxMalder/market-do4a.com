import './js/common';
import enableInlineVideo from 'iphone-inline-video';
import AOS from 'aos';

import 'aos/dist/aos.css';
import './scss/main.scss';
import './scss/franchise.scss';
import Sticky from 'sticky-js';
import { Mousewheel, Scrollbar, Swiper } from 'swiper/dist/js/swiper.esm';
import Parallax from './js/modules/Parallax';

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
  if (!mainStarSliderEl) return;

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

function initProgramList() {
  const programListEl = document.querySelector('.f-section-partnership__list');
  if (!programListEl) return;

  // const programTabListEl = document.querySelector('.f-section-partnership__tab-list');
  const programTabsEl = document.querySelectorAll('.f-section-partnership__tab-link');
  const programItemsEl = programListEl.querySelectorAll('.f-section-partnership__col');

  let last = 0;

  programListEl.addEventListener('scroll', () => {
    // console.log(programListEl.scrollLeft + programListEl.offsetWidth / 2);

    [].forEach.call(programItemsEl, (item, i) => {
      if (item.getBoundingClientRect().left < programListEl.offsetWidth / 2) {
        programTabsEl[i].classList.add('active');
        if (i > 0) {
          programTabsEl[i - 1].classList.remove('active');
        }
      } else {
        programTabsEl[i].classList.remove('active');
      }
    });

  });

  // $('.f-section-partnership__list').on('scroll', (event) => {
  //   event.currentTarget
  // });

  $('.f-section-partnership__tab-link').on('click', (event) => {
    event.preventDefault();
    const $this = $(event.currentTarget);
    const $target = $(event.currentTarget.getAttribute('href'));

    $('.f-section-partnership__tab-link').removeClass('active');
    $this.addClass('active');

    $(programListEl).animate({
      scrollLeft: Math.min(
        (programListEl.scrollWidth - programListEl.offsetWidth),
        (programListEl.scrollLeft + $target.position().left - $('.f-section-partnership__title').offset().left),
      ),
    });

  });


  $('.f-program-item__button[data-fancybox]').fancybox({
    afterLoad(instance, slide) {
      slide.$content.find('.f-modal-target').append(slide.opts.$orig.parents('.f-program-item').clone());
      slide.$content.find('input#js-ask-more-info').val(slide.opts.$orig.data('js-ask-more-info') || '');
    },
    afterClose(instance, slide) {
      slide.$content.find('.f-modal-target').empty();
      slide.$content.find('input#js-ask-more-info').val('');
    },
  });
}

function initForms() {

  $('.form-body').parents('form').on('submit', (event) => {
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
  initProgramList();
  initForms();


  $('.f-section-hero').addClass('animate');

  [].forEach.call(document.querySelectorAll('.f-horizontal-gallery__wrapper'), (el) => {
    new Parallax(el, [0, -0.2]);
  });

  if (document.documentElement.clientWidth >= 768) {
    new Parallax(document.querySelector('.f-section-video__title'), [-0.08, 0]);
    initStarSlider();
  }
});
