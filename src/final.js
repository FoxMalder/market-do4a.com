import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';

import { Bus } from './js/plugins/Modal';
import AppModalMap from './js/components/AppModalMap.vue';


ready(() => {
  global.App = App;
  global.App.init();


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
