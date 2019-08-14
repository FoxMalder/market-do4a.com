import Utils from '../utils/utils';

class Anchor {
  constructor(link) {
    this.el = link;
    this.target = document.querySelector(this.el.getAttribute('href'));

    this.el.addEventListener('click', this.onClick);

    this.el.Anchor = this;
  }

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

    if (typeof MutationObserver !== 'undefined') {
      this.globalObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          Array.prototype.forEach.call(mutation.addedNodes, (addedNode) => {
            if (addedNode.nodeType === 1) {
              if (addedNode.hasAttribute('data-anchor')) {
                !addedNode.Anchor
                && new Anchor(addedNode);
              } else {
                Array.prototype.forEach.call(
                  addedNode.querySelectorAll('[data-anchor]'),
                  (el) => {
                    !el.Anchor
                    && new Anchor(el);
                  },
                );
              }
            }
          });

          Array.prototype.forEach.call(mutation.removedNodes, (removedNode) => {
            if (removedNode.nodeType === 1) {
              if (removedNode.hasAttribute('data-anchor')) {
                removedNode.Anchor && removedNode.Anchor.unMount();
              } else {
                Array.prototype.forEach.call(
                  removedNode.querySelectorAll('[data-anchor]'),
                  (el) => {
                    el.Anchor && el.Anchor.unMount();
                  },
                );
              }
            }
          });
        });
      });

      this.globalObserver.observe(document, { childList: true, subtree: true });
    }

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

  onClick = (event) => {
    if (this.target) {
      event.preventDefault();
      Utils.scrollTo(this.target);
    }
  };

  unMount() {
    this.el.removeEventListener('click', this.onClick);
    this.el.Anchor = null;
  }
}

Anchor.initHtmlApi();

export default Anchor;
