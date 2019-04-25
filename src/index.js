// import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import './scss/main.scss';

import './js/common';
import './js/page/main';

if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
}
