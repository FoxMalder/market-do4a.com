import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

import store from '@/store';

import Brands from '@/components/brands/Brands.vue';
import BrandsFilter from '@/components/brands/BrandsFilter.vue';


const plug = require('../../img/plug.svg');


Vue.use(VueLazyload, {
  error: plug,
  loading: plug,
});


export default class Vendors {
  constructor() {
    this.searchContainer = document.querySelector('.page-header .search-fild');
    this.searchField = document.querySelector('.page-header .search-fild__input');

    this.init();
  }

  init() {
    this.data = Vue.observable({
      view: 'cards',
      filterValue: [],
      searchValue: this.searchField.value.trim().toLowerCase(),
    });

    this.brandsVM = new Vue({
      store,
      el: '.catalog',
      render: h => h(Brands, {
        props: {
          brands: window.brands,
          view: this.data.view,
          searchValue: this.data.searchValue,
          filterValue: this.data.filterValue,
        },
      }),
    });


    this.filterVM = new Vue({
      store,
      el: '.catalog-control',
      render: h => h(BrandsFilter, {
        props: {
          view: this.data.view,
        },
        on: {
          // 'update:filters': e => this.brandsVM.$emit('update:filters', e),
          // 'update:tab': e => this.brandsVM.$emit('update:tab', e),
          'update:filters': (e) => {
            this.data.filterValue = e;
          },
          'update:view': (e) => {
            this.data.view = e;
          },
        },
      }),
    });


    this.searchContainer.addEventListener('submit', this.onSearch);
    this.searchField.addEventListener('input', this.onSearch);
    this.searchField.addEventListener('change', this.onSearch);
  }

  onSearch = (event) => {
    event.preventDefault();
    // this.brandsVM.$emit('update:search', this.searchField.value.trim().toLowerCase());
    this.data.searchValue = this.searchField.value.trim().toLowerCase();
  };
}
