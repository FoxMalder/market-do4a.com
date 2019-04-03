import '../scss/main.scss';

import 'jquery';

import '@fancyapps/fancybox';
import 'owl.carousel';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';

import Sticky from 'sticky-js';

import svg4everybody from 'svg4everybody';


svg4everybody();

import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
  Swiper,
  Virtual,
  Scrollbar,
} from 'swiper/dist/js/swiper.esm';


import Header from './modules/Header';
import Input from './modules/Input';
import HeaderSlider from './modules/HeaderSlider';

// var template = require('./../index.pug');

import './modules/Maps';
// import './main';

Swiper.use([Navigation, Pagination, Scrollbar, EffectFade, Autoplay, Mousewheel, Virtual]);
Swiper.use([HeaderSlider]);

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

  const bodyClass = document.body.classList;
  // if (bodyClass.contains('main')) {
  //   initMain();
  // }
  // console.log('sdfg ');
});
