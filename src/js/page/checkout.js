import Vue from 'vue';
import store from '../store';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';


store.registerModule('checkout', checkoutStore);

const CheckoutVue = new Vue({
  store,
  render: h => h(Checkout),
});

global.app.Checkout = CheckoutVue;

$(() => {
  store.dispatch('checkout/initSoa', global.soaData);
  CheckoutVue.$mount('#vueTest');
});
