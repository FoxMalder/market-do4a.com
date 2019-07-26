<template>
  <div class="multifilter-checkbox-list">
    <div class="multifilter-search" v-if="search && items.length > 9">
      <input class="multifilter-search__input" type="search" placeholder="Поиск" autocomplete="off" v-model="searchQuery">
    </div>
    <multifilter-checkbox
            v-for="item in availableItems" :key="item.value"
            v-show="!item.hidden && !item.filtered"
            v-model="item.checked"
            :name="item.name"
            :disabled="false"
            @change="$emit('change', item)">
      {{item.label}}
    </multifilter-checkbox>
    <div class="multifilter-delimiter" v-if="visibleNotAvailableCount">
      <span class="multifilter-delimiter__text">Нет в наличии</span>
    </div>
    <multifilter-checkbox
            v-for="item in notAvailableItems" :key="item.value"
            v-show="!item.hidden && !item.filtered"
            v-model="item.checked"
            :name="item.name"
            :disabled="!item.checked"
            @change="$emit('change', item)">
      {{item.label}}
    </multifilter-checkbox>
  </div>
</template>

<script>
  // import { mapGetters, mapState, mapActions } from 'vuex'
  import MultifilterCheckbox from './MultifilterCheckbox.vue';

  export default {
    name: "MultifilterCheckboxList",
    props: {
      items: {
        type: Array,
        required: true,
      },
      search: {
        type: Boolean,
        default: true,
      }
    },
    components: {
      MultifilterCheckbox,
    },
    data() {
      return {
        searchQuery: '',
      }
    },
    watch: {
      searchQuery() {
        if (this.searchQuery) {
          this.items.forEach((item) => {
            item.filtered = item.label.toLowerCase().indexOf(this.searchQuery.toLowerCase()) === -1;
          })
        } else {
          this.items.forEach((item) => {
            item.filtered = false;
          })
        }
      },
    },
    // methods: {
    //   onChange(item) {
    //     this.$store.dispatch('filters/filterChange');
    //   },
    // },
    computed: {
      availableItems() {
        return this.items.filter(item => item.available)
      },
      notAvailableItems() {
        return this.items.filter(item => !item.available)
      },
      visibleNotAvailableCount() {
        return this.items.filter(item => !item.available && !item.filtered).length
      },
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
