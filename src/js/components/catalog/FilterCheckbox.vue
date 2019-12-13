<template>
  <dropdown
    class="multifilter"
    :scrolled="true"
    :class="{ active: checkedItems.length }"
    :disabled="items.length === 0"
  >
    <template slot="btn">
      <span
        v-if="filter.replaceTitle"
        class="multifilter__label"
      >{{ filter.label }}</span>
      <span
        v-if="filter.replaceTitle"
        class="multifilter__value"
      >{{ checkedTitle }}</span>
      <span
        v-else
        class="multifilter__value"
      >{{ filter.label }}</span>
      <span
        v-if="checkedItems.length"
        class="multifilter__total"
      >{{ checkedItems.length }}</span>
    </template>

    <button
      v-if="checkedItems.length"
      class="multifilter__btn-clear"
      type="reset"
      @click.prevent="onReset(filter)"
    >
      Сбросить
    </button>

    <template slot="body">
      <MultifilterCheckboxList
        :items="items"
        @change="onChange"
      />
    </template>
  </dropdown>
</template>

<script>
// import { mapGetters, mapState, mapActions } from 'vuex'
// import simplebar from 'simplebar-vue';
// import 'simplebar/dist/simplebar.min.css';
import Dropdown from '../Dropdown.vue';
import MultifilterCheckboxList from './MultifilterCheckboxList.vue';


export default {
  name: 'Multifilter',
  components: {
    MultifilterCheckboxList,
    Dropdown,
  },
  props: {
    filter: {
      type: Object,
      required: true,
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
        return this.filter.labelDisabled;
      }
      if (this.checkedItems.length) {
        return this.checkedItems.map(item => item.label).join(', ');
      }
      return this.filter.labelEmpty;
    },

    checkedItems() {
      return this.items.filter(item => item.checked);
    },
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
};
</script>

<!--<style scoped>-->

<!--</style>-->
