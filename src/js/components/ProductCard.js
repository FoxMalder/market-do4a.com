// import Vue from 'vue';

import Utils from '../utils/utils';
import store from '../store';
// import ProductCartVue from './ProductCard.vue';


export default class ProductCard {
  constructor(data, el = null) {
    this.data = data;

    /*
    Пример

    data = {
      "id": 49568,
      "name": "Do4a Lab Premium Whey 60% 900 гр",
      "url": "/catalog/product/do4a_lab_premium_whey_60_900_gr/",
      "pack_count": 0,
      "price": 1090,
      "price_benefit": 0,
      "img": "/upload/resizer/ba/74192_135x135_ba7f6f9e02a029453dffa51c385bd72d.jpg?1534609372",
      "img2x": "/upload/resizer/d8/74192_270x270_d86ce530901ce4ded23bec779e0a93d5.jpg?1534609372",
      "review": 69,
      "rating": 4.6,
      "isAvailable": true,
      "isFavorite": true,
      "section": "Сывороточный"
    }
     */

    this.el = el;
    this.favoriteButtonEl = null;

    this.removable = false;


    this.init();
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

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

    if (typeof MutationObserver !== 'undefined') {
      this.globalObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          Array.prototype.forEach.call(mutation.addedNodes, (addedNode) => {
            if (addedNode.nodeType === 1) {
              if (addedNode.classList.contains('product-card')
                && addedNode.hasAttribute('data-product-id')) {
                !addedNode.ProductCard
                && new ProductCard(ProductCard.getElOptions(addedNode), addedNode);
              } else {
                Array.prototype.forEach.call(
                  addedNode.querySelectorAll('.product-card[data-product-id]'),
                  (el) => {
                    !el.ProductCard
                    && new ProductCard(ProductCard.getElOptions(el), el);
                  },
                );
              }
            }
          });

          Array.prototype.forEach.call(mutation.removedNodes, (removedNode) => {
            if (removedNode.nodeType === 1) {
              if (removedNode.classList.contains('product-card')
                && removedNode.hasAttribute('data-product-id')) {
                removedNode.ProductCard && removedNode.ProductCard.unMount();
              } else {
                Array.prototype.forEach.call(
                  removedNode.querySelectorAll('.product-card[data-product-id]'),
                  (el) => {
                    el.ProductCard && el.ProductCard.unMount();
                  },
                );
              }
            }
          });
        });
      });

      this.globalObserver.observe(document, { childList: true, subtree: true });
    }

    // Taken from jQuery `ready` function
    // Instantiate elements already present on the page
    if (
      document.readyState === 'complete'
      || (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  }

  static initDOMLoadedElements() {
    document.removeEventListener(
      'DOMContentLoaded',
      this.initDOMLoadedElements,
    );
    window.removeEventListener('load', this.initDOMLoadedElements);

    Array.prototype.forEach.call(
      document.querySelectorAll('.product-card[data-product-id]'),
      (el) => {
        if (!el.ProductCard) new ProductCard(ProductCard.getElOptions(el), el);
      },
    );
  }

  static getElOptions(el) {
    const id = parseInt(el.getAttribute('data-product-id'), 10);
    return {
      id,
      isFavorite: store.state.favorites.indexOf(id) !== -1,
      // isFavorite: !!store.state.favorites.find((productId) => productId === id),
      // isFavorite: el.querySelector('.product-control__favorites').classList.contains('active'),
    };
  }

  init() {
    if (!this.el) {
      this.initDOM();
    } else {
      this.favoriteButtonEl = this.el.querySelector('.product-control__favorites');
      if (this.favoriteButtonEl.getAttribute('data-toggle') === 'product.favorites.remove') {
        this.removable = true;
      }
    }

    this.favoriteButtonEl.addEventListener('click', this.onClick);

    this.el.ProductCard = this;
  }

  // initVue() {
  //   this.vm = new Vue({
  //     store,
  //     render: h => h(ProductCartVue, {
  //       props: { filter: store.state.filters[this.container][this.filterSettings.name] },
  //     }),
  //   }).$mount();
  //   // document.body.appendChild(this.catalogControlMobileVM.$el);
  // }


  // static shipingPeriod() {
  //   const city = store.getters.currentCity;
  //   return city && city.deliveryCountDays
  //     ? `от ${city.deliveryCountDays[0]} ${Utils.declOfNum(city.deliveryCountDays[0], ['дня', 'дней', 'дней'])}`
  //     : 'от 1 дня';
  // }

  static badgeTextCentral() {
    let period = 'от 1';
    let unit = 'дня';

    const city = store.getters.currentCity;

    if (city && city.deliveryCountDays && city.deliveryCountDays.length > 1) {
      period = `${city.deliveryCountDays[0]}-${city.deliveryCountDays[1]}`;
      unit = Utils.declOfNum(city.deliveryCountDays[1], ['дня', 'дней', 'дней']);
    }

    return `Со склада в СПБ, ${period} ${unit}`;
  }

  static badgeTextLocal() {
    return 'Магазин рядом, 1 день';
  }

  getDeliveryLabelHTML() {
    if (!store.state.isLocaleStore) {
      return '';
    }

    const city = store.getters.currentCity;
    if (!city || city.isFake) {
      return '';
    }

    if (!this.data.isAvailable) {
      return '';
    }

    if (this.data.isDeliveryOneDay) {
      return `<div class="product-card__badge product-card__badge_local">${ProductCard.badgeTextLocal()}</div>`;
    }

    return `<div class="product-card__badge product-card__badge_central">${ProductCard.badgeTextCentral()}</div>`;
  }

  initDOM() {
    this.el = document.createElement('div');
    this.el.classList.add('product-card');
    this.el.setAttribute('data-product-id', this.data.id);
    // this.el.dataset.productId = this.data.id;


    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('product-card__wrapper');
    wrapperEl.innerHTML = `
      <div class="product-card__img">
        <img src="${this.data.img}" srcset="${this.data.img2x} 2x" alt="${this.data.name}">
      </div>
      <div class="product-card__body">
        ${this.getDeliveryLabelHTML()}
        <a class="product-card__title stretched-link" href="${this.data.url}" title="Перейти в карточку товара">${this.data.name}</a>
        <div class="product-card__description">${this.data.section}</div>
      </div>
      <div class="product-card__footer">
        <div class="product-card__price">
          <span class="small">${this.data.pack_count ? 'от' : ''}</span>
          <span class="price">${this.data.price}</span>
          <span class="currency">₽</span>
        </div>
        <div class="product-card__sale">${this.data.price_benefit ? `Экономия до ${this.data.price_benefit} ₽` : ''}</div>
        <div class="product-card__row">
          <div class="product-card__reviews">
            ${ProductCard.getRatingEl(this.data.rating)}
            <span style="${this.data.review === 0 ? 'display: none' : ''}">
              ${this.data.review} ${Utils.declOfNum(this.data.review, ['отзыв', 'отзыва', 'отзывов'])}
            </span>
          </div>                
          <div class="product-card__stock">
            <div class="${this.data.isAvailable ? 'green' : 'red'}">
              ${this.data.isAvailable ? 'В наличии' : 'Нет в наличии'}
            </div>
            <div style="${this.data.pack_count === 0 ? 'display: none' : ''}">
              ${this.data.pack_count} ${Utils.declOfNum(this.data.pack_count, ['фасовка', 'фасовки', 'фасовок'])}
            </div>
          </div>
        </div>
      </div>`;


    const stickersEl = document.createElement('div');
    stickersEl.classList.add('product-stickers');

    // if (this.data.isDeliveryOneDay) {
    //   stickersEl.innerHTML += '<div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery">Доставка <br>1 день</div>';
    // }
    if (this.data.isRecommend) {
      stickersEl.innerHTML += '<div class="product-stickers__item product-stickers__item_yellow">Рекомендуем</div>';
    }
    if (this.data.isNew) {
      stickersEl.innerHTML += '<div class="product-stickers__item product-stickers__item_green">Новинка</div>';
    }
    if (this.data.isHit) {
      stickersEl.innerHTML += '<div class="product-stickers__item product-stickers__item_red">Хит!</div>';
    }

    const controlEl = document.createElement('div');
    controlEl.classList.add('product-control');

    this.favoriteButtonEl = document.createElement('button');
    this.favoriteButtonEl.type = 'button';
    this.favoriteButtonEl.classList.add('product-control__favorites');
    if (this.data.isFavorite) this.favoriteButtonEl.classList.add('active');
    this.favoriteButtonEl.innerHTML = '<svg viewBox="0 0 31 27" width="100%" height="100%"><path d="M14.107 3.817l1.106 1.182 1.094-1.193C17.63 2.364 19.555 1.5 21.667 1.5c3.997 0 7.26 3.259 7.267 7.27a7.216 7.216 0 0 1-2.136 5.152l-.002.002-11.62 11.546L3.638 13.924h0l-.004-.004A7.187 7.187 0 0 1 1.5 8.778c0-4.036 3.28-7.274 7.27-7.274a7.31 7.31 0 0 1 5.337 2.313zm1.121 21.706h0s0 0 0 0z" fill="currentColor" stroke="currentColor" stroke-width="3"></path></svg>';
    controlEl.appendChild(this.favoriteButtonEl);


    this.el.appendChild(wrapperEl);
    this.el.appendChild(stickersEl);
    this.el.appendChild(controlEl);
  }

  onClick = (event) => {
    event.preventDefault();
    // event.stopPropagation();

    if (this.data.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  };

  /**
   * Добавить в избранное
   * @function
   */
  addToFavorites() {
    this.favoriteButtonEl.classList.add('active');

    store.dispatch('addToFavorites', this.data.id)
      .then(() => {
        this.data.isFavorite = true;
      })
      .catch(() => {
        this.favoriteButtonEl.classList.remove('active');
      });
  }

  /**
   * Удалить из избранного
   * @function
   */
  removeFromFavorites() {
    this.favoriteButtonEl.classList.remove('active');

    if (this.removable) {
      this.el.style.display = 'none';
    }

    store.dispatch('removeFromFavorites', this.data.id)
      .then(() => {
        this.data.isFavorite = false;
        if (this.removable) {
          this.el.parentNode.removeChild(this.el);
        }
      })
      .catch(() => {
        this.favoriteButtonEl.classList.add('active');
        this.el.style.display = '';
      });
  }

  getElement() {
    return this.el;
  }

  unMount() {
    this.favoriteButtonEl.removeEventListener('click', this.onClick);
    this.el.ProductCard = null;
  }
}


ProductCard.initHtmlApi();
