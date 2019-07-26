// import SimpleBar from 'simplebar';
import noUiSlider from 'nouislider';

import Vue from 'vue/dist/vue.esm';
import Dropdown from './Dropdown.vue';
import MultifilterPrice from './MultifilterPrice.vue';
import MultifilterContainer from './Multifilter.vue';
import store from '../store';

import { mapGetters, mapState, mapActions } from 'vuex';

export class Multifilter {
  constructor(el, callback, options = {}) {
    if (!el) return;

    this.el = el;
    this.valueEl = this.el.querySelector('.multifilter__value');
    this.contentEl = this.el.querySelector('.dropdown-menu');
    this.menuButton = this.el.querySelector('button.multifilter__content');

    this.inputList = [...this.el.querySelectorAll('input')];

    this.callback = callback;

    this.options = {
      type: options.type || 'simple', // 'checkbox', 'radio', 'price'
      replaceTitle: options.replaceTitle || false,
    };

    if (this.options.type === 'simple') {
      // this.inputList.forEach(item => item.addEventListener('change', this.callback));
      this.el.addEventListener('change', event => this.callback(event));
    }
  }

  /**
   * Инициализирует кастомную прокрутку
   *
   * @returns {SimpleBar|boolean}
   */
  initScrollbar() {
    if (!this.contentEl) return false;
    // const simpleBar = new SimpleBar(this.contentEl, { autoHide: false });
    // this.contentEl = simpleBar.getContentElement();
    // return simpleBar;
  }


  /**
   * Обновляет заголовок
   *
   * @param {Array|String} [title=''] - Строка или массив вставляемых значений
   * @returns {String} title
   */
  updateTitle(title = '') {
    let newTitle = Array.isArray(title) ? title.join(', ') : title;
    if (newTitle === '') {
      newTitle = 'Не выбрано';
    }
    this.valueEl.innerHTML = newTitle;

    return title;
  }

  reset() {
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
            if (!input.hasAttribute('checked')) {
              input.checked = false;
            }
            break;

          case 'checkbox':
            input.checked = false;
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
    this.callback(this);
  }
}

export class PriceFilter {
  constructor(el, callback) {
    this.el = el;
    this.filterSettings = PriceFilter.parseSettings(this.el);

    this.vm = new Vue({
      el: this.el,
      store,
      computed: mapState('filters', {
        filter: state => state.filters[this.filterSettings.name],
      }),
      template: `
        <dropdown class="multifilter">
          <template slot="btn">
            <span class="multifilter__value">{{filter.label}}</span>
          </template>
          
          <template slot="body">
            <MultifilterPrice :slider="filter.data" @change="$store.dispatch('filters/onChange')"/>
          </template>
        </dropdown>`,
      components: { Dropdown, MultifilterPrice },
    });
    //
    // new Vue({
    //   el: this.el.querySelector('.multifilter-price'),
    //   template: '<MultifilterPrice />',
    //   components: { MultifilterPrice },
    // });


    // const priceMinText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__start');
    // const priceMaxText = this.contentEl.querySelector('.multifilter-price__num .multifilter-price__end');
    //
    // const rangeArr = {
    //   min: priceMinText ? parseInt(priceMinText.innerText.replace(/[^0-9]/g, ''), 10) : 0,
    //   max: priceMaxText ? parseInt(priceMaxText.innerText.replace(/[^0-9]/g, ''), 10) : 9999,
    // };
    //
    // this.fromInput = this.contentEl.querySelector('.js-min-value');
    // if (!this.fromInput) {
    //   this.fromInput = document.createElement('input');
    //   this.fromInput.type = 'hidden';
    //   this.fromInput.name = 'Price[from]';
    //   this.fromInput.value = 0;
    //   this.contentEl.appendChild(this.fromInput);
    // }
    //
    // this.toInput = this.contentEl.querySelector('.js-max-value');
    // if (!this.toInput) {
    //   this.toInput = document.createElement('input');
    //   this.toInput.type = 'hidden';
    //   this.toInput.name = 'Price[to]';
    //   this.fromInput.value = 0;
    //   this.contentEl.appendChild(this.toInput);
    // }
    //
    // const startArr = [
    //   parseInt(this.fromInput.value, 10),
    //   parseInt(this.toInput.value, 10) || rangeArr.max,
    // ];
    //
    // this.rangeEl = this.contentEl.querySelector('.input-range');
    // noUiSlider.create(this.rangeEl, {
    //   start: startArr,
    //   step: 1,
    //   connect: true,
    //   tooltips: true,
    //   range: rangeArr,
    //   format: {
    //     to(value) {
    //       return `${Math.floor(value)} ₽`;
    //     },
    //     from(value) {
    //       return value.replace(/[^0-9]/g, '');
    //     },
    //   },
    //   cssPrefix: 'input-range',
    //   cssClasses: {
    //     target: '',
    //     base: '__base',
    //     origin: '__origin',
    //     handle: '__handle',
    //     handleLower: '__handle-lower',
    //     handleUpper: '__handle-upper',
    //     touchArea: '__touch-area',
    //     horizontal: '_horizontal',
    //     vertical: '_vertical',
    //     background: '__background',
    //     connect: '__connect',
    //     connects: '__connects',
    //     ltr: '_ltr',
    //     rtl: '_rtl',
    //     draggable: '_draggable',
    //     drag: '_state-drag',
    //     tap: '_state-tap',
    //     active: '__active',
    //     tooltip: '__tooltip',
    //
    //     // Шкала
    //     pips: '__pips',
    //     pipsHorizontal: '__pips_horizontal',
    //     pipsVertical: '__pips_vertical',
    //
    //     // Деления на шкале
    //     marker: '__marker',
    //     markerHorizontal: '__marker_horizontal',
    //     markerVertical: '__marker_vertical',
    //     markerNormal: '__marker_normal',
    //     markerLarge: '__marker_large',
    //     markerSub: '__marker_sub',
    //
    //     // Значения на шкале
    //     value: '__value',
    //     valueHorizontal: '__value_horizontal',
    //     valueVertical: '__value_vertical',
    //     valueNormal: '__value_normal',
    //     valueLarge: '__value_large',
    //     valueSub: '__value_sub',
    //   },
    // });
    //
    //
    // this.rangeEl.noUiSlider.on('set', this.onChange, 100);
  }

