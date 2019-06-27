import './scss/main.scss';
// import './scss/header-style.scss';

import './js/common';
import { Filter } from './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./catalog.pug');
}


$(() => {
  new Filter(document.getElementById('catalog-filter'));
});
