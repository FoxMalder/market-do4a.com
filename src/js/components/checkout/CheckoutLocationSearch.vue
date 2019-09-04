<template>
  <div class="checkout-location-search"
       @keydown.esc="reset"
       @keydown="keyboardNav"
       v-click-outside="clickedOutside">
    <div class="checkout-location-search__field">
      <div class="form-group">
        <div class="input-field input-field_primary"
             :class="{'input-field_invalid': item.error}">
          <label class="input-field__label"
                 :class="{'input-field__label_active': value !== ''}"
                 for="property-location"
          >{{ item.title }}{{ item.required && '*' }}</label>
          <input class="input-field__input"
                 id="property-location"
                 type="text"
                 autocomplete="off"
                 :value="value"
                 @input="onInput"
                 @focus="onFocus"
                 :required="item.required">
          <transition name="fade-left">
            <div class="input-field__alert" v-if="item.error">{{item.error}}</div>
          </transition>
        </div>
      </div>
    </div>
    <div ref="list"
         class="checkout-location-search__list dropdown-menu"
         :class="{show: open}">
      <div v-if="status === 'loading'" class="checkout-location-search__item">Загрузка...</div>
      <div v-else-if="status === 'notfind'" class="checkout-location-search__item">Не найдено</div>
      <template v-else>
        <div v-for="(city, index) in searchedItems"
             class="checkout-location-search__item"
             :class="{active: selectedIndex === index}"
             @click="chooseCity(city)"
             @mousemove="selectedIndex = index"
             v-html="getHTML(city)"></div>
      </template>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce';
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { locationSearch } from '../../api';
  import Utils from '../../utils/utils';
  import { param } from '../../store/modules/checkout';
  
  export default {
    name: "CheckoutLocationSearch",
    directives: {
      // Click-outside by BosNaufal: https://github.com/BosNaufal/vue-click-outside
      'click-outside': {
        bind(el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name;
            let warn = `[Vue-click-outside:] provided expression ${binding.expression} is not a function, but has to be`;
            if (compName) {
              warn += `Found in component ${compName}`;
            }
            console.warn(warn);
          }
          // Define Handler and cache it on the element
          const { bubble } = binding.modifiers;
          const handler = (e) => {
            // Fall back to composedPath if e.path is undefined
            const path = e.path
              || (e.composedPath ? e.composedPath() : false)
              || getParents(e.target);
            if (bubble || (path.length && !el.contains(path[0]) && el !== path[0])) {
              binding.value(e);
            }
          };
          el.__vueClickOutside__ = handler;
          // add Event Listeners
          document.addEventListener('click', handler);
        },
        unbind(el) {
          // Remove Event Listeners
          document.removeEventListener('click', el.__vueClickOutside__);
          el.__vueClickOutside__ = null;
        },
      },
    },
    props: {
      item: Object,
    },
    data() {
      return {
        value: '',
        open: false,
        selectedIndex: null,
        status: null,
        searchedItems: [],
      }
    },
    // watch: {
    //   value() {
    //   }
    // },
    created() {
      this.debouncedGetLocation = debounce(this.getLocation, 300);

      if (this.isKnownCity) {
        this.value = this.knownCityName[0];
      }
    },
    computed: {
      ...mapState('checkout', {
        isKnownCity: 'isKnownCity',
        knownCityName: 'knownCityName'
      })
    },
    methods: {
      chooseCity(city) {
        this.open = false;
        if (city) {
          this.value = [city.name, ...city.path].join(', ');
          this.item.value = city.code;
          this.item.error = null;
        } else {
          this.item.value = null;
        }
      },
      // getFullName(city) {
      //
      // },
      getHTML(city) {
        return Utils.wrapSubstring([city.name, ...city.path].join(', '), this.value);
      },
      getLocation() {
        if (this.value === '') {
          return;
        }

        this.status = 'loading';

        const request = {
          page: 0,
          pageSize: 50,
          search: this.value,
          siteID: param.siteID,
        };

        locationSearch(request)
          .then(({ data = { ITEMS: [] } }) => {
            this.status = null;
            if (data.ITEMS.length === 0) {
              this.status = 'notfind';
            }
            this.searchedItems = data.ITEMS.map((item) => ({
              code: item.CODE,
              name: item.DISPLAY,
              path: item.PATH.map(pathId => data.ETC.PATH_ITEMS[pathId].DISPLAY),
            }));
            if (!this.selectedIndex) {
              this.selectedIndex = 0;
            }
          })
          .catch((error) => {
            this.status = 'error';
          })
      },
      onInput(event) {
        this.value = event.target.value;
        this.item.value = null;

        if (this.value === '') {
          this.open = false;
        } else {
          this.open = true;
          this.status = 'loading';
          this.debouncedGetLocation();
        }
      },
      onFocus() {
        console.log('onFocus');
        if (this.value !== '') {
          this.open = true;
        }
      },
      onBlur() {
        this.open = false;

        if (this.item.required && this.item.value === null) {
          this.item.error = 'Выберите город';
        }
      },
      clickedOutside() {
        this.open = false;

        if (this.item.required && this.item.value === null) {
          this.item.error = 'Выберите город';
        }
      },
      keyboardNav(e) {
        if (e.keyCode === 40) {
          // down arrow
          e.preventDefault();
          this.open = true;
          if (this.selectedIndex === null) {
            this.selectedIndex = 0;
          } else {
            this.selectedIndex = Math.min(this.searchedItems.length - 1, this.selectedIndex + 1);
          }
          // const selEle = this.$refs.list.children[this.selectedIndex];
          // if (selEle.offsetTop + selEle.clientHeight
          //   > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
          //   this.$refs.list.scrollTop = selEle.offsetTop
          //     - this.$refs.list.clientHeight
          //     + selEle.clientHeight;
          // }
        } else if (e.keyCode === 38) {
          // up arrow
          e.preventDefault();
          this.open = true;
          if (this.selectedIndex === null) {
            this.selectedIndex = this.searchedItems.length - 1;
          } else {
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
          }
          // const selEle = this.$refs.list.children[this.selectedIndex];
          // if (selEle.offsetTop < this.$refs.list.scrollTop) {
          //   this.$refs.list.scrollTop = selEle.offsetTop;
          // }
        } else if (e.keyCode === 13) {
          // enter key
          e.preventDefault();
          this.onEnter();
        }
      },
      reset() {
        this.open = false;

        if (this.item.required && this.item.value === null) {
          this.item.error = 'Выберите город';
        }
      },
      onEnter() {
        this.open = false;

        if (this.selectedIndex !== null) {
          this.chooseCity(this.searchedItems[this.selectedIndex]);
        }

        if (this.item.required && this.item.value === null) {
          this.item.error = 'Выберите город';
        }
      },
    }
  }
</script>

<style scoped>

</style>
