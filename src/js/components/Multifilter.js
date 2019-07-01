import SimpleBar from 'simplebar';
import noUiSlider from 'nouislider';

export class Multifilter {
  constructor(el, callback, options = {}) {
    if (!el) return;

    this.el = el;
    this.valueEl = this.el.querySelector('.multifilter__value');
    this.contentEl = this.el.querySelector('.dropdown-menu');
    this.menuButton = this.el.querySelector('button.multifilter__content');

    this.inputList = [...this.el.querySelectorAll('input')];

    this.callback = callback;

    this.options = {
      type: options.type || 'simple', // 'checkbox', 'radio', 'price'
      replaceTitle: options.replaceTitle || false,
    };

    if (this.options.type === 'simple') {
      // this.inputList.forEach(item => item.addEventListener('change', this.callback));
      this.el.addEventListener('change', this.callback(this));
    }
  }

  /**
   * Инициализирует кастомную прокрутку
   *
   * @returns {SimpleBar|boolean}
   */
  initScrollbar() {
    if (!this.contentEl) return false;
    const simpleBar = new SimpleBar(this.contentEl, { autoHide: false });
    this.contentEl = simpleBar.getContentElement();
    return simpleBar;
  }


  /**
   * Обновляет заголовок
   *
   * @param {Array|String} [title=''] - Строка или массив вставляемых значений
   * @returns {String} title
   */
  updateTitle(title = '') {
    let newTitle = Array.isArray(title) ? title.join(', ') : title;
    if (newTitle === '') {
      newTitle = 'Не выбрано';
    }
    this.valueEl.innerHTML = newTitle;

    return title;
  }

  reset() {
    this.inputList.forEach((input) => {
      if (!(input.disabled || !input.type)) {
        switch (input.type.toLowerCase()) {
          case 'text':
          case 'password':
          case 'textarea':
          case 'hidden':
            input.value = '';
            break;

          case 'radio':
            if (!input.hasAttribute('checked')) {
              input.checked = false;
            }
            break;

          case 'checkbox':
            input.checked = false;
            break;

          case 'select-one':
          case 'select-multi':
            input.selectedIndex = -1;
            break;

          default:
            break;
        }
      }
    });
    this.callback(this);
  }
}

export class PriceFilter extends Multifilter {
  constructor(el, callback) {
    super(el, callback, { type: 'price' });

    const priceMinText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__start');
    const priceMaxText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__end');

    const rangeArr = {
      min: priceMinText ? parseInt(priceMinText.innerText.replace(/[^0-9]/g, ''), 10) : 0,
      max: priceMaxText ? parseInt(priceMaxText.innerText.replace(/[^0-9]/g, ''), 10) : 9999,
    };

    this.fromInput = this.contentEl.querySelector('.js-min-value');
    if (!this.fromInput) {
      this.fromInput = document.createElement('input');
      this.fromInput.type = 'hidden';
      this.fromInput.name = 'Price[from]';
      this.fromInput.value = 0;
      this.contentEl.appendChild(this.fromInput);
    }

    this.toInput = this.contentEl.querySelector('.js-max-value');
    if (!this.toInput) {
      this.toInput = document.createElement('input');
      this.toInput.type = 'hidden';
      this.toInput.name = 'Price[to]';
      this.fromInput.value = 0;
      this.contentEl.appendChild(this.toInput);
    }

    const startArr = [
      parseInt(this.fromInput.value, 10),
      parseInt(this.toInput.value, 10) || rangeArr.max,
    ];

    this.rangeEl = this.contentEl.querySelector('.input-range');
    noUiSlider.create(this.rangeEl, {
      start: startArr,
      step: 1,
      connect: true,
      tooltips: true,
      range: rangeArr,
      format: {
        to(value) {
          return `${Math.floor(value)} ₽`;
        },
        from(value) {
          return value.replace(/[^0-9]/g, '');
        },
      },
      cssPrefix: 'input-range',
      cssClasses: {
        target: '',
        base: '__base',
        origin: '__origin',
        handle: '__handle',
        handleLower: '__handle-lower',
        handleUpper: '__handle-upper',
        touchArea: '__touch-area',
        horizontal: '_horizontal',
        vertical: '_vertical',
        background: '__background',
        connect: '__connect',
        connects: '__connects',
        ltr: '_ltr',
        rtl: '_rtl',
        draggable: '_draggable',
        drag: '_state-drag',
        tap: '_state-tap',
        active: '__active',
        tooltip: '__tooltip',

        // Шкала
        pips: '__pips',
        pipsHorizontal: '__pips_horizontal',
        pipsVertical: '__pips_vertical',

        // Деления на шкале
        marker: '__marker',
        markerHorizontal: '__marker_horizontal',
        markerVertical: '__marker_vertical',
        markerNormal: '__marker_normal',
        markerLarge: '__marker_large',
        markerSub: '__marker_sub',

        // Значения на шкале
        value: '__value',
        valueHorizontal: '__value_horizontal',
        valueVertical: '__value_vertical',
        valueNormal: '__value_normal',
        valueLarge: '__value_large',
        valueSub: '__value_sub',
      },
    });


    this.rangeEl.noUiSlider.on('set', this.onChange, 100);
  }

