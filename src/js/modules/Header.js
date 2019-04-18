import Utils from '../utils/utils';

export default class Header {
  constructor() {
    this.scrollOffset = window.pageYOffset;
    this.header = {
      targets: Utils.parseTargets('.header'),
      fixedTargets: Utils.parseTargets('.header__fixed-block'),
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

    this.init();
  }

  init() {
    this.header.fixedTargets.map(item => this.fixingHeader(item));
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

    // Управление мобильным меню
    this.menu.controls.map(item => item.addEventListener('click', this.toggleMenu));
  }

  onScroll = () => {
    this.scrollOffset = window.pageYOffset;
    this.header.fixedTargets.map(item => this.fixingHeader(item));
  };

  onWindowResize = () => {

  };
}