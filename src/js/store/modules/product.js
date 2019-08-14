/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

// initial state
const state = {
  name: '',
  packingId: 0,
  offerId: 0,
  packing: [],
  // offers: [],
};

// getters
const getters = {
  activePacking: (state) => {
    // TODO: Полифилл Array.find()
    return state.packing.find(item => item.id === state.packingId);
  },
  activeOffer: (state, getters) => {
    return getters.activePacking.sku.find(item => item.id === state.offerId);
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
  isAvailableOffer: (state, getters) => {
    return getters.activeOffer.count + getters.activeOffer.count_remote > 0;
  },
};

// actions
const actions = {
  getAllPacking({ commit }) {
    commit('SET_ACTIVE_OFFER_ID', { id: global.product.offerId });
    commit('SET_ACTIVE_PACKING_ID', { id: global.product.productId });
    commit('SET_NAME', global.product.name);

    const arr = Object.keys(global.product.packing).map((key) => {
      const p = global.product.packing[key];
      p.sku = Object.keys(p.sku).map(key2 => ({
        id: parseInt(key2, 10),
        ...p.sku[key2],
      }));
      return p;
    });

    commit('SET_PACKING', arr);
  },
  selectPacking({ commit }, packing) {
    commit('SET_ACTIVE_PACKING_ID', packing);

    let newActiveOffer = packing.sku.find(item => item.count > 0);
    if (!newActiveOffer) {
      newActiveOffer = packing.sku.find(item => item.count_remote > 0);
    }
    if (!newActiveOffer) {
      newActiveOffer = packing.sku[0];
    }
    commit('SET_ACTIVE_OFFER_ID', newActiveOffer);
  },
  selectOffer({ commit }, offer) {
    commit('SET_ACTIVE_OFFER_ID', offer);
  },
};

// mutations
const mutations = {
  SET_NAME(state, name) {
    state.name = name;
  },

  SET_PACKING(state, packing) {
    state.packing = packing;
  },

  SET_ACTIVE_PACKING_ID(state, { id }) {
    state.packingId = id;
  },

  SET_ACTIVE_OFFER_ID(state, { id }) {
    state.offerId = id;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
