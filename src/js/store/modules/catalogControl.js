import catalogControlMobile from './catalogControlMobile';

// initial state
const state = {
  callback: null,
  filters: {},
  sort: {},
};

// getters
const getters = {
  checkedItemsByName: state => name => state.filters[name].data.filter(item => item.checked),
  checkedItemIdsByName: (state, getters) => name => getters.checkedItemsByName(name).map(item => item.value),
};

// actions
const actions = {
  filterReset({ commit }, { type, container, name }) {
    if (type === 'checkbox') {
      commit('RESET_CHECKBOX_BY_NAME', { container, name });
    }
  },
  onChange() {},
};

// mutations
const mutations = {
  RESET_CHECKBOX_BY_NAME(state, { container, name }) {
    state[container][name].data.forEach((item) => {
      item.checked = false;
    });
  },
  // setCallback(state, callback) {
  //   state.callback = callback;
  // },
  setFilter(state, filter) {
    state.filters = {
      ...state.filters,
      [filter.name]: filter,
    };
    // Vue.set(state.list, filter.name, filter);
  },
  setFilters(state, filters) {
    state.filters = filters;
  },
  // filterReset() {
  //   console.log('reset');
  // },
  // filterChange() {
  //   console.log('change');
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    mobile: catalogControlMobile,
  },
};
