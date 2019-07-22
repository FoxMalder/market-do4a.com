import './js/common';
import './scss/main.scss';
// import './scss/header-style.scss';

import { Filter, CatalogControl } from './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./catalog.pug');
}


$(() => {
  const control = new CatalogControl({
    filter: document.querySelector('.filter'),
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: true,
  });


  // new Filter(document.getElementById('catalog-filter'));
});
