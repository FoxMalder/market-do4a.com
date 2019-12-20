<template>
  <div class="catalog">
    <div class="catalog__container">
      <div v-if="filtredItems.length === 0">
        Не найдено
      </div>
      <keep-alive v-else>
        <BrandsNameList
          v-if="selectedTab === 'list'"
          :key="'list'"
          :brands="filtredItems"
        />
        <BrandsCardList
          v-else
          :key="'cards'"
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
  data() {
    return {
      searchValue: '',
      selectedTab: 'cards',
      filterValue: [],
    };
  },
  computed: {
    brands() {
      return window.brands;
    },
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
  created() {
    this.$root.$on('filter:change', (items) => {
      this.filterValue = items;
    });

    this.$root.$on('filter:tab', (tab) => {
      this.selectedTab = tab;
    });

    this.$root.$on('search:change', (text) => {
      this.searchValue = text;
    });
  },
};
</script>
