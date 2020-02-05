import ready from 'domready';
import Vue from 'vue';

import {
  Swiper,
  Mousewheel,
  Scrollbar,
} from 'swiper/js/swiper.esm';
import AOS from 'aos';
import $$ from 'dom7';
import axios from 'axios';

import './simple';

import 'aos/dist/aos.css';
import './scss/about-page.scss';


import AboutCity from '@/components/about/AboutCities.vue';
import store from '@/store';


/**
 *
 * @param url {String}
 * @param formData {FormData}
 * @returns {Promise<T>}
 */
function sendForm(url, formData) {
  if (global.demo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  return axios.post(url, formData)
    .then((response) => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Обработчик отправки формы
 * @param event {Event}
 */
function handleForm(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const $body = $$(form).find('.form-body');
  const $button = $$(form).find('[type="submit"]');

  $body.addClass('form-body_loading');
  $button.attr('disabled', 'true');

  sendForm(form.action, new FormData(form))
    .then(() => {
      $body
        .removeClass('form-body_loading')
        .addClass('form-body_success');

      $button
        .removeClass('btn-red')
        .addClass('btn-green')
        .html(`<i class="btn-icon icon icon-done"></i> ${$button.data('success') || 'Заявка отправлена'}`);
    })
    .catch(() => {
      $body
        .removeClass('form-body_loading')
        .addClass('form-body_error');

      setTimeout(() => {
        $body.removeClass('form-body_error');
        $button.removeAttr('disabled');
      }, 2000);
    });
}

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

  $$('.form-body').parents('form').on('submit', handleForm);


  if (document.documentElement.clientWidth > 1240) {
    Swiper.use([Scrollbar, Mousewheel]);

    new Swiper('.a-history-slider', {
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
});
