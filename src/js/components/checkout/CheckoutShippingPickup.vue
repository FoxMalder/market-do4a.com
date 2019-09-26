<template>
  <ul class="o-shipping-pickup">
    <li class="o-shipping-pickup__item"
        v-for="storeId in groupStore">
      <input name="OLOLOLOLO" type="radio" id="'pickup-' + storeId" :value="storeId" v-model="currentStoreId">
      <label :for="'pickup-' + storeId">
        <div class="o-shipping-pickup__address">{{ storeId }} Id магазина</div>
        <div class="o-shipping-pickup__control">
          <a href="#" class="o-shipping-pickup__link">Показать на карте</a>
        </div>
      </label>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "CheckoutShippingPickup",
    data() {
      return {
        currentStoreId: 0,
      }
    },
    computed: {
      groupStore() {
        return this.$store.state.checkout.groupStore
      }
    }
    // methods: {
    //   setStore(storeId) {
    //     this.currentStoreId = storeId;
    //   }
    // }
  }
</script>

<style scoped>

</style>
