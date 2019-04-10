import 'jquery';

import '@fancyapps/fancybox';
import 'owl.carousel';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

import 'simplebar';

import svg4everybody from 'svg4everybody';
import noUiSlider from 'nouislider';


import Header from './modules/Header';
import Input from './modules/Input';


window.noUiSlider = noUiSlider;

svg4everybody();


Header();
Input();


const slider1 = document.querySelectorAll('.input-range');
// console.log(slider1);

if (slider1.length) {
  Array.from(slider1).map(item => (
    noUiSlider.create(item, {
      start: [3000, 7000],
      step: 10,
      connect: true,
      tooltips: true,
      range: {
        min: 50,
        max: 10000,
      },
      format: {
        to(value) {
          return `${Math.floor(value)} ₽`;
        },
        from(value) {
          return value.replace(' ₽', '');
        },
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
        draggable: '_draggable',
        drag: '_state-drag',
        tap: '_state-tap',
        active: '__active',
        tooltip: '__tooltip',

        // Шкала
        pips: '__pips',
        pipsHorizontal: '__pips_horizontal',
        pipsVertical: '__pips_vertical',

        // Деления на шкале
        marker: '__marker',
        markerHorizontal: '__marker_horizontal',
        markerVertical: '__marker_vertical',
        markerNormal: '__marker_normal',
        markerLarge: '__marker_large',
        markerSub: '__marker_sub',

        // Значения на шкале
        value: '__value',
        valueHorizontal: '__value_horizontal',
        valueVertical: '__value_vertical',
        valueNormal: '__value_normal',
        valueLarge: '__value_large',
        valueSub: '__value_sub',
      },
    })),
  );
}
