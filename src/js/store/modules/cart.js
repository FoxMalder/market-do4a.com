// import Cart from '../../api/cart';
import * as Api from '../../api';
import Utils from '../../utils/utils';
import { ADD_TOAST_MESSAGE } from './notifications';


// initial state
const state = {
  items: [],
  mapping: {},
  status: null,
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
    const savedCart = {
      items: [...state.items],
      mapping: { ...state.mapping },
    };
    commit('SET_BASKET', { items: [], mapping: {} });

    return new Promise((resolve, reject) => {
      dispatch(ADD_TOAST_MESSAGE, {
        title: 'Корзина очищена',
        text: 'Но вы еще можете вернуть всё обратно.',
        onCancel: () => {
          commit('SET_BASKET', savedCart);
          reject();
        },
        onTimeout: () => {
          Api.clearBasket()
            .then((data) => {
              localStorage.removeItem('basket');
              // commit('SET_BASKET', data);
              resolve();
            })
            .catch(() => {
              reject();
              dispatch(ADD_TOAST_MESSAGE, {
                title: 'Ошибка',
                text: 'Не удалось очистить корзину',
              }, { root: true });
              commit('SET_BASKET', savedCart);
            });
        },
      }, { root: true });
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
            dispatch(ADD_TOAST_MESSAGE, { title: 'Корзина очищена' }, { root: true });
          }

          dispatch('checkout/refreshOrderAjax', null, { root: true });
          localStorage.setItem('basket', JSON.stringify(data));
          commit('SET_BASKET', data);
          resolve();
        })
        .catch(() => {
          commit('SET_BASKET', savedCart);
          dispatch(ADD_TOAST_MESSAGE, {
            title: 'Ошибка',
            text: 'Не удалось удалить продукт',
          }, { root: true });
          reject();
        })
        .finally(() => commit('SET_STATUS', null));
    });
  },

  addProductToCart({ commit, rootState }, { productId, quantity, isRemote = true }) {
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
