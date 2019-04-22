// import 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';

import '@fancyapps/fancybox';

import 'simplebar';

import Header from './modules/Header';
import Input from './modules/Input';


// window.noUiSlider = noUiSlider;

window.jQuery = $;
window.$ = $;
$.fancybox.defaults.closeExisting = true;

$(() => {

  $(document).on('click.bs.dropdown', '.multifilter [role="form"]', (e) => {
    e.stopPropagation();
  });

  // svg4everybody();


  const header = new Header();
  Input();

});
