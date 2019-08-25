// import Cart from '../../api/cart';
import * as Api from '../../api';

// const v = {
//   success: '',
//   message: '',
//   data: {
//     items: [{
//       basketItemId: 984622,
//       canBy: true,
//       pack: '454 гр',
//       picture: '/upload/resizer/37/86081_68x68_3745347102daf8544307ca36782813aa.jpg?1559843654',
//       price: 1190,
//       price_benefit: 0,
//       productId: 83397,
//       quantity: 1,
//       quantity_max: 0,
//       sum: 1190,
//       url: '/catalog/product/biotech_nitro_pure_whey_454_gr/',
//     }],
//   },
// };

// initial state
const state = {
  items: [],
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
};

// actions
const actions = {
  getContents({ commit }) {
    // commit('SET_PRODUCTS', global.soaData.result.GRID.ROWS);
    Api.getBasketContents((products) => {
      commit('SET_PRODUCTS', products);
    });
  },
  clearCart({ commit }) {
    const savedCartItems = [...state.items];
    commit('SET_PRODUCTS', []);

    Api.clearBasket(
      () => commit('SET_PRODUCTS', []),
      () => commit('SET_PRODUCTS', savedCartItems),
    );
  },
  addProductToCart({ commit }, product) {
    return new Promise((resolve, reject) => {
      Api.addProductToBasket(
        product,
        (products) => {
          commit('SET_PRODUCTS', products);
          resolve();
        },
        () => reject(),
      );
    });
  },
  removeProductFromCart({ commit }, product) {
    console.log('remove product: ', product.ID);
  },
  removeFromCart({ commit }, { basketItemId }) {
    Api.removeFromBasket(basketItemId, (products) => {
      commit('SET_PRODUCTS', products);
    });
  },


  incrementItemQuantity({ commit }, product) {
    commit('INCREMENT_ITEM_QUANTITY', product);
  },
  decrementItemQuantity({ commit }, product) {
    commit('DECREMENT_ITEM_QUANTITY', product);
  },
};

// mutations
const mutations = {
  SET_PRODUCTS(state, products) {
    state.items = products;
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
