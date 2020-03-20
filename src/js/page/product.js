import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tooltip';

import Vue from 'vue';
// import $$ from 'dom7';
// import VueLazyload from 'vue-lazyload';
// import Sticky from 'sticky-js';

import '@/plugins/Anchor';
// import TextareaAutoHeight from '../plugins/TextareaAutoHeight';

import store from '@/store';
import productStore from '@/store/modules/product';

import Utils from '@/utils/utils';
import Reviews from '@/api/reviews';
import Product from '@/api/product';

import ProductImage from '@/components/product/DetailGallery.vue';
import ProductDetailHeader from '@/components/product/DetailHeader.vue';
import ProductDetailName from '@/components/product/DetailName.vue';
import ProductDetail from '@/components/product/Detail.vue';
import SectionReviews from '@/components/product/Reviews.vue';
import SectionSimilar from '@/components/product/Similar.vue';


// window.$$ = $$;

/**
 * Сворачивание строк
 */
function initCollapse() {
  let maxLineCount = 5;
  if (document.documentElement.clientWidth >= 768) {
    maxLineCount = 8;
  }
  if (document.documentElement.clientWidth >= 1240) {
    maxLineCount = 5;
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
      button.innerHTML = 'Развернуть';
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


/**
 * Блок "Наличие в магазинах города"
 */
class SectionStores {
  constructor(param) {
    this.el = param.el;
    this.textAvailable = param.textAvailable || [];

    if (!this.el) {
      return;
    }

    this.init();
  }

  /**
   * Инициализация
   */
  init() {
    [].forEach.call(this.el.querySelectorAll('.p-section-availability__row'), (storeEl) => {
      const targetEl = storeEl.querySelector('.p-section-availability__hidden');
      const linkEl = storeEl.querySelector('.p-section-availability__link');

      if (targetEl) {
        if (linkEl) {
          linkEl.addEventListener('click', (event) => {
            event.preventDefault();
            if (document.documentElement.clientWidth < 1240) {
              if (linkEl.classList.contains('active')) {
                linkEl.classList.remove('active');
                targetEl.classList.remove('active');
              } else {
                linkEl.classList.add('active');
                targetEl.classList.add('active');

                Utils.scrollTo(targetEl);
              }
            }
          });
        }

        storeEl.addEventListener('mouseenter', () => {
          if (document.documentElement.clientWidth >= 1240) {
            targetEl.classList.add('active');
            storeEl.classList.add('active');

            // document.addEventListener('scroll', this.onScroll);
          }
        });
        storeEl.addEventListener('mouseleave', () => {
          if (document.documentElement.clientWidth >= 1240) {
            targetEl.classList.remove('active');
            storeEl.classList.remove('active');

            // document.removeEventListener('scroll', this.onScroll);
          }
        });
        storeEl.addEventListener('mousemove', (event) => {
          if (document.documentElement.clientWidth >= 1240) {
            const top = Math.min(
              Math.max(event.clientY - 70, 10),
              document.documentElement.clientHeight - (targetEl.clientHeight + 10),
            );
            const left = Math.min(
              event.clientX + 30,
              document.documentElement.clientWidth - (targetEl.clientWidth + 10),
            );
            targetEl.style.left = `${left}px`;
            targetEl.style.top = `${top}px`;
          }
        });
      }
    });
  }

  /**
   * Обновить информацию
   * @param offer
   */
  update(offer) {
    this.el.style.display = offer.count_group > 0 ? '' : 'none';

    [].forEach.call(this.el.querySelectorAll('[data-store-id]'), (item) => {
      const { storeId } = item.dataset;
      let count = 0;

      if ({}.hasOwnProperty.call(offer.available_store, storeId)) {
        count = Math.min(Math.ceil(offer.available_store[storeId] / 20), 5);
      }

      // Наличие в магазине
      const stockEl = item.querySelector('.p-section-availability__col_stock > .p-section-availability__td');
      if (stockEl) {
        stockEl.innerHTML = `${this.textAvailable[count] || ''} ${SectionStores.getRatingHTML(count)}`;
      }

      // Самовывоз
      const pickupEl = item.querySelector('.p-section-availability__col_pickup > .p-section-availability__td');
      if (pickupEl) {
        pickupEl.textContent = count > 0 ? 'Через час' : 'Недоступен';
      }

      // Самовывоз > Примечание
      const pickupNoteEl = item.querySelector('.p-section-availability__col_pickup > .p-section-availability__note');
      if (pickupNoteEl) {
        pickupNoteEl.textContent = count > 0 ? 'Требуется предварительный заказ на сайте' : '';
      }
    });
  }


  /**
   * Генерирует индикацию наличия
   * @param {Number} rating - Остаток на складе
   * @return {String} HTML
   */
  static getRatingHTML(rating) {
    let html = '<div class="rect-rating">';

    if (rating > 3) {
      html = '<div class="rect-rating green">';
    } else if (rating > 1) {
      html = '<div class="rect-rating orange">';
    } else if (rating > 0) {
      html = '<div class="rect-rating red">';
    }

    for (let i = 0; i < 5; i += 1) {
      html += `<i class="rect-rating__item ${i < rating ? 'active' : ''}"></i>`;
    }

    html += '</div>';

    return html;
  }
}


class PageProduct {
  constructor() {
    const categotyEl = document.querySelector('.p-detail__category');

    this.product = {
      category: categotyEl ? categotyEl.textContent : '',
      country: '',
      ...window.product,
    };


    const reviewsList = document.querySelector('#js-product-reviews');
    if (reviewsList) {
      try {
        Reviews.requestParam = JSON.parse(reviewsList.dataset.request);
      } catch (e) {
        console.error(e);

        Reviews.requestParam = eval(`(${reviewsList.dataset.request})`);
      }
    }

    const similarSection = document.querySelector('.p-section-similar');
    if (similarSection) {
      try {
        Product.requestParam = JSON.parse(similarSection.dataset.request);
      } catch (e) {
        console.error(e);
      }
    }


    store.registerModule('product', productStore);

    this.stores = new SectionStores({
      el: document.querySelector('.p-section-availability'),
      textAvailable: window.product.textAvailable,
    });
  }

  init() {
    // // Фиксация блока с фото на планшете
    // if (document.documentElement.clientWidth >= 768
    //   && document.documentElement.clientWidth < 1240) {
    //   new Sticky('.p-detail__left-block', {
    //     marginTop: 90,
    //     // stickyClass: 'is-sticky',
    //     stickyContainer: '.p-detail',
    //   });
    // }

    // Подстройка высоты textarea под высоту содержимого
    // Array.prototype.forEach.call(document.querySelectorAll('textarea.autoheight'), (element) => {
    //   new TextareaAutoHeight(element);
    // });


    initCollapse();

    store.dispatch('product/init', this.product);

    // store.watch()
    store.subscribe((mutation, state) => {
      if (mutation.type === 'product/SET_ACTIVE_OFFER_ID') {
        this.onChangeOffer(state, mutation.payload);
      }
      if (mutation.type === 'product/SET_ACTIVE_PACKING_ID') {
        this.onChangePacking(state, mutation.payload);
      }
    });

    new Vue({
      store,
      render: (h) => h(ProductDetail),
    }).$mount('#js-product-info');

    new Vue({
      store,
      render: (h) => h(ProductDetailHeader),
    }).$mount('.p-detail__header');

    new Vue({
      store,
      render: (h) => h(ProductDetailName),
    }).$mount('#js-product-header');

    new Vue({
      store,
      render: (h) => h(ProductImage),
    }).$mount('#js-product-image');


    new Vue({
      store,
      render: (h) => h(SectionReviews),
    }).$mount('.p-section-reviews');


    new Vue({
      store,
      render: (h) => h(SectionSimilar),
    }).$mount('.p-section-similar');
  }

  /**
   * При изменении фасовки
   *
   * @param state - новое состояние хранилища
   * @param payload - переданные данные
   */
  onChangePacking = (state, payload) => {
    const activePacking = payload;

    document.title = activePacking.title;
    window.history.replaceState(null, null, activePacking.url);

    const breadcumpsItemLast = document.querySelector('.mr-breadcumps__item:last-child span');
    if (breadcumpsItemLast) {
      breadcumpsItemLast.textContent = activePacking.name;
    }
  };

  /**
   * При изменении оффера
   *
   * @param state - новое состояние хранилища
   * @param payload - переданные данные
   */
  onChangeOffer = (state, payload) => {
    this.stores.update(payload);
  };
}

export default PageProduct;
