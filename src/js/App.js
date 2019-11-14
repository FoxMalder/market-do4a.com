import Vue from 'vue';
// import VModal from 'vue-js-modal';
import store from './store';
import Header from './modules/Header';
// import Notifications from './components/Notifications.vue';
// import Modal from './components/Modal.vue';
import Modal from './plugins/Modal';
import Notify from './plugins/Notify';
import ModalsContainer from './components/ModalsContainer.vue';
import { ADD_TOAST_MESSAGE } from './store/modules/notifications';
import Platform from './plugins/Platform';




window.Vue = Vue;
// Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.directive('click-outside', {
  bind(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression ${binding.expression} is not a function, but has to be`;
      if (compName) {
        warn += `Found in component ${compName}`;
      }
      console.warn(warn);
    }
    // Define Handler and cache it on the element
    const { bubble } = binding.modifiers;
    const handler = (e) => {
      // Fall back to composedPath if e.path is undefined
      const path = e.path
        || (e.composedPath ? e.composedPath() : false)
        || getParents(e.target);
      if (bubble || (path.length && !el.contains(path[0]) && el !== path[0])) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;
    // add Event Listeners
    document.addEventListener('click', handler);
  },
  unbind(el) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
});


class App {
  constructor() {
    this.debug = true;

    this.store = store;
    this.platform = Platform;
  }

  init() {
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
  }
}

export default new App();
