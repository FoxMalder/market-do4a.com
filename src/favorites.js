import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';
import CatalogControl from './js/page/catalog';


if (process.env.NODE_ENV !== 'production') {
  require('./favorites.pug');
}


ready(() => {
  global.App = App;
  global.App.init();

  global.PageFavorites = new CatalogControl({
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: false,
  });
});
