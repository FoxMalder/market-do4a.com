import './scss/main.scss';

import './js/common';
import './js/page/product';

if (process.env.NODE_ENV !== 'production') {
  require('./product.pug');
}
