import catalogControlMobile from './catalogControlMobile';

// initial state
const state = {
  items: [],
  filters: {},
  sort: {},
};

// getters
const getters = {
  // filterByName: state => name => state.items.find(item => item.name === name),
  // horizontalFilters: state => state.items.filter(item => item.name === 'Type' || item.name === 'Category'),
  // modalFilters: state => state.items.filter(item => item.name !== 'Type' && item.name !== 'Category'),
  checkedItemsByName: state => name => state.filters[name].data.filter(item => item.checked),
  checkedItemIdsByName: (state, getters) => name => getters.checkedItemsByName(name).map(item => item.value),
};

// actions
const actions = {
  resetAll({ state, commit }) {
    Object.keys(state.filters).forEach((key) => {
      if (state.filters[key].type === 'checkbox') {
        commit('RESET_CHECKBOX_BY_NAME', { container: 'filters', name: key });
      }
    });
    // callback();
  },

  filterReset({ commit }, { type, container, name }) {
    if (type === 'checkbox') {
      commit('RESET_CHECKBOX_BY_NAME', { container, name });
    }
  },
  onChange() {
  },

  // changeParentItems()

  // activatedVariants
  // TODO: Переделать это говно к чертовой матери
  updateActivatedVariants({ state, commit }, { activatedVariants }) {
    Object.keys(activatedVariants).forEach((key) => {
      if ({}.hasOwnProperty.call(state.filters, key) && state.filters[key].type === 'checkbox') {
        state.filters[key].data.forEach((item, index) => {
          commit('SET_AVAILABLE_STATUS_BY_NAME', {
            name: key,
            index,
            status: {}.hasOwnProperty.call(activatedVariants[key], item.value),
          });
        });
      }
    });
  },
  // hiddenVariants
  // TODO: И эту херню в том числе
  updateHiddenVariants({ state, commit }, { hiddenVariants }) {
    Object.keys(hiddenVariants).forEach((key) => {
      if ({}.hasOwnProperty.call(state.filters, key) && state.filters[key].type === 'checkbox') {
        state.filters[key].data.forEach((item, index) => {
          commit('SET_HIDDEN_STATUS_BY_NAME', {
            name: key,
            index,
            status: {}.hasOwnProperty.call(hiddenVariants[key], item.value),
          });
        });
      }
    });
  },
};

// mutations
const mutations = {
  RESET_CHECKBOX_BY_NAME(state, { container, name }) {
    state[container][name].data.forEach((item) => {
      item.checked = false;
    });
  },
  SET_AVAILABLE_STATUS_BY_NAME(state, { name, index, status }) {
    state.filters[name].data[index].available = status;
  },
  SET_HIDDEN_STATUS_BY_NAME(state, { name, index, status }) {
    state.filters[name].data[index].hidden = status;
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
  pushFilterToContainer(state, { container, filter }) {
    state[container] = {
      ...state[container],
      [filter.name]: filter,
    };
    state.items.push(filter);
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
