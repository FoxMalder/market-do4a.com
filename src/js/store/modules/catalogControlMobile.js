// initial state
const state = {
  defaultContainer: 'filters',
  defaultTitle: 'Фильтр',
  title: 'Фильтр',
  isActive: false,
  isParent: true,
  // content: null,
  parentName: null,
  contentType: null,
};

// getters
const getters = {
  // checkedItems: (state, getters, rootState) => {
  //   return rootState.filters[state.defaultContainer][state.parentName].data.filter(item => item.checked).length;
  // },
  visibleBottomContent: (state, getters, rootState) => {
    if (state.defaultContainer === 'sort' && state.isParent) {
      return getters.visibleContent.filter(item => item.name !== 'Sort');
    }
    return false;
  },

  visibleContent: (state, getters, rootState) => {
    const filters = rootState.filters[state.defaultContainer];
    if (!state.parentName) {
      return Object.keys(filters).reduce((arr, key) => {
        if (key !== 'Type' && key !== 'Category') {
          if (key === 'Sort') {
            arr.push(filters[key]);
          } else {
            const opt = {
              type: 'multifilter',
              name: key,
              label: filters[key].label,
              childType: filters[key].type,
              activeChildren: [],
            };

            if (opt.childType === 'checkbox') {
              opt.activeChildren = filters[key].data.filter(item => item.checked).map(item => item.label) || [];

              opt.replaceTitle = filters[key].replaceTitle
                && (opt.activeChildren.length > 0 ? opt.activeChildren.join(', ') : filters[key].labelEmpty);
            }
            arr.push(opt);
          }
          // }
        }
        return arr;
      }, []);
    }
    return filters[state.parentName].data;
  },

  canReset: (state, getters, rootState) => {
    if (state.contentType === 'checkbox') {
      return rootState.filters[state.defaultContainer][state.parentName].data.filter(item => item.checked).length > 0;
    }
    return true;
  },
};

// actions
const actions = {
  showMenu({ commit }, { name, title }) {
    $('html, body').animate({
      scrollTop: global.app.Header.header.fixedTargets.getBoundingClientRect().top + window.pageYOffset,
    });
    document.body.style.overflow = 'hidden';

    commit('SET_DEFAULT_CONTAINER', name);
    commit('SET_DEFAULT_TITLE', title);
    commit('SET_CONTENT_TYPE', null);
    commit('SET_PARENT_NAME', null);
    commit('SET_IS_PARENT', true);
    commit('SET_TITLE', title);

    commit('SET_IS_ACTIVE', true);
  },
  hideMenu({ commit, dispatch }) {
    document.body.style.overflow = '';
    commit('SET_IS_ACTIVE', false);

    dispatch('filters/onChange', null, { root: true });
  },
  showParents({ commit, state }) {
    commit('SET_CONTENT_TYPE', null);
    commit('SET_PARENT_NAME', null);
    commit('SET_IS_PARENT', true);
    commit('SET_TITLE', state.defaultTitle);
  },
  showChildrens({ commit }, item) {
    commit('SET_PARENT_NAME', item.name);
    commit('SET_CONTENT_TYPE', item.childType);
    commit('SET_IS_PARENT', false);
    commit('SET_TITLE', item.label);
  },
  // reset({ commit }, { type, name }) {
  //   if (type === 'checkbox') {
  //     commit('RESET_CHECKBOX', name);
  //   }
  // },
};

// mutations
const mutations = {
  SET_DEFAULT_CONTAINER(state, name) {
    state.defaultContainer = name;
  },
  SET_DEFAULT_TITLE(state, title) {
    state.defaultTitle = title;
  },
  SET_IS_ACTIVE(state, status) {
    state.isActive = status;
  },
  SET_IS_PARENT(state, status) {
    state.isParent = status;
  },
  SET_PARENT_NAME(state, parentName) {
    state.parentName = parentName;
  },
  SET_CONTENT_TYPE(state, type) {
    state.contentType = type;
  },
  SET_TITLE(state, title) {
    state.title = title;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
