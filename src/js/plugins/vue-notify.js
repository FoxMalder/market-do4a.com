import ready from 'domready';
import Notifications from '@/components/Notifications.vue';


const VueNotify = {
  install(Vue) {
    if (this.installed) {
      throw console.warn('VueNotify: plugin already installed');
    }

    this.installed = true;


    // Create component instance
    const Constr = Vue.extend(Notifications);
    const notify = new Constr();

    // // Apply configuration
    // notify.options = Object.assign(Notify.options, args);

    // Mount it
    const vm = notify.$mount();

    // Add it to the Vue application
    ready(() => {
      document.querySelector('body').appendChild(vm.$el);
    });

    // Create generic method
    Vue.$notify = Vue.prototype.$notify = (type = 'info', options = {}) => {
      notify.addItem(type, options);
    };
    Vue.$notify.info = Vue.prototype.$notify.info = (msg) => {
      notify.addItem('info', {
        title: msg,
      });
    };
    Vue.$notify.error = Vue.prototype.$notify.error = (msg) => {
      notify.addItem('error', {
        title: 'Произошла ошибка',
        text: msg,
      });
    };
    // Vue.$notify.success = Vue.prototype.$notify.success = (options = {}) => {
    //   Notify.addItem('success', msg, options);
    // };
    // Vue.$notify.warning = Vue.prototype.$notify.warning = (msg, options = {}) => {
    //   Notify.addItem('warning', msg, options);
    // };
    // // Create setTypes method
    // Vue.$notify.setTypes = Vue.prototype.$notify.setTypes = (types) => {
    //   Notify.setTypes(types);
    // };
    // Vue.$notify.removeAll = Vue.prototype.$notify.removeAll = () => {
    //   Notify.removeAll();
    // };
  },
};

export default VueNotify;
