import ready from 'domready';

import Vue from 'vue';
import Qs from 'qs';
import axios from 'axios';

import VueLazyload from 'vue-lazyload';

// import '@/common';
import store from '@/store';
import Header from '@/modules/Header';
import VueModal from '@/plugins/vue-modal';
import VueNotify from '@/plugins/vue-notify';
import ClickOutside from '@/directives/ClickOutside';

import Platform from '@/plugins/Platform';
import { Utils, formatNumber } from '@/utils';


Vue.use(VueModal);
Vue.use(VueNotify);
Vue.use(VueLazyload, {
  error: require('../img/plug.svg'),
  loading: require('../img/plug.svg'),
});

Vue.filter('formatPrice', (value) => formatNumber(value, '₽'));

Vue.directive('click-outside', ClickOutside);


window.utils = Utils;
window.axios = axios;
window.qs = Qs;
window.Vue = Vue;


class App {
  constructor() {
    // this.fns = [];
    // this.isInit = false;

    this.debug = true;

    this.store = store;
    this.platform = Platform;

    ready(() => {
      this.init();
    });
  }

  init() {
    // global.App = this;

    store.dispatch('init');

    this.Header = new Header();

    const breadcumps = document.querySelector('.mr-breadcumps__list');
    if (breadcumps) {
      breadcumps.scrollTo(1000, 0);
    }

    // this.isInit = true;
    // this.fns.forEach(fn => fn());
  }

  // ready(fn) {
  //   this.isInit ? setTimeout(fn, 0) : this.fns.push(fn);
  // }
}


if (!global.App) {
  global.App = new App();
}

// export default app;
