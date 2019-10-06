class TextareaAutoHeight {
  constructor(el) {
    if (el.tagName !== 'TEXTAREA') {
      return;
    }

    this.textarea = el;
    this.border = this.textarea.offsetHeight - this.textarea.clientHeight;

    this.textarea.style.resize = 'none';
    this.textarea.style.overflow = 'hidden';
    this.textarea.addEventListener('keydown', this.calculate);
    this.textarea.addEventListener('keyup', this.calculate);
  }

  calculate = () => {
    const height = this.textarea.scrollHeight;

    if (this.textarea.value === '') {
      this.textarea.style.height = '';
    } else {
      this.textarea.style.height = `${height + this.border}px`;
    }
  };

  static init(list) {
    [].forEach.call(list, (textarea) => {
      new TextareaAutoHeight(textarea);
    });
  }
}

export default TextareaAutoHeight;
