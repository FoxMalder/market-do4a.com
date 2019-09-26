<template>
  <ul class="o-shipping-pickup">
    <li class="o-shipping-pickup__item"
        v-for="store in groupStore">
      <input class="o-shipping-pickup__input"
             name="storeId"
             type="radio"
             :id="'pickup-' + store.id"
             @change="setStore(store)"
             :checked="store.id === order.storeId"
             :value="store.id">
      <label :for="'pickup-' + store.id" class="o-shipping-pickup__label">
        <span class="o-shipping-pickup__address">{{ store.name }} ({{ store.id }})</span>
        <a href="#" class="o-shipping-pickup__link" @click="showOnMap(store)">Показать на карте (Нет)</a>
      </label>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { SET_STORE } from './../../store/modules/checkout';


  export default {
    name: "CheckoutShippingPickup",
    props: {
      order: {
        type: Object,
        required: true,
      }
    },
    computed: {
      ...mapGetters({
        getStoreById: 'getStoreById',
      }),
      groupStore() {
        return this.$store.state.checkout.groupStore.map(storeId => this.getStoreById(storeId)).filter(item => item);
      }
    },
    methods: {
      setStore(store) {
        console.log('Установлен магазин', store);
        this.$store.commit(`checkout/${SET_STORE}`, { storeId: store.id, order: this.order })
      },
      showOnMap(store) {
        alert('Допустим, открылась карта на ' + store.name);
      }
    }
  }
</script>

<style scoped>

</style>
