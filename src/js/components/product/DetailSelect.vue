<template>
  <div class="p-control-options">
    <div class="p-control-options__wrapper">
      <div class="p-control-options__weight" v-if="packing.length > 1">
        <DetailSelectPacking/>
      </div>
      <div class="p-control-options__type">
        <DetailSelectOffer/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  
  import DetailSelectPacking from './DetailSelectPacking.vue';
  import DetailSelectOffer from './DetailSelectOffer.vue';

  export default {
    name: "ControlSelect",
    components: {
      DetailSelectPacking,
      DetailSelectOffer
    },
    computed: {
      ...mapState('product', {
        packing: state => state.packing
      }),
    },
  }
</script>

<style scoped>

</style>
