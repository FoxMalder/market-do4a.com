import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';


if (process.env.NODE_ENV !== 'production') {
  require('./privacy.pug');
}


ready(() => {
  global.App = App;
  global.App.init();
});
