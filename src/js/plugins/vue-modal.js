import ModalsContainer from '@/components/ModalsContainer.vue';


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

const VueModal = {
  install(Vue) {
    if (this.installed) {
      throw console.warn('VueModal: plugin already installed');
    }

    this.installed = true;

    // Create component instance
    const Constr = Vue.extend(ModalsContainer);
    const modal = new Constr();

    // Mount it
    const vm = modal.$mount();

    // Add it to the Vue application
    document.querySelector('body').appendChild(vm.$el);


    Vue.$modal = Vue.prototype.$modal = {
      open(component, data) {
        // Modal.add({ component, param: data });
        Bus.$emit('new', { component, param: data });
      },

      close(data = null) {
        Bus.$emit('close', data);
      },

      dismiss(index = null) {
        Bus.$emit('dismiss', index);
      },
    };


    Vue.mixin({
      created() {
        this.$on('modal:new', (component) => {
          Bus.$emit('new', { component });
        });

        this.$on('modal:close', (data = null) => {
          Bus.$emit('close', data);
        });

        this.$on('modal:dismiss', (index = null) => {
          Bus.$emit('dismiss', index);
        });
      },
    });
  },
};


export {
  Bus,
};

export default VueModal;
