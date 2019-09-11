// import Cart from '../../api/cart';
import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';


// initial state
const state = {
  items: [],
  mapping: {},
  basketStatus: null,
};

// getters
const getters = {
  availableProducts: state => state.items.filter(item => item.canBuy || item.canBy),
  getBasketItemById: state => id => state.items.find(item => item.basketItemId === id),
  getBasketItemByProductId: (state, getters) => productId => (
    (state.mapping && Object.prototype.hasOwnProperty.call(state.mapping, productId))
      ? getters.getBasketItemById(state.mapping[productId])
      : false
  ),
  // availableProducts: state => state.items,
};


// actions
const actions = {
  getContents({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      let basket = null;

      if (localStorage.getItem('basket')) {
        try {
          basket = JSON.parse(localStorage.getItem('basket'));
        } catch (e) {
          localStorage.removeItem('basket');
        }
      }

      if (basket) {
        commit('SET_BASKET', basket);
        resolve();
        Utils.log('Basket', 'Load from localStorage');
      }

      Api.getBasketContents()
        .then((data) => {
          commit('SET_BASKET', data);
          resolve();
          localStorage.setItem('basket', JSON.stringify(data));
          Utils.log('Basket', 'Updated from API');
        })
        .catch(error => reject(error));
    });
  },

  clearCart({ commit, dispatch, state }) {
    const savedCart = {
      items: [...state.items],
      mapping: { ...state.mapping },
    };
    commit('SET_BASKET', { items: [], mapping: {} });

    dispatch(ADD_TOAST_MESSAGE, {
      title: 'Корзина очищена',
      text: 'Но вы еще можете вернуть всё обратно.',
      onCancel: () => {
        commit('SET_BASKET', savedCart);
      },
      onTimeout: () => {
        Api.clearBasket().then((data) => {
          localStorage.removeItem('basket');
          // commit('SET_BASKET', data);
        }).catch(() => commit('SET_BASKET', savedCart));
      },
    }, { root: true });
  },

  removeFromCart({ dispatch, commit, state }, { basketItemId }) {
    if (state.items.length <= 1) {
      dispatch('clearCart');
      return;
    }

    const savedCart = {
      items: [...state.items],
      mapping: { ...state.mapping },
    };

    // const items = state.items.filter(item => item.basketItemId !== basketItemId);
    // commit('SET_BASKET', { items });

    Api.removeFromBasket(basketItemId)
      .then((data) => {
        localStorage.setItem('basket', JSON.stringify(data));
        commit('SET_BASKET', data);
      })
      .catch(() => commit('SET_BASKET', savedCart));
  },

  addProductToCart({ commit }, { productId, quantity, isRemote = true }) {
    return new Promise((resolve, reject) => {
      const request = {
        productId,
        quantity,
        storeId: isRemote ? global.app.storeRemoteId : global.app.storeId,
      };

      Api.addProductToBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);
          resolve();
        })
        .catch(error => reject(error));
    });
  },

  setItemQuantity({ commit, state }, basketItem, newQuantity) {
    return new Promise((resolve, reject) => {
      const currentItem = state.items.find(item => item.basketItemId === basketItem.basketItemId);
      const savedQuantity = currentItem.quantity;

      const request = {
        basketId: basketItem.basketItemId,
        quantity: newQuantity,
        // storeId: 0
      };

      commit('SET_ITEM_QUANTITY', basketItem, newQuantity);

      Api.setQuantityInBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);
          resolve();
        })
        .catch((error) => {
          commit('SET_ITEM_QUANTITY', basketItem, savedQuantity);
          reject(error);
        });
    });
  },

  incrementItemQuantity({ commit }, basketItem) {
    return new Promise((resolve, reject) => {
      const request = {
        basketId: basketItem.basketItemId,
        quantity: basketItem.quantity + 1,
        // storeId: 0
      };

      commit('INCREMENT_ITEM_QUANTITY', basketItem);

      Api.setQuantityInBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);
          resolve();
        })
        .catch((error) => {
          commit('DECREMENT_ITEM_QUANTITY', basketItem);
          reject(error);
        });
    });
  },

  decrementItemQuantity({ commit }, basketItem) {
    return new Promise((resolve, reject) => {
      const request = {
        basketId: basketItem.basketItemId,
        quantity: basketItem.quantity - 1,
        // storeId: 0
      };

      commit('DECREMENT_ITEM_QUANTITY', basketItem);

      Api.setQuantityInBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);
          resolve();
        })
        .catch((error) => {
          commit('INCREMENT_ITEM_QUANTITY', basketItem);
          reject(error);
        });
    });
  },
};

// mutations
const mutations = {
  SET_STATUS: (state, status) => {
    state.basketStatus = status;
  },
  SET_BASKET: (state, { items, mapping }) => {
    state.items = items;
    state.mapping = mapping;
  },
  SET_PRODUCTS: (state, products) => {
    state.items = products;
  },
  SET_MAPPING: (state, mapping) => {
    state.mapping = {
      ...state.mapping,
      ...mapping,
    };
  },
  SET_ITEM_QUANTITY: (state, { basketItemId }, quantity) => {
    const cartItem = state.items.find(item => item.basketItemId === basketItemId);
    cartItem.quantity = quantity;
  },
  INCREMENT_ITEM_QUANTITY: (state, { basketItemId }) => {
    const cartItem = state.items.find(item => item.basketItemId === basketItemId);
    cartItem.quantity += 1;
  },
  DECREMENT_ITEM_QUANTITY: (state, { basketItemId }) => {
    const cartItem = state.items.find(item => item.basketItemId === basketItemId);
    cartItem.quantity -= 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
