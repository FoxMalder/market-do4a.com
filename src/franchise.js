import './js/common';

import './scss/main.scss';
import './scss/franchise.scss';
// import './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./franchise.pug');
}
