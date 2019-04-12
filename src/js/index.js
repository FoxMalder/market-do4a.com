import '../scss/main.scss';


import './global';

import './main';
// import './catalog';


$(document).ready(() => {
  $('[data-fancybox]').fancybox({
    closeExisting: true,
  });

  $(document).on('click.bs.dropdown.data-api', '.multifilter [role="form"]', function(e) {
    e.stopPropagation();
  });

  // const price = [50, 10000];

});
