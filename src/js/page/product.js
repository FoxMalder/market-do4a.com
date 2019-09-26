import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tooltip';

import Vue from 'vue';
import Sticky from 'sticky-js';

import '../plugins/Anchor';
import TextareaAutoHeight from '../plugins/TextareaAutoHeight';
import Utils from '../utils/utils';
import Reviews from '../api/reviews';
import Product from '../api/product';

import store from '../store';
import productStore from '../store/modules/product';
// import ControlCounter from '../components/product/ControlCounter.vue';
// import ControlSelect from '../components/product/ControlSelect.vue';
import ProductImage from '../components/product/ImageBlock.vue';
import StarRating from '../components/StarRating.vue';
import ProductDetailHeader from '../components/product/DetailHeader.vue';
import ProductDetailName from '../components/product/DetailName.vue';
import ProductDetail from '../components/product/Detail.vue';
import ProductReviews from '../components/product/Reviews.vue';
import ProductSimilar from '../components/product/Similar.vue';


/**
 * Высплывашка с информацией о магазине
 */
function initStoreInfo() {
  function onScroll(event) {
    console.log(event);
  }

  [].forEach.call(document.querySelectorAll('.p-section-availability__row'), (storeEl) => {
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

          document.addEventListener('scroll', onScroll);
        }
      });
      storeEl.addEventListener('mouseleave', () => {
        if (document.documentElement.clientWidth >= 1240) {
          targetEl.classList.remove('active');
          storeEl.classList.remove('active');

          document.removeEventListener('scroll', onScroll);
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


export default class PageProduct {
  constructor() {
    this.rectRatingHTML = {
      0: '<div class="rect-rating"><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i></div>',
      1: '<div class="rect-rating red"><i class="rect-rating__item active"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i></div>',
      2: '<div class="rect-rating orange"><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i></div>',
      3: '<div class="rect-rating orange"><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item"></i><i class="rect-rating__item"></i></div>',
      4: '<div class="rect-rating green"><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item"></i></div>',
      5: '<div class="rect-rating green"><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i><i class="rect-rating__item active"></i></div>',
    };


    this.elements = {
      detailReviewsCount: null,
      reviewsCount: null,
      availability: null,
      breadcumpsThisPage: null,
    };
  }

  init() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.p-control-select__header').dropdown({ display: 'static' });


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
    Array.prototype.forEach.call(document.querySelectorAll('textarea.autoheight'), (element) => {
      new TextareaAutoHeight(element);
    });


    initStoreInfo();
    initCollapse();


    this.elements = {
      detailReviewsCount: document.querySelector('.p-detail__reviews'),
      reviewsCount: document.querySelector('.p-reviews-header__count'),
      ratingValue: document.querySelector('.p-reviews-header__rating'),
      availability: document.querySelector('.p-section-availability'),
      breadcumpsThisPage: document.querySelector('.breadcumps__page'),
    };

    const categotyEl = document.querySelector('.p-detail__category');

    const param = {
      ...global.product,
      category: categotyEl ? categotyEl.textContent : 'kljljkll',
      country: '',
    };


    store.registerModule('product', productStore);
    store.dispatch('product/init', param);

    // $('.p-review-form').on('submit', this.addReview);
    $('.p-modal-form').on('submit', this.addReview);


    this.initVue(true);
  }

  initVue(subscribe = false) {
    if (subscribe) {
      store.subscribe((mutation, state) => {
        // console.log(mutation.type);
        // console.log(mutation.payload);

        if (mutation.type === 'product/SET_ACTIVE_OFFER_ID') {
          this.onChangeOffer(state, mutation.payload);
        }
        if (mutation.type === 'product/SET_ACTIVE_PACKING_ID') {
          this.onChangePacking(state, mutation.payload);
        }
      });
    }

    new Vue({
      store,
      render: h => h(ProductDetail),
    }).$mount('#js-product-info');

    new Vue({
      store,
      render: h => h(ProductDetailHeader),
    }).$mount('.p-detail__header');

    new Vue({
      store,
      render: h => h(ProductDetailName),
    }).$mount('#js-product-header');

    new Vue({
      store,
      render: h => h(ProductImage),
    }).$mount('#js-product-image');

    const reviewsList = document.querySelector('#js-product-reviews');
    if (reviewsList) {
      // const reviewsListParam = JSON.parse(reviewsList.dataset.request);
      Reviews.requestParam = eval(`(${reviewsList.dataset.request})`);
      new Vue({
        store,
        render: h => h(ProductReviews),
      }).$mount(reviewsList);
    }

    const similarSection = document.querySelector('.p-section-similar');
    if (similarSection) {
      // const similarSectionParam = JSON.parse(similarSection.dataset.request);
      Product.requestParam = eval(`(${similarSection.dataset.request})`);
      new Vue({
        store,
        render: h => h(ProductSimilar),
      }).$mount(similarSection);
    }

    // document.querySelector('.p-review-form').querySelector('.p-review-form__stars');
    new Vue({
      store,
      render: h => h(StarRating),
    }).$mount('.p-review-form__stars');

    new Vue({
      store,
      render: h => h(StarRating),
    }).$mount('.p-modal-form__rating-stars');
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
    if (!global.demo) {
      window.history.replaceState(null, null, activePacking.url);
    }

    if (this.elements.breadcumpsThisPage) this.elements.breadcumpsThisPage.innerHTML = activePacking.name;
    // if (this.elements.detailReviewsCount) {
    //   this.elements.detailReviewsCount.innerHTML = activePacking.review
    //     ? `${activePacking.review} ${Utils.declOfNum(activePacking.review, ['отзыв', 'отзыва', 'отзывов'])}`
    //     : 'Нет отзывов';
    // }
    if (this.elements.ratingValue) {
      this.elements.ratingValue.style.display = activePacking.review > 0 ? '' : 'none';
    }
    if (this.elements.reviewsCount) {
      this.elements.reviewsCount.innerHTML = activePacking.review > 0 ? activePacking.review : '';
    }
  };

  /**
   * При изменении оффера
   *
   * @param state - новое состояние хранилища
   * @param payload - переданные данные
   */
  onChangeOffer = (state, payload) => {
    const activeOffer = payload;

    if (activeOffer.count_group > 0) {
      if (this.elements.availability) this.elements.availability.style.display = '';

      [].forEach.call(document.querySelectorAll('[data-store-id]'), (item) => {
        const { storeId } = item.dataset;
        const stockEl = item.querySelector('.p-section-availability__col_stock > .p-section-availability__td');
        const pickupEl = item.querySelector('.p-section-availability__col_pickup > .p-section-availability__td');
        const pickupNoteEl = item.querySelector('.p-section-availability__col_pickup > .p-section-availability__note');


        if ({}.hasOwnProperty.call(activeOffer.available_store, storeId)) {
          const count = Math.min(Math.ceil(activeOffer.available_store[storeId] / 20), 5);

          if (stockEl) {
            stockEl.innerHTML = global.product.textAvailable[count] + this.rectRatingHTML[count];
          }

          if (pickupEl) {
            pickupEl.innerHTML = count > 0 ? 'Через час' : 'Недоступен';
          }

          if (pickupNoteEl) {
            pickupNoteEl.innerHTML = count > 0 ? 'Требуется предварительный заказ на сайте' : '';
          }
        }
      });
    } else {
      if (this.elements.availability) this.elements.availability.style.display = 'none';
    }
  };


  /**
   * Добавить отзыв
   *
   * @param event
   */
  addReview = (event) => {
    const $el = $(event.currentTarget);
    const $button = $el.find('[type="submit"]');
    const buttonHtml = $button.html();

    event.preventDefault();

    const data = {
      name: $el.find('[name="name"]').val(),
      email: $el.find('[name="email"]').val(),
      text: $el.find('[name="text"]').val(),
      rating: $el.find('[name="rating"]:checked').val(),
      source: $el.find('[name="source"]').val(),
    };

    $button.html('<span class="btn-icon"><span class="spinner-border" role="status"></span></span>');

    Reviews.addReview(store.state.product.packingId, data)
      .then(() => {
        $button.removeClass('btn-red');
        $button.addClass('btn-green');
        event.currentTarget.reset();
      })
      .catch((error) => {
        alert(error.message || error.response.message);
      })
      .finally(() => {
        $button.html(buttonHtml);
        $.fancybox.close();
      });
  };
}
