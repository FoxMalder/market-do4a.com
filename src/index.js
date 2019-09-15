import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';
import PageMain from './js/page/main';


if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
}


ready(() => {
  global.App = App;
  global.App.init();

  global.PageMain = new PageMain();
});
