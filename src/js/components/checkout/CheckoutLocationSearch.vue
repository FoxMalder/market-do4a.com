<template>
  <div class="checkout-location-search"
       tabindex="-1"
       @keydown="keyboardNav"
       v-click-outside="deactivate">
    <div class="checkout-location-search__field">
      <label class="input-field input-field_primary"
             :class="{'input-field_invalid': locationProperty.error}">
        <span class="input-field__label"
              :class="{'input-field__label_active': value !== ''}"
        >{{ locationProperty.title + (locationProperty.required ? '*' : '') }}</span>
        <input class="input-field__input"
               spellcheck="false"
               tabindex="0"
               :value="value"
               @input="onInput"
               @focus="activate"
               @blur="deactivate"
               @keyup.esc="deactivate">
        <transition name="fade-left">
          <div class="input-field__alert" v-if="!isActive && locationProperty.error">{{ locationProperty.error }}</div>
        </transition>
      </label>
    </div>
    <ul ref="dropdownMenu"
        role="listbox"
        class="checkout-location-search__list dropdown-menu"
        :class="{show: isActive}">
      
      <li
        class="checkout-location-search__message"
        v-if="value.length < 2"
      >Начните вводить название...</li>
      
      <li
        class="checkout-location-search__message"
        v-else-if="status === 'loading'"
      ><div class="spinner-border" role="status"></div></li>
      
      <li
        class="checkout-location-search__message"
        v-else-if="error"
      >{{ error }}</li>
      
      <li
        class="checkout-location-search__message"
        v-else-if="searchedItems.length === 0"
      >Не найдено</li>
      
      <template v-else>
        <li v-for="(city, index) in searchedItems"
            role="option"
            tabindex="-1"
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


  // if (!window.BX && top.BX)
  //   window.BX = top.BX;
  //
  // if (typeof window.BX.locationsDeferred == 'undefined') window.BX.locationsDeferred = {};
  // window.BX.locationsDeferred['2'] = function() {
  //
  //   if (typeof window.BX.locationSelectors == 'undefined') window.BX.locationSelectors = {};
  //   window.BX.locationSelectors['2'] =
  //
  //     new BX.Sale.component.location.selector.search({
  //       'scope': 'sls-42622',
  //       'source': '/bitrix/components/bitrix/sale.location.selector.search/get.php',
  //       'query': {
  //         'FILTER': { 'EXCLUDE_ID': 0, 'SITE_ID': 's1' },
  //         'BEHAVIOUR': { 'SEARCH_BY_PRIMARY': '0', 'LANGUAGE_ID': 'ru' }
  //       },
  //       'selectedItem': 2834,
  //       'knownItems': {
  //         '2834': {
  //           'CODE': '0000550426',
  //           'TYPE_ID': '3',
  //           'PATH': [1320, 1276],
  //           'VALUE': 2834,
  //           'DISPLAY': 'Казань'
  //         },
  //         '1276': { 'CODE': '0000028023', 'TYPE_ID': '1', 'PATH': [1276], 'VALUE': 1276, 'DISPLAY': 'Россия' },
  //         '1320': { 'CODE': '0000028070', 'TYPE_ID': '2', 'PATH': [], 'VALUE': 1320, 'DISPLAY': 'Республика Татарстан' }
  //       },
  //       'provideLinkBy': 'code',
  //       'messages': {
  //         'nothingFound': 'К сожалению, ничего не найдено',
  //         'error': 'К сожалению, произошла внутренняя ошибка'
  //       },
  //       'callback': 'submitFormProxy',
  //       'useSpawn': false,
  //       'usePopup': false,
  //       'initializeByGlobalEvent': '',
  //       'globalEventScope': '',
  //       'pathNames': { '1276': 'Россия', '1320': 'Республика Татарстан', '2834': 'Казань' },
  //       'types': {
  //         '1': { 'CODE': 'COUNTRY' },
  //         '4': { 'CODE': 'COUNTRY_DISTRICT' },
  //         '2': { 'CODE': 'REGION' },
  //         '5': { 'CODE': 'SUBREGION' },
  //         '3': { 'CODE': 'CITY' },
  //         '6': { 'CODE': 'VILLAGE' },
  //         '7': { 'CODE': 'STREET' }
  //       }
  //     });
  //
  // };


  export default {
    name: "CheckoutLocationSearch",
    data() {
      return {
        value: '',
        isActive: false,
        selectedIndex: null,
        status: null,
        error: null,
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
        if (this.$store.state.checkout.props[this.locationProperty.code]) {

          const request = {
            select: {
              1: 'CODE',
              2: 'TYPE_ID',
              VALUE: 'ID',
              DISPLAY: 'NAME.NAME',
            },
            additionals: {
              1: 'PATH',
            },
            filter: {
              '=CODE': this.$store.state.checkout.props[this.locationProperty.code],
              '=NAME.LANGUAGE_ID': 'ru',
              '=SITE_ID': param.siteID,
            },
            version: 2,
            PAGE_SIZE: 10,
            PAGE: 0,
          };

          this.status = 'loading';
          
          locationSearch(request)
            .then(({ data = { ITEMS: [] } }) => {
              this.searchedItems = data.ITEMS.map((item) => ({
                code: item.CODE,
                name: item.DISPLAY,
                path: item.PATH.map(pathId => data.ETC.PATH_ITEMS[pathId].DISPLAY),
              }));
              
              if (this.searchedItems.length) {
                this.selectedIndex = 0;
                this.value = [this.searchedItems[0].name, ...this.searchedItems[0].path].join(', ');
                this.locationProperty.error = null;
              }
            })
            .catch((error) => {
              this.value = this.knownCityName[0];
            })
            .finally(() => {
              this.status = null;
            })
          // this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.locationProperty.code, message: null });
        } else {
          this.value = this.knownCityName[0];
        }
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
        knownCityName: 'knownCityName',
        propertyList: 'propertyList',
      }),
      locationProperty() {
        // return this.propertyList.find(item => item.type === 'location')
        return this.propertyList.find(item => item.type === 'location')
      },

      // locationValue() {
      //   return this.propertyList.find(item => item.type === 'location')
      // }
    },
    methods: {
      chooseCity(city) {
        console.log('chooseCity', city);

        this.isActive = false;
        if (city) {
          this.value = [city.name, ...city.path].join(', ');
          // this.locationProperty.value = city.code;
          this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.locationProperty.code, message: city.code });
          this.locationProperty.error = null;
        } else {
          // this.locationProperty.value = null;
          this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.locationProperty.code, message: null });
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
        if (this.value.length < 2) {
          return;
        }

        this.selectedIndex = 0;
        this.$refs.dropdownMenu.scrollTop = 0;

        this.status = 'loading';

        const request = {
          select: {
            1: 'CODE',
            2: 'TYPE_ID',
            VALUE: 'ID',
            DISPLAY: 'NAME.NAME',
          },
          additionals: {
            1: 'PATH',
          },
          filter: {
            '=PHRASE': this.value,
            // '=CODE': this.$store.state.checkout.props[this.locationProperty.code],
            '=NAME.LANGUAGE_ID': 'ru',
            '=SITE_ID': param.siteID,
          },
          version: 2,
          PAGE_SIZE: 25,
          PAGE: 0,
        };

        locationSearch(request)
          .then(({ data = { ITEMS: [] } }) => {
            this.searchedItems = data.ITEMS.map((item) => ({
              code: item.CODE,
              name: item.DISPLAY,
              path: item.PATH.map(pathId => data.ETC.PATH_ITEMS[pathId].DISPLAY),
            }));
          })
          .catch((error) => {
            this.error = error.response.errors[0];
          })
          .finally(() => {
            this.status = null;
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
        // if (this.locationProperty.required && this.locationProperty.value === null) {
        if (this.locationProperty.required && this.$store.state.checkout.props[this.locationProperty.code] === null) {
          this.locationProperty.error = 'Выберите город из списка';
        }
      },

      onInput(event) {
        this.isActive = true;

        this.value = event.target.value;
        // this.locationProperty.value = null;
        this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.locationProperty.code, message: null });


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

      activate(e) {
        console.log(e);

        if (!this.isActive) {
          this.isActive = true;
        }
      },

      deactivate(e) {
        console.log(e);

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
