import Vue from 'vue';
import Macy from 'macy';

import store from '../store';
import { CheckboxFilter, Multifilter, PriceFilter } from '../components/Multifilter';
import CategoryListMobile from '../components/CategoryListMobile.vue';
import catalogControl from '../store/modules/catalogControl';


export default class Vendors {
  constructor() {
    store.registerModule('filters', catalogControl);

    this.searchField = document.querySelector('.page-header .search-fild__input');

    this.searchFieldText = this.searchField.value.trim().toLowerCase();
    this.vendors = [];
    this.filter = [];
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

    [].map.call(document.querySelectorAll('fieldset.multifilter'), (filter) => {
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


    this.categoryListMobileVM = new Vue({
      store,
      render: h => h(CategoryListMobile),
    }).$mount();

    const catalogControlEl = document.querySelector('.catalog-control');
    if (catalogControlEl) {
      catalogControlEl.insertBefore(this.categoryListMobileVM.$el, catalogControlEl.firstChild);
    }

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
    // const selected = Object.keys(state.filters.filters).map(
    //   // key => state.filters.filters[key].data.filter(item => item.checked).map(item => item.value),
    //   key => state.filters.filters[key].data.reduce((arr, item) => {
    //     if (item.checked) arr.push(item.value);
    //     return arr;
    //   }, []),
    // );

    const selected = Object.values(store.state.filters.filters).map(
      filter => filter.data.reduce((arr, item) => {
        if (item.checked) arr.push(item.value);
        return arr;
      }, []),
    );

    console.log(selected);

    this.vendors.forEach((item) => {
      if (
        (item.name.indexOf(this.searchFieldText) !== -1 || this.searchFieldText.length === 0)
        // && selected.every(checkedItems => checkedItems.every(id => item.sections.includes(id)))
        && selected.every(checkedItems => (
          checkedItems.length > 0
            ? checkedItems.some(id => item.sections.includes(id))
            : true
        ))
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
