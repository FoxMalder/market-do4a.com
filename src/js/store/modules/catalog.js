// initial state
const state = {
  count: 0, // Общее количество товаров
  items: [],
};

// getters
const getters = {
};

// actions
const actions = {
  addToCatalog() {

  },

};

// mutations
const mutations = {
  SET_COUNT(state, count) {
    state.count = count;
  },
  SET_CATALOG_ITEMS(state, items) {
    state.items = items;
  },
  PUSH_ITEM_TO_CATALOG(state, item) {
    state.items.push(item);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
