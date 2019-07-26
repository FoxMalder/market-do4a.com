<template>
  <dropdown class="multifilter" :scrolled="true" :class="{active: checkedItems.length}" :disabled="items.length === 0">
    <template slot="btn">
      <span class="multifilter__label" v-if="filter.replaceTitle">{{filter.label}}</span>
      <span class="multifilter__value" v-if="filter.replaceTitle">{{checkedTitle}}</span>
      <span class="multifilter__value" v-else>{{filter.label}}</span>
      <span class="multifilter__total" v-if="checkedItems.length">{{checkedItems.length}}</span>
    </template>
    
    <button class="multifilter__btn-clear" type="reset"
            v-if="checkedItems.length"
            @click.prevent="onReset(filter)">
      Сбросить
    </button>
    
    <template slot="body">
      <MultifilterCheckboxList :items="items" @change="onChange"/>
    </template>
  </dropdown>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  // import simplebar from 'simplebar-vue';
  // import 'simplebar/dist/simplebar.min.css';
  import Dropdown from './Dropdown.vue';
  import MultifilterCheckboxList from './MultifilterCheckboxList.vue';

  export default {
    name: "Multifilter",
    props: ['filter'],
    components: {
      MultifilterCheckboxList,
      Dropdown
    },
    methods: {
      // ...mapActions({
      //   onReset: 'checkboxReset',
      //   // onChange: 'checkboxChange'
      // }),
      // reset() {
      //   this.filter.data.forEach((item) => {
      //     item.checked = false;
      //   });
      // },
      onReset(filter) {
        // this.reset();
        // this.$store.dispatch('filters/filterReset');
        this.$store.dispatch('filters/filterReset', { container: 'filters', name: filter.name, type: filter.type });
        this.$store.dispatch('filters/onChange');
      },
      onChange() {
        this.$store.dispatch('filters/onChange');
      },
    },
    computed: {
      ...mapState({
        items(state) {
          if (this.filter.parent) {
            const checkedParentItemIds = state.filters.filters[this.filter.parent].data.reduce((array, item) => {
              if (item.checked) {
                array.push(item.value);
              }
              return array;
            }, []);
            // TODO: Добавить полифилл для Array.prototype.includes()
            return this.filter.data.filter(item => checkedParentItemIds.includes(item.parent))
          }
          return this.filter.data;
        },
      }),

      checkedTitle() {
        if (this.items.length === 0) {
          return this.filter.labelDisabled
        }
        if (this.checkedItems.length) {
          return this.checkedItems.map(item => item.label).join(', ');
        }
        return this.filter.labelEmpty
      },

      checkedItems() {
        return this.items.filter(item => item.checked);
      },
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
