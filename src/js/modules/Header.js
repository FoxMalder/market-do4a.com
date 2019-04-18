import Utils from '../utils/utils';

class Header {
  constructor() {
    this.scrollOffset = window.pageYOffset;
    this.header = {
      targets: Utils.parseTargets('.header'),
      collapse: Utils.parseTargets('.header__collapse'),
      fixedTargets: Utils.parseTargets('.header__fixed-block'),
      // Список элементов в не фиксированной области над фиксированной
      fixedOffsetTargets: Utils.parseTargets('.header-banner'),
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

    this.init();
  }

  init() {
    this.header.fixedTargets.forEach(item => this.fixingHeader(item));
    this.calculate();
    this.initListeners();
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


  fixingHeader = (element) => {
    // const breakpoints = element.getBoundingClientRect().bottom + this.header.fixedBreakpointsOffset;
    const breakpoints = this.header.fixedBreakpointsOffset;

    if (this.scrollOffset >= breakpoints && !element.fixed) {
      element.classList.add('fixed');
      element.fixed = true;
    } else if (this.scrollOffset < breakpoints && element.fixed) {
      element.classList.remove('fixed');
      element.fixed = false;

    }
  };

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

    this.header.fixedTargets.map((item) => {
      this.fixingHeader(item);
      return item;
    });

    this.menu.targets.map((item) => {
      item.style.top = `${Math.max(this.header.fixedOffset - window.pageYOffset, 0)}px`;
      return item;
    });
  };

  onWindowResize = () => {
    this.calculate();
  };

  onLoad = () => {
    this.calculate();

    this.menu.targets.map((item) => {
      item.style.top = `${Math.max(this.header.fixedOffset - window.pageYOffset, 0)}px`;
      return item;
    });
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
}

export default Header;
