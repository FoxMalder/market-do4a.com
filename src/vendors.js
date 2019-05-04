import './scss/main.scss';

import './js/common';
import './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}
