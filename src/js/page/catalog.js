import debounce from 'lodash.debounce';

import Utils from '../utils/utils';
import Api from '../utils/Api';
import ProductCard from '../components/ProductCard';
import {
  Multifilter,
  CheckboxFilter,
  RadioFilter,
  PriceFilter,
} from '../components/Multifilter';


class ProductList {
  constructor(el) {
    this.listEl = el;
    this.shownNumber = 0;

    this.init();
  }

  init() {
    this.shownNumber = this.listEl.querySelectorAll('[data-product-id]').length;
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
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

      this.listEl.appendChild(element);

      return item.type === 'product';
    }).length;
  }

  reload(items) {
    this.listEl.innerHTML = '';
    this.shownNumber = this.parse(items);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    return this.shownNumber;
  }

  add(items) {
    this.shownNumber += this.parse(items);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    return this.shownNumber;
  }
}


export class Filter {
  constructor(element, options = {}) {
    if (!element) return;

    this.form = element;
    this.filterList = [];

    this.totalNumber = 0;
    this.shownNumber = 0;
    this.pageNumber = 1;

    this.options = {
      ...Filter.defaultOptions,
      ...options,
    };

    this.classNames = {
      ...Filter.defaultOptions.classNames,
      ...this.options.classNames,
    };

    this.itemList = null;
    this.filterList = null;

    // Найдено: %s товаров
    this.totalNumberEl = null;

    //
    // Блок "Показать еще"
    //
    this.showMoreEl = null;
    // Кнопка "Показать еще"
    this.showMoreButtonEl = null;
    // Текст "Показано %s из %s"
    this.showMoreTextEl = null;


    this.update = debounce(this.update.bind(this), 500);


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
    url: '/local/public/catalog.php',
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
    this.itemList = new ProductList(document.querySelector(`.${this.classNames.cardList}`));
    this.filterList = [...this.form.querySelectorAll('fieldset.multifilter')];

    // Найдено: %s товаров
    this.totalNumberEl = document.querySelector('[data-total-find]');


    // Блок "Показать еще"
    //
    //
    this.showMoreEl = document.querySelector(`.${this.classNames.showMore}`);
    if (this.showMoreEl) {
      // Кнопка "Показать еще"
      this.showMoreButtonEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreLink}`);
      // Текст "Показано %s из %s"
      this.showMoreTextEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreValue}`);
    }


    this.filterList = this.filterList.map((filter) => {
      if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.update);
      if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.update);
      if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, this.update);
      return new Multifilter(filter, this.update);
    });


    this.form.addEventListener('submit', this.onSubmit);
    this.form.addEventListener('reset', this.onReset);
    // this.form.addEventListener('change', this.onChange);
    if (this.showMoreButtonEl) this.showMoreButtonEl.addEventListener('click', this.onClick);
  }

  // onChange = (event) => {
  //   event.preventDefault();
  //   this.update();
  // };

  onSubmit = (event) => {
    event.preventDefault();
    this.update();
  };

  onReset = (event) => {
    event.preventDefault();
    this.filterList.forEach(filter => filter.reset());
    this.update();
  };

  onClick = (event) => {
    event.preventDefault();
    if (this.showMoreEl) this.showMoreEl.classList.add(this.classNames.showMoreLoading);
    this.nextPage();
  };

  update() {
    this.itemList.listEl.classList.add(this.classNames.cardListLoading);
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

    Utils.sendRequest(this.form.action || this.options.url || document.location.href, settings)
      .then((data) => {
        this.pageNumber = page;
        this.totalNumber = data.count;
        this.shownNumber = (page === 1)
          ? this.itemList.reload(data.items)
          : this.itemList.add(data.items);

        if (this.totalNumberEl) this.totalNumberEl.innerHTML = `${this.totalNumber} ${Utils.declOfNum(this.totalNumber, ['товар', 'товара', 'товаров'])}`;
        if (this.showMoreTextEl) this.showMoreTextEl.innerHTML = `Показано ${this.shownNumber} из ${this.totalNumber}`;
        if (this.showMoreEl) this.showMoreEl.classList.remove(this.classNames.showMoreLoading);
        this.itemList.listEl.classList.remove(this.classNames.cardListLoading);

        if (data.url) window.history.replaceState(null, null, data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
