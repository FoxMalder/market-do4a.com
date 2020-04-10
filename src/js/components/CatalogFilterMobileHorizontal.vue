<template>
  <div class="catalog-control__menu catalog-control__menu_white" v-show="items.length > 0">
    <div class="category-list-mob">
      <div class="category-list-mob__item"
              :class="{active: checkedItems.length === 0}"
              @click="onReset">
        <div class="category-list-mob__label">{{filter.name === 'Category' ? 'Все категории' : 'Все'}}</div>
      </div>
      <div class="category-list-mob__item"
              v-for="item in items"
              :class="{active: item.checked, 'category-list-mob__item_parent': !filter.parent}"
              @click="onClick(item)">
        <div class="category-list-mob__label">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "CatalogFilterMobileHorizontal",
    props: {
      filter: {
        type: Object,
      },
    },
    computed: {
      ...mapState('filters', {
        filters: (state) => state.filters,
        sort: (state) => state.sort,
      }),

      items() {
        if (this.filter.parent) {
          // TODO: Как-то поправить эту хуйню с обновлениием наследника при изменении родителя, см. Multifilter.vue
          // const checkedParentItemIds = this.$store.getters['filters/checkedItemIdsByName'](this.filter.parent);


          const parent = (typeof this.filter.parent === 'string')
            ? this.filters[this.filter.parent]
            : this.filter.parent;

          const checkedParentItemIds = parent.data.filter(item => item.checked).map(item => item.value);

          return this.filter.data.filter(item => checkedParentItemIds.includes(item.parent));
        }
        return this.filter.data;
      },
      checkedItems() {
        return this.items.filter(item => item.checked);
      },
    },
    methods: {
      reset(filter) {
        this.filter.data.forEach((item) => {
          item.checked = false;
        });
        // this.$store.dispatch('filters/filterReset', { container: 'filters', name: filter.name, type: filter.type });
      },
      onReset() {
        this.reset(this.filter);

        this.$emit('change');
        this.$store.dispatch('filters/onChange');
      },
      onClick(item) {
        this.reset(this.filter);
        item.checked = true;

        this.$emit('change');
        this.$store.dispatch('filters/onChange');
      },
    }
  }
</script>

<style scoped>

</style>
