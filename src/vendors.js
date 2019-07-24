import './js/common';

import './scss/main.scss';

// import Masonry from 'masonry-layout';
import Macy from 'macy';
// import Vue from 'vue';
import Vuex from 'vuex';
// import { mapState, mapActions } from 'vuex';
import Vue from 'vue/dist/vue.esm';
// import StickySidebar from './js/plugins/sticky-sidebar';
import { CheckboxFilter } from './js/components/Multifilter';
import MultifilterCheckboxList from './js/components/MultifilterCheckboxList.vue';
import CategoryListMobile from './js/components/CategoryListMobile.vue';
// import './js/page/catalog';

Vue.use(Vuex);

if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}

// const moduleA = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// };

const store = new Vuex.Store({
  state: {
    search: '',
    filters: {
      Type: {
        selected: [],
      },
      Category: {
        selected: [],
      },
    },
    // vendors: [],
  },
  getters: {
    // checkedItemsByName: state => name => state.filters[name].data.filter(item => item.checked),
    // availableByName: state => name => state.filters[name].data.filter(item => item.available),
    // notAvailableByName: state => name => state.filters[name].data.filter(item => !item.available),
    // notAvailableVisibleByNameCount: (state, getters) => name => getters.notAvailableByName(name).filter(item => !item.available && !item.filtered).length,
  },
  mutations: {
    setFilter(state, filter) {
      Vue.set(state.filters, filter.name, {
        // disabled: false,
        ...state.filters[filter.name],
        ...filter,
      });
    },
    setFilters(state, filters) {
      state.filters = filters;
    },


    ADD_PRODUCT_CATEGORY(state, value) {
      state.filters.Category.selected.push(value);
    },
    REMOVE_PRODUCT_CATEGORY(state, value) {
      state.filters.Category.selected = state.filters.Category.selected.filter(item => item !== value);
    },
    CLEAR_PRODUCT_CATEGORY(state) {
      state.filters.Category.selected = [];
    },

    ACTIVATE_PRODUCT_CATEGORY(state) {
      state.filters.Category.disabled = false;
      state.filters.Category.defaultLabel = 'Не выбрано';
    },
    DEACTIVATE_PRODUCT_CATEGORY(state) {
      state.filters.Category.disabled = true;
      state.filters.Category.defaultLabel = 'Выберите тип товара';
      state.filters.Category.data.forEach((item) => {
        item.hidden = true;
        item.checked = false;
      });
    },

    SHOW_CHILDREN_CATEGORY(state, parentId) {
      state.filters.Category.data.forEach((item) => {
        if (item.parent === parentId) {
          item.hidden = false;
        }
      });
    },
    HIDE_CHILDREN_CATEGORY(state, parentId) {
      state.filters.Category.data.forEach((item) => {
        if (item.parent === parentId) {
          item.hidden = true;
          item.checked = false;
        }
      });
    },

    ADD_PRODUCT_TYPE(state, parentId) {
      state.filters.Type.selected.push(parentId);
    },
    REMOVE_PRODUCT_TYPE(state, parentId) {
      state.filters.Type.selected = state.filters.Type.selected.filter(item => item !== parentId);
    },
    CLEAR_PRODUCT_TYPE(state) {
      state.filters.Type.selected = [];
    },


    setVendors(state, vendors) {
      state.vendors = vendors;
    },
    SET_SEARCH_VALUE(state, value) {
      state.search = value.trim().toLowerCase();
    },
    FILTER_CARDS(state) {
      // const values = state.checkList;
      // const sections = [...values.type, ...values.category];
      // console.log(sections);
      state.vendors.forEach((item) => {
        if (
          (item.name.indexOf(state.search) !== -1 || state.search.length === 0)
          && (item.sections.filter(id => (state.filters.Type.selected.indexOf(id) !== -1)).length > 0 || state.filters.Type.selected.length === 0)
          && (item.sections.filter(id => (state.filters.Category.selected.indexOf(id) !== -1)).length > 0 || state.filters.Category.selected.length === 0)
        ) {
          item.el.style.display = '';
        } else {
          item.el.style.display = 'none';
        }
      });
    },
  },
  actions: {
    checkboxReset({ commit }, filter) {
      filter.data.forEach((checkbox) => {
        checkbox.checked = false;
      });
      if (filter.name === 'Type') {
        commit('DEACTIVATE_PRODUCT_CATEGORY');
        commit('CLEAR_PRODUCT_TYPE');
        commit('CLEAR_PRODUCT_CATEGORY');
      } else if (filter.name === 'Category') {
        commit('CLEAR_PRODUCT_CATEGORY');
      }
      commit('FILTER_CARDS');
    },
    checkboxChange({ commit, state }, event) {
      if (event.target.checked) {
        if (event.name === 'Type') {
          commit('SHOW_CHILDREN_CATEGORY', event.target.value);
          commit('ADD_PRODUCT_TYPE', event.target.value);
        } else if (event.name === 'Category') {
          commit('ADD_PRODUCT_CATEGORY', event.target.value);
        }
      } else {
        if (event.name === 'Type') {
          commit('HIDE_CHILDREN_CATEGORY', event.target.value);
          commit('REMOVE_PRODUCT_TYPE', event.target.value);
        } else if (event.name === 'Category') {
          commit('REMOVE_PRODUCT_CATEGORY', event.target.value);
        }
      }

      if (state.filters.Type.selected.length > 0) {
        commit('ACTIVATE_PRODUCT_CATEGORY');
      } else {
        commit('DEACTIVATE_PRODUCT_CATEGORY');
      }

      commit('FILTER_CARDS');
    },
  },
});

