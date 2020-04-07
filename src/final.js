import ready from 'domready';
import Vue from 'vue';

import App from '@/App';
import store from '@/store';

import AppModalMap from '@/components/AppModalMap.vue';
import ShopListMap from '@/components/ShopListMap.vue';


ready(() => {
  App.init();

  new Vue({
    store,
    render: h => h(ShopListMap),
  }).$mount('#map');

  const clickHandle = (event) => {
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
  };

  [].forEach.call(document.querySelectorAll('[data-marker-id]'), (link) => {
    link.addEventListener('click', clickHandle);
  });
});
