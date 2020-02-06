import ready from 'domready';
import ModalsContainer from './ModalsContainer.vue';
import store from '@/store';


import EventBus from './EventBus';


const Bus = new EventBus();

const Index = {
  install(Vue) {
    if (this.installed) {
      throw console.warn('VueModal: plugin already installed');
    }

    this.installed = true;

    // Create component instance
    const Constr = Vue.extend(ModalsContainer);
    const modal = new Constr({
      store,
    });

    // Mount it
    const vm = modal.$mount();

    // Add it to the Vue application
    ready(() => {
      document.querySelector('body').appendChild(vm.$el);
    });


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

export default Index;
