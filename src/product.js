import ready from 'domready';

import PageProduct from './js/page/product';


// if (process.env.NODE_ENV !== 'production') {
//   require('./product.pug');
// }


ready(() => {
  global.PageProduct = new PageProduct();
  global.PageProduct.init();
});
