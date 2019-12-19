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
    this.brandsVM = new Vue({
      store,
      render: h => h(Brands),
    }).$mount('.catalog');

    this.filterVM = new Vue({
      store,
      render: h => h(BrandsFilter),
    }).$mount('.catalog-control');

    this.filterVM.$on('change', (e) => {
      this.brandsVM.$emit('filter:change', e);
    });

    this.filterVM.$on('tab', (e) => {
      this.brandsVM.$emit('filter:tab', e);
    });


    this.searchContainer.addEventListener('submit', this.onSearch);
    this.searchField.addEventListener('input', this.onSearch);
    this.searchField.addEventListener('change', this.onSearch);
  }

  onSearch = (event) => {
    event.preventDefault();
    this.brandsVM.$emit('search:change', this.searchField.value.trim().toLowerCase());
  };
}
