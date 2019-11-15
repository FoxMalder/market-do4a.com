/* eslint-disable no-param-reassign */
import Notifications from '../components/Notifications.vue';
// import store from '../store';


// console.log(Notifications);
//
// const Notify = {
//   install(Vue, args = {}) {
//     if (this.installed) {
//       return;
//     }
//
//     this.installed = true;
//     this.params = args;
//
//     Vue.component('notifications', Notifications);
//
//     const notify = (params) => {
//       if (typeof params === 'string') {
//         store.dispatch('addNotify', {
//           title: '',
//           text: params,
//         });
//       }
//
//       if (typeof params === 'object') {
//         store.dispatch('addNotify', params);
//       }
//     };
//
//     Vue.prototype.$notify = notify;
//     Vue.notify = notify;
//   },
// };
//
// export default Notify;


export default {
  install(Vue, args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;


    // Create component instance
    const Constr = Vue.extend(Notifications);
    const Notify = new Constr();

    // // Apply configuration
    // Notify.options = Object.assign(Notify.options, args);

    // Mount it
    const vm = Notify.$mount();

    // Add it to the Vue application
    document.querySelector('body').appendChild(vm.$el);

    // Create generic method
    Vue.$notify = Vue.prototype.$notify = (type = 'info', options = {}) => {
      Notify.addItem(type, options);
    };
    // Vue.$notify.info = Vue.prototype.$notify.info = (options = {}) => {
    //   Notify.addItem('info', msg, options);
    // };
    // Vue.$notify.success = Vue.prototype.$notify.success = (options = {}) => {
    //   Notify.addItem('success', msg, options);
    // };
    Vue.$notify.error = Vue.prototype.$notify.error = (msg) => {
      Notify.addItem('error', {
        title: 'Произошла ошибка',
        text: msg,
      });
    };
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
