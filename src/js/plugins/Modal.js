// import ModalsContainer from '../components/ModalsContainer.vue';

let instance = null;

class EventBus {
  constructor() {
    if (!instance) {
      this.events = {};
      instance = this;
    }
    return instance;
  }

  $emit(event, message) {
    if (!this.events[event]) return;
    const callbacks = this.events[event];
    for (let i = 0, l = callbacks.length; i < l; i++) {
      const callback = callbacks[i];
      callback.call(this, message);
    }
  }

  $on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
}


const Bus = new EventBus();

const Plugin = {};
Plugin.install = (Vue) => {
  // if (this.installed) {
  //   return;
  // }
  //
  // this.installed = true;

  Vue.prototype.$modal = new Vue({
    name: '$modal',

    created() {
      Bus.$on('opened', (data) => {
        this.$emit('modal:opened', data);
      });

      Bus.$on('closed', (data) => {
        this.$emit('modal:closed', data);
      });

      Bus.$on('destroyed', (data) => {
        this.$emit('modal:destroyed', data);
      });

      this.$on('new', (modal) => {
        this.open(modal);
      });

      this.$on('close', (data) => {
        this.close(data);
      });

      this.$on('dismiss', (index) => {
        this.dismiss(index || null);
      });
    },

    methods: {
      open(modal, data) {
        Bus.$emit('new', { component: modal, param: data });
      },

      close(data = null) {
        Bus.$emit('close', data);
      },

      dismiss(index = null) {
        Bus.$emit('dismiss', index);
      },
    },
  });

  Vue.mixin({
    created() {
      this.$on('modal:new', (modal) => {
        Bus.$emit('new', modal);
      });

      this.$on('modal:close', (data) => {
        Bus.$emit('close', data);
      });

      this.$on('modal:dismiss', (index) => {
        Bus.$emit('dismiss', index);
      });
    },
  });

  // Vue.component('ModalsContainer', ModalsContainer);
};


export default Plugin;

export {
  Bus,
};
