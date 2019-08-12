import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import catalogControl from './modules/catalogControl';
// import cart from './modules/cart';
import product from './modules/product';
// import createLogger from '../../../src/plugins/logger';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // state: {
  //   noScroll: false,
  // },
  methods: {},
  actions: {},
  modules: {
    filters: catalogControl,
    product,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});
