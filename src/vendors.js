import './js/common';

import './scss/main.scss';

// import Masonry from 'masonry-layout';
import Macy from 'macy';
// import Vue from 'vue';
// import Vuex from 'vuex';
import Vue from 'vue';
import {
  CheckboxFilter,
  Multifilter,
  PriceFilter,
  // RadioFilter,
} from './js/components/Multifilter';
import CategoryListMobile from './js/components/CategoryListMobile.vue';

import store from './js/store';

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

    this.filter = [].map.call(document.querySelectorAll('fieldset.multifilter'), (filter) => {
      if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, 'filters');
      // if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.filterItems);
      if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, 'filters');
      return new Multifilter(filter, this.filterItems);
    });
  }

  init() {
    store.subscribeAction((action, state) => {
      if (action.type === 'filters/onChange') {
        this.filterItems(state);
      }
    });

    document.querySelector('.catalog-control').insertBefore(
      new Vue({
        store,
        render: h => h(CategoryListMobile),
      }).$mount().$el,
      document.querySelector('.catalog-control').firstChild,
    );

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
  filterItems(state) {
    const selected = Object.keys(state.filters.filters).map(
      // key => state.filters.filters[key].data.filter(item => item.checked).map(item => item.value),
      key => state.filters.filters[key].data.reduce((arr, item) => {
        if (item.checked) arr.push(item.value);
        return arr;
      }, []),
    );

    console.log(selected);

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
