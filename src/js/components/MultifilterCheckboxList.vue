<template>
  <dropdown class="multifilter" :scrolled="true" :class="{active: isActive}" :disabled="filter.disabled">
    <template slot="btn">
      <span class="multifilter__label" v-if="filter.replaceTitle">{{filter.label}}</span>
      <span class="multifilter__value" v-if="filter.replaceTitle">{{checkedTitle}}</span>
      <span class="multifilter__value" v-else>{{filter.label}}</span> <span class="multifilter__total" v-if="isActive">{{checkedItems.length}}</span>
    </template>
    
    <button class="multifilter__btn-clear" type="reset"
            v-if="isActive"
            @click.prevent="onReset(filter)"
    >Сбросить
    </button>
    
    <template slot="body">
      <div class="multifilter-search" v-if="filter.data.length > 9">
        <input class="multifilter-search__input" type="search" placeholder="Поиск" autocomplete="off" v-model="searchQuery">
      </div>
      <template>
        <multifilter-checkbox
                v-for="item in availableItems" :key="item.value"
                v-show="!item.hidden && !item.filtered"
                v-model="item.checked"
                :name="item.name"
                :disabled="false"
                @change="onChange(item)">
          {{item.title}}
        </multifilter-checkbox>
      </template>
      <div class="multifilter-delimiter" v-if="visibleNotAvailableCount">
        <span class="multifilter-delimiter__text">Нет в наличии</span>
      </div>
      <multifilter-checkbox
              v-for="item in notAvailableItems" :key="item.value"
              v-show="!item.hidden && !item.filtered"
              v-model="item.checked"
              :name="item.name"
              :disabled="!item.checked"
              @change="onChange(item)">
        {{item.title}}
      </multifilter-checkbox>
    </template>
  </dropdown>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
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
      }
    },
    // mounted() {
    //   this.$root.$on('filter:reset', this.reset);
    // },
    watch: {
      searchQuery() {
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
    },
    methods: {
      ...mapActions({
        onReset: 'checkboxReset',
        // onChange: 'checkboxChange'
      }),
      // reset() {
      //   this.filter.data.forEach((checkbox) => {
      //     checkbox.checked = false;
      //   });
      // },
      // onReset() {
      //   this.reset();
      //   // this.onChange();
      // },
      // onClick(item) {
      //   if (item.) {
      //
      //   }
      // },
      onChange(item) {
        this.$store.dispatch('checkboxChange', {
          name: this.filter.name,
          target: item,
        });

        // this.$root.$emit('filter:change');
      },
    },
    computed: {
      // ...mapGetters({
      //   availableItems: 'availableByName',
      //   checkedItems: 'checkedItemsByName',
      //   notAvailableItems: 'notAvailableByName',
      //   visibleNotAvailableCount: 'notAvailableVisibleByNameCount',
      // }),

      checkedTitle() {
        if (this.isActive) {
          return this.checkedItems.map((item) => {
            return item.title
          }).join(', ');
        }
        return this.filter.defaultLabel
      },
      isActive() {
        return this.checkedItems.length !== 0;
      },
      checkedItems() {
        return this.filter.data.filter(item => item.checked);
      },
      availableItems() {
        return this.filter.data.filter(item => item.available)
      },
      notAvailableItems() {
        return this.filter.data.filter(item => !item.available)
      },
      visibleNotAvailableCount() {
        return this.notAvailableItems.filter((item) => !item.available && !item.filtered).length
      },
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
