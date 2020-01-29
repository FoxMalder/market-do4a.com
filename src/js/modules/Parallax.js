import { getOffset, getViewportSize } from '@/utils';


class Parallax {
  constructor() {
    this.items = [];
    this.scrollTicking = false;
    this.vp = getViewportSize();

    this.calculate();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  /**
   * Добавление параллакса на элемент
   * @param element
   * @param x - коэффициент смещения по x
   * @param y - коэффициент смещения по y
   */
  add(element, { x, y }) {
    this.items.push({
      el: element,
      offset: getOffset(element),
      x,
      y,
    });
  }

  /**
   * Удалить параллакс с элемента
   * @param element
   */
  remove(element) {
    this.items = this.items.filter(item => item.el !== element);
  }

  onResize = () => {
    this.vp = getViewportSize();
    // this.items.forEach((item) => {
    //   // item.offset = $(item).offset();
    //   // item.el.style.transition
    // });
  };

  onScroll = () => {
    this.requestTick();
  };

  onUdate = () => {
    this.scrollTicking = false;
    this.calculate();
  };

  requestTick() {
    if (!this.scrollTicking) {
      requestAnimationFrame(this.onUdate);
    }
    this.scrollTicking = true;
  }

  calculate() {
    this.items.forEach((item) => {
      const a = item.el.getBoundingClientRect().top + item.el.clientHeight / 2;


      // const translateX = ((item.offset.top - (this.vp.height / 2) + item.el.clientHeight) - window.pageYOffset) * item.x;
      const translateX = (a - this.vp.height / 2) * item.x;
      // const translateX = (item.offset.top - (this.vp.height / 2) + (item.el.clientHeight / 2) - window.pageYOffset) * item.x;
      const translateY = (a - this.vp.height / 2) * item.y;

      item.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
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

export default new Parallax();
