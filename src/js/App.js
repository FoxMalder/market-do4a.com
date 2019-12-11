import Vue from 'vue';
import ready from 'domready';


console.log('app.js');

// import VModal from 'vue-js-modal';

import '@/common';
import store from './store';
import Header from './modules/Header';
// import Notifications from './components/Notifications.vue';
// import Modal from './components/Modal.vue';
import Modal from './plugins/Modal';
import Notify from './plugins/Notify';
import ModalsContainer from './components/ModalsContainer.vue';
import Platform from './plugins/Platform';


window.Vue = Vue;

// Vue.use(VModal, { dynamic: true, injectModalsContainer: true });


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

    Vue.use(Modal);
    Vue.use(Notify);


    store.dispatch('init');

    // this.NotifyVM = new Vue({
    //   store,
    //   render: h => h(Notifications),
    // }).$mount();
    // document.body.appendChild(this.NotifyVM.$el);

    // this.ModalVM = new Vue({
    //   store,
    //   render: h => h(Modal),
    // }).$mount();
    // document.body.appendChild(this.ModalVM.$el);

    this.ModalVM = new Vue({
      store,
      render: h => h(ModalsContainer),
    }).$mount();
    document.body.appendChild(this.ModalVM.$el);

    this.Header = new Header();

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
