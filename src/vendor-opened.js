import './js/common';
import './scss/main.scss';
// import './scss/header-style.scss';

import './js/page/catalog';

if (process.env.NODE_ENV !== 'production') {
  require('./vendor-opened.pug');
}
