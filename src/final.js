import ready from 'domready';

import './js/common';
import './scss/main.scss';

import Vue from 'vue';
import App from './js/App';

import { Bus } from './js/plugins/Modal';
import AppModalMap from './js/components/AppModalMap.vue';
import ShopListMap from './js/components/ShopListMap.vue';

import store from './js/store';


ready(() => {
  global.App = App;
  global.App.init();


  new Vue({
    store,
    render: h => h(ShopListMap),
  }).$mount('#map');


  [].forEach.call(document.querySelectorAll('[data-marker-id]'), (link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const id = parseInt(event.target.dataset.markerId, 10);

      Bus.$emit('new', {
        component: AppModalMap,
        param: {
          props: { storeId: id },
        },
      });
    });
  });
});
