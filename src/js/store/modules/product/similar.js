import Product from '@/api/product';


const state = {
  // similarRequestParam: {},
  similarLoading: false,
  items: [],
};

const getters = {};


const actions = {
  update({ rootState, commit }) {
    commit('SET_SIMILAR_LOADING', true);

    Product.getSimilar(rootState.product.packingId)
      .then((data) => {
        commit('SET_SIMILAR', data.items);
      })
      .catch((error) => {
        // console.log('getSimilar catch', error);
        // alert(error.message || error.response.message);
      })
      .finally(() => {
        commit('SET_SIMILAR_LOADING', false);
      });
  },
};


const mutations = {
  SET_SIMILAR(state, similar) {
    state.items = similar;
  },

  SET_SIMILAR_LOADING(state, isLoading) {
    state.similarLoading = isLoading;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
