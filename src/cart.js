import ready from 'domready';

import PageCheckout from './js/page/checkout';

ready(() => {
  global.PageCheckout = new PageCheckout();
  global.PageCheckout.init();
});