class Vendors {
  constructor() {
    this.searchField = document.querySelector('.page-header .search-fild__input');


    this.vendors = null;
    this.filter = null;
    this.macy = null; // Masonry

    this.typeEl = document.querySelectorAll('fieldset.multifilter')[0];
    this.categoryEl = document.querySelectorAll('fieldset.multifilter')[1];

    // this.filterValues = {
    //   search: this.searchField.value || '',
    //   sections: [],
    // };

    this.parse();
    this.init();
  }

  parse() {
    // TODO: Добавить полифилл Array.from()
    store.commit('setVendors', Array.from(document.querySelectorAll('.vendor-card'), item => ({
      el: item,
      shown: true,
      name: item.querySelector('.vendor-card__title').innerHTML.toLowerCase(),
      sections: item.dataset.sectionsId ? item.dataset.sectionsId.split(',') : [],
    })));

    store.commit('setFilter', {
      ...CheckboxFilter.parseSettings(this.typeEl),
      name: 'Type',
    });

    store.commit('setFilter', {
      ...CheckboxFilter.parseSettings(this.categoryEl),
      name: 'Category',
      defaultLabel: 'Выберите тип товара',
      disabled: true,
    });
  }

  init() {
    new Vue({
      store,
      render: h => h(CategoryListMobile),
    }).$mount('#vueMobile');

    this.vm = new Vue({
      el: document.querySelector('.view__category'),
      store,
      computed: {
        ...Vuex.mapState({
          filters: state => state.filters,
        }),
      },
      template: `<div class="view__category"><MultifilterCheckboxList v-for="filter in filters" :filter="filter"/></div>`,
      components: { MultifilterCheckboxList },
    });


    this.searchField.addEventListener('input', this.onSearch);
    this.searchField.addEventListener('change', this.onSearch);

    // Masonry
    const masonryEl = document.querySelector('.brand-name-list');
    this.macy = Macy({
      container: masonryEl,
      trueOrder: false,
      useOwnImageLoader: true,
      // margin: 24,
      mobileFirst: true,
      columns: 2,
      breakAt: {
        1240: 6,
        768: 4,
        576: 3,
      },
    });
    $('.multifilter__tab').on('shown.bs.tab', () => {
      this.macy.recalculate();
    });
  }

  // /**
  //  * Фильтрация по категории и строке поиска
  //  * @param values
  //  */
  // filterItems(values = store.state.checkList) {
  //   this.vendors.forEach((item) => {
  //     if (
  //       (item.name.indexOf(values.search) !== -1 || values.search.length === 0)
  //       && (item.sections.filter(id => (values.sections.indexOf(id) !== -1)).length > 0 || values.sections.length === 0)
  //     ) {
  //       item.el.style.display = '';
  //     } else {
  //       item.el.style.display = 'none';
  //     }
  //   });
  // }

  onSearch = (event) => {
    event.preventDefault();

    store.commit('SET_SEARCH_VALUE', event.target.value);
    store.commit('FILTER_CARDS');

    // this.filterValues.search = event.target.value.trim().toLowerCase();
    // this.filterItems();
  };


  // new CheckboxFilter(document.querySelector('fieldset.multifilter'), (filter) => {
  //   filterValues.category = filter.data.value;
  //   filterItems(filterValues);
  // });
  // new CheckboxFilter(document.querySelector('fieldset.multifilter'), (filter) => {
  //   filterValues.category = filter.data.value;
  //   filterItems(filterValues);
  // });
}

$(() => {
  // initVendorsList();
  global.app.Vendors = new Vendors();
});
