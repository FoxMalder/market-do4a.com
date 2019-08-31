const PREFIX = 'notifications/';

const ADD = `${PREFIX}ADD_TOAST_MESSAGE`;
const REMOVE = `${PREFIX}REMOVE_TOAST_MESSAGE`;
// const CANCEL = `${PREFIX}CANCEL_TOAST_MESSAGE`;

export {
  ADD as ADD_TOAST_MESSAGE,
  REMOVE as REMOVE_TOAST_MESSAGE,
};

const Id = (i => () => i++)(0);

const defaultOptions = {
  type: 'info',
  duration: 5000,
};

const state = {
  messages: [],
};

const getters = {};

const actions = {
  [ADD]({ commit }, data) {
    // const param = {
    //   id: Id(),
    //   title: '',
    //   text: '',
    //   type: 'info',
    //   dismissAfter: 7000,
    //   onCancel: null,
    //   onClose: null,
    //   timer: setTimeout(() => commit(REMOVE, id), dismissAfter),
    // };
    // const id = Id();

    // const message = {};

    // message.timer = setInterval(() => {
    //   if (this.time > 0) {
    //     commit('DECREMENT_TIME', message);
    //   } else {
    //     commit(REMOVE, id);
    //   }
    // }, 1000);


    commit(ADD, {
      id: Id(),
      // timer: setTimeout(() => commit(REMOVE, id), data.duration || defaultOptions.duration),
      ...defaultOptions,
      ...data,
    });
  },

  [REMOVE]({ commit }, id) {
    commit(REMOVE, id);
    // clearInterval(message.timer);
  },

  // [CANCEL]({ commit, state }, id) {
  //   const message = state.messages.find(m => m.id === id);
  //   if (typeof message.onClose === 'function') {
  //     message.onCancel();
  //   }
  //   clearTimeout(message.timer);
  //
  //   commit(REMOVE, message.id);
  // },

  // start({ commit }, ) {
  //
  // }
};

const mutations = {
  [ADD](state, message) {
    state.messages.push(message);
  },

  [REMOVE](state, id) {
    state.messages = state.messages.filter(m => m.id !== id);
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations,
};
