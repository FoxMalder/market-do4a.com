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
  // import { mapGetters, mapState, mapActions } from 'vuex'
  // import simplebar from 'simplebar-vue';
  // import 'simplebar/dist/simplebar.min.css';
  import Dropdown from './../Dropdown.vue';
  import MultifilterCheckboxList from './MultifilterCheckboxList.vue';


  export default {
    name: "Multifilter",
    props: {
      filter: Object,
    },
    components: {
      MultifilterCheckboxList,
      Dropdown
    },
    mounted() {
      this.$root.$on('filter:reset', this.reset);
    },
    methods: {
      reset() {
        this.filter.data.forEach((item) => {
          item.checked = false;
        });
      },
      onReset(filter) {
        this.reset();
        // this.$store.dispatch('filters/filterReset', { container: 'filters', name: filter.name, type: filter.type });
        this.$store.dispatch('filters/onChange');
      },
      onChange() {
        this.$store.dispatch('filters/onChange');
      },
    },
    computed: {
      items() {
        if (this.filter.parent) {
          // TODO: Как-то поправить эту хуйню с обновлениием наследника при изменении родителя
          const checkedParentItemIds = this.$store.getters['filters/checkedItemIdsByName'](this.filter.parent);

          // return this.filter.data.filter(item => checkedParentItemIds.includes(item.parent))
          const t = this.filter.data.reduce((arr, item) => {
            // TODO: Добавить полифилл для Array.prototype.includes()
            if (checkedParentItemIds.includes(item.parent)) {
              arr.push(item);
            } else {
              item.checked = false;
            }
            return arr;
          }, []);
          // Срабатывает только тогда, когда изменился родитель
          // Если меняется родитель, то действие вызывается до того, как обновился наследник и данные неверные.
          // Поэтому вызываем еще раз
          // Это все говна кусок, поэтому такой костыль
          this.$store.dispatch('filters/onChange');
          return t;
        }
        return this.filter.data;
      },
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
    },
  }
</script>

<!--<style scoped>-->

<!--</style>-->