  static parseSettings(multifilterEl) {
    const container = multifilterEl.querySelector('.multifilter-price');
    const option = {
      label: multifilterEl.querySelector('.multifilter__value').textContent,
      type: 'range',
      name: 'Price',
      data: {
        priceFrom: parseInt(container.querySelector('input[name="Price[from]"]').value, 10) || 0,
        priceTo: parseInt(container.querySelector('input[name="Price[to]"]').value, 10) || 0,
        priceMin: parseInt(container.querySelector('.multifilter-price__num .multifilter-price__start').textContent.replace(/[^0-9]/g, ''), 10) || 0,
        priceMax: parseInt(container.querySelector('.multifilter-price__num .multifilter-price__end').textContent.replace(/[^0-9]/g, ''), 10) || 9999,
      },
    };

    if (option.data.priceFrom < option.data.priceMin) {
      option.data.priceFrom = option.data.priceMin;
    }

    if (option.data.priceTo > option.data.priceMax || option.data.priceTo === 0) {
      option.data.priceTo = option.data.priceMax;
    }

    store.commit('filters/setFilter', option);

    return option;
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

export class CheckboxFilter {
  constructor(el, callback, filterSettings = null) {
    this.el = el;
    this.callback = callback;
    this.filterSettings = filterSettings || CheckboxFilter.parseSettings(this.el);

    // if (this.el.querySelector('.multifilter__label')) {
    //   this.options.replaceTitle = true;
    // }

    this.vm = new Vue({
      el: this.el,
      store,
      // data: {
      //   name: this.filterSettings.name,
      // },
      computed: mapState('filters', {
        filter: state => state.filters[this.filterSettings.name],
      }),
      template: '<MultifilterContainer :filter="filter"/>',
      components: { MultifilterContainer },
    });
  }

  static parseSettings(multifilterEl) {
    if (!multifilterEl) return {};

    const option = {
      type: 'checkbox',
      replaceTitle: false,
      label: multifilterEl.querySelector('.multifilter__value').textContent,
      labelDisabled: 'Выберите тип товара',
      labelEmpty: 'Не выбрано',
      disabled: multifilterEl.disabled,
      name: multifilterEl.dataset.filterName || '',
      parent: multifilterEl.dataset.filterParent || '',
      selectedItems: [], // Не используется, но пусть будет
      data: [],
    };

    if (multifilterEl.querySelector('.multifilter__label')) {
      option.replaceTitle = true;
      option.label = multifilterEl.querySelector('.multifilter__label').textContent;
    }

    [].forEach.call(multifilterEl.querySelectorAll('input[type="checkbox"]'), (input) => {
      if (!option.name) {
        option.name = input.name.replace('[]', '');
      }

      if (input.checked) {
        option.selectedItems.push(input.value);
      }

      option.data.push({
        label: input.parentElement.querySelector('.multifilter-checkbox__label').textContent,
        name: input.name || '',
        value: input.value,
        checked: input.checked, // true, если активен
        available: !input.disabled, // true, если в наличии
        parent: input.dataset.parentId, // Наследование значения (если есть)
        hidden: input.style.display === 'none' && !input.checked, // Визуально скрыт, показать, если вдруг будет активен
        filtered: false,
      });
    });

    if (!option.name) {
      option.name = option.label;
    }

    store.commit('filters/setFilter', option);

    return option;
  }
}

export class RadioFilter extends Multifilter {
  constructor(el, callback) {
    super(el, callback, { type: 'radio' });

    this.el.addEventListener('change', this.onChange);

    this.defaultInput = this.el.querySelector('input[checked]');
    super.updateTitle(this.defaultInput.nextElementSibling.textContent);

    if (this.inputList.length > 9) {
      super.initScrollbar();
    }
  }

  onChange = (event) => {
    super.updateTitle(event.target.nextElementSibling.textContent);
    this.callback(this);
  };

  reset() {
    super.reset();
    // this.defaultInput.checked = true;
    super.updateTitle(this.defaultInput.nextElementSibling.textContent);
    // this.callback(this);
  }
}
