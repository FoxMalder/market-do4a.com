import Vue from 'vue';
import ready from 'domready';


// import VModal from 'vue-js-modal';

import '@/common';
import store from '@/store';
import Header from '@/modules/Header';

import VueModal from '@/plugins/vue-modal';
import VueNotify from '@/plugins/vue-notify';

import Platform from '@/plugins/Platform';


// Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.use(VueModal);
Vue.use(VueNotify);


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

    // console.log('App init');
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
