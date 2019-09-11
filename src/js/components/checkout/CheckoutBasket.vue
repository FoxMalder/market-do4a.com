<template>
  <div class="order">
    <h3 class="order__title">В заказе {{productCountText}}</h3>
    
    <div class="order__header">
      <button class="order__btn-clear"
              type="button"
              @click.prevent="clearCart"
      ><i class="icon icon-delete"></i> Очистить корзину</button>
    </div>
    
    <div class="order__list">
      <ProductList
        v-for="order in orderList"
        :key="order.storeId"
        :order="order"
        :multiple="orderList.length > 1"/>
    </div>
    
    <div class="order__promocode">
      <Promocode/>
    </div>
    
    <div class="order-amount" v-if="total">
      <div class="order-amount__sale" v-show="totalDiscount > 0">
        <div class="order-amount__key">ваша Скидка</div>
        <div class="order-amount__value">{{ totalDiscount | formatPrice }}</div>
      </div>
      <div class="order-amount__sum">
        <div class="order-amount__key">Итого к оплате</div>
        <div class="order-amount__value">{{ total | formatPrice }}</div>
      </div>
      
      <template v-if="orderList.length > 1">
        <div class="order-amount__row"
             v-for="order in orderList"
             :key="order.storeId">
          <div class="order-amount__key">
            <span class="order-number-badge order-number-badge_dark">Отправление {{ order.index }}</span>
            {{ order.payment.name }}
          </div>
          <div class="order-amount__value">{{ order.total.ORDER_TOTAL_PRICE | formatPrice }}</div>
        </div>
      </template>
    </div>
    
    <div class="order__footer">
      
      <button class="order__btn-checkout btn btn-red btn-skew"
              type="submit"
              disabled
              v-if="checkoutStatus === 'loading'"
      ><span class="spinner-border spinner-border-sm" role="status"></span></button>
      
      <button class="order__btn-checkout btn btn-red btn-skew"
              type="submit"
              v-else
              @click.prevent="setStep(nextStepButton)"
      >{{nextStepButton.text}}</button>
      
      <div class="order__footer-note">
        Нажимая на кнопку, вы подтверждаете согласие на обработку
        <a href="#"> персональных данных</a>
        и
        <a href="#"> политику конфиденциальности</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import Utils from '../../utils/utils';

  import ProductList from './ProductList.vue';
  import Promocode from './Promocode.vue';


  export default {
    name: "CheckoutBasket",
    components: {
      ProductList,
      Promocode,
    },
    computed: {
      ...mapState('checkout', {
        // orderList(state) {
        //
        // },
        orderList: state => state.orderList.map(order => {
          return {
            ...order,
            payment: order.paymentMethods.find(item => item.id === order.paymentId),
            delivery: order.deliveryMethods.find(item => item.id === order.deliveryId),
          }
        }),
        // total: 'total',
        checkoutStatus: 'checkoutStatus'
      }),
      ...mapGetters('checkout', {
        nextStepButton: 'nextStepButton',
        productTotalCount: 'productTotalCount',
      }),
      // ...mapGetters({
      //   products: 'cart/availableProducts',
      // }),
      total() {
        return this.orderList.reduce((accumulator, order) => accumulator + order.total.ORDER_TOTAL_PRICE, 0);
      },
      totalDiscount() {
        return this.orderList.reduce((accumulator, order) => accumulator + order.total.DISCOUNT_PRICE, 0);
      },
      // visibleProducts() {
      //   return this.products.filter(prod => prod.canBuy);
      // },
      productCountText() {
        return this.productTotalCount + ' ' + Utils.declOfNum(this.productTotalCount, ['товар', 'товара', 'товаров'])
      }
    },
    methods: {
      ...mapActions({
        clearCart: 'cart/clearCart',
        setStep: 'checkout/setStep',
      }),
    }
  }
</script>

<style scoped>

</style>
