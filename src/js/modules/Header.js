// import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Vue from 'vue';
import store from '@/store';
import HeaderBasket from '@/components/HeaderBasket.vue';
import HeaderCollapse from '@/components/HeaderCollapse.vue';
import HeaderControlFavorites from '@/components/HeaderControlFavorites.vue';
import Utils from '@/utils';
// import ready from 'domready';

// import StickySidebar from '../plugins/sticky-sidebar';


class Menu {
  constructor(menu, controls) {
    this.el = menu;
    this.controls = controls;

    if (!this.el || !this.controls) {
      return;
    }

    this.overlayEl = document.querySelector('.mobile-menu__overlay');
    this.scrollEl = document.querySelector('.mobile-menu__inner');

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
    if (this.activeSubMenu.length > 0) {
      const el = this.activeSubMenu[this.activeSubMenu.length - 1];

      el.classList.remove('active');
      this.activeSubMenu.splice(this.activeSubMenu.length - 1);
    }
  }

  open() {
    // disableBodyScroll(this.el);
    disableBodyScroll(this.scrollEl);

    this.el.classList.add('active');
    Array.prototype.forEach.call(this.controls, item => item.classList.add('active'));

    const rect = document.querySelector('.h-navbar-fixed').getBoundingClientRect();
    if (rect.top > 0) {
      window.scrollTo({
        top: rect.top
          + (window.pageYOffset || document.documentElement.scrollTop),
        behavior: 'smooth',
      });
    }

    this.isOpened = true;
  }

  close() {
    // enableBodyScroll(this.el);
    enableBodyScroll(this.scrollEl);

    this.el.classList.remove('active');
    Array.prototype.forEach.call(this.controls, item => item.classList.remove('active'));

    this.isOpened = false;
  }
}

export default class Header {
  constructor() {
    store.dispatch('cart/init');

    this.basketVM = new Vue({
      store,
      render: h => h(HeaderBasket),
    }).$mount('#js-header-basket');

    this.collapseVM = new Vue({
      store,
      render: h => h(HeaderCollapse),
    }).$mount('.h-navbar-collapse');


    this.fixedContainerEl = document.querySelector('.h-navbar-fixed');

    this.header = {
      // fixedTargets: document.querySelector('.h-navbar-fixed'),
      // Высота не фиксированной области над фиксированной
      fixedOffset: 0,
      fixedBreakpointsOffset: 600,
    };

    this.search = {
      targets: document.querySelector('.header-control__search'),
      control: document.querySelector('.header-control__button_search'),
    };

    this.vp = Header.getViewportSize();

    this.Menu = null;


    this.init();
  }

  // static initHtmlApi() {
  //   // Taken from jQuery `ready` function
  //   // Instantiate elements already present on the page
  //   if (
  //     document.readyState === 'complete'
  //     || (document.readyState !== 'loading' && !document.documentElement.doScroll)
  //   ) {
  //     // Handle it asynchronously to allow scripts the opportunity to delay init
  //     window.setTimeout(this.initDOMLoadedElements);
  //   } else {
  //     document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  //     window.addEventListener('load', this.initDOMLoadedElements);
  //   }
  // }
  //
  // static initDOMLoadedElements() {
  //   document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  //   window.removeEventListener('load', this.initDOMLoadedElements);
  //
  //   if (!{}.hasOwnProperty.call(global, 'app')) {
  //     global.app = {};
  //   }
  //
  //   if (!global.app.Header) {
  //     global.app.Header = new Header();
  //   }
  // }

  init() {
    // this.initCityContainer();
    // this.initStoreContainer();
    //

    // Stickyfill.forceSticky();
    // Stickyfill.add(this.fixedContainerEl);


    // window.addEventListener('scroll', () => {
    //   if (this.fixedContainerEl.getBoundingClientRect().top === 0) {
    //     // this.header.fixedTargets.style.height = this.header.fixedTargets.clientHeight;
    //     this.fixedContainerEl.classList.add('fixed');
    //   } else {
    //     this.fixedContainerEl.classList.remove('fixed');
    //   }
    //   // if (this.header.fixedTargets.getBoundingClientRect().top === 0) {
    //   //   this.header.fixedTargets.classList.add('fixed');
    //   // } else {
    //   //   this.header.fixedTargets.classList.remove('fixed');
    //   // }
    // });

    // Мобильное меню
    this.Menu = new Menu(
      document.querySelector('.mobile-menu'),
      document.querySelectorAll('.header-control__menu-btn'),
    );

    // Установка направления выпадающего меню
    if (this.vp.width >= 1240) {
      [].forEach.call(document.querySelectorAll('.h-category__link'), (item) => {
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

    this.initFavoritesQuantity();
  }


  // Количество избранного
  initFavoritesQuantity() {
    const favoritesButton = document.querySelector('.header-control__button_favorites');
    if (favoritesButton) {
      // const favoritesNotifications = favoritesButton.querySelector('.header-control__notifications');
      // if (favoritesNotifications) {
      //   store.commit('SET_FAVORITES_COUNT', parseInt(favoritesNotifications.innerHTML, 10) || 0);
      // }

      // store.dispatch('getFavorites');

      this.favoritesVM = new Vue({
        store,
        render: h => h(HeaderControlFavorites, {
          attrs: { href: favoritesButton.getAttribute('href') },
        }),
      }).$mount(favoritesButton);
    }
  }

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
