<template>
  <div class="multifilter-checkbox-list">
    <div class="multifilter-search" v-if="search && items.length > 9">
      <input class="multifilter-search__input" type="search" placeholder="Поиск" autocomplete="off" v-model="searchQuery">
    </div>
    <MultifilterCheckbox
      v-for="item in availableItems"
      :key="item.input.id"
      v-show="!item.hidden"
      v-model="item.input.checked"
      :name="item.input.name"
      :disabled="false"
      :value="item.input.value"
      @change="$emit('change', item.input)"
    >{{item.input.label}}
    </MultifilterCheckbox>
    
    <div class="multifilter-delimiter" v-if="visibleNotAvailableItems.length">
      <span class="multifilter-delimiter__text">Нет в наличии</span>
    </div>
    
    <MultifilterCheckbox
      v-for="item in notAvailableItems"
      :key="item.input.id"
      v-show="!item.hidden"
      v-model="item.input.checked"
      :name="item.input.name"
      :disabled="!item.input.checked"
      :value="item.input.value"
      @change="$emit('change', item.input)"
    >{{item.input.label}}
    </MultifilterCheckbox>
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
    computed: {
      filtredItems() {
        return this.items.map(item => ({
          // ...item,
          input: item,
          hidden: item.hidden || (this.searchQuery && item.label.toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) === -1),
        }))
      },
      availableItems() {
        return this.filtredItems.filter(item => item.input.available)
      },
      notAvailableItems() {
        return this.filtredItems.filter(item => !item.input.available)
      },
      visibleNotAvailableItems() {
        return this.notAvailableItems.filter(item => !item.hidden)
      },
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
