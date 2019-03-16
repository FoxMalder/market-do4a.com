import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import ResizeObserver from 'resize-observer-polyfill';

export default class MreSlider {
  constructor(element, options) {
    this.el = element;
    this.wrapperEl;
    this.contentEl;
    // this.trackEl;
    // this.scrollbarEl;
    this.globalObserver;
    this.mutationObserver;
    this.resizeObserver;
    this.content = {};
    this.track = {};
    this.scrollbar = {};
    // this.
    this.options = {...MreSlider.defaultOptions, ...options};
    this.classNames = {...MreSlider.defaultOptions.classNames, ...this.options.classNames};

    this.axis = {
      x: {
        scrollOffset: 0,
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetAttr: 'left',
        dragOffset: 0,
      },
    };

    this.recalculate = throttle(this.recalculate.bind(this), 64);
    this.onMouseMove = throttle(this.onMouseMove.bind(this), 64);
    this.onWindowResize = debounce(this.onWindowResize.bind(this), 64, {
      leading: true,
    });

    // getContentElement is deprecated
    this.getContentElement = this.getScrollElement;

    this.init();
  }

  /**
   * Static properties
   */

  static defaultOptions = {
    classNames: {
      content: 'slider__content',
      wrapper: 'slider__wrapper',
      scrollbar: 'slider__scrollbar',
      track: 'slider__track',
      trackHover: 'slider__track_hover',
      scrollbarHover: 'slider__scrollbar_hover',
    },
    scrollbarIcon: `<svg><use xlink:href="images/sprite.svg#track-icon"></use></svg>`,
    timeout: 1000,
  };

  static removeObserver() {
    this.globalObserver.disconnect();
  }

