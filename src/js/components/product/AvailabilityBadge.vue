<template>
  <div class="p-detail__subtitle">
    <span class="p-detail__message" v-show="!activeOffer.count && activeOffer.count_remote">Доставка с центрального склада</span>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  
  export default {
    name: "AvailabilityBadge",

    computed: {
      ...mapGetters('product', [
        'activeOffer',
      ]),
    }
  }
</script>
