import './js/common';
import './scss/main.scss';

import './js/page/checkout';

if (process.env.NODE_ENV !== 'production') {
  require('./cart.pug');
}
