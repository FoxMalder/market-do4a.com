import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';
import PageCheckout from './js/page/checkout';


ready(() => {
  global.App = App;
  global.App.init();

  global.PageCheckout = new PageCheckout();
  global.PageCheckout.init();
});
