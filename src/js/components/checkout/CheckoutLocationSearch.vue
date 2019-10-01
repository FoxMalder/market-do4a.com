<template>
  <div class="checkout-location-search"
       @keydown="keyboardNav"
       v-click-outside="deactivate">
    <div class="checkout-location-search__field">
      <label class="input-field input-field_primary"
             :class="{'input-field_invalid': item.error}">
        <span class="input-field__label"
              :class="{'input-field__label_active': value !== ''}"
        >{{ item.title + (item.required ? '*' : '') }}</span>
        <input class="input-field__input"
               type="text"
               autocomplete="off"
               :value="value"
               @input="onInput"
               @focus.prevent="activate"
               @blur.prevent="deactivate"
               @keyup.esc="deactivate">
        <transition name="fade-left">
          <div class="input-field__alert" v-if="!isActive && item.error">{{ item.error }}</div>
        </transition>
      </label>
    </div>
    <ul ref="dropdownMenu"
        role="listbox"
        class="checkout-location-search__list dropdown-menu"
        :class="{show: isActive}">
      
      <li
        class="checkout-location-search__message"
        v-if="status === 'error'"
      >Ошибка</li>
  
      <li
        class="checkout-location-search__message"
        v-else-if="status === 'notfind'"
      >Не найдено</li>
      
      <li
        class="checkout-location-search__message"
        v-else-if="value === '' || searchedItems.length === 0"
      >Начните вводить название...</li>
      
      <li
        class="checkout-location-search__message"
        v-else-if="searchedItems.length === 0 && status === 'loading'"
      ><div class="spinner-border" role="status"></div></li>
      
      <template v-else>
        <li v-for="(city, index) in searchedItems"
            role="option"
            class="checkout-location-search__item"
            :class="{ active: selectedIndex === index }"
            @mouseover="selectedIndex = index"
            @mousedown.prevent.stop="chooseCity(city)"
            v-html="getHTML(city)"
        ></li>
      </template>
    </ul>
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
    props: {
      item: Object,
    },
    data() {
      return {
        value: '',
        isActive: false,
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
    // watch: {
    //   selectedIndex() {
    //     this.maybeAdjustScroll();
    //   }
    // },
    computed: {
      ...mapState('checkout', {
        isKnownCity: 'isKnownCity',
        knownCityName: 'knownCityName'
      })
    },
    methods: {
      chooseCity(city) {
        console.log('chooseCity', city);

        this.isActive = false;
        if (city) {
          this.value = [city.name, ...city.path].join(', ');
          this.item.value = city.code;
          this.item.error = null;
        } else {
          this.item.value = null;
        }
        this.$store.dispatch('checkout/refreshOrderAjax');
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

        this.selectedIndex = 0;
        this.$refs.dropdownMenu.scrollTop = 0;

        this.status = 'loading';

        const request = {
          page: 0,
          pageSize: 25,
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
          })
          .catch((error) => {
            this.status = 'error';
          })
      },

      keyboardNav(e) {

        switch (e.keyCode) {
          case 13:
            // enter.prevent
            e.preventDefault();
            this.onEnter();
            break;
          case 38:
            // up.prevent
            e.preventDefault();
            this.onKeyArrowUp();
            break;
          case 40:
            // down.prevent
            e.preventDefault();
            this.onKeyArrowDown();
            break;
        }
      },

      onKeyArrowDown() {
        this.isActive = true;

        if (this.selectedIndex === null) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = Math.min(this.searchedItems.length - 1, this.selectedIndex + 1);
        }

        const selEle = this.$refs.dropdownMenu.children[this.selectedIndex];
        if (selEle.offsetTop + selEle.clientHeight
          > this.$refs.dropdownMenu.scrollTop + this.$refs.dropdownMenu.clientHeight) {
          this.$refs.dropdownMenu.scrollTop = selEle.offsetTop
            - this.$refs.dropdownMenu.clientHeight
            + selEle.clientHeight;
        }
      },

      onKeyArrowUp() {
        this.isActive = true;

        if (this.selectedIndex === null) {
          this.selectedIndex = this.searchedItems.length - 1;
        } else {
          this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        }

        const selEle = this.$refs.dropdownMenu.children[this.selectedIndex];
        if (selEle.offsetTop < this.$refs.dropdownMenu.scrollTop) {
          this.$refs.dropdownMenu.scrollTop = selEle.offsetTop;
        }
      },

      validate() {
        if (this.item.required && this.item.value === null) {
          this.item.error = 'Выберите город из списка';
        }
      },

      onInput(event) {
        this.value = event.target.value;
        this.item.value = null;


        if (this.value !== '') {
          this.status = 'loading';
          this.debouncedGetLocation();
        }
      },

      onEnter() {
        this.isActive = false;

        if (this.selectedIndex !== null) {
          this.chooseCity(this.searchedItems[this.selectedIndex]);
        }

        this.validate();
      },

      activate() {
        if (!this.isActive) {
          this.isActive = true;
        }
      },

      deactivate() {
        if (this.isActive) {
          this.isActive = false;
          this.validate();
        }
      },
    }
  }
</script>

<style scoped>

</style>
