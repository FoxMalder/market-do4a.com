<template>
  <div class="filter">
    <div class="filter__list">
      <template v-for="filter in filters">
        <MultifilterCheckboxList
                v-if="filter.type === 'checkbox'"
                :filter="filter"/>
        
        <dropdown class="multifilter"
                v-else-if="filter.type === 'range'">
          <template slot="btn">
            <span class="multifilter__value">{{filter.label}}</span>
          </template>
          
          <template slot="body">
            <MultifilterPrice :slider="filter.data"/>
          </template>
        </dropdown>
      
      </template>
    </div>
    <button class="filter__btn-reset" type="reset"
      @click.prevent="onReset">Сбросить</button>
  </div>
</template>

<script>
  import Dropdown from './Dropdown.vue';
  import MultifilterPrice from '../components/MultifilterPrice.vue';
  import MultifilterCheckboxList from '../components/MultifilterCheckboxList.vue';

  export default {
    name: "CatalogFilter",
    props: {
      filters: {
        type: Object,
      },
      // onChange: {
      //   type: Function,
      // }
    },
    components: {
      MultifilterCheckboxList,
      MultifilterPrice,
      Dropdown,
    },
    // mounted() {
    //   this.$root.$on('change', () => {
    //     this.onChange();
    //   });
    // },
    methods: {
      onReset() {
        this.$root.$emit('filter:reset');
        
        this.onChange();
      },
      onChange() {
        this.$root.$emit('filter:change');
      }
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
