import './js/common';
import './scss/main.scss';

import './js/page/product';

if (process.env.NODE_ENV !== 'production') {
  require('./product.pug');
}
