import Reviews from '@/api/reviews';


const state = {
  reviewsLoading: false,
  page: 1,
  count: 0,
  items: [],
};

const getters = {};


const actions = {
  nextPage({ state, dispatch }) {
    dispatch('update', state.page + 1);
  },

  add({ rootState, dispatch }, data) {
    return Reviews.addReview(rootState.product.packingId, data)
      .then((response) => {
        dispatch('update');
        return response;
      })
      .catch((error) => {
        alert(error.message || error.response.message);
        throw error;
      });
  },

  update({ rootState, commit }, page = 1) {
    commit('SET_REVIEWS_LOADING', true);

    Reviews.getReviews(rootState.product.packingId, page)
      .then((data) => {
        if (page > 1) {
          commit('PUSH_REVIEW_TO_REVIEWS', data.items);
        } else {
          commit('SET_REVIEWS', data.items);
        }
        commit('SET_REVIEWS_PAGE', page);
        commit('SET_REVIEWS_COUNT', data.count);
        // commit('product/SET_REVIEWS_COUNT', response.data.count, { root: true });
      })
      .catch((error) => {
        // console.log('getReviews catch', error);
        // alert(error.message || error.response.message);
        console.log(error.message || error.response.message);
      })
      .finally(() => {
        commit('SET_REVIEWS_LOADING', false);
      });
  },
};


const mutations = {
  SET_REVIEWS(state, reviews) {
    state.items = reviews;
  },

  PUSH_REVIEW_TO_REVIEWS(state, review) {
    state.items.push(...review);
  },

  SET_REVIEWS_PAGE(state, page) {
    state.page = page;
  },

  SET_REVIEWS_LOADING(state, isLoading) {
    state.reviewsLoading = isLoading;
  },

  SET_REVIEWS_COUNT(state, count) {
    // const pack = state.packing.find(item => item.id === state.packingId);
    // pack.review = count;
    state.count = count;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
