<template>
  <dropdown class="multifilter">
    <template slot="btn">
      <span class="multifilter__value">{{filter.label}}</span>
    </template>
    
    <template slot="body">
      <MultifilterPrice :slider="filter.data" @change="onChange"/>
    </template>
  </dropdown>
</template>

<script>
  import MultifilterPrice from './MultifilterPrice.vue';
  import Dropdown from './../Dropdown.vue';
  
  export default {
    name: "FilterPrice",
    components: { Dropdown, MultifilterPrice },
    props: {
      filter: Object,
    },
    methods: {
      onChange() {
        this.$store.dispatch('filters/onChange');
      },
    }
  }
</script>

<style scoped>

</style>
