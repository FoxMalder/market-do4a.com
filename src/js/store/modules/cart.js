// import Cart from '../../api/cart';
import * as Api from '../../api';

const v = {
  success: '',
  message: '',
  data: {
    items: [{
      basketItemId: 984622,
      name: 'Название товаара',
      canBuy: true,
      pack: '454 гр',
      picture: '/upload/resizer/37/86081_68x68_3745347102daf8544307ca36782813aa.jpg?1559843654',
      price: 1190,
      price_benefit: 0,
      productId: 83397,
      quantity: 1,
      quantity_max: 7,
      sum: 1190,
      url: '/catalog/product/biotech_nitro_pure_whey_454_gr/',
    }],
    mapping: {
      83397: 984627,
    },
  },
};

// initial state
const state = {
  items: [],
  mapping: {},
  // checkoutStatus: null,
};

// getters
const getters = {
  // products: (state) => {
  //   if (state.all) {
  //     return Object.keys(state.all).map((key) => {
  //       const data = state.all[key].data;
  //       return data;
  //       // return {
  //       //   id: data.ID,
  //       //   name: data.NAME,
  //       //   url: data.DETAIL_PAGE_URL,
  //       //   // priceBase:
  //       //   quantity: data.QUANTITY, // Количество
  //       //
  //       //   price: data.PRICE, // Цена за единицу
  //       //   sum: data.SUM_NUM, // Итоговая сумма
  //       //   sumBase: data.SUM_BASE, // Итоговая сумма без скидки
  //       //   // amount: offer.AMOUNT,
  //       //
  //       //   imgUrl: data.DETAIL_PICTURE_SRC,
  //       //   imgUrl2x: data.DETAIL_PICTURE_SRC_2X,
  //       //
  //       //   measureName: data.MEASURE_NAME, // Единица измерения ("шт" и т.д)
  //       //   discountPrice: data.DISCOUNT_PRICE
  //       // };
  //       // {
  //       //   id: state.all[key].id,
  //       //   name: data.NAME,
  //       //   quantity: 0,
  //       //   price: 0,
  //       //   DISCOUNT_PRICE: 120,
  //       // }
  //     });
  //   }
  //   return null;
  // },
  availableProducts: state => state.items.filter(item => item.canBuy),
  getBasketItemById: state => id => state.items.find(item => item.basketItemId === id),
  getBasketItemByProductId: (state, getters) => productId => (
    Object.prototype.hasOwnProperty.call(state.mapping, productId)
      ? getters.getBasketItemById(state.mapping[productId])
      : false
  ),
  // availableProducts: state => state.items,
};

// actions
const actions = {
  // setBasket({ commit }, soaData) {
  //   commit('SET_PRODUCTS', global.soaData.result.GRID.ROWS);
  //   let =
  //   if (soaData) {
  //     commit('SET_PRODUCTS', soaData.result.GRID.ROWS);
  //   }
  // },
  getContents({ commit }) {
    if (global.demo) {
      commit('SET_BASKET', v.data);
    } else {
      Api.getBasketContents(
        data => commit('SET_BASKET', data),
      );
    }
  },
  clearCart({ commit, state }) {
    // const savedCartItems = [...state.items];
    const savedCart = { items: state.items, mapping: state.mapping };
    commit('SET_BASKET', { items: [], mapping: {} });

    Api.clearBasket(
      data => commit('SET_BASKET', data),
      (error) => commit('SET_BASKET', savedCart),
    );
  },
  // removeProductFromCart({ commit }, product) {
  //   console.log('remove product: ', product.ID);
  // },
  removeFromCart({ commit }, { basketItemId }) {
    const savedCart = { items: state.items, mapping: state.mapping };

    Api.removeFromBasket(
      basketItemId,
      data => commit('SET_BASKET', data),
      (error) => commit('SET_BASKET', savedCart),
    );
  },

  addProductToCart({ commit }, { productId, quantity }) {
    return new Promise((resolve, reject) => {
      Api.addProductToBasket(
        {
          productId,
          quantity,
          storeId: global.app.storeId,
        },
        data => commit('SET_BASKET', data) && resolve(),
        (error) => reject(error),
      );
    });
  },

  incrementItemQuantity({ commit, state }, basketItem) {
    return new Promise((resolve, reject) => {
      commit('INCREMENT_ITEM_QUANTITY', basketItem);

      Api.setQuantityInBasket(
        {
          basketId: basketItem.basketItemId,
          quantity: basketItem.quantity + 1,
          storeId: global.app.storeId,
        },
        (data) => {
          commit('SET_BASKET', data);
          resolve();
        },
        (error) => {
          console.log(basketItem);
          commit('DECREMENT_ITEM_QUANTITY', basketItem);
          reject(error);
        },
      );
    });
  },

  decrementItemQuantity({ commit, state }, basketItem) {
    return new Promise((resolve, reject) => {
      commit('DECREMENT_ITEM_QUANTITY', basketItem);
      Api.setQuantityInBasket(
        {
          basketId: basketItem.basketItemId,
          quantity: basketItem.quantity - 1,
          storeId: global.app.storeId,
        },
        data => commit('SET_BASKET', data) && resolve(),
        (error) => {
          commit('INCREMENT_ITEM_QUANTITY', basketItem);
          reject(error);
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
  SET_ITEM_QUANTITY(state, basketItemId, quantity) {
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
