import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import Vue from 'vue/dist/vue.esm';
import CatalogFilter from '../components/CatalogFilter.vue';

import Utils from '../utils/utils';
// import Api from '../utils/Api';
import ProductCard from '../components/ProductCard';
import {
  Multifilter,
  CheckboxFilter,
  RadioFilter,
} from '../components/Multifilter';


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
    this.filterList = {};

    this.sortingEl = elements.sorting || document.querySelector('.sorting');
    this.sortingList = [];

    this.formEl = elements.form || document.getElementById('catalog-filter');
    this.quantityEl = elements.quantity || document.querySelector('[data-total-find]');

    this.containerEl = elements.container || document.querySelector('.card-list');
    // this.Container = null;

    this.breadcumps = document.querySelector('.breadcumps');
    this.title = document.querySelector('.page-header__title');


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

    this.options.method = this.formEl.method;
    this.options.action = this.formEl.action;

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
    this.initVue();
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

  static parseHtml(multifilterList) {
    const obj = {};
    // const filterListEl = [...this.filterEl.querySelectorAll('fieldset.multifilter')];

    // return multifilterList.reduce((arr, filter) => {
    multifilterList.forEach((filter) => {
      const option = {};

      if (filter.querySelector('.multifilter__label')) {
        option.replaceTitle = true;
        option.label = filter.querySelector('.multifilter__label').innerHTML;
      } else {
        option.replaceTitle = false;
        option.label = filter.querySelector('.multifilter__value').innerHTML;
      }

      if (filter.querySelector('.multifilter-price')) {
        const container = filter.querySelector('.multifilter-price');

        option.type = 'range';
        option.name = 'Price';
        option.data = {
          priceFrom: parseInt(container.querySelector('input[name="Price[from]"]').value, 10) || 0,
          priceTo: parseInt(container.querySelector('input[name="Price[to]"]').value, 10) || 0,
          priceMin: parseInt(container.querySelector('.multifilter-price__num .multifilter-price__start').innerHTML.replace(/[^0-9]/g, ''), 10) || 0,
          priceMax: parseInt(container.querySelector('.multifilter-price__num .multifilter-price__end').innerHTML.replace(/[^0-9]/g, ''), 10) || 9999,
        };

        if (option.data.priceFrom < option.data.priceMin) {
          option.data.priceFrom = option.data.priceMin;
        }

        if (option.data.priceTo > option.data.priceMax || option.data.priceTo === 0) {
          option.data.priceTo = option.data.priceMax;
        }
      } else if (filter.querySelector('.multifilter-checkbox')) {
        const inputListEl = [...filter.querySelectorAll('input[type="checkbox"]')];

        option.type = 'checkbox';
        option.name = inputListEl[0].name.replace('[]', '');
        option.data = inputListEl.map(input => ({
          title: input.nextElementSibling.textContent,
          value: input.value,
          checked: input.checked,
          available: !input.disabled,
          name: input.name,
          hidden: false,
          filtered: false,
        }));
      } else {
        return;
      }

      obj[option.name] = option;
    });

    // arr.push(option);

    // return arr;
    // }, []);

    return obj;
  }

  initVue() {
    this.filterList = CatalogControl.parseHtml([...this.filterEl.querySelectorAll('fieldset.multifilter')]);

    new Vue({
      el: this.filterEl,
      template: '<CatalogFilter :filters="filters"/>',
      data: {
        filters: this.filterList,
        onChange: this.update,
      },
      components: {
        CatalogFilter,
      },
      mounted() {
        this.$root.$on('filter:change', this.onChange);
      },
      // method: {
      //   onChange() {
      //     console.log('GLOBAL CHANGE');
      //   },
      // },
    });
  }

  init() {
    this.shownCards = document.querySelectorAll('[data-product-id]').length;

    if (this.formEl) {
      this.options.method = this.formEl.method;
      this.options.action = this.formEl.action;

      // this.formEl.addEventListener('submit', this.onChange);
      // this.formEl.addEventListener('reset', this.onReset);
    }

    if (this.sortingEl) {
      this.sortingList = Array.from(this.sortingEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.onChange);
        if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.onChange);
        return new Multifilter(filter, this.onChange);
      });
    }

    // if (this.filterEl) {
    //   this.filterList = Array.from(this.filterEl.querySelectorAll('fieldset.multifilter'), (filter) => {
    //     if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, this.onChange);
    //     if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.onChange);
    //     if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, this.onChange);
    //     return new Multifilter(filter, this.onChange);
    //   });
    // }

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
   * Обновить хлебные крошки
   * @param {Array} array - Массив "крошек"
   * @param {String} title - Заголовок страницы
   * @param {String} h1 - Заголовок страницы
   */
  setBreadcumps(array, title = '', h1 = '') {
    let html = '';
    array.forEach((item, i) => {
      if (i < array.length - 1) {
        html += `<a class="breadcumps__link red" href="${item.url}">${item.name}</a><span class="breadcumps__delimiter"></span>`;
      } else {
        html += `<span class="breadcumps__page">${item.name}</span>`;
      }
    });
    this.breadcumps.innerHTML = html;

    if (title !== '') {
      document.title = title;
    }

    if (h1 !== '' && this.title) {
      this.title.innerHTML = h1;
    }
  }

  /**
   * Изменение значений фильтра
   */
  onChange = () => {
    // console.log(event);
    // if (event) event.preventDefault();
    this.containerEl.classList.add(this.classNames.cardListLoading);

    console.log('onChange');

    this.onUpdate();
  };

  // onReset = (event) => {
  //   event.preventDefault();
  //   this.filterList.forEach(filter => filter.reset());
  //
  //   console.log('onReset');
  //
  //   this.onUpdate();
  //   // this.update();
  // };

  /**
   * Обновление списка (с задержкой)
   */
  onUpdate = () => {
    this.update();
  };

  /**
   * Моментальное обновление
   */
  update = () => {
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
  };


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
        if (data.tags && this.breadcumps) {
          this.setBreadcumps(data.tags.breadcrump, data.tags.title, data.tags.h1);
        }


        if ({}.hasOwnProperty.call(data, 'activatedVariants')) {
          Object.keys(data.activatedVariants).forEach((key) => {
            if ({}.hasOwnProperty.call(this.filterList, key) && this.filterList[key].type === 'checkbox') {
              this.filterList[key].data.forEach((item) => {
                item.available = {}.hasOwnProperty.call(data.activatedVariants[key], item.value);
              });
            }
          });
        }

        if ({}.hasOwnProperty.call(data, 'hiddenVariants')) {
          Object.keys(data.hiddenVariants).forEach((key) => {
            if ({}.hasOwnProperty.call(this.filterList, key) && this.filterList[key].type === 'checkbox') {
              this.filterList[key].data.forEach((item) => {
                item.hidden = {}.hasOwnProperty.call(data.hiddenVariants[key], item.value);
              });
            }
          });
        }
      })
      .catch((error) => {
        alert('Ошибка');
        this.containerEl.classList.remove(this.classNames.cardListLoading);
        console.error(error);
      });
  }
}
