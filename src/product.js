import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';
import PageProduct from './js/page/product';


if (process.env.NODE_ENV !== 'production') {
  require('./product.pug');
}


ready(() => {
  global.App = App;
  global.App.init();

  global.PageProduct = new PageProduct();
  global.PageProduct.init();
});
