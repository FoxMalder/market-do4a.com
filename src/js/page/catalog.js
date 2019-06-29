import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import Utils from '../utils/utils';
import Api from '../utils/Api';
import ProductCard from '../components/ProductCard';
import {
  Multifilter,
  CheckboxFilter,
  RadioFilter,
  PriceFilter,
} from '../components/Multifilter';

//
// class ProductList {
//   constructor(el) {
//     this.listEl = el;
//     this.shownNumber = 0;
//
//     this.init();
//   }
//
//   init() {
//     this.shownNumber = this.listEl.querySelectorAll('[data-product-id]').length;
//     // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
//   }
//
//
//   /**
//    * Создает нужные элементы на основе входных данных и вставляет их на страницу
//    *
//    * @param {Array} items - Массив вставляемых элементов
//    * @returns {Number} - Вставленное количество продуктов
//    */
//   parse(items) {
//     return items.filter((item) => {
//       let element;
//
//       if (item.type === 'product') {
//         element = new ProductCard(item.options);
//         element = element.getElement();
//       } else {
//         element = Utils.htmlToElement(item.html);
//       }
//
//       this.listEl.appendChild(element);
//
//       return item.type === 'product';
//     }).length;
//   }
//
//   reload(items) {
//     this.listEl.innerHTML = '';
//     this.shownNumber = this.parse(items);
//     // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
//     return this.shownNumber;
//   }
//
//   add(items) {
//     this.shownNumber += this.parse(items);
//     // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
//     return this.shownNumber;
//   }
// }
//
//
// export class Filter {
//   constructor(element, options = {}) {
//     if (!element) return;
//
//     this.form = element;
//     this.filterList = [];
//
//     this.totalNumber = 0;
//     this.shownNumber = 0;
//     this.pageNumber = 1;
//
//     this.options = {
//       ...Filter.defaultOptions,
//       ...options,
//     };
//
//     this.classNames = {
//       ...Filter.defaultOptions.classNames,
//       ...this.options.classNames,
//     };
//
//     this.itemList = null;
//     this.filterList = null;
//
//     // Найдено: %s товаров
//     this.totalNumberEl = null;
//
//     //
//     // Блок "Показать еще"
//     //
//     this.showMoreEl = null;
//     // Кнопка "Показать еще"
//     this.showMoreButtonEl = null;
//     // Текст "Показано %s из %s"
//     this.showMoreTextEl = null;
//
//
//     this.update = debounce(this.update.bind(this), 500);
//
//
//     $(document).on('scroll', () => {
//       $('.catalog-menu-mob.active').css('top', `${Math.max(window.app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
//     });
//
//     $(document)
//       .on('click.filter.menu', '[data-toggle="m-filter"]', (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//
//         const $this = $(event.currentTarget);
//         const selector = $this.data('target');
//
//         const $target = selector ? $(selector) : $this.siblings('.catalog-menu-mob');
//
//         $target.addClass('active');
//         $target.css('top', `${Math.max(window.app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
//         $('body').css('overflow', 'hidden');
//       })
//       .on('click.filter.close', '.catalog-menu-mob__btn-back, .catalog-menu-mob__btn-close', (event) => {
//         event.preventDefault();
//         event.stopPropagation();
//
//         const $this = $(event.currentTarget);
//         const $target = $this.parents('.catalog-menu-mob').eq(0);
//
//         $target.removeClass('active');
//
//         if ($('.filter-menu-m.active').length === 0) {
//           $('body').css('overflow', '');
//         }
//       });
//
//     this.init();
//   }
//
//   static defaultOptions = {
//     url: '/local/public/catalog.php',
//     classNames: {
//       showMore: 'load-more-block',
//       showMoreLoading: 'loading',
//       showMoreLink: 'load-more-block__link',
//       showMoreValue: 'load-more-block__value',
//
//       cardList: 'card-list',
//       cardListLoading: 'card-list_loading',
//     },
//   };
//
//   init() {
//     this.itemList = new ProductList(document.querySelector(`.${this.classNames.cardList}`));
//     this.filterList = [...this.form.querySelectorAll('fieldset.multifilter')];
//
//     // Найдено: %s товаров
//     this.totalNumberEl = document.querySelector('[data-total-find]');
//
//
//     // Блок "Показать еще"
//     //
//     //
//     this.showMoreEl = document.querySelector(`.${this.classNames.showMore}`);
//     if (this.showMoreEl) {
//       // Кнопка "Показать еще"
//       this.showMoreButtonEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreLink}`);
//       // Текст "Показано %s из %s"
//       this.showMoreTextEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreValue}`);
//     }
//
//
//     this.filterList = this.filterList.map((filter) => {
//       if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.update);
//       if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.update);
//       if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, this.update);
//       return new Multifilter(filter, this.update);
//     });
//
//
//     this.form.addEventListener('submit', this.onSubmit);
//     this.form.addEventListener('reset', this.onReset);
//     // this.form.addEventListener('change', this.onChange);
//     if (this.showMoreButtonEl) this.showMoreButtonEl.addEventListener('click', this.onClick);
//   }
//
//   // onChange = (event) => {
//   //   event.preventDefault();
//   //   this.update();
//   // };
//
//   onSubmit = (event) => {
//     event.preventDefault();
//     this.update();
//   };
//
//   onReset = (event) => {
//     event.preventDefault();
//     this.filterList.forEach(filter => filter.reset());
//     this.update();
//   };
//
//   onClick = (event) => {
//     event.preventDefault();
//     if (this.showMoreEl) this.showMoreEl.classList.add(this.classNames.showMoreLoading);
//     this.nextPage();
//   };
//
//   update() {
//     this.itemList.listEl.classList.add(this.classNames.cardListLoading);
//     this.sendRequest(1);
//   }
//
//   nextPage() {
//     this.sendRequest(this.pageNumber + 1);
//   }
//
//   sendRequest(page = 1) {
//     const settings = {};
//     settings.method = this.form.method || 'POST';
//
//     if (settings.method.toLowerCase() === 'post') {
//       const formData = new FormData(this.form);
//       formData.append('page', page.toString());
//       settings.body = formData;
//     }
//
//     Utils.sendRequest(this.form.action || this.options.url || document.location.href, settings)
//       .then((data) => {
//         this.pageNumber = page;
//         this.totalNumber = data.count;
//         this.shownNumber = (page === 1)
//           ? this.itemList.reload(data.items)
//           : this.itemList.add(data.items);
//
//         if (this.totalNumberEl) this.totalNumberEl.innerHTML = `${this.totalNumber} ${Utils.declOfNum(this.totalNumber, ['товар', 'товара', 'товаров'])}`;
//         if (this.showMoreTextEl) this.showMoreTextEl.innerHTML = `Показано ${this.shownNumber} из ${this.totalNumber}`;
//         if (this.showMoreEl) this.showMoreEl.classList.remove(this.classNames.showMoreLoading);
//         this.itemList.listEl.classList.remove(this.classNames.cardListLoading);
//
//         if (data.url) window.history.replaceState(null, null, data.url);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }


