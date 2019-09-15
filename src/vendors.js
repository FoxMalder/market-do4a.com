import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';
import PageVendors from './js/page/vendors';


if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}


ready(() => {
  global.App = App;
  global.App.init();

  global.PageVendors = new PageVendors();
});
