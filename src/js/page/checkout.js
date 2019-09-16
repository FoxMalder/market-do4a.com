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
      const Sdek = global.IPOLSDEK_pvz;

      Sdek.choozePVZ = (pvzId, isAjax = false) => { // выбрали ПВЗ
        const point = Sdek[Sdek.curMode][Sdek.city][pvzId];
        if (!point) return;

        Sdek.pvzAdress = `${Sdek.city}, ${point.Address} #S${pvzId}`;
        Sdek.pvzId = pvzId;

        Sdek.markUnable();

        if (!isAjax) { // Перезагружаем форму (с применением новой стоимости доставки)
          store.dispatch('checkout/refreshOrderAjax');
          Sdek.close(true);
        }
      };

      Sdek.markUnable = () => {
        Sdek.pvzInputs.some((item) => {
          if (typeof item === 'function') {
            return false;
          }

          store.commit('checkout/SET_PROPERTY', {
            name: `ORDER_PROP_${item}`,
            value: Sdek.pvzAdress,
          });

          return true;
        });
      };
    }
    store.subscribeAction((action, state) => {
      if (action.type === 'checkout/refreshOrder') {
        global.IPOLSDEK_pvz.onLoad(action.payload);
      }
    });
  }
}
