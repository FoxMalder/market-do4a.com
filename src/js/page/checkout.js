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


    if (global.IPOLSDEK_pvz) {
      const SDEK = global.IPOLSDEK_pvz;

      SDEK.choozePVZ = (pvzId, isAjax = false) => { // выбрали ПВЗ
        const point = SDEK[SDEK.curMode][SDEK.city][pvzId];
        if (!point) return;

        SDEK.pvzAdress = `${SDEK.city}, ${point.Address} #S${pvzId}`;
        SDEK.pvzId = pvzId;

        SDEK.markUnable();

        if (!isAjax) { // Перезагружаем форму (с применением новой стоимости доставки)
          store.dispatch('checkout/refreshOrderAjax');
          SDEK.close(true);
        }
      };

      SDEK.markUnable = () => {
        SDEK.pvzInputs.some((item) => {
          if (typeof item === 'function') {
            return false;
          }

          store.commit('checkout/SET_PROPERTY', {
            name: `ORDER_PROP_${item}`,
            value: SDEK.pvzAdress,
          });

          return true;
        });
      };

      store.subscribeAction((action, state) => {
        if (action.type === 'checkout/refreshOrder') {
          const response = action.payload[0];
          SDEK.onLoad(response);
        }
      });
    }
  }
}
