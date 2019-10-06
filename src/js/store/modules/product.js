/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

import Reviews from '../../api/reviews';
import Product from '../../api/product';


// export default function createModule(options) {
// initial state
const state = {
  packingId: 0,
  offerId: 0,
  packing: [],
  // offers: [],

  // name: '',
  category: '',
  country: '',
  textDelivery: '',

  // reviewsRequestParam: {},
  reviewsLoading: false,
  reviewsPage: 1,
  reviews: [],

  // similarRequestParam: {},
  similarLoading: false,
  similar: [],
};


// getters
const getters = {
  /**
   * Выбранная фасовка
   * @returns {Object}
   */
  activePacking: (state) => {
    return state.packing.find(item => item.id === state.packingId)
      || state.packing[0];
  },

  /**
   * Выбранный оффер
   * @returns {Object}
   */
  activeOffer: (state, getters) => {
    return getters.activePacking.sku.find(item => item.id === state.offerId)
      || getters.activePacking.sku[0];
  },

  visibleOffers: (state, getters) => {
    return getters.activePacking ? getters.activePacking.sku : [];
  },

  /**
   * Оффера в наличии
   * @returns {Array}
   */
  availableOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count_group > 0);
  },

  /**
   * Оффера в наличии на ЦС
   * @returns {Array}
   */
  availableDeliveryOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count_group === 0 && item.count_remote > 0);
  },

  /**
   * Оффера, которых нет в наличии
   * @returns {Array}
   */
  notAvailableOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count_group === 0 && item.count_remote === 0);
  },

  isAvailablePacking: (state, getters) => {
    return getters.availableOffers.length > 0 || getters.availableDeliveryOffers.length > 0;
  },

  isAvailableOffer: (state, getters) => {
    return getters.activeOffer
      ? (getters.activeOffer.count_group > 0 || getters.activeOffer.count_remote > 0)
      : false;
  },
};

// actions
const actions = {
  init({ commit }, product) {
    if (!Array.isArray(product.packing)) {
      product.packing = Object.values(product.packing);
    }

    product.packing.forEach((item) => {
      if (!Array.isArray(item.sku)) {
        // item.sku = Object.values(item.sku);
        item.sku = Object.keys(item.sku).map(key => ({
          id: parseInt(key, 10),
          ...item.sku[key],
        }));
      }
    });

    // commit('SET_NAME', { name: global.product.name });
    commit('SET_PARAM', product);

    commit('SET_PACKING', { packing: product.packing });
    commit('SET_ACTIVE_OFFER_ID', { id: product.offerId });
    commit('SET_ACTIVE_PACKING_ID', { id: product.productId });
  },

  selectPacking({ dispatch, commit }, packing) {
    let newActiveOffer = packing.sku.find(item => item.count > 0);
    if (!newActiveOffer) {
      newActiveOffer = packing.sku.find(item => item.count_remote > 0);
    }
    if (!newActiveOffer) {
      newActiveOffer = packing.sku[0];
    }

    commit('SET_ACTIVE_PACKING_ID', packing);
    commit('SET_ACTIVE_OFFER_ID', newActiveOffer);


    dispatch('updateReviews');
    dispatch('updateSimilar');
  },

  selectOffer({ commit }, offer) {
    commit('SET_ACTIVE_OFFER_ID', offer);
  },

  getNextReviews({ state, dispatch }) {
    dispatch('updateReviews', state.reviewsPage + 1);
  },

  addReview({ state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      Reviews.addReview(state.packingId, data)
        .then(() => {
          resolve();
          dispatch('updateReviews');
        })
        .catch((error) => {
          reject();
          alert(error.message || error.response.message);
        });
    });
  },

  updateReviews({ state, commit }, page = 1) {
    commit('SET_REVIEWS_LOADING', true);
    commit('SET_REVIEWS_PAGE', page);

    Reviews.getReviews(state.packingId, page)
      .then((response) => {
        // console.log('getReviews then', response);
        if (page > 1) {
          commit('PUSH_REVIEW_TO_REVIEWS', response.data.items);
        } else {
          commit('SET_REVIEWS', response.data.items);
        }
        commit('SET_REVIEWS_COUNT', response.data.count);
      })
      .catch((error) => {
        // console.log('getReviews catch', error);
        // alert(error.message || error.response.message);
        console.log(error.message || error.response.message);
      })
      .finally(() => {
        commit('SET_REVIEWS_LOADING', false);
      });
  },

  updateSimilar({ state, commit }) {
    commit('SET_SIMILAR_LOADING', true);

    Product.getSimilar(state.packingId)
      .then((response) => {
        // console.log('getSimilar then', response);
        commit('SET_SIMILAR', response.data.items);
      })
      .catch((error) => {
        // console.log('getSimilar catch', error);
        // alert(error.message || error.response.message);
      })
      .finally(() => {
        commit('SET_SIMILAR_LOADING', false);
      });
  },
};

// mutations
const mutations = {
  // SET_ALL(state, product) {
  //   state = {
  //     ...state,
  //     ...product,
  //   };
  // },

  SET_PARAM(state, param) {
    // console.log(param.category);
    state.textDelivery = param.textDelivery;
    state.category = param.category;
    state.country = param.country;
  },

  SET_PACKING(state, { packing }) {
    state.packing = packing;
  },

  SET_ACTIVE_PACKING_ID(state, { id }) {
    state.packingId = id;
  },

  SET_ACTIVE_OFFER_ID(state, { id }) {
    state.offerId = id;
  },

  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },

  SET_FAVORITES_STATUS(state, { id, status }) {
    const packingItem = state.packing.find(item => item.id === id);
    packingItem.isFavorite = status;
  },

  PUSH_REVIEW_TO_REVIEWS(state, review) {
    state.reviews.push(...review);
  },

  SET_REVIEWS_COUNT(state, count) {
    const pack = state.packing.find(item => item.id === state.packingId);
    pack.review = count;
  },

  SET_REVIEWS_PAGE(state, page) {
    state.reviewsPage = page;
  },

  SET_REVIEWS_LOADING(state, isLoading) {
    state.reviewsLoading = isLoading;
  },

  SET_SIMILAR(state, similar) {
    state.similar = similar;
  },

  SET_SIMILAR_LOADING(state, isLoading) {
    state.similarLoading = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
// }
