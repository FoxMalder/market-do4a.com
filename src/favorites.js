import ready from 'domready';

import App from '@/App';
import CatalogControl from './js/page/catalog';


ready(() => {
  App.init();

  App.components.favorites = new CatalogControl({
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: false,
  });
});
