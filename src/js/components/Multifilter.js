// import SimpleBar from 'simplebar';
import noUiSlider from 'nouislider';

import Vue from 'vue/dist/vue.esm';
import { mapGetters, mapState, mapActions } from 'vuex';
import Dropdown from './Dropdown.vue';
// import MultifilterRadio from './MultifilterRadio.vue';
import MultifilterPrice from './MultifilterPrice.vue';
import MultifilterContainer from './Multifilter.vue';
import store from '../store';


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
  constructor(el, container = 'filters') {
    this.el = el;
    this.container = container;
    this.filterSettings = PriceFilter.parseSettings(this.el);

    store.commit('filters/pushFilterToContainer', { container: this.container, filter: this.filterSettings });

    new Vue({
      store,
      computed: mapState('filters', {
        filter: state => state[this.container][this.filterSettings.name],
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
    }).$mount(this.el);
  }

  static parseSettings(multifilterEl) {
    const container = multifilterEl.querySelector('.multifilter-price');

    const option = {
      label: multifilterEl.querySelector('.multifilter__value').textContent,
      type: 'range',
      name: 'Price',
      data: {
        priceFrom: 0,
        priceTo: 0,
        priceMin: 0,
        priceMax: 10000,
      },
    };

    if (container.querySelector('input[name="Price[from]"]')) {
      option.data.priceFrom = parseInt(container.querySelector('input[name="Price[from]"]').value, 10) || 0;
    }

    if (container.querySelector('input[name="Price[to]"]')) {
      option.data.priceTo = parseInt(container.querySelector('input[name="Price[to]"]').value, 10) || 0;
    }

    if (container.querySelector('.multifilter-price__num .multifilter-price__start')) {
      option.data.priceMin = parseInt(container.querySelector('.multifilter-price__num .multifilter-price__start').textContent.replace(/[^0-9]/g, ''), 10) || 0;
    }

    if (container.querySelector('.multifilter-price__num .multifilter-price__end')) {
      option.data.priceMax = parseInt(container.querySelector('.multifilter-price__num .multifilter-price__end').textContent.replace(/[^0-9]/g, ''), 10) || 10000;
    }

    if (option.data.priceFrom < option.data.priceMin) {
      option.data.priceFrom = option.data.priceMin;
    }

    if (option.data.priceTo > option.data.priceMax || option.data.priceTo === 0) {
      option.data.priceTo = option.data.priceMax;
    }

    return option;
  }
}

export class CheckboxFilter {
  constructor(el, container = 'filters') {
    this.el = el;
    this.container = container;
    this.filterSettings = CheckboxFilter.parseSettings(this.el);
    store.commit('filters/pushFilterToContainer', { container: this.container, filter: this.filterSettings });


    new Vue({
      store,
      computed: mapState('filters', {
        filter: state => state[this.container][this.filterSettings.name],
        // filter: 'filterByName',
      }),
      template: '<MultifilterContainer :filter="filter"/>',
      components: { MultifilterContainer },
      // render: h => h(MultifilterContainer),
    }).$mount(this.el);
  }

  static parseSettings(multifilterEl) {
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

    [].forEach.call(multifilterEl.querySelectorAll('input[type="checkbox"]'), (input, i) => {
      if (!option.name) {
        option.name = input.name.replace('[]', '');
      }

      if (input.checked) {
        option.selectedItems.push(input.value);
      }

      option.data.push({
        label: input.parentElement.querySelector('.multifilter-checkbox__label').textContent,
        id: i,
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

    // store.commit('filters/setFilter', option);

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

export class SelectFilter {
  constructor(el, container = 'sort') {
    this.el = el;
    this.container = container;

    this.filterSettings = SelectFilter.parseSettings(this.el);

    store.commit('filters/pushFilterToContainer', { container: this.container, filter: this.filterSettings });

    new Vue({
      store,
      computed: mapState('filters', {
        filter: state => state[this.container][this.filterSettings.name],
      }),
      template: `
        <dropdown class="multifilter">
          <template slot="btn">
            <span class="multifilter__value">{{filter.label}}</span>
          </template>

          <template slot="body">
            <label class="multifilter-radio" v-for="item in filter.data">
              <input class="multifilter-radio__input" 
                    type="radio" 
                    :name="item.name" 
                    :value="item.value" 
                    v-model="filter.selected" 
                    @change="onChange(item)">
              <span class="multifilter-radio__label">{{item.label}}</span>
            </label>
          </template>
        </dropdown>`,
      methods: {
        onChange(item) {
          this.filter.label = item.label;
          this.$store.dispatch('filters/onChange');
        },
      },
      components: { Dropdown },
    }).$mount(this.el);
  }

  static parseSettings(multifilterEl) {
    const option = {
      type: 'radio',
      label: 'Не выбрано',
      selected: null,
      name: multifilterEl.dataset.filterName || '',
      data: [],
    };

    [].forEach.call(multifilterEl.querySelectorAll('input[type="radio"]'), (input) => {
      if (!option.name) {
        option.name = input.name;
      }

      if (input.checked) {
        option.selected = input.value;
        option.label = input.parentElement.querySelector('.multifilter-radio__label').textContent;
      }

      option.data.push({
        label: input.parentElement.querySelector('.multifilter-radio__label').textContent,
        name: input.name || '',
        value: input.value,
        checked: input.checked,
      });
    });

    if (!option.name) {
      option.name = option.label;
    }

    return option;
  }
}
