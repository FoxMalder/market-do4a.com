<template>
  <dropdown class="multifilter" :scrolled="true" :class="{active: isActive}">
    <template slot="btn">
      <span class="multifilter__label" v-if="filter.replaceTitle">{{filter.label}}</span>
      <span class="multifilter__value" v-if="filter.replaceTitle">{{checkedTitle}}</span>
      <span class="multifilter__value" v-else>{{filter.label}}</span> <span class="multifilter__total" v-if="isActive">{{checkedItems.length}}</span>
    </template>
    
    <button class="multifilter__btn-clear" type="reset"
            v-if="isActive"
            @click.prevent="onReset"
    >Сбросить
    </button>
    
    <template slot="body">
      <div class="multifilter-search" v-if="filter.data.length > 9">
        <input class="multifilter-search__input" type="search" placeholder="Поиск" autocomplete="off" v-model="searchQuery">
      </div>
      <template>
        <multifilter-checkbox
                v-for="item in availableItems" :key="item.title"
                v-show="!item.hidden && !item.filtered"
                v-model="item.checked"
                :name="item.name"
                :disabled="false"
                @change="onChange">
          {{item.title}}
        </multifilter-checkbox>
      </template>
      <div class="multifilter-delimiter" v-if="hasNotAvailableItems">
        <span class="multifilter-delimiter__text">Нет в наличии</span>
      </div>
      <multifilter-checkbox
              v-for="item in notAvailableItems" :key="item.title"
              v-show="!item.hidden && !item.filtered"
              v-model="item.checked"
              :name="item.name"
              :disabled="true">
        {{item.title}}
      </multifilter-checkbox>
    </template>
  </dropdown>
</template>

<script>
  // import simplebar from 'simplebar-vue';
  // import 'simplebar/dist/simplebar.min.css';
  import Dropdown from './Dropdown.vue';
  import MultifilterCheckbox from './MultifilterCheckbox.vue';

  export default {
    name: "MultifilterCheckboxList",
    props: ['filter'],
    components: {
      MultifilterCheckbox,
      // simplebar
      Dropdown

    },
    data() {
      return {
        searchQuery: '',
        // selectedTitle: '',
        // data: {
        //   searchEnabled: true,
        //   name: 'Category[]',
        //   checkboxList: [
        //     {
        //       title: '4 Dimension Nutrition',
        //       value: '1032',
        //       checked: false,
        //       available: false,
        //       hidden: false,
        //       filtered: false,
        //     }, {
        //       title: '25-й час',
        //       value: '1033',
        //       checked: true,
        //       available: false,
        //       hidden: false,
        //       filtered: false,
        //     }, {
        //       title: '2DTrade',
        //       value: '1034',
        //       checked: false,
        //       available: true,
        //       hidden: false,
        //       filtered: false,
        //     }, {
        //       title: '2SN',
        //       value: '1035',
        //       checked: false,
        //       available: false,
        //       hidden: false,
        //       filtered: false,
        //     }
        //   ],
        // }
      }
    },
    mounted() {
      this.$root.$on('filter:reset', this.reset);
    },
    watch: {
      searchQuery: function() {
        if (this.searchQuery) {
          this.filter.data.forEach((item) => {
            // item.filtered = !item.title.startsWith(this.searchQuery);
            item.filtered = item.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) === -1;
          })
        } else {
          this.filter.data.forEach((item) => {
            item.filtered = false;
          })
        }
      },
      // checkboxList: function() {
      //
      // }
    },
    methods: {
      reset() {
        this.filter.data.forEach((checkbox) => {
          checkbox.checked = false;
        });
      },
      onReset() {
        this.reset();
        this.onChange();
      },
      onChange() {
        this.$root.$emit('filter:change');
      }
    },
    computed: {
      isActive() {
        return this.checkedItems.length !== 0;
      },
      // filteredItems() {
      //   if (this.searchQuery) {
      //     return this.data.checkboxList.map((item) => {
      //       item.filtered = item.title.startsWith(this.searchQuery);
      //       return this.searchQuery && item.title.startsWith(this.searchQuery);
      //     })
      //   } else {
      //     return this.data.checkboxList;
      //   }
      // },
      // filterRegExp() {
      //   return new RegExp(`${this.searchQuery}`, 'ig');
      // },
      checkedTitle() {
        if (this.checkedItems.length) {
          return this.checkedItems.map((item) => {
            return item.title
          }).join(', ');
        }
        return 'Не выбрано'
      },
      checkedItems() {
        return this.filter.data.filter((item) => {
          return item.checked
        });
      },
      availableItems() {
        return this.filter.data.filter((item) => {
          return item.available;
        })
      },
      notAvailableItems() {
        return this.filter.data.filter((item) => {
          return !item.available;
        })
      },
      hasNotAvailableItems() {
        return this.notAvailableItems.filter((item) => {
          return !item.filtered;
        }).length;
      },
      // hiddenNotAvailableItems() {
      //   return this.notAvailableItems.filter((item) => {
      //     return !item.available && !item.filtered;
      //   })
      // },
      // availableItems() {
      //   return this.data.checkboxList.filter((item) => {
      //     return item.available;
      //   })
      // }
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
