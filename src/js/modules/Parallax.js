export default class Parallax {
  constructor(targets, options) {
    this.elements = targets ? Parallax.toArray(targets) : [];
    this.options = options;
    this.scrollTicking = false;

    this.vp = Parallax.getViewportSize();

    this.init();
  }

  init() {
    this.update();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.vp = Parallax.getViewportSize();
  };

  onScroll = () => {
    this.requestTick();
  };

  requestTick = () => {
    if (!this.scrollTicking) {
      requestAnimationFrame(this.update);
    }
    this.scrollTicking = true;
  };

  update = () => {
    this.scrollTicking = false;

    this.elements.forEach((item) => {
      // item.parallax.rect = Parallax.getRectangle(item);
      this.calculate(item);
    });
  };

  calculate = (element) => {
    const a = element.getBoundingClientRect().top + element.clientHeight / 2;

    const translateX = (a - this.vp.height / 2) * this.options[1];
    const translateY = (a - this.vp.height / 2) * this.options[0];

    element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  };


  /**
   * Функция, которая возвращает преобразованный массив элементов
   * @function
   * @param {Array | Node | NodeList} targets - Element which position & rectangle are returned
   * @return {Array}
   */
  static toArray(targets) {
    if (Array.isArray(targets)) return targets;
    if (typeof targets === 'string') targets = document.querySelectorAll(targets) || targets;
    if (targets instanceof NodeList || targets instanceof HTMLCollection) {
      return [].slice.call(targets);
    }
    return [targets];
  }

  /**
   * Function that returns viewport dimensions
   * @function
   * @return {object}
   */
  static getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    };
  }

  // /**
  //  * Function that returns element rectangle & position (width, height, top, left)
  //  * @function
  //  * @param {node} element - Element which position & rectangle are returned
  //  * @return {object}
  //  */
  // static getRectangle(element) {
  //   // this.css(element, { position: '', width: '', top: '', left: '' });
  //
  //   const width = Math.max(element.offsetWidth, element.clientWidth, element.scrollWidth);
  //   const height = Math.max(element.offsetHeight, element.clientHeight, element.scrollHeight);
  //
  //   let top = 0;
  //   let left = 0;
  //
  //   do {
  //     top += element.offsetTop || 0;
  //     left += element.offsetLeft || 0;
  //     element = element.offsetParent;
  //   } while (element);
  //
  //   return {
  //     top, left, width, height,
  //   };
  // }
}
