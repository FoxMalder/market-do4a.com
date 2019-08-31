/* eslint-disable no-param-reassign */
import Notifications from '../components/Notifications.vue';
import store from '../store';

const Notify = {
  install(Vue, args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;
    this.params = args;

    Vue.component('notifications', Notifications);

    const notify = (params) => {
      if (typeof params === 'string') {
        store.dispatch('addNotify', {
          title: '',
          text: params,
        });
      }

      if (typeof params === 'object') {
        store.dispatch('addNotify', params);
      }
    };

    Vue.prototype.$notify = notify;
    Vue.notify = notify;
  },
};

export default Notify;
