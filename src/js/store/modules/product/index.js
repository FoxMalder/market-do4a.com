/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

// import Reviews from '../../api/reviews';
// import Product from '@/api/product';

import reviews from './reviews';
import similar from './similar';


let position = 0;

function gtmAddEvent(data) {
  console.log('[GTM]:', 'Event data:', data);

  if (global.dataLayer) {
    global.dataLayer.push(data);
  } else {
    console.warn('[GTM]:', 'Not Installed');
  }
}


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
  textDeliveryCentral: '',
  textDeliveryLocal: '',
  sectionTitle: '',
  sectionLink: '',
};


// getters
const getters = {
  /**
   * Выбранная фасовка
   * @returns {Object}
   */
  activePacking: state => state.packing.find(item => item.id === state.packingId)
    || state.packing[0],

  /**
   * Выбранный оффер
   * @returns {Object}
   */
  activeOffer: (state, getters) => getters.activePacking.sku.find(item => item.id === state.offerId)
    || getters.activePacking.sku[0],

  visibleOffers: (state, getters) => (getters.activePacking ? getters.activePacking.sku : []),

  /**
   * Оффера в наличии
   * @returns {Array}
   */
  availableOffers: (state, getters) => getters.visibleOffers.filter(item => item.count_group > 0),

  /**
   * Оффера в наличии на ЦС
   * @returns {Array}
   */
  availableDeliveryOffers: (state, getters) => getters.visibleOffers.filter(item => item.count_group === 0 && item.count_remote > 0),

  /**
   * Оффера, которых нет в наличии
   * @returns {Array}
   */
  notAvailableOffers: (state, getters) => getters.visibleOffers.filter(item => item.count_group === 0 && item.count_remote === 0),

  isAvailablePacking: (state, getters) => getters.availableOffers.length > 0 || getters.availableDeliveryOffers.length > 0,

  isAvailableOffer: (state, getters) => (getters.activeOffer
    ? (getters.activeOffer.count_group > 0 || getters.activeOffer.count_remote > 0)
    : false),

  isAvailableDeliveryOffer: (state, getters) => (getters.activeOffer
    ? (getters.activeOffer.count_group === 0 && getters.activeOffer.count_remote > 0)
    : false),
};

// actions
const actions = {
  init({ commit, getters, dispatch, rootGetters }, product) {
    if (!Array.isArray(product.packing)) {
      product.packing = Object.values(product.packing);
    }

    product.packing.forEach((pack) => {
      if (Array.isArray(pack.sku)) {
        return;
      }
      pack.sku = Object.keys(pack.sku).map((key) => ({
        ...pack.sku[key],
        id: parseFloat(key),
      }));
    });

    // commit('SET_NAME', { name: global.product.name });
    commit('SET_PARAM', product);

    commit('SET_PACKING', { packing: product.packing });
    commit('SET_ACTIVE_OFFER_ID', { id: product.offerId });
    commit('SET_ACTIVE_PACKING_ID', { id: product.productId });


    const store = (getters.activeOffer.count_group < 1 && getters.activeOffer.count_remote > 0)
      ? 'основной склад'
      : rootGetters.currentStore && rootGetters.currentStore.name;

    gtmAddEvent({
      event: 'detail',
      stock: store,
      ecommerce: {
        detail: {
          products: [
            {
              id: product.offerId,
              name: getters.activePacking.name,
              price: getters.activeOffer.price,
              // category: '',
              quantity: 1,
              dimension3: store,
              position: 0,
            },
          ],
        },
      },
    });


    // dispatch('reviews/update');
    // dispatch('similar/update');
  },

  selectPacking({ dispatch, commit, rootState, rootGetters }, packing) {
    let newActiveOffer = packing.sku.find(item => item.count_group > 0);
    if (!newActiveOffer) {
      newActiveOffer = packing.sku.find(item => item.count_remote > 0);
    }
    if (!newActiveOffer) {
      newActiveOffer = packing.sku[0];
    }

    commit('SET_ACTIVE_PACKING_ID', packing);
    commit('SET_ACTIVE_OFFER_ID', newActiveOffer);


    const store = (newActiveOffer.count_group < 1 && newActiveOffer.count_remote > 0)
      ? 'основной склад'
      : rootGetters.getStoreById(rootState.storeId).name;

    gtmAddEvent({
      event: 'detail',
      stock: store,
      ecommerce: {
        detail: {
          products: [
            {
              id: newActiveOffer.id,
              name: packing.name,
              price: newActiveOffer.price,
              // category: '',
              quantity: 1,
              dimension3: store,
              position: position += 1,
            },
          ],
        },
      },
    });

    dispatch('reviews/update');
    dispatch('similar/update');
  },

  selectOffer({ commit, getters, rootState, rootGetters }, offer) {
    commit('SET_ACTIVE_OFFER_ID', offer);

    const store = (offer.count_group < 1 && offer.count_remote > 0)
      ? 'основной склад'
      : rootGetters.getStoreById(rootState.storeId).name;

    gtmAddEvent({
      event: 'detail',
      stock: store,
      ecommerce: {
        detail: {
          products: [
            {
              id: offer.id,
              name: getters.activePacking.name,
              price: offer.price,
              // category: '',
              quantity: 1,
              dimension3: store,
              position: position += 1,
            },
          ],
        },
      },
    });
  },
};

// mutations
const mutations = {
  SET_PARAM(state, param) {
    state.textDeliveryCentral = param.textDeliveryCentral;
    state.textDeliveryLocal = param.textDeliveryLocal;

    state.category = param.category;
    state.country = param.country;
    state.sectionTitle = param.sectionTitle;
    state.sectionLink = param.sectionLink;
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

  SET_FAVORITES_STATUS(state, { id, status }) {
    const packingItem = state.packing.find(item => item.id === id);
    packingItem.isFavorite = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,

  modules: {
    similar,
    reviews,
  },
};
