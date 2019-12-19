import Vue from 'vue';

// import Cart from '../../api/cart';
import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';


function gtmAddEvent(data) {
  console.log('[GTM]:', 'Event data:', data);

  if (global.dataLayer) {
    global.dataLayer.push(data);
  } else {
    console.warn('[GTM]:', 'Not Installed');
  }
}


// initial state
const state = {
  items: [],
  mapping: {},
  status: null,
};

// getters
const getters = {
  availableProducts: state => state.items.filter(item => item.canBuy),
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
  init({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      let basket = null;

      commit('SET_STATUS', 'initialization');

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
        .catch(error => reject(error))
        .finally(() => commit('SET_STATUS', null));
    });
  },

  clearCart({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      // const savedCart = {
      //   items: [...state.items],
      //   mapping: { ...state.mapping },
      // };
      commit('SET_STATUS', 'loading');

      Api.clearBasket()
        .then((data) => {
          Vue.$notify.info('Корзина очищена');

          commit('SET_BASKET', { items: [], mapping: {} });
          localStorage.removeItem('basket');
          // commit('SET_BASKET', data);

          resolve(data);
        })
        .catch((error) => {
          Vue.$notify.error('Не удалось очистить корзину');
          // commit('SET_BASKET', savedCart);

          reject(error);
        })
        .finally(() => commit('SET_STATUS', null));
    });
  },

  removeFromCart({ dispatch, commit }, { basketItemId }) {
    return new Promise((resolve, reject) => {
      const savedCart = {
        items: [...state.items],
        mapping: { ...state.mapping },
      };

      commit('SET_STATUS', 'loading');

      Api.removeFromBasket(basketItemId)
        .then((data) => {
          if (data.items.length === 0) {
            Vue.$notify.info('Корзина очищена');
          }

          dispatch('checkout/refreshOrderAjax', null, { root: true });
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);

          resolve();
        })
        .catch(() => {
          Vue.$notify.error('Не удалось удалить продукт');
          commit('SET_BASKET', savedCart);

          reject();
        })
        .finally(() => commit('SET_STATUS', null));
    });
  },

  addProductToCart({ commit, rootState, rootGetters }, { productId, quantity, isRemote = true }) {
    return new Promise((resolve, reject) => {
      const request = {
        productId,
        quantity,
        storeId: isRemote ? rootState.storeRemoteId : rootState.storeId,
      };

      commit('SET_STATUS', 'loading');


      Api.addProductToBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);

          const basketItem = data.items.find(item => item.productId === productId);
          if (basketItem) {
            const store = isRemote
              ? 'Основной склад'
              : rootGetters.getStoreById(rootState.storeId).name;

            gtmAddEvent({
              event: 'addToCart',
              // dimension3: basketItem.calculateStoreId,
              // stock: basketItem.calculateStoreId,
              dimension3: store,
              stock: store,
              ecommerce: {
                currencyCode: 'RUB',
                add: {
                  products: [
                    {
                      id: basketItem.productId,
                      name: basketItem.name,
                      price: basketItem.sum,
                      category: '',
                      variant: '',
                      // dimension3: basketItem.calculateStoreId,
                      dimension3: store,
                      quantity: basketItem.quantity,
                    },
                  ],
                },
              },
            });
          }

          resolve();
        })
        .catch(error => reject(error))
        .finally(() => commit('SET_STATUS', null));
    });
  },

  setItemQuantity({ commit, dispatch }, { basketItemId, quantity }) {
    return new Promise((resolve, reject) => {
      // const currentItem = state.items.find(item => item.basketItemId === basketItem.basketItemId);
      // const savedQuantity = currentItem.quantity;

      const request = {
        basketId: basketItemId,
        quantity,
        // storeId: 0
      };

      // commit('SET_ITEM_QUANTITY', basketItem, newQuantity);

      commit('SET_STATUS', 'loading');

      Api.setQuantityInBasket(request)
        .then((data) => {
          localStorage.setItem('basket', JSON.stringify(data));
          dispatch('checkout/refreshOrderAjax', null, { root: true });
          commit('SET_BASKET', data);

          const basketItem = data.items.find(item => item.basketItemId === basketItemId);
          if (basketItem) {
            gtmAddEvent({
              event: 'addToCart',
              dimension3: basketItem.calculateStoreId,
              stock: basketItem.calculateStoreId,
              ecommerce: {
                currencyCode: 'RUB',
                add: {
                  products: [
                    {
                      id: basketItem.productId,
                      name: basketItem.name,
                      price: basketItem.sum,
                      category: '',
                      variant: '',
                      dimension3: basketItem.calculateStoreId,
                      quantity: basketItem.quantity,
                    },
                  ],
                },
              },
            });
          }

          resolve();
        })
        .catch(error => reject(error))
        .finally(() => commit('SET_STATUS', null));
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
    state.status = status;
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
