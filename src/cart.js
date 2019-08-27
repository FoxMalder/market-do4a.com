import './js/common';
import './scss/main.scss';

import Vue from 'vue/dist/vue.esm';
import Checkout from './js/components/checkout/Checkout.vue';
import store from './js/store';
import checkoutStore from './js/store/modules/checkout';

// import './scss/header-style.scss';

// import './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./cart.pug');
}


Vue.filter('formatPrice', (value) => {
  // if (!value) return '';
  // return value.toLocaleString();
  return `${value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
});


$(() => {
  store.registerModule('checkout', checkoutStore);
  store.dispatch('checkout/getAll');
  // store.dispatch('cart/getCart');

  new Vue({
    store,
    render: h => h(Checkout),
  }).$mount('#vueTest');


  $('[data-cart="promocode"]').on('click', (event) => {
    event.preventDefault();

    const buttonEl = event.currentTarget;
    const text = buttonEl.innerHTML;

    if (buttonEl.classList.contains('btn-gray-2')) {
      buttonEl.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"></div>';

      // Тут отправляем данные на сервер
      // ...


      // Для демонстрации

      setTimeout(() => {
        if (Math.round(Math.random())) {
          buttonEl.classList.remove('btn-gray-2');
          buttonEl.classList.add('btn-green');
          buttonEl.innerHTML = '<i class="icon icon-check"></i>';
        } else {
          buttonEl.classList.remove('btn-gray-2');
          buttonEl.classList.add('btn-red');
          buttonEl.innerHTML = 'Неудачно';
          setTimeout(() => {
            buttonEl.classList.remove('btn-red');
            buttonEl.classList.add('btn-gray-2');
            buttonEl.innerHTML = text;
          }, 1000);
        }
      }, 1000);
    }
  });

  $('[data-cart="remove-product"]').on('click', (event) => {
    event.preventDefault();

    const productEl = $(event.currentTarget).parents('.order-product');

    // Тут отправляем данные на сервер
    // ...

    if (productEl.siblings('.order-product').length > 0) {
      productEl.slideUp(300, () => {
        productEl.remove();
      });
    } else {
      productEl.parents('.order-item').slideUp(300, () => {
        productEl.parents('.order-item').remove();
      });
    }
  });

  $('[data-cart="remove-shiping"]').on('click', (event) => {
    event.preventDefault();

    const shipingEl = $(event.currentTarget).parents('.order-shiping');
    shipingEl.slideUp(500, () => {
      shipingEl.remove();
    });
  });


  // $('.order-option__header').on('click', (event) => {
  //   const thisEL = event.currentTarget.parentElement;
  //
  //   if (thisEL.classList.contains('active')) {
  //     thisEL.classList.remove('active');
  //     $(thisEL).find('.order-option__body').slideUp(500);
  //   } else {
  //     thisEL.classList.add('active');
  //     $(thisEL).find('.order-option__body').slideDown(500);
  //   }
  // });
});
