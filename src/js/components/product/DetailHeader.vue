<template>
  <div class="p-detail-header">
    <h1 class="p-detail-header__name">{{ activePacking.name }}</h1>
    <div class="p-detail-header__note">
      <transition name="fade">
        <span v-show="!activeOffer.count_city && activeOffer.count_remote">Доставка с центрального склада</span>
      </transition>
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
