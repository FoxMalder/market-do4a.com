import Stickyfill from 'stickyfilljs/dist/stickyfill.es6';
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

    this.header.fixedTargets.forEach((item) => {
      item.fixed = false;
    });

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

    // this.getViewportSize =

    this.vp = Header.getViewportSize();

    this.init();
  }

  init() {
    // this.header.fixedTargets.forEach(item => this.fixingHeader(item));
    this.calculate();
    this.initListeners();

    Stickyfill.add(document.querySelectorAll('.header__fixed-block'));

    // new Sticky('.header__fixed-block', {
    //   marginTop: 0,
    //   stickyClass: 'fixed',
    // });

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

  initListeners() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('load', this.onLoad);

    // Управление мобильным меню
    this.menu.controls.map(item => item.addEventListener('click', this.toggleMenu));
    // Строка поиска на телефонах
    this.search.controls.map(item => item.addEventListener('click', this.toggleSearch));
  }

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
}

export default Header;
