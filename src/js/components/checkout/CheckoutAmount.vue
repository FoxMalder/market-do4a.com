<template>
  <div class="order-amount" v-if="total">
    
    <div class="order-amount__sale" v-show="totalDiscount > 0">
      <div class="order-amount__key">Ваша скидка</div>
      <div class="order-amount__value">{{ totalDiscount | formatPrice }}</div>
    </div>
    
    <div class="order-amount__sum">
      <div class="order-amount__key">Итого к оплате</div>
      <div class="order-amount__value">{{ total | formatPrice }}</div>
    </div>
    
    <template v-if="orderList.length > 1">
      <div
        v-for="order in orderList"
        :key="order.storeId"
        class="order-amount__row">
        <div class="order-amount__key">
          <span
            class="order-number-badge"
            :class="{ 'order-number-badge_dark': order.index % 2 === 1 }"
          >Отправление {{ order.index }}</span>
          <span>{{ order.paymentItem ? order.paymentItem.name : 'Способ оплаты не выбран' }}</span>
        </div>
        <div class="order-amount__value">{{ order.total.ORDER_TOTAL_PRICE | formatPrice }}</div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';


  export default {
    name: "CheckoutAmount",
    computed: {
      ...mapGetters('checkout', {
        orderList: 'orderList',
      }),
      total() {
        return this.orderList.reduce((accumulator, order) => accumulator + order.total.ORDER_TOTAL_PRICE, 0);
      },
      totalDiscount() {
        return this.orderList.reduce((accumulator, order) => accumulator + order.total.DISCOUNT_PRICE, 0);
      },
    }
  }
</script>

<style scoped>

</style>
