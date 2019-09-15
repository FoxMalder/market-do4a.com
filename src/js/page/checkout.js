import Vue from 'vue';
import store from '../store';
import Utils from '../utils/utils';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';


export default class PageCheckout {
  constructor() {

  }

  init() {
    Utils.log('Checkout', 'Registration storage module');
    store.registerModule('checkout', checkoutStore(global.soaData));

    Utils.log('Checkout', 'Creating a new Vue instance');
    this.vm = new Vue({ store, render: h => h(Checkout) });

    Utils.log('Checkout', 'Mounting Vue');
    this.vm.$mount('#vueTest');

    store.subscribeAction((action, state) => {
      if (action.type === 'checkout/refreshOrder') {
        global.IPOLSDEK_pvz.onLoad(action.payload);
      }
    });
  }
}
