<template>
  <ul class="o-shipping-pickup">
    <li class="o-shipping-pickup__item"
        v-for="storeId in groupStore">
      <input class="o-shipping-pickup__input"
             name="OLOLOLOLO"
             type="radio"
             :id="'pickup-' + storeId"
             v-model="currentStoreId"
             :value="storeId">
      <label :for="'pickup-' + storeId" class="o-shipping-pickup__label">
        <span class="o-shipping-pickup__address">{{ storeId }} Id магазина</span>
        <span class="o-shipping-pickup__control">
          <a href="#" class="o-shipping-pickup__link">Показать на карте</a>
        </span>
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
