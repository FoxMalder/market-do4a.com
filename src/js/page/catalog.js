import noUiSlider from 'nouislider';
import SimpleBar from 'simplebar';
import debounce from 'lodash.debounce';
import StickySidebar from '../plugins/sticky-sidebar';


let FilterForm;
let productList;


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

/**
 * Создает элемент из строки
 *
 * @param {String} html - html-код в виде строки
 * @returns {ChildNode}
 */
function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * Склонение слова в зависимости от числа
 *
 * @param {Number} n - Число
 * @param {Array|String} titles - Слово или массив из форм слова [товар, товара, товаров]
 * @returns {String}
 */
function declOfNum(n, titles) {
  if (typeof titles === 'string' || titles.length !== 3) {
    return titles;
  }

  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

// function clearForm(form) {
//   const inputs = form.getElementsByTagName('input');
//
//   for (let i = 0; i < inputs.length; i += 1) {
//     const input = inputs[i];
//
//     if (!(input.disabled || !input.type)) {
//       switch (input.type.toLowerCase()) {
//         case 'text':
//         case 'password':
//         case 'textarea':
//         case 'hidden':
//
//           input.value = '';
//           break;
//
//         case 'radio':
//         case 'checkbox':
//           if (input.checked) {
//             input.checked = false;
//           }
//           break;
//
//         case 'select-one':
//         case 'select-multi':
//           input.selectedIndex = -1;
//           break;
//
//         default:
//           break;
//       }
//     }
//   }
// }

class Product {
  constructor(data) {
    this.data = data;

    this.el = null;
    this.isFavorites = false;
    this.favoritesButton = null;

    this.init();
  }

  init() {
    const el = document.createElement('div');
    el.classList.add('product-card');

    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('product-card__wrapper');
    wrapperEl.innerHTML = `
      <div class="product-card__img">
        <img src="https://marketdo4a.com${this.data.img}" srcset="https://marketdo4a.com${this.data.img2x} 2x" alt="${this.data.name}">
      </div>
      <div class="product-card__body">
        <a class="product-card__title stretched-link" href="${this.data.url}" title="Перейти в карточку товара">${this.data.name}</a>
        <div class="product-card__description">${this.data.section}</div>
      </div>
      <div class="product-card__footer">
        <div class="product-card__price">
          <span class="small">от</span>
          <span class="price">${this.data.price}</span>
          <span class="currency">₽</span>
        </div>
        <div class="product-card__sale">${this.data.price_benefit ? `Экономия до ${this.data.price_benefit} ₽` : ''}</div>
        <div class="product-card__row">
          <div class="product-card__reviews">
            ${Product.getRatingEl(this.data.rating)}
            <span>${this.data.review} ${declOfNum(this.data.review, ['отзыв', 'отзыва', 'отзывов'])}</span>
          </div>                
          <div class="product-card__stock">
            <div class="${this.data.inAvailable ? 'green' : 'red'}">${this.data.inAvailable ? 'В наличии' : 'Нет в наличии'}</div>
            <div>${this.data.pack_count} ${declOfNum(this.data.pack_count, ['фасовка', 'фасовки', 'фасовок'])}</div>
          </div>
        </div>
      </div>`;


    const stickersEl = document.createElement('div');
    stickersEl.classList.add('product-stickers');


    const controlEl = document.createElement('div');
    controlEl.classList.add('product-control');

    const favoritesButton = document.createElement('button');
    favoritesButton.classList.add('product-control__favorites');
    if (this.isFavorites) {
      favoritesButton.classList.add('added');
    }
    favoritesButton.innerHTML = '<svg><use xlink:href="/static/dist/images/new-sprite.svg#sprite-product-card-heart"></use></svg>';
    favoritesButton.addEventListener('click', this.onClick);
    controlEl.appendChild(favoritesButton);

    this.favoritesButton = favoritesButton;


    el.appendChild(wrapperEl);
    el.appendChild(stickersEl);
    el.appendChild(controlEl);

    this.el = el;
  }

  onClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.isFavorites) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  };

  addToFavorites() {
    this.favoritesButton.classList.add('added');
    ProductList.addToFavoritesAPI(this.data.id);
    this.isFavorites = true;
  }

  removeFromFavorites() {
    this.favoritesButton.classList.remove('added');
    ProductList.removeFromFavoritesAPI(this.data.id);
    this.isFavorites = false;
  }

  getElement() {
    return this.el;
  }

  static getRatingEl(rating) {
    if (rating < 3) return '';

    const rounded = Math.round(rating);

    let html = '<span class="product-card__rating">';
    [0, 1, 2, 3, 4].forEach((i) => {
      html += `<i class="i i-star${i < rounded ? ' red' : ''}"></i>`;
    });
    html += '</span>';

    return html;
  }
}

class ProductList {
  constructor(el) {
    this.listEl = el;
    this.shownNumber = 0;

    this.init();
  }

