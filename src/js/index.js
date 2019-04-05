import '../scss/main.scss';

import 'jquery';

import '@fancyapps/fancybox';
import 'owl.carousel';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

// import Sticky from 'sticky-js';

import svg4everybody from 'svg4everybody';


import Header from './modules/Header';
import Input from './modules/Input';

import './modules/Maps';
import './main';

svg4everybody();
// function initMain() {
//   import('./main');
// }

// if (module.hot) {
//   module.hot.accept('./../catalog.pug');
// }


$(document).ready(() => {
  $('[data-fancybox]').fancybox({
    closeExisting: true,
  });

  Header();
  Input();

});
