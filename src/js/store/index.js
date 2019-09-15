import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import notifications from './modules/notifications';

import * as Api from '../api';


Vue.use(Vuex);

const state = {
  favorites: [],
  favoritesCount: 0,
  storeId: 0,
  storeRemoteId: 0,
  isLocaleStore: false,
};

const getters = {
  currentCity() {
    return global.app.storeManagerData.cities[global.app.storeManagerData.currentCityId];
  },
};

const actions = {
  init({ commit }) {
    commit('SET_APP_PARAMS', global.app);
  },
  addToCompare({ commit }, product) {
    console.log(`Add to compare: ${product.id}`);
  },
  addToFavorites({ commit }, productId) {
    return Api.addToFavorites(productId)
      .then((data) => {
        commit('RECEIVE_FAVORITES', data);
        commit('SET_FAVORITES_COUNT', data.length);
      });
  },
  removeFromFavorites({ commit }, productId) {
    return Api.removeFromFavorites(productId)
      .then((data) => {
        commit('RECEIVE_FAVORITES', data);
        commit('SET_FAVORITES_COUNT', data.length);
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
  SET_APP_PARAMS(state, app) {
    state.storeId = app.storeId;
    state.storeRemoteId = app.storeRemoteId;
    state.isLocaleStore = app.storeId !== app.storeRemoteId;
  },
};

// const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    cart,
    notifications,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});

export default store;
