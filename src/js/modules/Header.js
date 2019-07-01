// import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
// import Tooltip from 'tooltip.js';
import Utils from '../utils/utils';
// import StickySidebar from '../plugins/sticky-sidebar';

import postIconSvg from '../../img/svg-sprite/change-store-stock-icon.svg';


class Menu {
  constructor(menu, controls) {
    this.el = menu;
    this.controls = controls;

    if (!this.el || !this.controls) {
      return;
    }

    this.overlay = document.querySelector('.mobile-menu__overlay');

    this.isOpened = false;

    this.init();
  }

  init() {
    Array.prototype.forEach.call(this.controls, item => item.addEventListener('click', this.toggleMenu));

    if (this.overlay) {
      this.overlay.addEventListener('click', this.toggleMenu);
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

  open() {
    document.body.style.overflow = 'hidden';

    this.el.classList.add('active');
    Array.prototype.forEach.call(this.controls, item => item.classList.add('active'));

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
    Array.prototype.forEach.call(this.controls, item => item.classList.remove('active'));

    this.isOpened = false;
  }
}

export default class Header {
  constructor() {
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

    this.collapse = {
      cityContainer: document.querySelector('.change-city-collapse'),
      storeContainer: document.querySelector('.change-store-collapse'),
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

    if (!Object.prototype.hasOwnProperty.call(window, 'app')) {
      window.app = {};
    }

    if (!window.app.Header) {
      window.app.Header = new Header();
    }
  }

  init() {
    this.initCityContainer();
    this.initStoreContainer();

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
      this.favorites.count = parseInt(this.favorites.notifications.innerHTML, 10) || 0;
      this.favorites.notifications.style.display = (this.favorites.count < 1) ? 'none' : '';
    }
    window.addEventListener('favorites', event => this.setFavorites(event.detail.length));
  }

  /**
   * Установить количество товаров в избранном
   *
   * @param {Number} count - Устанавливаемое число
   * @returns {*}
   */
  setFavorites(count) {
    if (this.favorites.button && this.favorites.count !== count) {
      this.favorites.notifications.innerHTML = String(count);
      this.favorites.notifications.style.display = (count < 1) ? 'none' : '';
      this.favorites.count = count;
    }
    return count;
  }

  initCityContainer = () => {
    const parent = document.querySelector('.change-city-collapse');

    parent.addEventListener('click', (event) => {
      let { target } = event;

      while (target !== parent) {
        if (target.classList.contains('change-city__link')) {
          const cityId = parseInt(target.getAttribute('data-city'), 10);
          // Header.generateStoreList(
          //   parseInt(target.getAttribute('data-city'), 10) || app.storeManagerData.currentCityId,
          // );

          event.preventDefault();

          document.querySelector('.change-store__title').innerHTML = `ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected">${window.app.storeManagerData.cities[cityId].name5}</span>`;
          document.querySelector('.change-store__list').innerHTML = Header.generateStoreList(cityId);

          $(document.querySelector('.change-store-collapse')).collapse('show');
          return;
        }

        if (target.classList.contains('change-post')) {
          event.preventDefault();
          Header.setStore(
            window.app.storeManagerData.noCityId,
            window.app.storeManagerData.remoteStoreId,
          );
        }
        target = target.parentNode;
      }
    });

    const container = document.createElement('div');
    container.classList.add('container');

    const block = document.createElement('div');
    block.classList.add('change-city');

    const header = document.createElement('div');
    header.classList.add('change-city__header');
    header.innerHTML = `
      <span class="change-city__title">Города в которых есть marketdo4a</span>
      <button class="btn change-city__btn-close" data-toggle="collapse" data-target=".change-city-collapse" aria-expanded="true"></button>`;

    const list = document.createElement('ul');
    list.classList.add('change-city__list');

    let cityListHtml = '';
    Object.keys(window.app.storeManagerData.chars).forEach((char) => {
      window.app.storeManagerData.chars[char].forEach((cityId, index) => {
        cityListHtml += `<li class="change-city__item" ${(index === 0) ? `data-letter="${char}"` : ''}>
                            <a href="#" class="change-city__link" data-city="${cityId}">${window.app.storeManagerData.cities[cityId].name}</a>
                         </li>`;
      });
    });
    list.innerHTML = cityListHtml;


    const footer = document.createElement('div');
    footer.classList.add('change-city__footer');
    footer.innerHTML = `
      <a class="change-post" href="#">
        <img class="change-post__icon" src="${postIconSvg}" alt="">
        <div class="change-post__title">Отправлять почтой<br>с центрального склада</div>
        <div class="change-post__note">Срок от 5 дней</div>
      </a>
      <div class="change-city__note">
        <b>Не нашли нужный товар?</b> Отправим с центрального склада почтой или транспортной компанией. Доставка от 250 ₽. Отправка на следующий рабочий день.
      </div>`;

    block.appendChild(header);
    block.appendChild(list);
    block.appendChild(footer);

    container.appendChild(block);
    parent.appendChild(container);


    // Header.generateStoreList(parseInt(app.storeManagerData.currentCityId, 10));
  };

  initStoreContainer = () => {
    const parent = document.querySelector('.change-store-collapse');

    parent.addEventListener('click', (event) => {
      let { target } = event;
      while (target !== parent) {
        if (target.classList.contains('change-store__link')) {
          event.preventDefault();
          const storeId = parseInt(target.getAttribute('data-store'), 10);
          Header.setStore(window.app.storeManagerData.stores[storeId].city, storeId);
          return;
        }
        if (target.classList.contains('change-post')) {
          event.preventDefault();
          Header.setStore(
            window.app.storeManagerData.noCityId,
            window.app.storeManagerData.remoteStoreId,
          );
        }
        target = target.parentNode;
      }
    });

    const container = document.createElement('div');
    container.classList.add('container');

    const block = document.createElement('div');
    block.classList.add('change-store');

    const header = document.createElement('div');
    header.classList.add('change-store__header');
    header.innerHTML = `<span class="change-store__title">ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected">${window.app.storeManagerData.cities[window.app.storeManagerData.currentCityId].name5}</span></span>
      <button class="btn change-store__btn-close" data-toggle="collapse" data-target=".change-store-collapse"></button>`;

    const list = document.createElement('ul');
    list.classList.add('change-store__list');

    // document.querySelector('.change-store__title').innerHTML = `ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected"></span>`;
    list.innerHTML = Header.generateStoreList(
      parseInt(window.app.storeManagerData.currentCityId, 10),
    );

    const footer = document.createElement('div');
    footer.classList.add('change-store__footer');
    footer.innerHTML = `
      <a class="change-post" href="#">
        <img class="change-post__icon" src="${postIconSvg}" alt="">
        <div class="change-post__title">Отправлять почтой<br>с центрального склада</div>
        <div class="change-post__note">Срок от 5 дней</div>
      </a>
      <div class="change-store__note">
        <b>Не нашли нужный товар?</b> Отправим с центрального склада почтой или транспортной компанией. Доставка от 250 ₽. Отправка на следующий рабочий день.
      </div>`;

    block.appendChild(header);
    block.appendChild(list);
    block.appendChild(footer);

    container.appendChild(block);
    parent.appendChild(container);
  };


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

  static generateStoreList(cityId) {
    const stores = [];

    Object.keys(window.app.storeManagerData.stores).forEach((key) => {
      const store = window.app.storeManagerData.stores[key];
      if (parseInt(store.city, 10) !== cityId || store.hidden === 'Y') return;
      stores.push(store);
    });

    stores.sort((a, b) => {
      if (a.sort === b.sort) {
        return a.id < b.id ? -1 : 1;
      }
      return a.sort < b.sort ? -1 : 1;
    });

    let storeListHtml = '';
    stores.forEach((store) => {
      storeListHtml += Header.storeItemTemplate(store);
    });

    return storeListHtml;
  }

  static storeItemTemplate(data) {
    return `<li class="change-store__item${data.tempUnavailableText ? ' store-switcher-popup-item--suspended' : ''}">
                <a class="change-store__link${parseInt(window.app.storeId, 10) === parseInt(data.id, 10) ? ' active' : ''}" href="#" data-store="${data.id}">
                    <div class="change-store__item-name">${data.name}</div>
                    <div class="change-store__item-subtitle">${data.shortAddress}</div>
                    <div class="change-store__item-note">${data.courier === 'Y' ? 'Курьер и самовывоз' : 'Только самовывоз'}</div>
                </a>
            </li>`;
  }

  static setStore(cityId, storeId, callback) {
    let backUrl = document.location.href;
    backUrl = backUrl.substr(backUrl.indexOf('/', 9));

    // console.log(cityId, storeId);
    $.ajax({
      url: document.location.href,
      data: {
        method: 'store.set',
        cityId,
        storeId,
        backUrl,
        ajax: 'Y',
        sessid: window.app.bitrix_sessid,
      },
      dataType: 'json',
    }).done((response) => {
      if (response.status === 'error') {
        alert(response.error);
        return;
      }

      if (callback) {
        callback();
      } else if (response.redirectUrl) {
        document.location.href = response.redirectUrl;
      } else {
        document.location.reload();
      }
    });
  }
}


Header.initHtmlApi();
