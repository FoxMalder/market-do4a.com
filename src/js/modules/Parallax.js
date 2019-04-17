export default class Parallax {
  constructor(element, options) {
    this.el = element;

    // this.shadowEl = this.el.querySelector('arnold__bg');
    // this.imgEl = this.el.querySelector('arnold__bg');
    this.options = options;

    // this.rect = this.el.getBoundingClientRect();
    this.init();
  }

  init() {
    this.setPosition();
    document.addEventListener('scroll', this.setPosition);
  }

  setPosition = (e) => {
    const a = this.el.getBoundingClientRect().top + this.el.clientHeight / 2;
    const b = document.documentElement.clientHeight / 2;

    const translateX = 0;
    const translateY = (a - b) * this.options[0];

    this.el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  };
}
