import ready from 'domready';

import Vue from 'vue';
import { Bus } from './js/plugins/Modal';
import AppModalMap from './js/components/AppModalMap.vue';
import ShopListMap from './js/components/ShopListMap.vue';

import store from './js/store';


ready(() => {
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
