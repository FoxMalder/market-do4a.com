import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
// import Tooltip from 'tooltip.js';
import Vue from 'vue';
// import Vue from 'vue';
import Utils from '../utils/utils';
import Api from '../api';
import store from '../store';
import HeaderCollapse from '../components/HeaderCollapse.vue';
import HeaderBasket from '../components/HeaderBasket.vue';
// import ProductDetailHeader from '../components/product/DetailHeader';

// import StickySidebar from '../plugins/sticky-sidebar';

// Vue.component('header-notifications', {
//   props: ['count'],
//   template: '<span class="header-control__notifications" v-if="count > 0">{{ count }}</span>',
// });

class Menu {
  constructor(menu, controls) {
    this.el = menu;
    this.controls = controls;

    if (!this.el || !this.controls) {
      return;
    }

    this.overlayEl = document.querySelector('.mobile-menu__overlay');

    this.subMenuEl = this.el.querySelectorAll('[data-toggle="submenu"]');
    this.subMenuBackEl = this.el.querySelectorAll('.m-submenu__back');
    this.activeSubMenu = [];

    this.isOpened = false;

    this.init();
  }

  init() {
    Array.prototype.forEach.call(this.controls, item => item.addEventListener('click', this.toggleMenu));
    Array.prototype.forEach.call(this.subMenuEl, item => item.addEventListener('click', this.subMenuOnClick));
    Array.prototype.forEach.call(this.subMenuBackEl, item => item.addEventListener('click', this.subMenuOnClick));
    if (this.overlayEl) {
      this.overlayEl.addEventListener('click', this.toggleMenu);
    }
  }

  /**
   * Переключает состояние мобильного меню
   * @param event
   * @returns {boolean}
   */
  toggleMenu = (event) => {
    event.preventDefault();

    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  };

  subMenuOnClick = (event) => {
    event.preventDefault();

    if (event.target.classList.contains('m-submenu__back')) {
      this.back();
    } else if (event.target.nextElementSibling) {
      this.next(event.target.nextElementSibling);
    }
  };

  next(menu) {
    menu.classList.add('active');

    this.activeSubMenu.push(menu);
  }

  back() {
    console.log(this.activeSubMenu);
    if (this.activeSubMenu.length > 0) {
      const el = this.activeSubMenu[this.activeSubMenu.length - 1];

      el.classList.remove('active');
      this.activeSubMenu.splice(this.activeSubMenu.length - 1);
    }
  }

  open() {
    document.body.style.overflow = 'hidden';

    this.el.classList.add('active');
    [].forEach.call(this.controls, item => item.classList.add('active'));

    const offsetTop = window.app.Header.header.fixedTargets.getBoundingClientRect().top;

    if (offsetTop > 0) {
      $('html, body').animate({
        scrollTop: offsetTop + window.pageYOffset,
      });
    }

    this.isOpened = true;
  }

  close() {
    document.body.style.overflow = '';

    this.el.classList.remove('active');
    [].forEach.call(this.controls, item => item.classList.remove('active'));

    this.isOpened = false;
  }
}

export default class Header {
  constructor() {
    store.dispatch('cart/getContents');

    this.basket = new Vue({
      store,
      render: h => h(HeaderBasket),
    }).$mount('#js-header-basket');

    this.collapse = new Vue({
      store,
      render: h => h(HeaderCollapse),
    }).$mount('.h-navbar-collapse');


    // store.dispatch('cart/getContents').then(() => {
    //   console.log('mount basket');
    //   this.basket.$mount('#js-header-basket');
    // });


    this.header = {
      collapse: Utils.parseTargets('.h-navbar-collapse'),
      fixedTargets: document.querySelector('.h-navbar-fixed'),
      // Список элементов в не фиксированной области над фиксированной
      fixedOffsetTargets: Utils.parseTargets(['.header-banner', '.h-navbar-top']),
      // Высота не фиксированной области над фиксированной
      fixedOffset: 0,
      fixedBreakpointsOffset: 600,
    };

    this.favorites = {};

    this.search = {
      targets: document.querySelector('.header-control__search'),
      control: document.querySelector('.header-control__button_search'),
    };

    this.vp = Header.getViewportSize();

    this.Menu = null;


    this.init();
  }

