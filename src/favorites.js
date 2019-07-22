import './js/common';
import './scss/main.scss';

import { Filter, CatalogControl } from './js/page/catalog';
// import ProductCard from '../components/ProductCard';
import Utils from './js/utils/utils';

if (process.env.NODE_ENV !== 'production') {
  require('./favorites.pug');
}


$(() => {
  const control = new CatalogControl({
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: false,
  });

  console.log(control);

  window.addEventListener('favorites', (event) => {
    control.setNumber(event.detail.length);
  });
});
