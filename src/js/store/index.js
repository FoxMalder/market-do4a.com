import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import notifications from './modules/notifications';

import * as Api from '../api';
import Utils from '../utils/utils';


function getBreakpoint() {
  if (document.documentElement.clientWidth < 768) {
    return 'xs';
  }
  if (document.documentElement.clientWidth < 1240) {
    return 'md';
  }
  return 'xl';
}

Vue.use(Vuex);


const state = {
  favorites: [],
  favoritesCount: 0, // favorites.length

  cityId: 0, // Выбранный город
  storeId: 0, // Выбранный склад
  storeRemoteId: 0, // Удаленный склад
  isLocaleStore: false, // storeId !== storeRemoteId
  cityList: [],
  storeList: [],
  // breakpoint: 'xs',
};

const getters = {
  currentCity: (state) => {
    return state.cityList.find(item => item.id === state.cityId);
    // return global.app.storeManagerData.cities[global.app.storeManagerData.currentCityId];
  },
  getCityById: (state) => (cityId) => {
    return state.cityList.find(item => item.id === parseInt(cityId, 10));
  },
  getStoreListByCityId: (state) => (cityId) => {
    return state.storeList.filter(item => item.city === parseInt(cityId, 10));
  },
  getStoreById: (state) => (storeId) => {
    return state.storeList.find(item => item.id === storeId, 10);
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

        data.forEach((id) => {
          [].forEach.call(document.querySelectorAll(`.product-card[data-product-id="${id}"]`), (card) => {
            if (card.ProductCard) {
              card.ProductCard.data.isFavorite = true;
              card.ProductCard.favoriteButtonEl.classList.add('active');
            }
          });
        });

        localStorage.setItem('favorites', JSON.stringify(data));
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
  SET_STORE(state, storeId) {
    state.storeId = storeId;
  },
  SET_APP_PARAMS(state, app) {
    state.cityId = parseInt(app.storeManagerData.currentCityId, 10);
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
