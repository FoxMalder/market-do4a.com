import ready from 'domready';
import Vue from 'vue';

import './simple';
import VueModal from '@/plugins/vue-modal';
import AppModalMap from '@/components/AppModalMap.vue';
import ShopListMap from '@/components/ShopListMap.vue';

import store from '@/store';


Vue.use(VueModal);

ready(() => {
  new Vue({
    store,
    render: h => h(ShopListMap),
  }).$mount('#map');


  [].forEach.call(document.querySelectorAll('[data-marker-id]'), (link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const id = parseInt(event.target.dataset.markerId, 10);

      Vue.$modal.open(AppModalMap, {
        props: { storeId: id },
      });

      // Bus.$emit('new', {
      //   component: AppModalMap,
      //   param: {
      //     props: { storeId: id },
      //   },
      // });
    });
  });
});
