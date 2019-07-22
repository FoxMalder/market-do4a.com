// import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import './js/common';
import './scss/main.scss';

import './js/page/main';

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
}
