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

$(() => {
  store.registerModule('checkout', checkoutStore);
  // store.dispatch('checkout/getAll', global.soaData.);
  store.dispatch('checkout/initSoa', global.soaData);
  // store.dispatch('cart/getCart');

  new Vue({
    store,
    render: h => h(Checkout),
  }).$mount('#vueTest');
});
