<template>
  <div class="catalog-control__mobile">
    <template v-if="typeFilter">
      <CatalogFilterMobileHorizontal :filter="typeFilter"/>
    </template>
    <template v-if="categoryFilter">
      <CatalogFilterMobileHorizontal :filter="categoryFilter"/>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import CatalogFilterMobileHorizontal from './CatalogFilterMobileHorizontal.vue';

  export default {
    name: "CategoryListMobile",
    components: {
      CatalogFilterMobileHorizontal
    },
    computed: {
      ...mapState('filters', {
        // filters: state => state.filters,
        typeFilter: state => state.filters['Type'],
        categoryFilter: state => state.filters['Category'],
      }),
      // ...mapGetters('filters', {
      //   checkedItemIdsByName: 'checkedItemIdsByName',
      //   // filters: 'horizontalFilters'
      // })
    },

  }
</script>

<!--<style scoped>-->

<!--</style>-->
