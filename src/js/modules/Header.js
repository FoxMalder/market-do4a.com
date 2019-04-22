import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
import Tooltip from 'tooltip.js';
import Utils from '../utils/utils';


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

    let cityListHtml = '';
    Object.keys(app.storeManagerData.chars).forEach((char) => {
      app.storeManagerData.chars[char].forEach((cityId, index) => {
        cityListHtml += `<li class="change-city__item" ${(index === 0) ? `data-letter="${char}"` : ''}>
                            <a href="#" class="change-city__link" data-city="${cityId}">${app.storeManagerData.cities[cityId].name}</a>
                         </li>`;
      });
    });
    document.querySelector('.change-city__list').innerHTML = cityListHtml;

    this.collapse.cityContainer.addEventListener('click', (event) => {
      let { target } = event;

      while (target !== this.collapse.cityContainer) {
        if (target.classList.contains('change-city__link')) {
          Header.generateStoreList(
            parseInt(target.getAttribute('data-city'), 10) || app.storeManagerData.currentCityId,
          );
          event.preventDefault();

          $(this.collapse.storeContainer).collapse('show');
          return;
        }
        target = target.parentNode;
      }
    });

    this.collapse.storeContainer.addEventListener('click', (event) => {
      let { target } = event;
      while (target !== this.collapse.storeContainer) {
        if (target.classList.contains('change-store__link')) {
          event.preventDefault();
          const storeId = target.getAttribute('data-store');
          Header.setStore(app.storeManagerData.stores[storeId].city, storeId);
          return;
        }
        target = target.parentNode;
      }
    });


    // const sticky = new Stickyfill.Sticky(document.querySelector('.h-navbar-fixed'));
    // new Sticky('.header__fixed-block', {
    //   marginTop: 0,
    //   stickyClass: 'fixed',
    // });
    // Utils.parseTargets('.h-category__link').map()
  }

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

  initDOM() {

  }

  initCollapseCity() {

  }

  initCollapseStore(storeId) {

  }

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

    document.querySelector('.select-city__link_city').innerHTML = app.storeManagerData.cities[cityId].name;
    document.querySelector('.change-store__title').innerHTML = `ВЫБЕРИТЕ МАГАЗИН<br>в <span class="selected">${app.storeManagerData.cities[cityId].name5}</span>`;
    document.querySelector('.change-store__list').innerHTML = storeListHtml;
  }

  static storeItemTemplate(data) {
    return `<li class="change-store__item${data.tempUnavailableText ? ' store-switcher-popup-item--suspended' : ''}" data-store="${data.id}">
                <a class="change-store__link${parseInt(app.storeId, 10) === parseInt(data.id, 10) ? ' active' : ''}" href="#">
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
