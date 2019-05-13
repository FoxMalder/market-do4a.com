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

  get getElement() {
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
    this.list = [];

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

  updateList(data) {
    this.listEl.innerHTML = '';
    this.list = data.items.map((item) => {
      const prod = new Product(item);
      this.listEl.appendChild(prod.getElement);

      return prod;
    });
  }

  addItem(data) {
    this.list.concat(data.items.map((item) => {
      const prod = new Product(item);
      this.listEl.appendChild(prod.getElement);

      return prod;
    }));
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

// function initFilterSearch() {
//   Array.from(document.querySelectorAll('.js-filter-search'), (filter) => {
//     const searchField = filter.querySelector('.js-filter-search__input');
//     const searchList = [...filter.querySelectorAll('.js-filter-search__item')];
//
//     searchField.addEventListener('keyup', (event) => {
//       const searchText = event.target.value.trim().toLowerCase();
//
//       if (searchText.length) {
//         searchList.forEach((el) => {
//           if (el.getAttribute('data-filter-search').toLowerCase().indexOf(searchText) !== -1) {
//             el.style.display = '';
//           } else {
//             el.style.display = 'none';
//           }
//         });
//       } else {
//         searchList.forEach((el) => {
//           el.style.display = '';
//         });
//       }
//     });
//     searchField.addEventListener('change', () => 0);
//   });
// }


class Multifilter {
  constructor(el, callback, options = {}) {
    if (!el) return;

    this.el = el;
    this.contentEl = this.el.querySelector('.dropdown-menu');
    this.menuButton = this.el.querySelector('button.multifilter__content');
    this.inputList = [...this.el.querySelectorAll('input')];
    this.valueEl = this.el.querySelector('.multifilter__value');

    this.callback = callback;

    this.options = {
      search: options.search || false,
      type: options.type || 'simple', // 'checkbox', 'radio', 'price'
      replaceTitle: this.el.hasAttribute('data-filter-replace-title') || options.replaceTitle || false,
    };

    // // Если нужно подставлять в заголовок
    // if (this.options.replaceTitle) {
    //   this.labelEl = this.el.querySelector('.multifilter__label');
    //
    //   // if (!this.labelEl) {
    //   //   this.labelEl = document.createElement('span');
    //   //   this.labelEl.classList.add('multifilter__label');
    //   //   this.labelEl.innerHTML = this.valueEl.innerHTML;
    //   //   this.valueEl.innerHTML = '';
    //   // }
    // }


    if (this.options.type === 'simple') {
      this.inputList.forEach(item => item.addEventListener('change', this.callback));
    }

    if (!this.contentEl) return;

    if (this.inputList.length > 9) {
      const simpleBar = new SimpleBar(this.contentEl, { autoHide: false });
      this.contentEl = simpleBar.getContentElement();
    }
  }

  reset() {
    this.callback();
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
          case 'checkbox':
            if (input.checked) {
              input.checked = false;
            }
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
  }
}

class PriceFilter extends Multifilter {
  constructor(element, callback) {
    super(element, callback, {
      type: 'price',
    });

    this.priceMinText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__start');
    this.priceMin = this.priceMinText
      ? parseInt(this.priceMinText.innerText.replace(' ', ''), 10)
      : 0;

    this.priceMaxText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__end');
    this.priceMax = this.priceMaxText
      ? parseInt(this.priceMaxText.innerText.replace(' ', ''), 10)
      : 9999;

    this.fromInput = this.contentEl.querySelector('[name="price[from]"]');
    if (!this.fromInput) {
      this.fromInput = document.createElement('input');
      this.fromInput.type = 'hidden';
      this.fromInput.name = 'price[from]';
      this.fromInput.value = 0;
      this.contentEl.appendChild(this.fromInput);
    }

    this.toInput = this.contentEl.querySelector('[name="price[to]"]');
    if (!this.toInput) {
      this.toInput = document.createElement('input');
      this.toInput.type = 'hidden';
      this.toInput.name = 'price[to]';
      this.fromInput.value = 0;
      this.contentEl.appendChild(this.toInput);
    }

    this.rangeEl = this.contentEl.querySelector('.input-range');
    noUiSlider.create(this.rangeEl, {
      start: [this.fromInput.value, this.toInput.value || this.priceMax],
      step: 1,
      connect: true,
      tooltips: true,
      range: {
        min: this.priceMin,
        max: this.priceMax,
      },
      format: {
        to(value) {
          return `${Math.floor(value)} ₽`;
        },
        from(value) {
          return value.replace(' ₽', '');
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
  constructor(el, callback, options = {}) {
    super(el, callback, {
      type: 'checkbox',
      search: options.search || false,
      replaceTitle: options.replaceTitle || false,
    });

    this.totalEl = null;
    this.resetButton = null;

    this.total = 0;
    this.selectedTitle = [];

    this.init();
  }

  init() {
    this.inputList.forEach((input) => {
      input.setAttribute('data-title', input.nextElementSibling.textContent);

      if (input.disabled) return;
      input.addEventListener('change', this.onChange);

      if (!input.checked) return;
      this.selectedTitle.push(input.nextElementSibling.textContent);
    });
    this.total = this.selectedTitle.length;

    if (this.inputList.length > 10 || this.options.search) {
      this.initSearch();
    }


    this.totalEl = this.el.querySelector('.multifilter__total');
    if (!this.totalEl) {
      this.totalEl = document.createElement('span');
      this.totalEl.classList.add('multifilter__total');
      this.menuButton.appendChild(this.totalEl);
    }

    this.resetButton = this.el.querySelector('.multifilter__btn-clear');
    if (!this.resetButton) {
      this.resetButton = document.createElement('button');
      this.resetButton.type = 'reset';
      this.resetButton.classList.add('multifilter__btn-clear');
      this.el.appendChild(this.resetButton);
    }


    this.resetButton.addEventListener('click', this.onReset);

    this.change();
  }

  initSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('multifilter-search');

    const searchField = document.createElement('input');
    searchField.classList.add('multifilter-search__input');
    searchField.type = 'search';
    searchField.placeholder = 'Поиск';
    searchField.autocomplete = 'off';

    // searchField.addEventListener('keyup', this.onSearch);
    // searchField.addEventListener('change', this.onSearch);
    // searchField.addEventListener('reset', this.onSearch);
    searchField.addEventListener('input', this.onSearch);

    searchContainer.appendChild(searchField);
    this.contentEl.insertBefore(searchContainer, this.contentEl.firstChild);
  }

  onSearch = (event) => {
    const searchText = event.target.value.trim().toLowerCase();

    if (searchText.length) {
      this.inputList.forEach((input) => {
        if (input.getAttribute('data-title').toLowerCase().indexOf(searchText) !== -1) {
          input.parentElement.style.display = '';
        } else {
          input.parentElement.style.display = 'none';
        }
      });
    } else {
      this.inputList.forEach((input) => {
        input.parentElement.style.display = '';
      });
    }
  };

  onChange = (event) => {
    if (event.target.checked) {
      this.total += 1;
      this.selectedTitle.push(event.target.getAttribute('data-title'));
    } else {
      this.total -= 1;
      this.selectedTitle.splice(this.selectedTitle.indexOf(event.target.getAttribute('data-title')), 1);
    }

    this.change();
    this.callback();
  };

  onReset = (event) => {
    event.preventDefault();
    this.reset();
    this.callback();
  };

  change() {
    if (this.options.replaceTitle) {
      this.valueEl.innerText = this.selectedTitle.join(', ');
    }
    this.totalEl.innerText = this.total;
    this.totalEl.style.display = this.total ? '' : 'none';
    this.resetButton.style.display = this.total ? '' : 'none';
    if (this.total) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  }

  reset() {
    this.total = 0;
    this.selectedTitle = [];
    this.inputList.forEach((input) => {
      if (!input.disabled) {
        input.checked = false;
      }
    });

    this.change();
  }
}

class RadioFilter extends Multifilter {
  constructor(el, callback, options = {}) {
    super(el, callback, {
      type: 'radio',
      replaceTitle: options.replaceTitle || true,
    });

    this.defaultInput = this.contentEl.querySelector('input[checked]');
    this.selectedTitle = this.defaultInput.nextElementSibling.textContent;

    this.init();
  }

  init() {
    this.inputList.forEach((input) => {
      if (input.disabled) return;
      input.addEventListener('change', this.onChange);
    });
    this.change();
  }

  onChange = (event) => {
    this.selectedTitle = event.target.nextElementSibling.textContent;
    this.change();
    this.callback();
  };


  change() {
    if (this.options.replaceTitle) this.valueEl.innerHTML = this.selectedTitle;
  }

  reset() {
    this.inputList.forEach((input) => {
      input.checked = false;
    });
    this.defaultInput.checked = true;
    this.selectedTitle = this.defaultInput.nextElementSibling.textContent;

    this.change();
  }
}


class Filter {
  constructor(el) {
    if (!el) return;

    this.form = el;
    this.totalLabel = this.form.querySelector('data-total-find');
    this.filterList = [];

    this.options = {
      url: '/local/public/catalog.php',
    };

    this.update = debounce(this.update.bind(this), 1000);

    this.init();
  }

  init() {
    const filterList = [...this.form.querySelectorAll('fieldset.multifilter')];

    this.filterList = filterList.map((filter) => {
      if (filter.querySelector('.multifilter-checkbox')) {
        return new CheckboxFilter(filter, this.update, {
          replaceTitle: filter.hasAttribute('data-category'),
        });
      }
      if (filter.querySelector('.multifilter-radio')) {
        return new RadioFilter(filter, this.update);
      }
      if (filter.querySelector('.multifilter-price')) {
        return new PriceFilter(filter, this.update);
      }
      return new Multifilter(filter, this.update);
    });


    this.form.addEventListener('submit', this.onSubmit);
    this.form.addEventListener('reset', this.onReset);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.update();
  };

  onReset = (event) => {
    event.preventDefault();
    this.update();
    this.filterList.forEach(filter => filter.reset());
  };

  update() {
    console.log('Отправили');
    this.sendRequest(1);
  }

  sendRequest(page = 1) {
    const formData = new FormData(this.form);
    formData.append('page', page.toString());

    fetch(this.options.url || document.location.href, {
      method: 'POST',
      body: formData,
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        productList.updateList(data);
        window.history.replaceState(null, null, data.url);
        if (this.totalLabel) this.totalLabel.innerHTML = declOfNum(data.count, ['товар', 'товара', 'товаров']);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


$(() => {
  initVendorsList();

  productList = new ProductList(document.querySelector('.card-list'));
  FilterForm = new Filter(document.querySelector('.catalog-control > form'));

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
