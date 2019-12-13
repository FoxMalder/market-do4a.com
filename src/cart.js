import ready from 'domready';

// import '@/App';
// import '@/common';
import './simple';
import PageCheckout from './js/page/checkout';

ready(() => {
  // debugger;
  global.PageCheckout = new PageCheckout();
  global.PageCheckout.init();
});
