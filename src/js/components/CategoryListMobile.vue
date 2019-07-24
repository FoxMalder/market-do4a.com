<template>
  <div>
    <div class="catalog-control__menu catalog-control__menu_white">
      <div class="category-list-mob">
        <div class="category-list-mob__item"
                @click="onReset(filters.Type)"
                :class="{active: !filters.Type.selected.length}">
          <div class="category-list-mob__label">Все</div>
        </div>
        <div class="category-list-mob__item category-list-mob__item_parent"
                v-for="type in filters.Type.data"
                @click="onClick(type, 'Type')"
                :class="{active: type.checked}">
          <div class="category-list-mob__label">{{type.title}}</div>
        </div>
      </div>
    </div>
    <div class="catalog-control__menu catalog-control__menu_white" v-if="!filters.Category.disabled">
      <div class="category-list-mob">
        <div class="category-list-mob__item"
                @click="onReset(filters.Category)"
                :class="{active: !filters.Category.selected.length}">
          <div class="category-list-mob__label">Все категории</div>
        </div>
        <div class="category-list-mob__item"
                v-for="category in filters.Category.data"
                v-if="!category.hidden"
                @click="onClick(category, 'Category')"
                :class="{active: category.checked}">
          <div class="category-list-mob__label">{{category.title}}</div>
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
      ...mapState({
        filters: state => state.filters
      }),
    },
    methods: {
      ...mapActions({
        onReset: 'checkboxReset',
        // onChange: 'checkboxChange'
      }),

      onClick(item, name) {
        this.filters[name].data.forEach((item) => {
          item.checked = false;
        });
        if (name === 'Type') {
          this.$store.commit('CLEAR_PRODUCT_TYPE');
          this.filters.Category.data.forEach((item) => {
            item.hidden = true;
          });
        } else if (name === 'Category') {
          this.$store.commit('CLEAR_PRODUCT_CATEGORY')
        }

        item.checked = true;
        this.$store.dispatch('checkboxChange', {
          name: name,
          target: item,
        });

        // this.$root.$emit('filter:change');
      },
    }

  }
</script>

<!--<style scoped>-->

<!--</style>-->
