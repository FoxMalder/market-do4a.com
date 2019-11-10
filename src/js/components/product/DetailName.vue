<template>
  <div class="p-detail-header">
    <h1 class="p-detail-header__name">{{ activePacking.name }}</h1>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "DetailName",
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

<!--<style scoped>-->
<!--</style>-->
