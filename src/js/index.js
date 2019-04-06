import '../scss/main.scss';

import 'jquery';

import '@fancyapps/fancybox';
import 'owl.carousel';


import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

import 'simplebar';
// Array.from(document.querySelectorAll('.multifilter__dropdown')).forEach(el => new SimpleBar);
// import 'simplebar/dist/simplebar.css';
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

  window.noUiSlider = noUiSlider;

  const slider1 = document.querySelector('.input-range');
  noUiSlider.create(slider1, {
    start: 80,
    connect: [true, false],
    range: {
      min: 0,
      max: 100,
    },
    cssPrefix: 'input-range',
    cssClasses: {
      target: '',
      base: '__base',
      origin: '__origin',
      handle: '__handle',
      handleLower: '__handle-lower',
      handleUpper: '__handle-upper',
      touchArea: '__touch-area',
      horizontal: '_horizontal',
      vertical: '_vertical',
      background: '__background',
      connect: '__connect',
      connects: '__connects',
      ltr: '_ltr',
      rtl: '_rtl',
      draggable: '__draggable',
      drag: '__state-drag',
      tap: '__state-tap',
      active: '__active',
      tooltip: '__tooltip',
      pips: '__pips',
      pipsHorizontal: '__pips-horizontal',
      pipsVertical: '__pips-vertical',
      marker: '__marker',
      markerHorizontal: '__marker-horizontal',
      markerVertical: '__marker-vertical',
      markerNormal: '__marker-normal',
      markerLarge: '__marker-large',
      markerSub: '__marker-sub',
      value: '__value',
      valueHorizontal: '__value-horizontal',
      valueVertical: '__value-vertical',
      valueNormal: '__value-normal',
      valueLarge: '__value-large',
      valueSub: '__value-sub',
    },
  });

});
