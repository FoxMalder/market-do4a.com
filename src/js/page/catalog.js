import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';

import Vue from 'vue/dist/vue.esm';

import Utils from '../utils/utils';
// import Api from '../utils/Api';
import ProductCard from '../components/ProductCard';
import {
  Multifilter,
  PriceFilter,
  CheckboxFilter,
  RadioFilter,
  SelectFilter,
} from '../components/Multifilter';
import store from '../store/index';
import CategoryListMobile from '../components/CategoryListMobile.vue';
import CatalogFilterMobile from '../components/CatalogFilterMobile.vue';


export default class CatalogControl {
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

    // this.options.method = this.formEl.method;
    // this.options.action = this.formEl.action;

    this.classNames = {
      ...CatalogControl.defaultOptions.classNames,
      ...this.options.classNames,
    };


    this.debouncedUpdate = debounce(this.update, 500);


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

  initVue() {
    [].forEach.call(document.querySelectorAll('[data-toggle="m-filter"]'), (button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.currentTarget.dataset.target === '#mobile-filter') {
          store.dispatch('filters/mobile/showMenu', { name: 'filters', title: 'Фильтр' });
        } else {
          store.dispatch('filters/mobile/showMenu', { name: 'sort', title: 'Сортировка' });
        }
      });
    });

    store.subscribeAction((action, state) => {
      if (action.type === 'filters/onChange') {
        this.change();
      }
    });

    document.querySelector('.catalog-control').insertBefore(new Vue({
      store,
      render: h => h(CategoryListMobile),
    }).$mount().$el, document.querySelector('.catalog-control').firstChild);

    new Vue({
      store,
      render: h => h(CatalogFilterMobile),
    }).$mount('#mobile-filter');
  }

  init() {
    this.shownCards = document.querySelectorAll('[data-product-id]').length;

    if (this.formEl) {
      this.options.method = this.formEl.method;
      this.options.action = this.formEl.action;

      // this.formEl.addEventListener('submit', this.update);
      this.formEl.addEventListener('reset', this.onReset);
    }

    if (this.sortingEl) {
      this.sortingList = [].map.call(this.sortingEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, 'sort');
        // if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.change);
        if (filter.querySelector('.multifilter-radio')) return new SelectFilter(filter, 'sort');
        return new Multifilter(filter, this.change);
      });
    }

    if (this.filterEl) {
      this.filterList = [].map.call(this.filterEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, 'filters');
        // if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.change);
        if (filter.querySelector('.multifilter-radio')) return new SelectFilter(filter, 'filters');
        if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, 'filters');
        return new Multifilter(filter, this.change);
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

  //
  // onChange = (event) => {
  //   event.preventDefault();
  //
  //   this.change();
  // };

  onReset = (event) => {
    event.preventDefault();
    store.dispatch('filters/resetAll', this.update);
  };

  // /**
  //  * Обновление списка (с задержкой)
  //  */
  // onUpdate = () => {
  //   this.update();
  // };

  change = () => {
    this.containerEl.classList.add(this.classNames.cardListLoading);
    this.debouncedUpdate();
  };

  /**
   * Моментальное обновление
   */
  update = () => {
    console.log('Обновляем');
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

  // TODO: Вынести в api
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
          store.dispatch('filters/updateActivatedVariants', data);
        }

        if ({}.hasOwnProperty.call(data, 'hiddenVariants')) {
          store.dispatch('filters/updateHiddenVariants', data);
        }
      })
      .catch((error) => {
        alert('Ошибка');
        this.containerEl.classList.remove(this.classNames.cardListLoading);
        console.error(error);
      });
  }
}
