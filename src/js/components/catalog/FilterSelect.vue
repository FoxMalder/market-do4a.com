<template>
  <fieldset class="multifilter"
            :class="{ show: visible }"
            v-click-outside="close">
    <button class="multifilter__content multifilter__content_dropdown"
            type="button"
            @click.prevent="toggle">
      <span class="multifilter__value">{{ filter.label }}</span>
    </button>
    
    <div class="dropdown-menu"
         :class="{ show: visible }">
      <label class="multifilter-radio" v-for="item in filter.data">
        <input class="multifilter-radio__input"
               type="radio"
               :name="item.name"
               :value="item.value"
               v-model="filter.selected"
               @change="onChange(item)">
        <span class="multifilter-radio__label">{{ item.label }}</span>
      </label>
    </div>
  </fieldset>
</template>

<script>
  import Dropdown from './../Dropdown.vue';


  export default {
    name: "FilterSelect",
    components: { Dropdown },
    props: {
      filter: Object,
    },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      onChange(item) {
        this.filter.label = item.label;
        this.$store.dispatch('filters/onChange');
        
        this.close();
      },

      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      toggle() {
        this.visible = !this.visible;
      }
    },
  }
</script>

<style scoped>

</style>
