<template>
  <div class="catalog-control__mobile">
    <CatalogFilterMobileHorizontal
      v-if="filters.type"
      :filter="filters.type"
    />
    <CatalogFilterMobileHorizontal
      v-if="filters.category"
      :filter="filters.category"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import CatalogFilterMobileHorizontal from './CatalogFilterMobileHorizontal.vue';


export default {
  name: 'CategoryListMobile',
  components: {
    CatalogFilterMobileHorizontal,
  },
  computed: {
    ...mapState('filters', {
      filters: (state) => state.filters,
    }),
  },
};
</script>

<style scoped>

</style>
