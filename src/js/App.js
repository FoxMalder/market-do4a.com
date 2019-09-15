import Vue from 'vue';
import store from './store';
import Header from './modules/Header';
import Notifications from './components/Notifications.vue';
import { ADD_TOAST_MESSAGE } from './store/modules/notifications';
import Platform from './plugins/Platform';


class App {
  constructor() {
    this.debug = true;

    this.store = store;
    this.platform = Platform;
  }

  init() {
    store.dispatch('init');

    this.NotifyVM = new Vue({
      store,
      render: h => h(Notifications),
    }).$mount();
    document.body.appendChild(this.NotifyVM.$el);

    this.Header = new Header();
  }

  notify(opt) {
    store.dispatch(ADD_TOAST_MESSAGE, opt);
  }
}

export default new App();
