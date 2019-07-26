import './js/common';

import './scss/main.scss';

// import Masonry from 'masonry-layout';
import Macy from 'macy';
// import Vue from 'vue';
// import Vuex from 'vuex';
import Vue from 'vue';
// import StickySidebar from './js/plugins/sticky-sidebar';
import { mapState } from 'vuex';
import { CheckboxFilter, Multifilter, PriceFilter, RadioFilter } from './js/components/Multifilter';
import MultifilterCheckboxList from './js/components/MultifilterCheckboxList.vue';
import CategoryListMobile from './js/components/CategoryListMobile.vue';
// import './js/page/catalog';

import store from './js/store/index';


// Vue.use(Vuex);

if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}

class Vendors {
  constructor() {
    this.searchField = document.querySelector('.page-header .search-fild__input');

    this.searchFieldText = this.searchField.value.trim().toLowerCase();
    this.vendors = null;
    this.filter = null;
    this.macy = null; // Masonry

    this.parse();
    this.init();
  }

  parse() {
    this.vendors = [].map.call(document.querySelectorAll('.vendor-card'), item => ({
      el: item,
      shown: true,
      name: item.querySelector('.vendor-card__title').textContent.toLowerCase(),
      sections: item.dataset.sectionsId ? item.dataset.sectionsId.split(',') : [],
    }));

    // [].forEach.call(document.querySelectorAll('fieldset.multifilter'), (item) => {
    //   store.commit('filters/setFilter', CheckboxFilter.parseSettings(item));
    // });

    // store.commit('filters/setCallback', this.filterItems);
  }

  init() {
    store.subscribeAction((action) => {
      if (action.type === 'filters/onChange') {
        this.filterItems();
      }
    });

    new Vue({
      store,
      render: h => h(CategoryListMobile),
    }).$mount('#vueMobile');

    // this.vm = new Vue({
    //   el: document.querySelector('.view__category'),
    //   store,
    //   computed: mapState('filters', {
    //     filters: state => state.list,
    //   }),
    //   template: `<div class="view__category"><MultifilterCheckboxList v-for="filter in filters" :filter="filter"/></div>`,
    //   components: { MultifilterCheckboxList },
    // });

    [].forEach.call(document.querySelectorAll('fieldset.multifilter'), (filter) => {
      if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter);
      // if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.filterItems);
      if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter);
      // return new Multifilter(filter, this.filterItems);
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

  /**
   * Фильтрация по категории и строке поиска
   */
  filterItems() {
    const selected = Object.keys(store.state.filters.filters).map(
      key => store.getters['filters/checkedItemsByName'](key).map(item => item.value),
    );

    this.vendors.forEach((item) => {
      if (
        (item.name.indexOf(this.searchFieldText) !== -1 || this.searchFieldText.length === 0)
        // && selected.every(checkedItems => checkedItems.every(id => item.sections.includes(id)))
        && selected.every(checkedItems => (checkedItems.length > 0 ? checkedItems.some(id => item.sections.includes(id)) : true))
      ) {
        item.el.style.display = '';
      } else {
        item.el.style.display = 'none';
      }
    });
  }

  onSearch = (event) => {
    event.preventDefault();

    this.searchFieldText = event.target.value.trim().toLowerCase();
    this.filterItems();
  };
}

$(() => {
  // initVendorsList();
  global.app.Vendors = new Vendors();
});
