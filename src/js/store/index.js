import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';
// import notifications from './modules/notifications';

import * as Api from '@/api';
import Utils from '@/utils';


function getDevice() {
  if (document.documentElement.clientWidth < 768) {
    return 'mobile';
  }
  if (document.documentElement.clientWidth < 1240) {
    return 'tablet';
  }
  return 'desktop';
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
  device: getDevice(),
  // breakpoint: 'xs',
};

const getters = {
  currentCity: (state) => {
    return state.cityList.find(item => item.id === state.cityId);
    // return global.app.storeManagerData.cities[global.app.storeManagerData.currentCityId];
  },
  currentStore: (state) => {
    return state.storeList.find(item => item.id === state.storeId);
  },
  getCityById: (state) => (cityId) => {
    return state.cityList.find(item => item.id === cityId);
  },
  getStoreById: (state) => (storeId) => {
    return state.storeList.find(item => item.id === storeId);
  },
  getStoreListByCityId: (state) => (cityId) => {
    return state.storeList.filter(item => item.cityId === cityId);
  },
};

const actions = {
  init({ commit }) {
    commit('SET_APP_PARAMS', global.app);

    store.dispatch('getFavorites');
  },
  addToCompare({ commit }, product) {
    console.log(`Add to compare: ${product.id}`);
  },
  addToFavorites({ commit }, productId) {
    return Api.addToFavorites(productId)
      .then((data) => {
        commit('SET_FAVORITES', data);
        commit('SET_FAVORITES_COUNT', data.length);
      })
      .catch((error) => {
        Vue.$notify.error(error);
        throw error;
      });
  },
  removeFromFavorites({ commit }, productId) {
    return Api.removeFromFavorites(productId)
      .then((data) => {
        commit('SET_FAVORITES', data);
        commit('SET_FAVORITES_COUNT', data.length);
      })
      .catch((error) => {
        Vue.$notify.error(error);
        throw error;
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
      commit('SET_FAVORITES', favorites);
      commit('SET_FAVORITES_COUNT', favorites.length);
    }

    return Api.getFavorites()
      .then((data) => {
        commit('SET_FAVORITES', data);
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
  SET_FAVORITES(state, favorites) {
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
    state.cityRemoteId = parseInt(app.storeManagerData.noCityId, 10);

    state.storeId = app.storeId;
    state.storeRemoteId = app.storeRemoteId;

    state.isLocaleStore = app.storeId !== app.storeRemoteId;

    state.storeList = Object.values(app.storeManagerData.stores)
      .map(item => ({
        ...item,
        courier: item.courier === 'Y',
        coords: item.coords.split(',').map(num => parseFloat(num)),
        // city: parseInt(item.city, 10),
        cityId: parseInt(item.city, 10),
        id: parseInt(item.id, 10),
      }))
      .filter(item => item.id !== state.storeRemoteId);

    state.cityList = Object.values(app.storeManagerData.cities)
      .map(item => ({
        ...item,
        id: parseInt(item.id, 10),
      }))
      .filter(item => item.id !== state.cityRemoteId)
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
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
    // notifications,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});

export default store;
