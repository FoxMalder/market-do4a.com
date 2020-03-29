import ready from 'domready';

import App from '@/App';
import CatalogControl from '@/page/catalog';


ready(() => {
  App.init();
  App.components.catalog = new CatalogControl({
    filter: document.querySelector('.filter'),
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: true,
  });
});
