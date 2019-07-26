<template>
  <div class="catalog-control__mobile">
    <div class="catalog-control__menu catalog-control__menu_white"
            v-for="filter in filters"
            v-if="filter.name === 'Type' || filter.name === 'Category'"
            v-show="items(filter).length > 0">
      <div class="category-list-mob">
        <div class="category-list-mob__item"
                @click="onReset(filter)"
                :class="{active: checkedItems(filter).length === 0}">
          <div class="category-list-mob__label" v-if="filter.name === 'Category'">Все категории</div>
          <div class="category-list-mob__label" v-else>Все</div>
        </div>
        <div class="category-list-mob__item"
                v-for="item in items(filter)"
                @click="onClick(filter, item)"
                :class="{active: item.checked, 'category-list-mob__item_parent': !filter.parent}">
          <div class="category-list-mob__label">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "CategoryListMobile",
    computed: {
      ...mapState('filters', {
        filters: state => state.filters,
      }),
      ...mapGetters('filters', [
        'checkedItemIdsByName'
      ])
    },
    // watch: {
    //   checkedItemIdsByName() {
    //
    //   }
    // },
    methods: {
      items(filter) {
        if (filter.parent) {
          // const checkedParentItemIds = this.$store.state.filters[filter.parent].data.reduce((array, item) => {
          //   item.checked && array.push(item.value);
          //   return array;
          // }, []);
          
          const checkedParentItemIds = this.checkedItemIdsByName(filter.parent);
          
          // TODO: Добавить полифилл для Array.prototype.includes()
          return filter.data.filter(item => checkedParentItemIds.includes(item.parent) ? true : item.checked = false);
        }
        return filter.data;
      },
      checkedItems(filter) {
        return this.items(filter).filter(item => item.checked);
      },
      reset(filter) {
        this.$store.dispatch('filters/filterReset', { container: 'filters', name: filter.name, type: filter.type });
      },
      onReset(filter) {
        this.reset(filter);
        this.$store.dispatch('filters/onChange');
      },
      onClick(filter, item) {
        this.reset(filter);
        item.checked = true;
        this.$store.dispatch('filters/onChange');
      },
    }

  }
</script>

<!--<style scoped>-->

<!--</style>-->
