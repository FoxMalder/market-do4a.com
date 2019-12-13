<template>
  <div class="filter">
    <div class="filter__list">
      <template v-for="filter in filters">
        <FilterCheckbox
          v-if="filter.type === 'checkbox'"
          :filter="filter"/>
        <FilterSelect
          v-else-if="filter.type === 'radio'"
          :filter="filter"/>
        <FilterPrice
          v-else-if="filter.type === 'range'"
          :filter="filter"/>
      </template>
    </div>
    <button
      class="filter__btn-reset"
      v-show="canReset"
      type="reset"
      @click.prevent="onReset">Сбросить</button>
  </div>
</template>

<script>
  // import Dropdown from './Dropdown.vue';
  // import MultifilterPrice from './catalog/MultifilterPrice.vue';
  // import MultifilterCheckboxList from './catalog/MultifilterCheckboxList.vue';


  import FilterCheckbox from './catalog/FilterCheckbox.vue';
  import FilterSelect from './catalog/FilterSelect.vue';
  import FilterPrice from './catalog/FilterPrice.vue';

  import { mapGetters, mapState, mapActions } from 'vuex';


  export default {
    name: "CatalogFilter",
    components: {
      FilterCheckbox,
      FilterSelect,
      FilterPrice,
    },
    // mounted() {
    //   this.$root.$on('change', () => {
    //     this.onChange();
    //   });
    // },
    computed: {
      ...mapState('filters', {
        filters: state => state.filters,
      }),

      /**
       * Показывать ли кнопку "Сбросить"
       * @returns {boolean}
       */
      canReset() {
        return !!Object.values(this.filters).find(item => {
          if (item.type === 'checkbox') {
            return item.data.find(c => c.checked);
          } else if (item.type === 'range') {
            return item.data.minRange || item.data.maxRange
          }
        })
      }
    },
    methods: {
      onReset() {
        this.$root.$emit('filter:reset');
        this.$store.dispatch('filters/onChange');
        // this.onChange();
      },
      // onChange() {
      //   this.$root.$emit('filter:change');
      // }
    }
  }
</script>

<style scoped>

</style>
