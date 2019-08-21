<template>
  <div class="p-detail-header">
    <h1 class="p-detail-header__name">{{activePacking.name}}</h1>
    <div class="p-detail-header__note">
      <span v-show="!activeOffer.count && activeOffer.count_remote">Доставка с центрального склада</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  
  export default {
    name: "DetailHeader",
    computed: {
      // ...mapState('product', {
      //   name: state => state.name,
      // }),
      ...mapGetters('product', [
        'activeOffer',
        'activePacking'
      ]),
    }
  }
</script>

<style scoped>

</style>
