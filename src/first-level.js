import './js/common';
import './scss/main.scss';

import './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./first-level.pug');
}
