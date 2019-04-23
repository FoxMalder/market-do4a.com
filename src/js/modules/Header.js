import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
import Tooltip from 'tooltip.js';
import Utils from '../utils/utils';
import postIconSvg from '../../img/svg-sprite/change-store-stock-icon.svg';

console.log(postIconSvg);


class Header {
  constructor() {
    this.scrollOffset = window.pageYOffset;
    this.header = {
      // targets: Utils.parseTargets('.header'),
      collapse: Utils.parseTargets('.h-navbar-collapse'),
      fixedTargets: Utils.parseTargets('.h-navbar-fixed'),
      // Список элементов в не фиксированной области над фиксированной
      fixedOffsetTargets: Utils.parseTargets(['.header-banner', '.h-navbar-top']),
      // Высота не фиксированной области над фиксированной
      fixedOffset: 0,
      fixedBreakpointsOffset: 600,
    };

    // this.header.fixedTargets.forEach((item) => {
    //   item.fixed = false;
    // });

    this.menu = {
      opened: false,
      targets: Utils.parseTargets('.mobile-menu'),
      controls: Utils.parseTargets('.header-control__menu-btn'),
      overlay: Utils.parseTargets('.mobile-menu__overlay'),
    };

    this.search = {
      opened: false,
      targets: Utils.parseTargets('.header-control__search'),
      controls: Utils.parseTargets('.header-control__button_search'),
    };

    this.collapse = {
      cityContainer: document.querySelector('.change-city-collapse'),
      storeContainer: document.querySelector('.change-store-collapse'),
    };

    // this.getViewportSize =

    this.vp = Header.getViewportSize();

    this.init();
  }

  init() {
    this.calculate();
    this.initListeners();
    this.header.fixedTargets.forEach(item => new Stickyfill.Sticky(item));

    app.header = {};
    this.initCityContainer();
    this.initStoreContainer();


    // const sticky = new Stickyfill.Sticky(document.querySelector('.h-navbar-fixed'));
    // new Sticky('.header__fixed-block', {
    //   marginTop: 0,
    //   stickyClass: 'fixed',
    // });
    // Utils.parseTargets('.h-category__link').map()
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

          document.querySelector('.change-store__title').innerHTML = `ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected">${app.storeManagerData.cities[cityId].name5}</span>`;
          document.querySelector('.change-store__list').innerHTML = Header.generateStoreList(cityId);

          $(document.querySelector('.change-store-collapse')).collapse('show');
          return;
        }