export class CatalogControl {
  constructor(
    elements = {
      form: null,
      filter: null,
      sorting: null,
      quantity: null,
      container: null,
    },
    options = {},
  ) {
    this.filterEl = elements.filter || document.querySelector('.filter');
    this.filterList = [];

    this.sortingEl = elements.sorting || document.querySelector('.sorting');
    this.sortingList = [];

    this.formEl = elements.form || document.getElementById('catalog-filter');
    this.quantityEl = elements.quantity || document.querySelector('[data-total-find]');

    this.containerEl = elements.container || document.querySelector('.card-list');
    // this.Container = null;


    this.showMoreEl = null;
    this.showMoreButtonEl = null;
    this.showMoreTextEl = null;

    this.currentPage = 1;
    this.shownCards = 0;
    this.totalCards = 0;

    this.options = {
      ...CatalogControl.defaultOptions,
      ...options,
    };

    this.classNames = {
      ...CatalogControl.defaultOptions.classNames,
      ...this.options.classNames,
    };

    this.onChange = throttle(this.onChange.bind(this), 300);
    this.onUpdate = debounce(this.onUpdate.bind(this), 600);


    $(document).on('scroll', () => {
      $('.catalog-menu-mob.active').css('top', `${Math.max(window.app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
    });

    $(document)
      .on('click.filter.menu', '[data-toggle="m-filter"]', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const $this = $(event.currentTarget);
        const selector = $this.data('target');

        const $target = selector ? $(selector) : $this.siblings('.catalog-menu-mob');

        $target.addClass('active');
        $target.css('top', `${Math.max(window.app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
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


    this.init();
  }

  static defaultOptions = {
    ajax: true,
    method: 'post',
    action: '/local/public/catalog.php',

    classNames: {
      showMore: 'load-more-block',
      showMoreLoading: 'loading',
      showMoreLink: 'load-more-block__link',
      showMoreValue: 'load-more-block__value',

      cardList: 'card-list',
      cardListLoading: 'card-list_loading',
    },
  };

  init() {
    this.shownCards = document.querySelectorAll('[data-product-id]').length;

    if (this.formEl) {
      this.options.method = this.formEl.method;
      this.options.action = this.formEl.action;

      // this.formEl.addEventListener('submit', this.onChange);
      this.formEl.addEventListener('reset', this.onReset);
    }

    if (this.sortingEl) {
      this.sortingList = Array.from(this.sortingEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.onChange);
        if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.onChange);
        return new Multifilter(filter, this.onChange);
      });
    }

    if (this.filterEl) {
      this.filterList = Array.from(this.filterEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.onChange);
        if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.onChange);
        if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, this.onChange);
        return new Multifilter(filter, this.onChange);
      });
    }

    this.showMoreEl = document.querySelector(`.${this.classNames.showMore}`);
    if (this.showMoreEl) {
      this.showMoreButtonEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreLink}`);
      this.showMoreTextEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreValue}`);
      this.showMoreButtonEl.addEventListener('click', (event) => {
        event.preventDefault();
        this.showMoreEl.classList.add(this.classNames.showMoreLoading);
        this.sendRequest(this.currentPage + 1);
      });
    }
  }

  /**
   * Установить количество элементов
   * @param {Number} total - Количество элементов
   * @param {Number} num - Количество новых элементов
   */
  setNumber(total, num = 0) {
    this.totalCards = total;
    this.shownCards = Math.min(num, total);

    if (this.quantityEl) {
      this.quantityEl.innerHTML = `${this.totalCards} ${Utils.declOfNum(this.totalCards, ['товар', 'товара', 'товаров'])}`;
    }
    if (this.showMoreEl) {
      if (this.shownCards < this.totalCards) {
        this.showMoreEl.style.display = '';
        this.showMoreTextEl.innerHTML = `Показано ${this.shownCards} из ${this.totalCards}`;
        this.showMoreEl.classList.remove(this.classNames.showMoreLoading);
      } else {
        this.showMoreEl.style.display = 'none';
      }
    }
  }

  /**
   * Изменение значений фильтра
   */
  onChange = (event) => {
    if (event) event.preventDefault();
    this.containerEl.classList.add(this.classNames.cardListLoading);

    console.log('onChange');

    this.onUpdate();
  };

  onReset = (event) => {
    event.preventDefault();
    this.filterList.forEach(filter => filter.reset());

    console.log('onReset');

    this.onUpdate();
    // this.update();
  };

  /**
   * Обновление списка (с задержкой)
   */
  onUpdate = () => {
    this.update();
  };

  /**
   * Моментальное обновление
   */
  update() {
    try {
      this.containerEl.classList.add(this.classNames.cardListLoading);

      if (!this.options.ajax) {
        this.formEl.submit();
      } else {
        this.sendRequest(1);
      }
    } catch (e) {
      this.containerEl.classList.remove(this.classNames.cardListLoading);
      alert('Ошибка');
      console.error(e);
    }
  }


  /**
   * Создает нужные элементы на основе входных данных и вставляет их на страницу
   *
   * @param {Array} items - Массив вставляемых элементов
   * @returns {Number} - Вставленное количество продуктов
   */
  parse(items) {
    return items.filter((item) => {
      let element;

      if (item.type === 'product') {
        element = new ProductCard(item.options);
        element = element.getElement();
      } else {
        element = Utils.htmlToElement(item.html);
      }

      this.containerEl.appendChild(element);

      return item.type === 'product';
    }).length;
  }

  /**
   * Заменить карточки товаров
   * @param {Array} items
   * @returns {number|*} Количество отображаемых товаров
   */
  reload(items) {
    this.containerEl.innerHTML = '';
    this.shownCards = this.parse(items);
    this.containerEl.classList.remove(this.classNames.cardListLoading);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    return this.shownCards;
  }

  /**
   * Добавить карточки товаров
   * @param {Array} items
   * @returns {number|*} Количество отображаемых товаров
   */
  add(items) {
    this.shownCards += this.parse(items);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    return this.shownCards;
  }

  sendRequest(page) {
    const settings = {
      method: this.options.method,
    };

    if (this.options.method.toLowerCase() === 'post') {
      settings.body = new FormData(this.formEl);
      settings.body.append('page', page.toString());
    }

    Utils.sendRequest(this.options.action, settings)
      .then((data) => {
        this.currentPage = page;
        this.shownCards = (page === 1)
          ? this.reload(data.items)
          : this.add(data.items);

        this.setNumber(data.count, this.shownCards);

        if (data.url) window.history.replaceState(null, null, data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
