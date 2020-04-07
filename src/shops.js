import ready from 'domready';
import Vue from 'vue';

import App from '@/App';

import store from '@/store';
import VueShopList from '@/components/ShopList.vue';


// class StoreList {
//   constructor() {
//     this.headerEl = document.querySelector('.page-header');
//
//
//     this.listEl = document.querySelector('.s-city-list');
//     this.infoEl = document.querySelector('.js-shop-list-info');
//
//     this.initList();
//     // this.initSearch();
//   }
//
//   initList() {
//     this.listVM = new Vue({
//       store,
//       render: h => h(VueShopList),
//     }).$mount(this.listEl);
//
//     this.infoVM = new Vue({
//       store,
//       render: h => h(VueShopListInfo),
//     }).$mount(this.infoEl);
//
//
//     // [].forEach.call(document.querySelectorAll('[data-store-id]'), (item) => {
//     //   item.addEventListener('click', () => {
//     //     gf.$emit('map:set', item.dataset.storeId);
//     //   });
//     // });
//   }
//
//   initSearch() {
//     if (!this.headerEl) return;
//
//     // this.searchForm = this.headerEl.querySelector('.search-fild');
//     this.searchInput = this.headerEl.querySelector('.input-text');
//
//     this.searchInput.addEventListener('input', (event) => {
//       console.log(event);
//     });
//   }
// }


ready(() => {
  App.init();

  new Vue({
    store,
    render: h => h(VueShopList),
  }).$mount('.s-shops');
});