  static initHtmlApi() {
    // Taken from jQuery `ready` function
    // Instantiate elements already present on the page
    if (
      document.readyState === 'complete'
      || (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  }

  static initDOMLoadedElements() {
    document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
    window.removeEventListener('load', this.initDOMLoadedElements);

    if (!{}.hasOwnProperty.call(global, 'app')) {
      global.app = {};
    }

    if (!global.app.Header) {
      global.app.Header = new Header();
    }
  }

  init() {
    // this.initCityContainer();
    // this.initStoreContainer();
    //

    // Stickyfill.forceSticky();
    Stickyfill.add(this.header.fixedTargets);


    window.addEventListener('scroll', () => {
      if (this.header.fixedTargets.getBoundingClientRect().top === 0) {
        // this.header.fixedTargets.style.height = this.header.fixedTargets.clientHeight;
        this.header.fixedTargets.classList.add('fixed');
      } else {
        this.header.fixedTargets.classList.remove('fixed');
      }
      // if (this.header.fixedTargets.getBoundingClientRect().top === 0) {
      //   this.header.fixedTargets.classList.add('fixed');
      // } else {
      //   this.header.fixedTargets.classList.remove('fixed');
      // }
    });

    // Мобильное меню
    this.Menu = new Menu(
      document.querySelector('.mobile-menu'),
      document.querySelectorAll('.header-control__menu-btn'),
    );

    // Установка направления выпадающего меню
    if (this.vp.width >= 1240) {
      Array.prototype.forEach.call(document.querySelectorAll('.h-category__link'), (item) => {
        const innerElement = item.nextElementSibling;
        if (innerElement) {
          if (item.getBoundingClientRect().left > (this.vp.width / 2)) {
            innerElement.classList.add('h-category-second_right');
          } else {
            innerElement.classList.remove('h-category-second_right');
          }
        }
      });
    }

    // Строка поиска на телефонах
    if (this.search.control) {
      this.search.control.addEventListener('click', (event) => {
        event.preventDefault();
        this.toggleSearchField();
      });
    }

    // Количество избранного
    this.favorites.button = document.querySelector('.header-control__button_favorites');
    if (this.favorites.button) {
      this.favorites.notifications = this.favorites.button.querySelector('.header-control__notifications');
      if (!this.favorites.notifications) {
        this.favorites.notifications = document.createElement('span');
        this.favorites.notifications.classList.add('header-control__notifications');
        this.favorites.button.appendChild(this.favorites.notifications);
      }
      // this.favorites.count = parseInt(this.favorites.notifications.innerHTML, 10) || 0;
      // this.favorites.notifications.style.display = (this.favorites.count < 1) ? 'none' : '';

      store.commit('SET_FAVORITES_COUNT', parseInt(this.favorites.notifications.innerHTML, 10) || 0);
      new Vue({
        store,
        // computed: {
        //   count() {
        //     this.$store.state.favoritesCount,
        //   },
        // },
        template: '<span class="header-control__notifications" v-show="$store.state.favoritesCount > 0">{{ $store.state.favoritesCount }}</span>',
        // render: h => h(ProductDetailHeader),
      }).$mount(this.favorites.notifications);
    }
    // window.addEventListener('favorites', event => this.setFavorites(event.detail.length));
  }

  // /**
  //  * Установить количество товаров в избранном
  //  *
  //  * @param {Number} count - Устанавливаемое число
  //  * @returns {*}
  //  */
  // setFavorites(count) {
  //   if (this.favorites.button && this.favorites.count !== count) {
  //     this.favorites.notifications.innerHTML = String(count);
  //     this.favorites.notifications.style.display = (count < 1) ? 'none' : '';
  //     this.favorites.count = count;
  //   }
  //   return count;
  // }


  toggleSearchField() {
    if (this.search.targets.classList.contains('active')) {
      this.search.targets.classList.remove('active');
      this.search.control.classList.remove('active');
    } else {
      this.search.targets.classList.add('active');
      this.search.control.classList.add('active');
    }
  }


  static getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    };
  }
}


Header.initHtmlApi();
