import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';
import catalogControl from './modules/catalogControl';
// import cart from './modules/cart';
// import productPage from './modules/product';
import cart from './modules/cart';
// import checkout from './modules/checkout';

import * as Api from '../api';
// import favorites from '../api/favorites';
// import createLogger from '../../../src/plugins/logger';

Vue.use(Vuex);

const state = {
  favorites: [],
  favoritesCount: 0,
};

const getters = {
  currentCity() {
    return global.app.storeManagerData.cities[global.app.storeManagerData.currentCityId];
  },
};

const actions = {
  addToCompare({ commit }, product) {
    console.log(`Add to compare: ${product.id}`);
  },
  addToFavorites({ commit }, productId) {
    return new Promise((resolve, reject) => {
      Api.addToFavorites(
        productId,
        (data) => {
          commit('RECEIVE_FAVORITES', data);
          commit('SET_FAVORITES_COUNT', data.length);
          resolve();
        },
        () => {
          reject();
        },
      );
    });
  },
  removeFromFavorites({ commit }, productId) {
    return new Promise((resolve, reject) => {
      Api.removeFromFavorites(
        productId,
        (data) => {
          commit('RECEIVE_FAVORITES', data);
          commit('SET_FAVORITES_COUNT', data.length);
          resolve();
        },
        () => reject(),
      );
    });
  },
};

const mutations = {
  RECEIVE_FAVORITES(state, favorites) {
    state.favorites = favorites;
  },
  SET_FAVORITES_COUNT(state, count) {
    state.favoritesCount = count;
  },
};

// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    filters: catalogControl,
    // product: productPage,
    cart,
    // checkout,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});
