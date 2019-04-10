// TODO: Объединить в один класс
class MobileMenu {
  constructor() {
    this.el = document.querySelector('.mobile-menu');
    this.menuControlBtn = document.querySelector('.header-control__menu-btn');
    this.menuOverlayEl = document.querySelector('.mobile-menu__overlay');

    this.init();
  }

  toggleMenu = () => {
    this.el.classList.toggle('opened');
    this.menuControlBtn.classList.toggle('active');

    // Временно
    const searchEl = document.querySelector('.header-control__search');
    const searchControlBtn = document.querySelector('.header-control__button_search');

    searchEl.classList.remove('active');
    searchControlBtn.classList.remove('active');

    if (document.body.style.overflow) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  init() {
    this.el.MobileMenu = this;

    this.menuControlBtn.addEventListener('click', this.toggleMenu);
    this.menuOverlayEl.addEventListener('click', this.toggleMenu);
  }

  destroy() {
    this.el.MobileMenu = null;

    this.menuControlBtn.removeEventListener('click', this.toggleMenu);
    this.menuOverlayEl.removeEventListener('click', this.toggleMenu);
  }
}

// function ready(fn) {
//   if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }

export default function Header() {
  const headerEl = document.querySelector('.header');
  const wrapperEl = document.querySelector('.wrapper');
  const menuEl = document.querySelector('.mobile-menu');
  const fixedHeaderEl = headerEl.querySelector('.header__fixed-block');
  const searchEl = headerEl.querySelector('.header-control__search');
  const searchControlBtn = headerEl.querySelector('.header-control__button_search');

  let isFixed = false;
  let headerOffsetBreakpoints = headerEl.getBoundingClientRect().bottom + 300;

  function fixHeader() {
    headerOffsetBreakpoints = headerEl.getBoundingClientRect().bottom + 300;

    if (window.pageYOffset >= headerOffsetBreakpoints && !isFixed) {
      fixedHeaderEl.classList.add('fixed');
      isFixed = true;
    } else if (window.pageYOffset < headerOffsetBreakpoints && isFixed) {
      fixedHeaderEl.classList.remove('fixed');
      isFixed = false;
    }
  }

  function initMobile() {
    new MobileMenu();

    wrapperEl.style.paddingTop = `${headerEl.getBoundingClientRect().height}px`;
    menuEl.style.top = `${headerEl.getBoundingClientRect().height}px`;

    searchControlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchEl.classList.toggle('active');
      searchControlBtn.classList.toggle('active');
    });
  }

  function initDesktop() {
    fixHeader();
    document.addEventListener('scroll', fixHeader);
  }


  if (document.documentElement.clientWidth < 1240) {
    initMobile();
  } else {
    initDesktop();
  }
}
