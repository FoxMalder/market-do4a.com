class TextareaAutoHeight {
  constructor(el) {
    this.textarea = el;
    this.border = this.textarea.offsetHeight - this.textarea.clientHeight;


    this.textarea.addEventListener('keyup', () => {
      const height = this.textarea.scrollHeight;

      if (this.textarea.value === '') {
        this.textarea.style.height = '';
      } else {
        this.textarea.style.height = `${height + this.border}px`;
      }
    });
  }

  static init(list) {
    [].forEach.call(list, (textarea) => {
      new TextareaAutoHeight(textarea);
    });
  }
}

export default TextareaAutoHeight;
