// import Cart from '../../api/cart';
import * as Api from '../../api';
import { ADD_TOAST_MESSAGE } from './notifications';

// const v = {
//   success: '',
//   message: '',
//   data: {
//     items: [{
//       basketItemId: 984622,
//       name: 'Название товаара',
//       canBuy: true,
//       pack: '454 гр',
//       picture: '/upload/resizer/37/86081_68x68_3745347102daf8544307ca36782813aa.jpg?1559843654',
//       price: 1190,
//       price_benefit: 0,
//       productId: 83397,
//       quantity: 1,
//       quantity_max: 7,
//       sum: 1190,
//       url: '/catalog/product/biotech_nitro_pure_whey_454_gr/',
//     }],
//     mapping: {
//       83397: 984627,
//     },
//   },
// };

// initial state
const state = {
  items: [],
  mapping: {},
  // checkoutStatus: null,
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
  getFromSOA({ commit }, order) {
    const items = Object.keys(order.GRID.ROWS).map((key) => {
      const { data } = order.GRID.ROWS[key];
      // mapping[data.PRODUCT_ID] = parseInt(data.ID, 10);
      return {
        basketItemId: parseInt(data.ID, 10),
        productId: parseInt(data.PRODUCT_ID, 10),
        name: data.NAME,
        canBuy: data.CAN_BUY === 'Y',

        quantity: parseInt(data.QUANTITY, 10), // Количество
        quantity_max: 10,

        price: parseFloat(data.PRICE), // Цена за единицу
        priceBase: parseFloat(data.BASE_PRICE), // Цена за единицу без скидки
        price_benefit: parseFloat(data.DISCOUNT_PRICE), // Скидка за единицу
        sum: parseFloat(data.SUM_NUM), // Итоговая сумма за N единиц
        sumBase: parseFloat(data.SUM_BASE), // Итоговая сумма за N единиц без скидки

        url: data.DETAIL_PAGE_URL,
        picture: data.DETAIL_PICTURE_SRC,
        picture2x: data.DETAIL_PICTURE_SRC_2X,

        pack: '',
        measureName: data.MEASURE_NAME, // Единица измерения ("шт" и т.д)
      };
    });
    commit('SET_PRODUCTS', items);
  },
  async getContents({ commit, dispatch }) {
    console.log('cart/getContents');
    if (Object.prototype.hasOwnProperty.call(global, 'soaData')) {
      await dispatch('getFromSOA', global.soaData.result);
    } else {
      commit('SET_BASKET', await Api.getBasketContents());
    }
  },
  clearCart({ commit, dispatch, state }) {
    // const savedCartItems = [...state.items];
    const savedCart = { items: state.items, mapping: state.mapping };
    commit('SET_BASKET', { items: [], mapping: {} });

    dispatch(ADD_TOAST_MESSAGE, {
      title: 'корзина очищена',
      text: 'Но вы еще можете вернуть всё обратно.',
      onCancel: () => {
        commit('SET_BASKET', savedCart);
      },
      onTimeout: () => {
        Api.clearBasket(
          data => commit('SET_BASKET', data),
          (error) => commit('SET_BASKET', savedCart),
        );
      },
    }, { root: true });
  },
  // removeProductFromCart({ commit }, product) {
  //   console.log('remove product: ', product.ID);
  // },
  removeFromCart({ commit, state }, { basketItemId }) {
    const savedCart = { items: state.items, mapping: state.mapping };

    // const items = state.items.filter(item => item.basketItemId !== basketItemId);
    // commit('SET_BASKET', { items });

    Api.removeFromBasket(
      basketItemId,
      data => commit('SET_BASKET', data),
      (error) => commit('SET_BASKET', savedCart),
    );
  },

  addProductToCart({ commit }, { productId, quantity, isRemote = true }) {
    return new Promise((resolve, reject) => {
      Api.addProductToBasket(
        {
          productId,
          quantity,
          storeId: isRemote ? global.app.storeRemoteId : global.app.storeId,
        },
        (data) => {
          commit('SET_BASKET', data);
          resolve();
        },
        (error) => reject(),
      );
    });
  },

  setItemQuantity({ commit, store }, basketItem, newQuantity) {
    return new Promise((resolve, reject) => {
      const currentItem = store.items.find(item => item.basketItemId === basketItem.basketItemId);
      const savedQuantity = currentItem.quantity;

      const request = {
        basketId: basketItem.basketItemId,
        quantity: newQuantity,
        // storeId: global.app.storeManagerData.currentCityId === global.app.storeManagerData.noCityId
        //   ? global.app.storeRemoteId
        //   : global.app.storeId,
      };
      console.log('setItemQuantity', request);

      commit('SET_ITEM_QUANTITY', basketItem, newQuantity);

      Api.setQuantityInBasket(
        request,
        (data) => {
          commit('SET_BASKET', data);
          resolve();
        },
        (error) => {
          commit('SET_ITEM_QUANTITY', basketItem, savedQuantity);
          reject();
        },
      );
    });
  },

  incrementItemQuantity({ commit, state }, basketItem) {
    return new Promise((resolve, reject) => {
      // if (basketItem.quantity >= basketItem.quantity_max) {
      //   resolve();
      // }

      const request = {
        basketId: basketItem.basketItemId,
        quantity: basketItem.quantity + 1,
        // storeId: global.app.storeManagerData.currentCityId === global.app.storeManagerData.noCityId
        //   ? global.app.storeRemoteId
        //   : global.app.storeId,
      };
      console.log('incrementItemQuantity', request);

      commit('INCREMENT_ITEM_QUANTITY', basketItem);

      Api.setQuantityInBasket(
        request,
        (data) => {
          commit('SET_BASKET', data);
          resolve();
        },
        (error) => {
          commit('DECREMENT_ITEM_QUANTITY', basketItem);
          reject();
        },
      );
    });
  },

  decrementItemQuantity({ commit, state }, basketItem) {
    return new Promise((resolve, reject) => {
      // if (basketItem.quantity <= 0) {
      //   resolve();
      // }

      const request = {
        basketId: basketItem.basketItemId,
        quantity: basketItem.quantity - 1,
        // storeId: global.app.storeManagerData.currentCityId === global.app.storeManagerData.noCityId
        //   ? global.app.storeRemoteId
        //   : global.app.storeId,
      };
      console.log('decrementItemQuantity', request);

      commit('DECREMENT_ITEM_QUANTITY', basketItem);
      Api.setQuantityInBasket(
        request,
        (data) => {
          commit('SET_BASKET', data);
          resolve();
        },
        (error) => {
          commit('INCREMENT_ITEM_QUANTITY', basketItem);
          reject();
        },
      );
    });
  },
};

// mutations
const mutations = {
  SET_BASKET(state, { items, mapping }) {
    state.items = items;
    state.mapping = mapping;
  },
  SET_PRODUCTS(state, products) {
    state.items = products;
  },
  SET_MAPPING(state, mapping) {
    state.mapping = mapping;
  },
  SET_ITEM_QUANTITY(state, { basketItemId }, quantity) {
    const cartItem = state.items.find(item => item.basketItemId === basketItemId);
    cartItem.quantity = quantity;
  },
  INCREMENT_ITEM_QUANTITY(state, { basketItemId }) {
    const cartItem = state.items.find(item => item.basketItemId === basketItemId);
    cartItem.quantity += 1;
  },
  DECREMENT_ITEM_QUANTITY(state, { basketItemId }) {
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
