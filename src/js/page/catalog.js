import Vue from 'vue';
import debounce from 'lodash.debounce';
// import throttle from 'lodash.throttle';


import Utils from '@/utils/utils';
import { getFiltredCatalog } from '@/api';

import '@/components/ProductCard';

import {
  Multifilter,
  PriceFilter,
  CheckboxFilter,
  RadioFilter,
  SelectFilter,
} from '@/components/Multifilter';

import store from '@/store';
import catalogControl from '@/store/modules/catalogControl';
import CategoryListMobile from '@/components/CategoryListMobile.vue';
import CatalogFilterMobile from '@/components/CatalogFilterMobile.vue';
import CatalogFilter from '@/components/CatalogFilter.vue';

import ProductCart from '@/components/ProductCard.vue';


const ProductCartVue = Vue.extend(ProductCart);

/**
 * Сворачивание строк
 */
function initCollapse() {
  let maxLineCount = 5;
  if (document.documentElement.clientWidth >= 768) {
    maxLineCount = 8;
  }
  if (document.documentElement.clientWidth >= 1240) {
    maxLineCount = 10;
  }

  [].forEach.call(document.querySelectorAll('.p-collapse'), (item) => {
    const lineHeight = parseInt(getComputedStyle(item).lineHeight, 10);

    if (item.clientHeight > lineHeight * maxLineCount) {
      const container = document.createElement('div');
      container.classList.add('p-collapse__text');
      container.innerHTML = item.innerHTML.trim();
      container.style.height = `${lineHeight * maxLineCount}px`;

      const button = document.createElement('button');
      button.classList.add('p-collapse__button');

      button.innerHTML = 'Читать далее';
      button.innerHTML += '<svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n'
        + '<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99274 6.63951L1.67626 1.85444L4.14194 0.145508L9.00728 7.16531L1.97121 13.1431L0.0288086 10.8568L4.99274 6.63951Z" fill="#F4412D"/>\n'
        + '</svg>\n';

      button.addEventListener('click', (event) => {
        event.preventDefault();
        button.style.display = 'none';
        container.style.height = 'auto';
      });

      item.innerHTML = '';
      item.appendChild(container);
      item.appendChild(button);
    }
  });
}


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
    store.registerModule('filters', catalogControl);


    this.filterEl = elements.filter || document.querySelector('.filter');
    this.filterList = {};

    this.sortingEl = elements.sorting || document.querySelector('.sorting');
    this.sortingList = [];

    this.formEl = elements.form || document.getElementById('catalog-filter');
    this.quantityEl = elements.quantity || document.querySelector('[data-total-find]');

    this.containerEl = elements.container || document.querySelector('.card-list');
    // this.Container = null;

    this.breadcumps = document.querySelector('.mr-breadcumps');
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

    initCollapse();

    this.arrow = [];

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
    store.subscribeAction((action, state) => {
      if (action.type === 'filters/onChange') {
        this.change();
      }
    });


    // Фильтр на десктопе
    this.filterVM = new Vue({
      store,
      render: h => h(CatalogFilter),
    }).$mount(this.filterEl);


    // Управление каталогом для мобилок
    this.catalogControlMobileVM = new Vue({
      store,
      render: h => h(CatalogFilterMobile),
    }).$mount();
    document.body.appendChild(this.catalogControlMobileVM.$el);

    [].forEach.call(document.querySelectorAll('[data-toggle="m-filter"]'), (button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.currentTarget.dataset.target === '#mobile-filter') {
          this.catalogControlMobileVM.$children[0].open({ name: 'filters', title: 'Фильтр' });
          // store.dispatch('filters/mobile/showMenu', { name: 'filters', title: 'Фильтр' });
        } else {
          this.catalogControlMobileVM.$children[0].open({ name: 'sort', title: 'Сортировка' });
          // store.dispatch('filters/mobile/showMenu', { name: 'sort', title: 'Сортировка' });
        }
      });
    });


    // Список категорий для мобилок
    this.categoryListMobileVM = new Vue({
      store,
      render: h => h(CategoryListMobile),
    }).$mount();

    const catalogControlEl = document.querySelector('.catalog-control');
    if (catalogControlEl) {
      catalogControlEl.insertBefore(this.categoryListMobileVM.$el, catalogControlEl.firstChild);
    }
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

    // if (this.filterEl) {
    //   this.filterList = [].map.call(this.filterEl.querySelectorAll('fieldset.multifilter'), (filter) => {
    //     if (filter.querySelector('.multifilter-checkbox')) return new CheckboxFilter(filter, 'filters');
    //     // if (filter.querySelector('.multifilter-radio')) return new RadioFilter(filter, this.change);
    //     if (filter.querySelector('.multifilter-radio')) return new SelectFilter(filter, 'filters');
    //     if (filter.querySelector('.multifilter-price')) return new PriceFilter(filter, 'filters');
    //     return new Multifilter(filter, this.change);
    //   });
    // }

    if (this.filterEl) {
      [].forEach.call(this.filterEl.querySelectorAll('fieldset.multifilter'), (filter) => {
        if (filter.querySelector('.multifilter-checkbox')) {
          store.commit('filters/pushFilterToContainer', {
            container: 'filters',
            filter: CheckboxFilter.parseSettings(filter),
          });
        }
        if (filter.querySelector('.multifilter-radio')) {
          store.commit('filters/pushFilterToContainer', {
            container: 'filters',
            filter: SelectFilter.parseSettings(filter),
          });
        }
        if (filter.querySelector('.multifilter-price')) {
          store.commit('filters/pushFilterToContainer', {
            container: 'filters',
            filter: PriceFilter.parseSettings(filter),
          });
        }
        // new Multifilter(filter, this.change);
      });
    }

    this.showMoreEl = document.querySelector(`.${this.classNames.showMore}`);
    if (this.showMoreEl) {
      this.showMoreButtonEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreLink}`);
      this.showMoreTextEl = this.showMoreEl.querySelector(`.${this.classNames.showMoreValue}`);

      this.showMoreButtonEl.addEventListener('click', (event) => {
        event.preventDefault();
        this.nextPage();
      });
    }
  }

  nextPage() {
    const formData = new FormData(this.formEl);
    const page = this.currentPage + 1;

    formData.append('page', page.toString());

    this.showMoreEl.classList.add(this.classNames.showMoreLoading);

    getFiltredCatalog(this.options.action, formData)
      .then((data) => {
        this.currentPage = page;
        this.add(data);
      })
      .catch((error) => {
        Vue.$notify.error(error.message);
        // alert(error.message);
        console.error(error);
      })
      .finally(() => {
        this.showMoreEl.classList.remove(this.classNames.showMoreLoading);
      });
  }

  updateQuantity() {
    if (this.quantityEl) {
      this.quantityEl.textContent = `${this.totalCards} ${Utils.declOfNum(this.totalCards, [
        'товар',
        'товара',
        'товаров',
      ])}`;
    }

    if (this.showMoreEl) {
      this.showMoreEl.style.display = this.shownCards < this.totalCards ? '' : 'none';
    }

    if (this.showMoreTextEl) {
      this.showMoreTextEl.textContent = `Показано ${this.shownCards} из ${this.totalCards}`;
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

    // Новая версия
    html += '<ol class="mr-breadcumps__list" itemscope itemtype="https://schema.org/BreadcrumbList">';
    array.forEach((item, i) => {
      html += '<li class="mr-breadcumps__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
      if (i === 0) {
        html += `<a itemprop="item" href="${item.url}"><span itemprop="name" class="red">${item.name}</span></a>`;
      } else if (i === array.length - 1) {
        html += `<span itemprop="name" class="gray">${item.name}</span>`;
      } else {
        html += `<a itemprop="item" href="${item.url}"><span itemprop="name">${item.name}</span></a>`;
      }
      html += `<meta itemprop="position" content="${i + 1}"/></li>`;
    });
    html += '</ol>';

    this.breadcumps.innerHTML = html;

    if (title !== '') {
      document.title = title;
    }

    if (h1 !== '' && this.title) {
      this.title.textContent = h1;
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
    store.dispatch('filters/resetAll').then(() => {
      this.update();
    });
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
    Utils.log('Каталог', 'Обновление по фильтру');
    try {
      this.containerEl.classList.add(this.classNames.cardListLoading);

      if (!this.options.ajax) {
        this.formEl.submit();
      } else {
        this.reloadPage(1);
      }
    } catch (error) {
      this.containerEl.classList.remove(this.classNames.cardListLoading);
      // alert('Ошибка');
      Vue.$notify.error(error.message);
      console.error(error);
    }
  };

  appendItems(items) {
    items.forEach((item) => {
      if (item.type === 'product') {
        this.shownCards += 1;
        // Понятия не имею, на сколько это адекватное решение
        const vm = new ProductCartVue({
          store,
          propsData: {
            product: item.options,
          },
        }).$mount();
        this.arrow.push(vm);
        this.containerEl.appendChild(vm.$el);
        // this.containerEl.appendChild(new ProductCard(item.options).getElement());
      } else {
        this.containerEl.appendChild(Utils.htmlToElement(item.html));
      }
    });

    this.updateQuantity();
  }

  /**
   * Заменить карточки товаров
   * @param {Object} data
   */
  reload(data) {
    this.currentPage = 1;
    this.shownCards = 0;
    this.totalCards = data.count;

    this.arrow.forEach((vm) => {
      vm.$destroy();
      vm = null;
    });

    this.arrow = [];
    this.containerEl.innerHTML = '';

    this.appendItems(data.items);

    // this.shownCards = this.parse(items);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    // return this.shownCards;
  }

  /**
   * Добавить карточки товаров
   * @param {Object} data
   */
  add(data) {
    this.totalCards = data.count;
    this.appendItems(data.items);
    // this.shownCards += this.parse(items);
    // this.listEl.style.height = `${this.listEl.scrollHeight}px`;
    // return this.shownCards;
  }

  // TODO: Вынести в api
  reloadPage() {
    // Api.catalog.send(this.options.action, new FormData(this.formEl), page);
    const formData = new FormData(this.formEl);
    formData.append('page', 1);

    return getFiltredCatalog(this.options.action, formData)
      .then((data) => {
        this.reload(data);

        if (data.url) {
          window.history.replaceState(null, null, data.url);
        }

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
        // alert(error.message);
        Vue.$notify.error(error.message);
        console.error(error);
      })
      .finally(() => {
        this.containerEl.classList.remove(this.classNames.cardListLoading);
      });
  }
}
