// initial state
const state = {
  filters: {},
};

// getters
const getters = {};

// actions
const actions = {
  // getAllProducts({ commit }) {
  //   shop.getProducts(products => {
  //     commit('setProducts', products);
  //   });
  // },
};

// mutations
const mutations = {
  setFilterItem(state, { filters }) {
    state.filters = filters;
  },

  // decrementProductInventory(state, { id }) {
  //   const product = state.all.find(product => product.id === id);
  //   product.inventory--;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
