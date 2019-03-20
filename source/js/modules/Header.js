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

export default function Header() {
  const headerEl = document.querySelector('.header');
  const wrapperEl = document.querySelector('.wrapper');
  const menuEl = document.querySelector('.mobile-menu');
  const fixedHeaderEl = headerEl.querySelector('.header__fixed-block');

  let isFixed = false;
  let headerOffset = 0;

  function fixHeader() {
    if (!isFixed) {
      if (fixedHeaderEl.getBoundingClientRect().bottom > -300) {
        return;
      }

      fixedHeaderEl.classList.add('fixed');
      headerOffset = window.pageYOffset;
      isFixed = true;
    } else if (window.pageYOffset < headerOffset) {
      fixedHeaderEl.classList.remove('fixed');
      isFixed = false;
    }
  }

  function initMobile() {
    new MobileMenu();

    wrapperEl.style.paddingTop = `${headerEl.getBoundingClientRect().height}px`;
    menuEl.style.top = `${headerEl.getBoundingClientRect().height}px`;
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
