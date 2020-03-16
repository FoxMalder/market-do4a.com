// import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Vue from 'vue';
import store from '@/store';
import HeaderCollapse from '@/components/header/HeaderCollapse.vue';
import HeaderBasket from '@/components/header/HeaderBasket.vue';
import HeaderButtonBasket from '@/components/header/HeaderButtonBasket.vue';
import HeaderSearch from '@/components/header/Search.vue';
import HeaderButtonSearch from '@/components/header/HeaderButtonSearch.vue';
import HeaderButtonFavorites from '@/components/header/HeaderButtonFavorites.vue';
import { getViewportSize } from '@/utils';
// import ready from 'domready';

// import StickySidebar from '../plugins/sticky-sidebar';


class Menu {
  constructor() {
    this.menu = document.querySelector('.mobile-menu');
    this.button = document.querySelector('.header-control__menu-btn');

    if (!this.menu || !this.button) {
      return;
    }

    this.overlay = this.menu.querySelector('.mobile-menu__overlay');
    this.scrollEl = this.menu.querySelector('.mobile-menu__inner');

    this.subMenuEl = this.menu.querySelectorAll('[data-toggle="submenu"]');
    this.subMenuBackEl = this.menu.querySelectorAll('.m-submenu__back');

    this.activeSubMenu = [];

    this.isOpened = false;

    this.init();
  }

  init() {
    this.menu.setAttribute('id', 'navigation');
    this.menu.setAttribute('aria-hidden', true);

    this.button.setAttribute('aria-expanded', this.isOpened);
    this.button.setAttribute('aria-controls', 'navigation');
    this.button.setAttribute('aria-label', 'Навигация');

    this.button.addEventListener('click', this.toggleMenu);
    this.overlay.addEventListener('click', this.toggleMenu);

    Array.prototype.forEach.call(this.subMenuEl, (item) => item.addEventListener('click', this.subMenuOnClick));
    Array.prototype.forEach.call(this.subMenuBackEl, (item) => item.addEventListener('click', this.subMenuOnClick));
  }

  /**
   * Открыть меню
   */
  open() {
    disableBodyScroll(this.scrollEl);

    this.menu.classList.add('active');
    this.menu.setAttribute('aria-hidden', false);

    this.button.classList.add('active');
    this.button.setAttribute('aria-expanded', true);

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

  /**
   * Закрыть меню
   */
  close() {
    enableBodyScroll(this.scrollEl);

    this.menu.classList.remove('active');
    this.menu.setAttribute('aria-hidden', true);

    this.button.classList.remove('active');
    this.button.setAttribute('aria-expanded', false);

    this.isOpened = false;
  }

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

  /**
   * Переключает состояние мобильного меню
   * @param event
   */
  toggleMenu = (event) => {
    event.preventDefault();

    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  };

  /**
   * Переключает вкладку в меню
   * @param event
   */
  subMenuOnClick = (event) => {
    event.preventDefault();

    if (event.currentTarget.classList.contains('m-submenu__back')) {
      this.back();
    } else if (event.currentTarget.nextElementSibling) {
      this.next(event.currentTarget.nextElementSibling);
    }
  };
}

export default class Header {
  constructor() {
    store.dispatch('cart/init');

    this.basketVM = new Vue({
      store,
      render: (h) => h(
        'div',
        { class: 'header-control__cart-container' },
        [h(HeaderBasket), h(HeaderButtonBasket)],
      ),
    }).$mount('#js-header-basket');

    this.collapseVM = new Vue({
      store,
      render: (h) => h(HeaderCollapse),
    }).$mount('.h-navbar-collapse');

    // Строка поиска
    new Vue({
      store,
      render: (h) => h(HeaderSearch),
    }).$mount('.header-control__search');

    // Кнопка поиска на телефонах
    new Vue({
      store,
      render: (h) => h(HeaderButtonSearch),
    }).$mount('.header-control__button_search');

    // Количество избранного
    new Vue({
      store,
      render: (h) => h(HeaderButtonFavorites),
    }).$mount('.header-control__button_favorites');

    this.Menu = new Menu();


    this.init();
  }

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

    // Установка направления выпадающего меню
    const viewportSize = getViewportSize();

    if (viewportSize.width >= 1240) {
      Array.prototype.forEach.call(document.querySelectorAll('.h-category-second'), (item) => {
        const parentRect = item.parentNode.getBoundingClientRect();

        if ((parentRect.left + parentRect.width) > (viewportSize.width / 2)) {
          item.classList.add('h-category-second_right');
        } else {
          item.classList.remove('h-category-second_right');
        }
      });
    }
  }
}
