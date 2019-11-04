import ready from 'domready';

import '@/common';
import './scss/main.scss';

import App from '@/App';


ready(() => {
  global.App = App;
  global.App.init();
});
