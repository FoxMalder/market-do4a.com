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


class App {
  constructor() {
    console.log('[App] Initialization');

    if (App.instance) {
      console.error('[App]: App already initialized');

      return App.instance;
    }

    this.debug = true;

    this.store = store;
    this.platform = Platform;

    ready(() => {
      this.init();
    });

    App.instance = this;
  }

  static version = process.env.VERSION;

  init() {
    store.dispatch('init');

    this.Header = new Header();

    const breadcumps = document.querySelector('.mr-breadcumps__list');
    if (breadcumps) {
      breadcumps.scrollTo(1000, 0);
    }
  }
}

global.AppInstance = new App();


global.utils = Utils;
global.axios = axios;
global.qs = Qs;
global.Vue = Vue;
global.App = App;
// export default app;
