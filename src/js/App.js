import Vue from 'vue';
// import VModal from 'vue-js-modal';
import store from './store';
import Header from './modules/Header';
import Notifications from './components/Notifications.vue';
// import Modal from './components/Modal.vue';
import Modal from './plugins/Modal';
import ModalsContainer from './components/ModalsContainer.vue';
import { ADD_TOAST_MESSAGE } from './store/modules/notifications';
import Platform from './plugins/Platform';

// Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(Modal);

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
  }

  notify(opt) {
    store.dispatch(ADD_TOAST_MESSAGE, opt);
  }
}

export default new App();
