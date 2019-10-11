import ready from 'domready';
import Vue from 'vue';

import './js/common';
import './scss/main.scss';

import App from './js/App';

import ShopListInfo from './js/components/ShopListInfo.vue';
import store from './js/store';


ready(() => {
  global.App = App;
  try {
    global.App.init();
  } catch (e) {
    console.error(e);
  }

  const gf = new Vue({
    store,
    render: h => h(ShopListInfo),
  }).$mount('.js-shop-list-info');


  [].forEach.call(document.querySelectorAll('[data-store-id]'), (item) => {
    item.addEventListener('click', () => {
      gf.$emit('map:set', item.dataset.storeId);
    });
  });
});