  static getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft),
    };
  }

  init() {
    this.el.MreSlider = this;

    this.initDOM();
    this.recalculate();
    this.initListeners();
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      Array.from(this.el.children).filter(child =>
        child.classList.contains(this.classNames.wrapper),
      ).length
    ) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector(`.${this.classNames.wrapper}`);
      this.contentEl = this.el.querySelector(`.${this.classNames.content}`);
      // this.trackEl = this.el.querySelector(`.${this.classNames.track}`);
      this.track.el = this.el.querySelector(`.${this.classNames.track}`);

    } else {

      // Prepare DOM
      this.wrapperEl = document.createElement('div'); // slider__wrapper
      this.contentEl = document.createElement('div'); // slider__content

      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentEl.classList.add(this.classNames.content);

      while ( this.el.firstChild ) this.contentEl.appendChild(this.el.firstChild);

      this.wrapperEl.appendChild(this.contentEl);
      this.el.appendChild(this.wrapperEl);
    }

    if ( !this.track.el ) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);
      scrollbar.innerHTML = this.options.scrollbarIcon;

      track.appendChild(scrollbar);

      this.track.el = track.cloneNode(true);

      this.el.appendChild(this.track.el);
    }

    this.scrollbar.el = this.track.el.querySelector(
      `.${this.classNames.scrollbar}`,
    );
    // this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
    //     `.${this.classNames.scrollbar}`
    // );

    // this.el.setAttribute('data-simplebar', 'init');
    this.el.classList.add('slider');
  }

  initListeners() {
    // Event listeners
    if ( this.options.autoHide ) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    [
      'mousedown',
      'click',
      'dblclick',
      'touchstart',
      'touchend',
      'touchmove',
    ].forEach(e => {
      this.el.addEventListener(e, this.onPointerEvent, true);
    });

    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);

    // this.contentEl.addEventListener('scroll', this.onScroll);
    // this.contentEl.addEventListener('wheel', this.onScroll);

    // Browser zoom triggers a window resize
    window.addEventListener('resize', this.onWindowResize);

    // MutationObserver is IE11+
    if ( typeof MutationObserver !== 'undefined' ) {
      // create an observer instance
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (
            mutation.target === this.el ||
            !this.isChildNode(mutation.target) ||
            mutation.addedNodes.length ||
            mutation.removedNodes.length
          ) {
            this.recalculate();
          }
        });
      });

      // pass in the target node, as well as the observer options
      this.mutationObserver.observe(this.el, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    this.resizeObserver = new ResizeObserver(this.recalculate);
    this.resizeObserver.observe(this.el);
  }

  recalculate() {
    this.elStyles = window.getComputedStyle(this.el);

    this.contentEl.style.padding =
      `${this.elStyles.paddingTop} ${this.elStyles.paddingRight} 
      ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;

    this.wrapperEl.style.margin =
      `-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} 
      -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;

    this.track.rect = this.track.el.getBoundingClientRect();
    this.scrollbar.size = 80;
    this.scrollbar.el.style.width = `${this.scrollbar.size}px`;
    this.contentEl.style.width = `${this.contentEl['scrollWidth']}px`;

    this.positionScrollbar('x');
  }

  positionScrollbar(axis = 'x') {
    // console.l
    const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.track.rect[this.axis[axis].sizeAttr];
    const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    const scrollbar = this.scrollbar;


    let scrollOffset = this.axis[axis].scrollOffset;
    let scrollPourcent = scrollOffset / (contentSize - hostSize);
    let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);

    // console.log(handleOffset);
    scrollbar.el.style.transform = `translate3d(${handleOffset}px, 0, 0)`;
  }

  // scrollOn(handleOffset) {
  //   const contentSize = this.contentEl[this.axis[this.draggedAxis].scrollSizeAttr];
  //   const hostSize = parseInt(this.elStyles[this.axis[this.draggedAxis].sizeAttr], 10);
  //
  //   if ( handleOffset > (contentSize - hostSize) ) {
  //     handleOffset = (contentSize - hostSize);
  //   } else if ( handleOffset < 0 ) {
  //     handleOffset = 0;
  //   }
  //   // this.contentEl[this.axis[this.draggedAxis].scrollOffsetAttr] = handleOffset;
  //   this.axis[this.draggedAxis].scrollOffset = handleOffset;
  //   this.contentEl.style.transform = `translate3d(${-handleOffset}px, 0, 0)`;
  // }

  /**
   * On scroll event handling
   */
  onScroll = (e) => {
    // console.log(this.scrollXTicking);
    if ( !this.scrollXTicking ) {
      window.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }
  };

  scrollX = () => {
    // console.log('scrollX');
    this.positionScrollbar('x');
    this.scrollXTicking = false;
  };

  onMouseEnter = () => {
    // this.showScrollbar('x');
    // this.showScrollbar('y');
  };

  onMouseMove = e => {
    this.mouseX = e.clientX;

    // if ( this.axis.x.isOverflowing || this.axis.x.forceVisible ) {
    // console.log(this.mouseX);

    this.onMouseMoveForAxis();
    // }
  };

  onMouseMoveForAxis() {
    this.track.rect = this.track.el.getBoundingClientRect();
    this.scrollbar.rect = this.scrollbar.el.getBoundingClientRect();

    const isWithinScrollbarBoundsX = this.isWithinBounds(
      this.scrollbar.rect,
    );

    if ( isWithinScrollbarBoundsX ) {
      this.scrollbar.el.classList.add(this.classNames.scrollbarHover);
    } else {
      this.scrollbar.el.classList.remove(this.classNames.scrollbarHover);
    }

    if ( this.isWithinBounds(this.track.rect) ) {
      // this.showScrollbar(axis);
      this.track.el.classList.add(this.classNames.trackHover);
    } else {
      this.track.el.classList.remove(this.classNames.trackHover);
    }
  }

  onMouseLeave = () => {
    this.onMouseMove.cancel();

    this.onMouseLeaveForAxis();
    this.mouseX = -1;
  };

  onMouseLeaveForAxis() {
    this.track.el.classList.remove(this.classNames.trackHover);
    this.scrollbar.el.classList.remove(this.classNames.scrollbarHover);
  }

  onWindowResize = () => {
    // Recalculate scrollbarWidth in case it's a zoom
    // this.scrollbarWidth = scrollbarWidth();

    // this.hideNativeScrollbar();
  };

  onPointerEvent = e => {
    let isWithinBoundsX;
    this.scrollbar.rect = this.scrollbar.el.getBoundingClientRect();

    isWithinBoundsX = this.isWithinBounds(this.scrollbar.rect);

    // If any pointer event is called on the scrollbar
    if ( isWithinBoundsX ) {
      // Preventing the event's default action stops text being
      // selectable during the drag.
      e.preventDefault();
      // Prevent event leaking
      e.stopPropagation();

      // console.log('onPointerEvent');

      if ( e.type === 'mousedown' ) {
        this.onDragStart(e, 'x');
      }
    }
  };

  /**
   * on scrollbar handle drag movement starts
   */
  onDragStart(e, axis = 'x') {
    const scrollbar = this.scrollbar.el;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = e.pageX;

    // console.log(eventOffset);

    this.axis[axis].dragOffset = eventOffset - scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;

    // console.log(this.axis[axis].dragOffset);

    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.onEndDrag);
  }

  /**
   * Drag scrollbar handle
   */
  drag = e => {
    let eventOffset;
    let track = this.track;

    const contentSize = this.contentEl[this.axis[this.draggedAxis].scrollSizeAttr];
    const trackSize = track.rect[this.axis[this.draggedAxis].sizeAttr];
    const hostSize = parseInt(this.elStyles[this.axis[this.draggedAxis].sizeAttr], 10);
    const scrollbar = this.scrollbar;

    // console.log(contentSize, trackSize, hostSize);

    e.preventDefault();
    e.stopPropagation();

    eventOffset = e.pageX;

    let dragPos =
      eventOffset -
      track.rect[this.axis[this.draggedAxis].offsetAttr] - this.axis[this.draggedAxis].dragOffset;

    let handleOffset = (dragPos / (trackSize - scrollbar.size)) * (contentSize - hostSize);

    if ( handleOffset > (contentSize - hostSize) ) {
      handleOffset = (contentSize - hostSize);
    } else if ( handleOffset < 0 ) {
      handleOffset = 0;
    }
    // this.contentEl[this.axis[this.draggedAxis].scrollOffsetAttr] = handleOffset;
    this.axis[this.draggedAxis].scrollOffset = handleOffset;
    this.contentEl.style.transform = `translate3d(${-handleOffset}px, 0, 0)`;
    this.onScroll();
  };

  /**
   * End scroll handle drag
   */
  onEndDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.onEndDrag);
  };

  /**
   * Getter for original scrolling element
   */
  getScrollElement() {
    return this.contentEl;
  }

  removeListeners() {
    // Event listeners
    if ( this.options.autoHide ) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    [
      'mousedown',
      'click',
      'dblclick',
      'touchstart',
      'touchend',
      'touchmove',
    ].forEach(e => {
      this.el.removeEventListener(e, this.onPointerEvent);
    });

    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    // this.contentEl.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onWindowResize);

    this.mutationObserver && this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();

    // Cancel all debounced functions
    this.recalculate.cancel();
    this.onMouseMove.cancel();
    // this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }

  destroy() {
    this.removeListeners();

    while ( this.contentEl.firstChild ) this.el.appendChild(this.contentEl.firstChild);

    this.el.removeChild(this.wrapperEl);
    this.el.removeChild(this.track.el);

    this.el.MreSlider = null;

  }

  /**
   * Recursively walks up the parent nodes looking for this.el
   */
  isChildNode(el) {
    if ( el === null ) return false;
    if ( el === this.el ) return true;

    return this.isChildNode(el.parentNode);
  }

  /**
   * Check if mouse is within bounds
   */
  isWithinBounds(bbox) {
    return (
      this.mouseX >= bbox.left &&
      this.mouseX <= bbox.left + bbox.width
      // this.mouseY >= bbox.top &&
      // this.mouseY <= bbox.top + bbox.height
    );
  }
}