        if (target.classList.contains('change-post')) {
          event.preventDefault();
          Header.setStore(app.storeManagerData.noCityId, app.storeManagerData.remoteStoreId);
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
    Object.keys(app.storeManagerData.chars).forEach((char) => {
      app.storeManagerData.chars[char].forEach((cityId, index) => {
        cityListHtml += `<li class="change-city__item" ${(index === 0) ? `data-letter="${char}"` : ''}>
                            <a href="#" class="change-city__link" data-city="${cityId}">${app.storeManagerData.cities[cityId].name}</a>
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

    app.header.cityList = block;
  };

  initStoreContainer = () => {
    const parent = document.querySelector('.change-store-collapse');

    parent.addEventListener('click', (event) => {
      let { target } = event;
      while (target !== parent) {
        if (target.classList.contains('change-store__link')) {
          event.preventDefault();
          const storeId = parseInt(target.getAttribute('data-store'), 10);
          Header.setStore(app.storeManagerData.stores[storeId].city, storeId);
          return;
        }
        if (target.classList.contains('change-post')) {
          event.preventDefault();
          Header.setStore(app.storeManagerData.noCityId, app.storeManagerData.remoteStoreId);
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
    header.innerHTML = `
      <span class="change-store__title">ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected">${app.storeManagerData.cities[app.storeManagerData.currentCityId].name5}</span></span>
      <button class="btn change-store__btn-close" data-toggle="collapse" data-target=".change-store-collapse"></button>`;

    const list = document.createElement('ul');
    list.classList.add('change-store__list');

    // document.querySelector('.change-store__title').innerHTML = `ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected"></span>`;
    list.innerHTML = Header.generateStoreList(parseInt(app.storeManagerData.currentCityId, 10));

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

    app.header.storeList = block;
  };


  toggleMenu = (event) => {
    event.preventDefault();

    if (this.menu.opened) {
      this.menu.targets.map(item => item.classList.remove('active'));
      this.menu.controls.map(item => item.classList.remove('active'));
      document.body.style.overflow = '';
      this.menu.opened = false;
    } else {
      this.menu.targets.map(item => item.classList.add('active'));
      this.menu.controls.map(item => item.classList.add('active'));
      document.body.style.overflow = 'hidden';
      this.menu.opened = true;
    }
  };

  toggleSearch = (event) => {
    event.preventDefault();
    if (this.search.opened) {
      this.search.targets.map(item => item.classList.remove('active'));
      this.search.controls.map(item => item.classList.remove('active'));
      this.search.opened = false;
    } else {
      this.search.targets.map(item => item.classList.add('active'));
      this.search.controls.map(item => item.classList.add('active'));
      this.search.opened = true;
    }
  };


  // fixingHeader = (element) => {
  //   // const breakpoints = element.getBoundingClientRect().bottom + this.header.fixedBreakpointsOffset;
  //   const breakpoints = this.header.fixedBreakpointsOffset;
  //
  //   if (this.scrollOffset >= breakpoints && !element.fixed) {
  //     element.classList.add('fixed');
  //     element.fixed = true;
  //   } else if (this.scrollOffset < breakpoints && element.fixed) {
  //     element.classList.remove('fixed');
  //     element.fixed = false;
  //
  //   }
  // };

  initListeners() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('load', this.onLoad);

    // Управление мобильным меню
    this.menu.controls.map(item => item.addEventListener('click', this.toggleMenu));
    // Строка поиска на телефонах
    this.search.controls.map(item => item.addEventListener('click', this.toggleSearch));
  }

  // onClickCity = () => {
  //
  // }

  onScroll = () => {
    this.scrollOffset = window.pageYOffset;

    // this.header.fixedTargets.forEach((item) => {
    //   this.fixingHeader(item);
    // });

    if (this.vp.width < 1240) {
      this.header.collapse.forEach((item) => {
        item.style.maxHeight = `${this.vp.height - Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
      });
      this.menu.targets.forEach((item) => {
        item.style.top = `${Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
      });
    }
  };

  onWindowResize = () => {
    this.vp = Header.getViewportSize();
    this.calculate();

    if (this.vp.width < 1240) {
      this.header.collapse.forEach((item) => {
        item.style.maxHeight = `${this.vp.height - Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
        item.style.top = `${this.header.fixedOffset}px`;
      });
      this.menu.targets.forEach((item) => {
        item.style.top = `${Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
      });
    } else {
      this.header.collapse.forEach((item) => {
        item.style.maxHeight = '';
        item.style.top = '';
      });
    }
  };

  onLoad = () => {
    this.calculate();

    [].forEach.call(document.querySelectorAll('.h-category__link'), (item) => {
      const innerElement = item.nextElementSibling;
      if (!innerElement) {
        return;
      }

      const isRight = item.getBoundingClientRect().left > (this.vp.width / 2);
      if (isRight) {
        innerElement.classList.add('h-category-second_right');
      } else {
        innerElement.classList.remove('h-category-second_right');
      }

      // new Tooltip(item, {
      //   placement: (item.getBoundingClientRect().left < (this.vp.width / 2)) ? 'bottom-start' : 'bottom-end',
      //   // container: 'sadfsdg',
      //   html: true,
      //   // template:
      //   //   '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
      //   title: item.nextElementSibling,
      //   offset: 0,
      //   popperOptions: {
      //     positionFixed: true,
      //     // onUpdate: (e) => {
      //     //   console.log(this, e);
      //     // },
      //   },
      // });
    });

    if (this.vp.width < 1240) {
      this.header.collapse.forEach((item) => {
        item.style.maxHeight = `${this.vp.height - Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
        item.style.top = `${this.header.fixedOffset}px`;
      });
      this.menu.targets.forEach((item) => {
        item.style.top = `${Math.max(this.header.fixedOffset - this.scrollOffset, 0)}px`;
      });
    } else {
      this.header.collapse.forEach((item) => {
        item.style.maxHeight = '';
        item.style.top = '';
      });
    }
  };

  /*
   * Расчет некоторых статичных значений
   */
  calculate = () => {
    this.scrollOffset = window.pageYOffset;

    // Высота промежутка между фиксированной областью и краем страницы
    this.header.fixedOffset = 0;
    this.header.fixedOffsetTargets.forEach((item) => {
      this.header.fixedOffset += item.clientHeight;
    });
  };

  static getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    };
  }

  static generateStoreList(cityId) {
    const stores = [];

    Object.keys(app.storeManagerData.stores).forEach((key) => {
      const store = app.storeManagerData.stores[key];
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
                <a class="change-store__link${parseInt(app.storeId, 10) === parseInt(data.id, 10) ? ' active' : ''}" href="#" data-store="${data.id}">
                    <div class="change-store__item-name">${data.name}</div>
                    <div class="change-store__item-subtitle">${data.shortAddress}</div>
                    <div class="change-store__item-note">${data.courier === 'Y' ? 'Курьер и самовывоз' : 'Только самовывоз'}</div>
                </a>
            </li>`;
  }

  /**
   * @param cityId
   * @param storeId
   * @param callback
   * @private
   */
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
        sessid: app.bitrix_sessid,
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

export default Header;
