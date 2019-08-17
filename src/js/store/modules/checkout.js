// initial state
const state = {
  result: null,
};

// getters
const getters = {
  shippingMethods: (state) => {
    if (state.result.LOCAL_STORE === 'N') {
      return state.result.DELIVERY.filter(item => !item.CALCULATE_ERRORS);
    }
    if (state.result.LOCAL_STORE === 'Y') {
      let courier = null;
      let pickup = null;

      state.result.DELIVERY.forEach((item) => {
        if (item.TYPE === 'C') {
          courier = item;
        }
        if (item.TYPE === 'P') {
          pickup = item;
        }
      });

      return [pickup, courier].filter(item => item);
    }
    return [];
  },
};

// actions
const actions = {
  getAll({ commit }) {
    commit('SET_DATA', global.soaData.result);
  },
};

// mutations
const mutations = {
  SET_DATA(state, result) {
    state.result = {
      TOTAL: result.TOTAL,
      DELIVERY: Object.values(result.DELIVERY).sort((a, b) => {
        const sort = parseInt(a.SORT, 10) - parseInt(b.SORT, 10);
        if (sort === 0) {
          return a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase() ? 1 : (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase() ? -1 : 0);
        }
        return sort;
      }),
      PAY_SYSTEM: result.PAY_SYSTEM,
      LOCAL_STORE: result.LOCAL_STORE,
      CURRENT_STORE: result.CURRENT_STORE,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
