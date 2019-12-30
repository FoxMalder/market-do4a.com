<template>
  <div class="catalog">
    <div class="catalog__container">
      <div v-if="filtredItems.length === 0">
        Не найдено
      </div>
      <keep-alive v-else>
        <BrandsCardList
          v-if="view === 'cards'"
          key="cards"
          :brands="filtredItems"
        />
        <BrandsNameList
          v-else
          key="list"
          :brands="filtredItems"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import BrandsNameList from './BrandsNameList.vue';
import BrandsCardList from './BrandsCardList.vue';


export default {
  name: 'Brands',
  components: {
    BrandsCardList,
    BrandsNameList,
  },
  props: {
    brands: {
      type: Array,
      default: () => [],
    },
    filterValue: {
      type: Array,
      default: () => [],
    },
    searchValue: {
      type: String,
      default: '',
    },
    view: {
      type: String,
      default: 'cards',
    },
  },
  data() {
    return {
      // searchValue: '',
      // selectedTab: 'cards',
      // filterValue: [],
    };
  },
  computed: {
    searchItems() {
      if (this.searchValue === '') {
        return this.brands;
      }

      return this.brands.filter(brand => brand.name.toLowerCase().indexOf(this.searchValue) !== -1);
    },
    filtredItems() {
      if (this.filterValue.length === 0) {
        return this.searchItems;
      }
      // return this.searchItems.filter(brand => this.filterValue.every(id => brand.sections.includes(id)));
      return this.searchItems.filter(brand => this.filterValue.every(ids => (
        ids.length === 0 || ids.some(id => brand.sections.includes(id))
      )));
    },
  },
  // created() {
  //   this.$root.$on('update:filters', (items) => {
  //     this.filterValue = items;
  //   });
  //
  //   this.$root.$on('update:tab', (tab) => {
  //     this.selectedTab = tab;
  //   });
  //
  //   this.$root.$on('update:search', (text) => {
  //     this.searchValue = text;
  //   });
  // },
};
</script>
