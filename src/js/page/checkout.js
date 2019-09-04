import Vue from 'vue';
import store from '../store';
import Utils from '../utils/utils';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';

document.addEventListener('DOMContentLoaded', () => {
  try {
    Utils.log('Checkout', 'Registration storage module');
    store.registerModule('checkout', checkoutStore(global.soaData));

    Utils.log('Checkout', 'Creating a new Vue instance');
    const checkoutVM = new Vue({ store, render: h => h(Checkout) });

    Utils.log('Checkout', 'Mounting Vue');
    checkoutVM.$mount('#vueTest');

    global.app.checkoutVM = checkoutVM;
  } catch (e) {
    console.error(e);
  }
});
