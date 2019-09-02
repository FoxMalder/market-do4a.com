import Vue from 'vue';
import store from '../store';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';


store.registerModule('checkout', checkoutStore);

const CheckoutVue = new Vue({
  store,
  render: h => h(Checkout),
});


$(() => {
  CheckoutVue.$mount('#vueTest');
  global.app.Checkout = CheckoutVue;

  if (Object.prototype.hasOwnProperty.call(global, 'soaData')) {
    store.dispatch('checkout/initSoa', global.soaData);
  }
});