  init() {
    $(this.listEl)
      .on('click.product.favorites', '[data-product-toggle]', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const productId = $(event.currentTarget).parents('.product-card').data('product-id');
        const toggle = $(event.currentTarget).data('product-toggle');

        this.toggleFavorites(productId, toggle);
      });
  }

  toggleFavorites = (productId, toggle) => {
    const $productCard = $(`[data-product-id="${productId}"]`);

    if (!productId || !$productCard.length) {
      return;
    }

    if (toggle === 'add-favorites') {
      if ($productCard.hasClass('added')) {
        $productCard.removeClass('added');
        $productCard.find('[data-product-toggle="add-favorites"]').removeClass('active');
        ProductList.removeFromFavoritesAPI(productId);
      } else {
        $productCard.addClass('added');
        $productCard.find('[data-product-toggle="add-favorites"]').addClass('active');
        ProductList.addToFavoritesAPI(productId);
      }
    }

    if (toggle === 'remove-favorites') {
      if ($productCard.hasClass('removed')) {
        $productCard.removeClass('removed');
        $productCard.find('[data-product-toggle="remove-favorites"]').addClass('active');
        ProductList.removeFromFavoritesAPI(productId);
      } else {
        $productCard.addClass('removed');
        $productCard.find('[data-product-toggle="remove-favorites"]').removeClass('active');
        ProductList.addToFavoritesAPI(productId);
      }
    }
  };


  /*
   * Создает нужные элементы на основе входных данных и вставляет их на страницу
   * Возвращает вставленное количество продуктов
   */
  parse(items) {
    return items.filter((item) => {
      let element;

      if (item.type === 'product') {
        element = new Product(item.options);
        element = element.getElement();
      } else {
        element = htmlToElement(item.html);
      }

      this.listEl.appendChild(element);

      return item.type === 'product';
    }).length;
  }

  reload(items) {
    this.listEl.innerHTML = '';
    this.shownNumber = this.parse(items);
    return this.shownNumber;
  }

  add(items) {
    this.shownNumber += this.parse(items);
    return this.shownNumber;
  }

  static addToFavoritesAPI(productId) {
    console.log(productId);
  }

  static removeFromFavoritesAPI(productId) {
    console.log(productId);
  }
}


function initVendorsList() {
  // /**
  //  * Set appropriate spanning to any masonry item
  //  *
  //  * Get different properties we already set for the masonry, calculate
  //  * height or spanning for any cell of the masonry grid based on its
  //  * content-wrapper's height, the (row) gap of the grid, and the size
  //  * of the implicit row tracks.
  //  *
  //  * @param item Object A brick/tile/cell inside the masonry
  //  * @link https://w3bits.com/css-grid-masonry/
  //  */
  // function resizeMasonryItem(item) {
  //   /* Get the grid object, its row-gap, and the size of its implicit rows */
  //   const grid = document.getElementsByClassName('brand-name-list')[0];
  //   if (grid) {
  //     const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  //     const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  //
  //     /*
  //      * Spanning for any brick = S
  //      * Grid's row-gap = G
  //      * Size of grid's implicitly create row-track = R
  //      * Height of item content = H
  //      * Net height of the item = H1 = H + G
  //      * Net height of the implicit row-track = T = G + R
  //      * S = H1 / T
  //      */
  //     const rowSpan = Math.ceil((item.querySelector('.brand-name-list__content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  //
  //     /* Set the spanning as calculated above (S) */
  //     item.style.gridRowEnd = `span ${rowSpan}`;
  //   }
  // }
  //
  // /**
  //  * Apply spanning to all the masonry items
  //  *
  //  * Loop through all the items and apply the spanning to them using
  //  * `resizeMasonryItem()` function.
  //  *
  //  * @uses resizeMasonryItem
  //  * @link https://w3bits.com/css-grid-masonry/
  //  */
  // function resizeAllMasonryItems() {
  //   // Get all item class objects in one list
  //   const allItems = document.querySelectorAll('.brand-name-list__col');
  //
  //   /*
  //    * Loop through the above list and execute the spanning function to
  //    * each list-item (i.e. each masonry item)
  //    */
  //   if (allItems) {
  //     for (let i = 0; i > allItems.length; i++) {
  //       resizeMasonryItem(allItems[i]);
  //     }
  //   }
  // }
  //
  // /* Resize all the grid items on the load and resize events */
  // const masonryEvents = ['load', 'resize'];
  // masonryEvents.forEach((event) => {
  //   window.addEventListener(event, resizeAllMasonryItems);
  // });

  $('body').scrollspy({ target: '.card-list__nav' });

  const StickyNav = document.querySelector('.card-list__nav');
  if (StickyNav) {
    new StickySidebar(StickyNav, {
      topSpacing: document.querySelector('.h-navbar-fixed').offsetHeight + 10,
    });
  }
}


