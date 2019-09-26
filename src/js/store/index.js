import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import notifications from './modules/notifications';

import * as Api from '../api';
import Utils from '../utils/utils';


Vue.use(Vuex);

const state = {
  favorites: [],
  favoritesCount: 0,
  cityId: 0,
  storeId: 0,
  storeRemoteId: 0,
  isLocaleStore: false,
  cityList: [],
  storeList: [],
};

const getters = {
  currentCity: (state) => {
    return global.app.storeManagerData.cities[global.app.storeManagerData.currentCityId];
  },
  getCityById: (state) => (cityId) => {
    return state.cityList.find(item => item.id === parseInt(cityId, 10));
  },
  getStoreListByCityId: (state) => (cityId) => {
    return state.storeList.filter(item => item.city === parseInt(cityId, 10));
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
  getFavorites({ commit }) {
    let favorites = null;

    if (localStorage.getItem('favorites')) {
      try {
        favorites = JSON.parse(localStorage.getItem('favorites'));
      } catch (e) {
        localStorage.removeItem('favorites');
      }
    }

    if (favorites) {
      commit('RECEIVE_FAVORITES', favorites);
      commit('SET_FAVORITES_COUNT', favorites.length);
    }

    return Api.getFavorites()
      .then((data) => {
        commit('RECEIVE_FAVORITES', data);
        commit('SET_FAVORITES_COUNT', data.length);

        localStorage.setItem('favorites', JSON.stringify(data));
      });
  },


  setPost({ commit }) {
    $.ajax({
      url: document.location.href,
      data: {
        method: 'store.set',
        cityId: global.app.storeManagerData.noCityId,
        storeId: global.app.storeManagerData.remoteStoreId,
        backUrl: document.location.pathname + document.location.search,
        ajax: 'Y',
        sessid: Utils.sessid(),
      },
      dataType: 'json',
    }).done((response) => {
      if (response.status === 'error') {
        alert(response.error);
        return;
      }

      if (response.redirectUrl) {
        document.location.href = response.redirectUrl;
      } else {
        document.location.reload();
      }
    });
  },

  setCity({ getters }, cityId) {
    const storeId = getters.getStoreListByCityId(cityId)[0].id;

    $.ajax({
      url: document.location.href,
      data: {
        method: 'store.set',
        cityId,
        storeId,
        backUrl: document.location.pathname + document.location.search,
        ajax: 'Y',
        sessid: Utils.sessid(),
      },
      dataType: 'json',
    }).done((response) => {
      if (response.status === 'error') {
        alert(response.error);
        return;
      }

      if (response.redirectUrl) {
        document.location.href = response.redirectUrl;
      } else {
        document.location.reload();
      }
    });
  },

  setStore({ commit }, storeId) {
    commit('SET_STORE', storeId);
  },
};

const mutations = {
  RECEIVE_FAVORITES(state, favorites) {
    state.favorites = favorites;
  },
  SET_FAVORITES_COUNT(state, count) {
    state.favoritesCount = count;
  },
  SET_STORE(state, storeId) {
    state.storeId = storeId;
  },
  SET_APP_PARAMS(state, app) {
    state.storeId = app.storeId;
    state.storeRemoteId = app.storeRemoteId;
    state.isLocaleStore = app.storeId !== app.storeRemoteId;
    state.storeList = Object.values(app.storeManagerData.stores).map(item => ({
      ...item,
      city: parseInt(item.city, 10),
      id: parseInt(item.id, 10),
    }));
    state.cityList = Object.values(app.storeManagerData.cities).map(item => ({
      ...item,
      id: parseInt(item.id, 10),
    }));
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
