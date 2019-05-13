// import 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

import '@fancyapps/fancybox';
import 'owl.carousel';

import 'simplebar';
import Header from './modules/Header';
import Input from './modules/Input';

// import svg4everybody from 'svg4everybody';


// window.noUiSlider = noUiSlider;

window.jQuery = $;
window.$ = $;

$(() => {
  $.fancybox.defaults.closeExisting = true;

  $(document).on('click.bs.dropdown', '.multifilter [role="form"]', (e) => {
    e.stopPropagation();
  });

  // svg4everybody();


  window.app.header = new Header();

  Input();

});