/*
 * Фильтр каталога
 */


class Multifilter {
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
      this.el.addEventListener('change', this.callback);
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
    this.callback();
  }
}

class PriceFilter extends Multifilter {
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

class CheckboxFilter extends Multifilter {
  constructor(el, callback) {
    super(el, callback, { type: 'checkbox' });


    this.total = 0;
    this.totalEl = null;
    this.resetButton = null;
    this.selectedTitle = [];


    if (this.el.querySelector('.multifilter__label')) {
      this.options.replaceTitle = true;
    }

    this.init();
  }

  init() {
    this.total = this.inputList.reduce((arr, input) => (
      !input.checked ? arr : this.selectedTitle.push(input.nextElementSibling.textContent)
    ), 0);


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
    } else {
      this.total -= 1;
      this.selectedTitle.splice(this.selectedTitle.indexOf(title), 1);
    }

    this.render();
    this.callback();
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
    super.reset();
    this.total = 0;
    this.selectedTitle = [];
    this.render();
    this.callback();
  }
}

class RadioFilter extends Multifilter {
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
    this.callback();
  };

  reset() {
    super.reset();
    // this.defaultInput.checked = true;
    super.updateTitle(this.defaultInput.nextElementSibling.textContent);
  }
}


class Filter {
  constructor(el) {
    if (!el) return;

    this.form = el;
    this.filterList = [];

    this.totalNumber = 0;
    this.shownNumber = 0;
    this.pageNumber = 1;

    this.options = {
      url: this.form.action,
      method: this.form.method,
    };

    this.itemList = new ProductList(document.querySelector('.card-list'));
    this.filterList = [...this.form.querySelectorAll('fieldset.multifilter')];

    // Найдено: %s товаров
    this.totalNumberEl = document.querySelector('[data-total-find]');
    // Показано %s из %s
    this.shownNumberEl = document.querySelector('.load-more-block__value');
    // Кнопка "Показать еще"
    this.showMoreButton = document.querySelector('.load-more-block__link');


    this.update = debounce(this.update.bind(this), 1000);

    this.init();
  }

  init() {
    this.filterList = this.filterList.map((filter) => {
      if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.update);
      if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.update);
      if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, this.update);
      return new Multifilter(filter, this.update);
    });


    this.form.addEventListener('submit', this.onSubmit);
    this.form.addEventListener('reset', this.onReset);
    // this.form.addEventListener('change', this.onChange);
    if (this.showMoreButton) this.showMoreButton.addEventListener('click', this.onClick);
  }

  onChange = (event) => {
    event.preventDefault();
    this.update();
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.update();
  };

  onReset = (event) => {
    event.preventDefault();
    this.update();
    this.filterList.forEach(filter => filter.reset());
  };

  onClick = (event) => {
    event.preventDefault();
    this.nextPage();
  };

  update() {
    this.sendRequest(1);
  }

  nextPage() {
    this.sendRequest(this.pageNumber + 1);
  }

  sendRequest(page = 1) {
    const settings = {};
    settings.method = this.form.method || 'POST';

    if (settings.method.toLowerCase() === 'post') {
      const formData = new FormData(this.form);
      formData.append('page', page.toString());
      settings.body = formData;
    }

    fetch(this.options.url || document.location.href, settings)
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        if (response.success) {
          this.pageNumber = page;
          this.totalNumber = response.data.count;
          this.shownNumber = (page === 1)
            ? this.itemList.reload(response.data.items)
            : this.itemList.add(response.data.items);

          if (this.totalNumberEl) this.totalNumberEl.innerHTML = `${this.totalNumber} ${declOfNum(this.totalNumber, ['товар', 'товара', 'товаров'])}`;
          if (this.shownNumberEl) this.shownNumberEl.innerHTML = `Показано ${this.shownNumber} из ${this.totalNumber}`;

          if (response.data.url) window.history.replaceState(null, null, response.data.url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

$(() => {
  initVendorsList();

  FilterForm = new Filter(document.getElementById('catalog-filter'));

  $(document).on('scroll', (event) => {
    $('.catalog-menu-mob.active').css('top', `${Math.max(app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
  });

  $(document)
    .on('click.filter.menu', '[data-toggle="m-filter"]', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $this = $(event.currentTarget);
      const selector = $this.data('target');

      const $target = selector ? $(selector) : $this.siblings('.catalog-menu-mob');

      $target.addClass('active');
      $target.css('top', `${Math.max(app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
      $('body').css('overflow', 'hidden');
    })
    .on('click.filter.close', '.catalog-menu-mob__btn-back, .catalog-menu-mob__btn-close', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $this = $(event.currentTarget);
      const $target = $this.parents('.catalog-menu-mob').eq(0);

      $target.removeClass('active');

      if ($('.filter-menu-m.active').length === 0) {
        $('body').css('overflow', '');
      }
    });
});