  onChange = (...param) => {
    this.callback();
    this.fromInput.value = Math.floor(param[2][0]);
    this.toInput.value = Math.floor(param[2][1]);
  };

  reset() {
    this.rangeEl.noUiSlider.reset();
  }
}

export class CheckboxFilter extends Multifilter {
  constructor(el, callback) {
    super(el, callback, { type: 'checkbox' });


    this.total = 0;
    this.totalEl = null;
    this.resetButton = null;
    this.selectedTitle = [];

    this.data = {
      name: '',
      value: [],
    };


    if (this.el.querySelector('.multifilter__label')) {
      this.options.replaceTitle = true;
    }

    this.init();
  }

  init() {
    this.data.name = this.inputList[0].name;
    this.total = this.inputList.reduce((arr, input) => {
      if (!input.checked) {
        return arr;
      }
      this.data.value.push(input.value);
      return this.selectedTitle.push(input.nextElementSibling.textContent);
    }, 0);


    if (this.inputList.length > 9) {
      this.initSearch();
      super.initScrollbar();
    }

    this.resetButton = this.el.querySelector('.multifilter__btn-clear');
    if (!this.resetButton) {
      this.resetButton = document.createElement('button');
      this.resetButton.classList.add('multifilter__btn-clear');
      this.el.appendChild(this.resetButton);
    }
    this.resetButton.addEventListener('click', this.onReset);


    this.totalEl = this.menuButton.querySelector('.multifilter__total');
    if (!this.totalEl) {
      this.totalEl = document.createElement('span');
      this.totalEl.classList.add('multifilter__total');
      this.menuButton.appendChild(this.totalEl);
    }

    this.el.addEventListener('change', this.onChange);
    this.render();
  }

  initSearch() {
    const searchField = document.createElement('input');
    searchField.classList.add('multifilter-search__input');
    searchField.type = 'search';
    searchField.placeholder = 'Поиск';
    searchField.autocomplete = 'off';
    // searchField.addEventListener('keyup', this.onSearch);
    searchField.addEventListener('input', this.onSearch);
    searchField.addEventListener('change', this.onSearch);

    const searchContainer = document.createElement('div');
    searchContainer.classList.add('multifilter-search');
    searchContainer.appendChild(searchField);

    this.contentEl.insertBefore(searchContainer, this.contentEl.firstChild);
  }

  onSearch = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const searchText = event.target.value.trim().toLowerCase();

    this.inputList.forEach((input) => {
      if (!searchText.length) {
        input.parentElement.style.display = '';
      } else if (input.nextElementSibling.textContent.toLowerCase().indexOf(searchText) !== -1) {
        input.parentElement.style.display = '';
      } else {
        input.parentElement.style.display = 'none';
      }
    });
  };

  onChange = (event) => {
    if (event.target.getAttribute('type') !== 'checkbox') return;

    const title = event.target.nextElementSibling.textContent;
    if (event.target.checked) {
      this.total += 1;
      this.selectedTitle.push(title);
      this.data.value.push(event.target.value);
    } else {
      this.total -= 1;
      this.selectedTitle.splice(this.selectedTitle.indexOf(title), 1);
      this.data.value.splice(this.data.value.indexOf(event.target.value), 1);
    }

    this.render();
    this.callback(this);
  };

  onReset = (event) => {
    event.preventDefault();
    this.reset();
  };

  render() {
    this.totalEl.innerText = this.total || 0;
    this.totalEl.style.display = this.total ? '' : 'none';
    this.resetButton.style.display = this.total ? '' : 'none';
    if (this.total) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }

    if (this.options.replaceTitle) {
      super.updateTitle(this.selectedTitle);
    }
  }

  reset() {
    this.data.value = [];
    super.reset();
    this.total = 0;
    this.selectedTitle = [];
    this.render();
    // this.callback(this);
  }
}

export class RadioFilter extends Multifilter {
  constructor(el, callback) {
    super(el, callback, { type: 'radio' });

    this.el.addEventListener('change', this.onChange);

    this.defaultInput = this.el.querySelector('input[checked]');
    super.updateTitle(this.defaultInput.nextElementSibling.textContent);

    if (this.inputList.length > 9) {
      super.initScrollbar();
    }
  }

  onChange = (event) => {
    super.updateTitle(event.target.nextElementSibling.textContent);
    this.callback(this);
  };

  reset() {
    super.reset();
    // this.defaultInput.checked = true;
    super.updateTitle(this.defaultInput.nextElementSibling.textContent);
    // this.callback(this);
  }
}
