import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tooltip';

import Vue from 'vue/dist/vue.esm';
import Sticky from 'sticky-js';

import '../plugins/Anchor';
import TextareaAutoHeight from '../plugins/TextareaAutoHeight';
import Utils from '../utils/utils';
import Api from '../utils/Api';
import store from '../store';
// import ControlCounter from '../components/product/ControlCounter.vue';
// import ControlSelect from '../components/product/ControlSelect.vue';
// import ProductImage from '../components/product/ImageBlock.vue';
// import ProductPrice from '../components/product/Price.vue';
// import ProductDelivery from '../components/product/Delivery.vue';
import ProductDetail from '../components/product/Detail.vue';

Vue.filter('formatNumber', (value) => {
  // if (!value) return '';
  // return value.toLocaleString();
  return '@' + value.toString();
});

Vue.filter('formatPrice', (value) => {
  // if (!value) return '';
  // return value.toLocaleString();
  return `${value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
});
//
// Vue.filter('formatUnit', (value) => {
//   // if (!value) return '';
//   // return value.toLocaleString();
//   return `${value.toString()} ₽`;
// });

/**
 * Инициализирует компонент переключения (выбор вкуса)
 */
function initProductSelect() {
  function update(el) {
    const selectedEL = el.querySelector('input:checked');

    if (!selectedEL) {
      return;
    }
    el.querySelector('.p-control-select__header-label').innerHTML = selectedEL.parentElement.querySelector('.p-control-select__item-name').innerHTML;
    // el.querySelector('.p-control-select__header-badge').innerHTML = selectedEL.parentElement.querySelector('.p-control-select__item-info').innerHTML;
  }


  [...document.querySelectorAll('.p-control-select')].forEach((item) => {
    item.addEventListener('change', () => {
      update(item);
    });
    update(item);
  });
}

/**
 * Инициализирует компонент выбора количества
 */
function initProductCounter() {
  function update(input, command) {
    const val = parseInt(input.value, 10);
    if (command === 'increment') {
      input.value = val + 1;
    } else if (command === 'decrement') {
      input.value = Math.max(0, val - 1);
    }
  }

  [...document.querySelectorAll('.p-control-counter')].forEach((item) => {
    const input = item.querySelector('.p-control-counter__input');

    item.querySelector('.p-control-counter__increment').addEventListener('click', () => {
      update(input, 'increment');
    });
    item.querySelector('.p-control-counter__decrement').addEventListener('click', () => {
      update(input, 'decrement');
    });
  });
}

/**
 * Инициализирует действия кнопки
 */
function initCartButton() {
  const icon = `<svg class="p-control-fixed__icon" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81034 2.95034H8.97929C9.36412 2.95034 9.68481 3.27103 9.68481 3.65586C9.68481 4.04068 9.36412 4.42551 8.97929 4.42551H5.06689L6.54206 12.9558H18.7282L20.2034 4.42551H16.291C15.9062 4.42551 15.5855 4.04068 15.5855 3.65586C15.5855 3.27103 15.9062 2.95034 16.291 2.95034H21.1013C21.5503 2.95034 21.871 3.33517 21.8069 3.84827L20.011 13.7896C19.9469 14.1745 19.6262 14.431 19.2413 14.431L5.96482 14.3669C5.57999 14.3669 5.32344 14.1103 5.19516 13.7896L3.07862 1.47517H0.705516C0.320689 1.47517 0 1.15448 0 0.705516C0 0.320689 0.320689 0 0.705516 0H3.65586C4.04068 0 4.29723 0.256551 4.36137 0.57724L4.81034 2.95034ZM11.8655 1.21862C11.8655 0.833791 12.2503 0.448965 12.6351 0.448965C13.02 0.448965 13.3407 0.833791 13.3407 1.21862V7.50412L14.3027 6.54206C14.6234 6.28551 15.0724 6.28551 15.3289 6.54206C15.6496 6.86275 15.6496 7.31171 15.3289 7.56826L13.1483 9.81308C13.02 9.94136 12.8276 10.0055 12.6351 10.0055C12.4427 10.0055 12.2503 9.94136 12.122 9.81308L9.94136 7.56826C9.62067 7.31171 9.62067 6.86275 9.94136 6.54206C10.1979 6.28551 10.6469 6.28551 10.9676 6.54206L11.8655 7.50412V1.21862ZM8.33792 15.842C9.55653 15.842 10.5827 16.8682 10.5827 18.0869C10.5827 19.2413 9.55653 20.2675 8.33792 20.2675C7.18344 20.2675 6.15723 19.3055 6.15723 18.0869C6.15723 17.4455 6.41378 16.9324 6.79861 16.4834C7.18344 16.0986 7.76068 15.842 8.33792 15.842ZM8.33792 17.3172C8.1455 17.3172 7.95309 17.3813 7.82481 17.5738C7.69654 17.702 7.6324 17.8303 7.6324 18.0869C7.6324 18.4717 7.95309 18.7924 8.33792 18.7924C8.78688 18.7924 9.10757 18.4717 9.10757 18.0869C9.10757 17.6379 8.78688 17.3172 8.33792 17.3172ZM16.8682 15.9062C18.0869 15.9062 19.1131 16.8682 19.1131 18.0869C19.1131 19.3055 18.0869 20.2675 16.8682 20.2675C15.7138 20.2675 14.6876 19.3055 14.6876 18.0869C14.6876 17.4455 14.9441 16.9324 15.3289 16.5476C15.7138 16.0986 16.291 15.9062 16.8682 15.9062ZM16.8682 17.3172C16.6758 17.3172 16.4834 17.4455 16.3551 17.5738C16.2269 17.702 16.1627 17.8944 16.1627 18.0869C16.1627 18.4717 16.4834 18.7924 16.8682 18.7924C17.3172 18.7924 17.6379 18.4717 17.6379 18.0869C17.6379 17.702 17.3172 17.3172 16.8682 17.3172Z" fill="currentColor"/>
</svg>`;

  const iconActive = `<svg class="p-control-fixed__icon" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.81034 2.95034H8.97929C9.36412 2.95034 9.68481 3.27103 9.68481 3.65586C9.68481 4.04068 9.36412 4.42551 8.97929 4.42551H5.06689L6.54206 12.9558H18.7282L20.2034 4.42551H16.291C15.9062 4.42551 15.5855 4.04068 15.5855 3.65586C15.5855 3.27103 15.9062 2.95034 16.291 2.95034H21.1013C21.5503 2.95034 21.871 3.33517 21.8069 3.84827L20.011 13.7896C19.9469 14.1745 19.6262 14.431 19.2413 14.431L5.96482 14.3669C5.57999 14.3669 5.32344 14.1103 5.19516 13.7896L3.07862 1.47517H0.705516C0.320689 1.47517 0 1.15448 0 0.705516C0 0.320689 0.320689 0 0.705516 0H3.65586C4.04068 0 4.29723 0.256551 4.36137 0.57724L4.81034 2.95034ZM8.33792 15.842C9.55653 15.842 10.5827 16.8682 10.5827 18.0869C10.5827 19.2413 9.55653 20.2675 8.33792 20.2675C7.18344 20.2675 6.15723 19.3055 6.15723 18.0869C6.15723 17.4455 6.41378 16.9324 6.79861 16.4834C7.18344 16.0986 7.76068 15.842 8.33792 15.842ZM8.33792 17.3172C8.1455 17.3172 7.95309 17.3813 7.82481 17.5738C7.69654 17.702 7.6324 17.8303 7.6324 18.0869C7.6324 18.4717 7.95309 18.7924 8.33792 18.7924C8.78688 18.7924 9.10757 18.4717 9.10757 18.0869C9.10757 17.6379 8.78688 17.3172 8.33792 17.3172ZM16.8682 15.9062C18.0869 15.9062 19.1131 16.8682 19.1131 18.0869C19.1131 19.3055 18.0869 20.2675 16.8682 20.2675C15.7138 20.2675 14.6876 19.3055 14.6876 18.0869C14.6876 17.4455 14.9441 16.9324 15.3289 16.5476C15.7138 16.0986 16.291 15.9062 16.8682 15.9062ZM16.8682 17.3172C16.6758 17.3172 16.4834 17.4455 16.3551 17.5738C16.2269 17.702 16.1627 17.8944 16.1627 18.0869C16.1627 18.4717 16.4834 18.7924 16.8682 18.7924C17.3172 18.7924 17.6379 18.4717 17.6379 18.0869C17.6379 17.702 17.3172 17.3172 16.8682 17.3172Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4939 5.43558C15.8056 5.70834 15.8372 6.18216 15.5644 6.49389L11.5597 11.0708L8.49393 8.26782C8.18823 7.98832 8.16698 7.51392 8.44648 7.20822C8.72598 6.90252 9.20038 6.88128 9.50608 7.16077L11.4403 8.92925L14.4356 5.50613C14.7083 5.1944 15.1822 5.16282 15.4939 5.43558Z" fill="currentColor"/>
</svg>`;


  function add(button) {
    button.classList.remove('btn-red');
    button.classList.add('added');
    button.classList.add('btn-green');
    button.innerHTML = `${iconActive} В корзине`;

    $('.p-control-counter').addClass('active');
  }

  function remove(button) {
    button.classList.add('btn-red');
    button.classList.remove('added');
    button.classList.remove('btn-green');
    button.innerHTML = `${icon} В корзину`;

    $('.p-control-counter').removeClass('active');
  }


  $('[data-toggle="product.cart"]').on('click', (event) => {
    if (event.currentTarget.classList.contains('added')) {
      Api.cart.remove(event.currentTarget.getAttribute('data-options'))
        .then(() => {
          remove(event.currentTarget);
        })
        .catch(() => {
          add(event.currentTarget);
        });
    } else {
      Api.cart.add(event.currentTarget.getAttribute('data-options'))
        .then(() => {
          add(event.currentTarget);
        })
        .catch(() => {
          remove(event.currentTarget);
        });
    }
  });
}

function initStoreInfo() {
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
        }
      });
      storeEl.addEventListener('mouseleave', () => {
        if (document.documentElement.clientWidth >= 1240) {
          targetEl.classList.remove('active');
          storeEl.classList.remove('active');
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
      container.innerHTML = item.innerHTML;
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

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
  $('.p-control-select__header').dropdown({
    display: 'static',
  });


  // Фиксация блока с фото на планшете
  if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1240) {
    new Sticky('.p-detail__left-block', {
      marginTop: 90,
      // stickyClass: 'is-sticky',
      stickyContainer: '.p-detail',
    });
  }

  // Подстройка высоты textarea под высоту содержимого
  Array.prototype.forEach.call(document.querySelectorAll('textarea'), (element) => {
    new TextareaAutoHeight(element);
  });

  if (document.querySelector('.p-detail__name') && global.product) {
    global.product.name = document.querySelector('.p-detail__name').textContent;
  }

  store.dispatch('product/getAllPacking');

  // // Кнопка и выбор количества
  // new Vue({
  //   store,
  //   render: h => h(ControlCounter),
  // }).$mount('.p-control-fixed');
  //
  // new Vue({
  //   store,
  //   render: h => h(ProductPrice),
  // }).$mount('.p-price');
  //
  // new Vue({
  //   store,
  //   render: h => h(ProductDelivery),
  // }).$mount('.p-detail-delivery');
  //
  // new Vue({
  //   store,
  //   render: h => h(ControlSelect),
  // }).$mount('.p-control-options');
  //
  // new Vue({
  //   store,
  //   render: h => h(ProductImage),
  // }).$mount('.p-images-block');

  new Vue({
    store,
    render: h => h(ProductDetail),
  }).$mount('.p-detail__col_top');


  initProductSelect();
  // initProductCounter();
  // initCartButton();
  initStoreInfo();
  initCollapse();
});
