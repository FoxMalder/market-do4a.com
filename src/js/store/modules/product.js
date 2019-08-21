/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

import Reviews from '../../api/reviews';
import Api from '../../utils/Api';

// initial state
const state = {
  packingId: 0,
  offerId: 0,
  packing: [],
  offers: [],

  name: '',
  textDelivery: '',

  reviewsLoading: false,
  reviewsPage: 0,
  reviewsCount: 16,
  reviews: [],
};

// getters
const getters = {
  activePacking: (state) => {
    // TODO: Полифилл Array.find()
    return state.packing.find(item => item.id === state.packingId);
  },
  visibleOffers: (state, getters) => {
    return getters.activePacking.sku;
  },
  availableOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count > 0);
  },
  availableDeliveryOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count === 0 && item.count_remote > 0);
  },
  notAvailableOffers: (state, getters) => {
    return getters.visibleOffers.filter(item => item.count === 0 && item.count_remote === 0);
  },
  isAvailablePacking: (state, getters) => {
    return getters.availableOffers.length > 0 || getters.availableDeliveryOffers.length > 0;
  },

  activeOffer: (state, getters) => {
    return getters.activePacking.sku.find(item => item.id === state.offerId) || getters.activePacking.sku[0];
  },
  isAvailableOffer: (state, getters) => {
    return getters.activeOffer ? getters.activeOffer.count + getters.activeOffer.count_remote > 0 : true;
  },
};

// actions
const actions = {
  getAllPacking({ dispatch, commit }) {
    if (!Array.isArray(global.product.packing)) {
      global.product.packing = Object.values(global.product.packing);
    }

    global.product.packing.forEach((item) => {
      if (!Array.isArray(item.sku)) {
        // item.sku = Object.values(item.sku);
        item.sku = Object.keys(item.sku).map(key => ({
          id: parseInt(key, 10),
          ...item.sku[key],
        }));
      }
    });

    // commit('SET_ALL', global.product);

    commit('SET_NAME', { name: global.product.name });
    commit('SET_TEXT_DELIVERY', { textDelivery: global.product.textDelivery });
    commit('SET_PACKING', { packing: global.product.packing });
    commit('SET_ACTIVE_OFFER_ID', { id: global.product.offerId });
    commit('SET_ACTIVE_PACKING_ID', { id: global.product.productId });


    dispatch('updateReviews');
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
  },

  selectOffer({ commit }, offer) {
    commit('SET_ACTIVE_OFFER_ID', offer);
  },

  toggleFavorites({ commit }, packing) {
    if (packing.isFavorite) {
      Api.favorites.delete(packing.id).then(() => {
        commit('SET_FAVORITES_STATUS', {
          id: packing.id,
          status: false,
        });
      });
    } else {
      Api.favorites.add(packing.id).then(() => {
        commit('SET_FAVORITES_STATUS', {
          id: packing.id,
          status: true,
        });
      });
    }
  },

  addToCompare({ commit }, packing) {
    console.log('add to compare');
  },

  getNextReviews({ state, dispatch }) {
    dispatch('updateReviews', state.reviewsPage + 1);
  },

  updateReviews({ state, commit }, page = 0) {
    commit('SET_REVIEWS_LOADING', true);
    commit('SET_REVIEWS_PAGE', page);

    Reviews.getReviews(state.packingId, page).then((data) => {
      if (page > 0) {
        commit('PUSH_REVIEW_TO_REVIEWS', data.items);
      } else {
        commit('SET_REVIEWS', data.items);
      }
      commit('SET_REVIEWS_COUNT', data.count);
      commit('SET_REVIEWS_LOADING', false);
    });
  },

  // votePlus({ commit }, reviewId) {
  //   Reviews.vote(reviewId, 'plus').then(() => {
  //
  //   });
  // },
  // voteMinus({ commit }, reviewId) {
  //   Reviews.vote(reviewId, 'minus');
  // },
};

// mutations
const mutations = {
  SET_ALL(state, product) {
    state = {
      ...state,
      ...product,
    };
  },
  SET_NAME(state, { name }) {
    state.name = name;
  },

  SET_TEXT_DELIVERY(state, { textDelivery }) {
    state.textDelivery = textDelivery;
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
    state.reviewsCount = count;
  },

  SET_REVIEWS_PAGE(state, page) {
    state.reviewsPage = page;
  },

  SET_REVIEWS_LOADING(state, isLoading) {
    state.reviewsLoading = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
