import Vue from 'vue';
import store from '../store';
import Utils from '../utils/utils';
import checkoutStore from '../store/modules/checkout';

import Checkout from '../components/checkout/Checkout.vue';
import CheckoutPopular from '../components/checkout/CheckoutPopular.vue';
import axios from 'axios';
import qs from 'qs';
import ProductCard from '@/components/ProductCard';


class Popular {
  constructor() {
    this.$el = document.querySelector('.p-section-popular');
    if (!this.$el) {
      return;
    }

    this.request = JSON.parse(this.$el.dataset.request);

    this.$container = this.$el.querySelector('.p-section-popular__list');

    this.$control = this.$el.querySelector('.load-more-block');
    this.$controlLink = this.$el.querySelector('.load-more-block__link');
    this.$controlText = this.$el.querySelector('.load-more-block__value');

    this.shownCards = this.$container.querySelectorAll('[data-product-id]').length;
    this.totalCards = this.shownCards;
    this.page = this.shownCards > 0 ? 1 : 0; // 1

    this.init();
  }

  init() {
    this.$controlLink.addEventListener('click', this.onClick);
  }

  onClick = (event) => {
    event.preventDefault();
    this.nextPage();
  };

  /**
   * Создает нужные элементы на основе входных данных и вставляет их на страницу
   *
   * @param {Array} items - Массив вставляемых элементов
   */
  add(items) {
    items.forEach((item) => {
      let element;

      if (item.type === 'product') {
        element = new ProductCard(item.options);
        element = element.getElement();
        this.shownCards += 1;
      } else {
        element = Utils.htmlToElement(item.html);
      }

      this.$container.appendChild(element);
    });
  }

  send(request) {
    return axios.post('/ajax/catalog/products/by-params/', qs.stringify(request))
      .then(response => response.data)
      .then((response) => {
        if (response.success === 1) {
          return response.data;
        }
        const error = new Error(response.message);
        error.response = response;
        throw error;
      });
  }

  nextPage() {
    const request = {
      ...this.request,
      page: this.page + 1,
    };

    this.$control.classList.add('loading');
    this.send(request)
      .then((data) => {
        this.page += 1;
        this.add(data.items);

        if (this.page > 1) {
          this.totalCards = data.count;

          // console.log('shown: ', this.shownCards, 'total: ', this.totalCards);
          this.$controlText.innerHTML = `Показано ${this.shownCards} из ${this.totalCards}`;

          if (this.shownCards < this.totalCards) {
            this.$control.style.display = '';
          } else {
            this.$control.style.display = 'none';
          }
        }

        this.$control.classList.remove('loading');
      })
      .catch(() => {
        this.$control.classList.remove('loading');
      });
  }
}

export default class PageCheckout {
  constructor() {
  }

  init() {
    try {
      new Popular();
    } catch (e) {

    }

    // const popularEl = document.querySelector('.p-section-popular');
    // if (popularEl) {
    //   new Vue({
    //     store,
    //     render: h => h(CheckoutPopular, {
    //       props: {
    //         requestParam: eval(`(${popularEl.dataset.request})`),
    //       },
    //     }),
    //   }).$mount(popularEl);
    // }


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
