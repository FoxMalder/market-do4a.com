import ready from 'domready';

import './js/common';
import './scss/main.scss';

import App from './js/App';


ready(() => {
  global.App = App;
  global.App.init();
});
