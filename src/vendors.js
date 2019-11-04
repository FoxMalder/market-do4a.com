import ready from 'domready';

import PageVendors from './js/page/vendors';


if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}


ready(() => {
  global.PageVendors = new PageVendors();
});
