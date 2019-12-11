<template>
  <dropdown class="multifilter">
    <template slot="btn">
      <span class="multifilter__value">{{filter.label}}</span>
    </template>
    
    <template slot="body">
      <MultifilterPrice :slider="filter.data" @change="onChange" @update="onUpdate"/>
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
      onUpdate(values) {
        // console.log(e);
        this.filter.data.minRange = values[0];
        this.filter.data.maxRange = values[1];
      },
    }
  }
</script>

<style scoped>

</style>
