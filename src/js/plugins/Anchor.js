import Utils from '../utils/utils';

class Anchor {
  constructor(link) {
    this.el = link;
    this.target = document.querySelector(this.el.getAttribute('href'));

    link.addEventListener('click', (event) => {
      if (this.target) {
        event.preventDefault();
        Utils.scrollTo(this.target);
      }
    });

    this.el.Anchor = this;
  }

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

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
    document.removeEventListener(
      'DOMContentLoaded',
      this.initDOMLoadedElements,
    );
    window.removeEventListener('load', this.initDOMLoadedElements);

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-anchor]'),
      (el) => {
        if (!el.Anchor) new Anchor(el);
      },
    );
  }
}

Anchor.initHtmlApi();

export default Anchor;
