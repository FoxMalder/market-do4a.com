import '@/libs';

import '@/plugins/Anchor';
import '@/modules/Input';
import '@/modules/system.auth.form';


import '../scss/main.scss';


// import ready from 'domready';
import store from '@/store';
import Header from '@/modules/Header';
// import Platform from '@/plugins/Platform';

// import { Utils } from '@/utils';


const App = {
  version: process.env.VERSION,
  components: {},
  init() {
    store.dispatch('init');

    this.components.header = new Header();


    [].forEach.call(document.querySelectorAll('.mr-breadcumps__list'), (breadcumps) => {
      breadcumps.scrollTo(1000, 0);
    });
  },
};

// export default class App {
//   constructor() {
//     if (App.instance) {
//       console.error('[App]: App already initialized');
//       return App.instance;
//     }
//
//     this.debug = true;
//
//     this.store = store;
//     // this.platform = Platform;
//     this.utils = Utils;
//
//
//     App.instance = this;
//   }
//
//   static version = process.env.VERSION;
//
//   init() {
//     store.dispatch('init');
//
//     this.header = new Header();
//
//     const breadcumps = document.querySelector('.mr-breadcumps__list');
//     if (breadcumps) {
//       breadcumps.scrollTo(1000, 0);
//     }
//   }
// }

global.App = App;
export default App;
