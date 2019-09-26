<template>
  <ul class="o-shipping-pickup">
    <li class="o-shipping-pickup__item"
        v-for="storeId in order.groupStore">
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
    props: {
      order: {
        type: Object,
      }
    },
    data() {
      return {
        currentStoreId: 0,
      }
    },
    // methods: {
    //   setStore(storeId) {
    //     this.currentStoreId = storeId;
    //   }
    // }
  }
</script>

<style scoped>

</style>
