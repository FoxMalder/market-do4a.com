import './scss/main.scss';

import './js/common';
import { Filter } from './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./favorites.pug');
}


$(() => {
  new Filter(document.querySelector('.wrapper'));
});
