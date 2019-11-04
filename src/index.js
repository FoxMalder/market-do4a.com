import ready from 'domready';

import PageMain from './js/page/main';


if (process.env.NODE_ENV !== 'production') {
  require('./index.pug');
}


ready(() => {
  global.PageMain = new PageMain();
});
