<template>
  <dropdown class="multifilter">
    <template slot="btn">
      <span class="multifilter__value">{{filter.label}}</span>
    </template>
    
    <template slot="body">
      <label class="multifilter-radio" v-for="item in filter.data">
        <input class="multifilter-radio__input"
               type="radio"
               :name="item.name"
               :value="item.value"
               v-model="filter.selected"
               @change="onChange(item)">
        <span class="multifilter-radio__label">{{item.label}}</span>
      </label>
    </template>
  </dropdown>
</template>

<script>
  import Dropdown from './../Dropdown.vue';
  
  export default {
    name: "FilterSelect",
    components: { Dropdown },
    props: {
      filter: Object,
    },
    methods: {
      onClick() {
        $(this.$el).dropdown('hide');
      },
      onChange(item) {
        this.filter.label = item.label;
        this.$store.dispatch('filters/onChange');
      },
    },
  }
</script>

<style scoped>

</style>
