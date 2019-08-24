import Cart from '../../api/cart';

window.app.Cart = Cart;

// initial state
const state = {
  all: null,
};

// getters
const getters = {
  products: (state) => {
    if (state.all) {
      return Object.keys(state.all).map((key) => {
        const data = state.all[key].data;
        return data;
        // return {
        //   id: data.ID,
        //   name: data.NAME,
        //   url: data.DETAIL_PAGE_URL,
        //   // priceBase:
        //   quantity: data.QUANTITY, // Количество
        //
        //   price: data.PRICE, // Цена за единицу
        //   sum: data.SUM_NUM, // Итоговая сумма
        //   sumBase: data.SUM_BASE, // Итоговая сумма без скидки
        //   // amount: offer.AMOUNT,
        //
        //   imgUrl: data.DETAIL_PICTURE_SRC,
        //   imgUrl2x: data.DETAIL_PICTURE_SRC_2X,
        //
        //   measureName: data.MEASURE_NAME, // Единица измерения ("шт" и т.д)
        //   discountPrice: data.DISCOUNT_PRICE
        // };
        // {
        //   id: state.all[key].id,
        //   name: data.NAME,
        //   quantity: 0,
        //   price: 0,
        //   DISCOUNT_PRICE: 120,
        // }
      });
    }
    return null;
  },
};

// actions
const actions = {
  getCart({ commit }) {
    commit('SET_PRODUCTS', global.soaData.result.GRID.ROWS);
  },
  addProductToCart({ commit }, { productId, productQuantity }) {
    console.log(`Add product ${productId} to cart`);

    return Cart.addProduct({ productId, productQuantity });
  },
  removeProductFromCart({ commit }, product) {
    console.log('remove product: ', product.ID);
  },
  clearCart({ commit }) {
    console.log('clear cart');
  },
  incrementItemQuantity({ commit }, product) {
    console.log('incrementItemQuantity');
  },
  decrementItemQuantity({ commit }, product) {
    console.log('decrementItemQuantity');
  },
};

// mutations
const mutations = {
  SET_PRODUCTS(state, products) {
    state.all = products;
  },
  INCREMENT_ITEM_QUANTITY(state, { id }) {

  },
  DECREMENT_ITEM_QUANTITY(state, { id }) {
    // state.all[id].data
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
