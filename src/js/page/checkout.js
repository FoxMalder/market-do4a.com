import Vue from 'vue';
import store from '../store';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';


store.registerModule('checkout', checkoutStore);
store.dispatch('checkout/initSoa', global.soaData);

const CheckoutVue = new Vue({
  store,
  render: h => h(Checkout),
});

global.app.Checkout = CheckoutVue;

$(() => {
  CheckoutVue.$mount('#vueTest');
});
