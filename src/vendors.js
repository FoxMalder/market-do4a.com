import ready from 'domready';

import './simple';
import PageVendors from './js/page/vendors';


if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}


ready(() => {
  global.PageVendors = new PageVendors();
});
