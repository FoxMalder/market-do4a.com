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
  // TODO: Полифилл Array.find()
  activePacking: state => state.packing.find(item => item.id === state.packingId),
  activeOffer: (state, getters) => getters.activePacking.sku.find(item => item.id === state.offerId),
  visibleOffers: (state, getters) => getters.activePacking.sku,
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
    commit('SET_ACTIVE_PACKING_ID', { id: packing.id });
    commit('SET_ACTIVE_OFFER_ID', { id: packing.sku[0].id });
  },
  selectOffer({ commit }, offer) {
    commit('SET_ACTIVE_OFFER_ID', { id: offer.id });
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
