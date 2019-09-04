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
      <ProductList/>
    </div>
    
    <div class="order__promocode">
      <Promocode/>
    </div>
    
    <div class="order-amount" v-if="total">
      <div class="order-amount__sale" v-show="total.DISCOUNT_PRICE > 0">
        <div class="order-amount__key">ваша Скидка</div>
        <div class="order-amount__value">{{total.DISCOUNT_PRICE | formatPrice}}</div>
      </div>
      <div class="order-amount__sum">
        <div class="order-amount__key">Итого к оплате</div>
        <div class="order-amount__value">{{total.ORDER_TOTAL_PRICE | formatPrice}}</div>
      </div>
      
      <!--              <div class="order-amount__row">-->
      <!--                <div class="order-amount__key">-->
      <!--                  <span class="order-number-badge order-number-badge_dark">Отправление 1</span> Банковской картой онлайн-->
      <!--                </div>-->
      <!--                <div class="order-amount__value">5 000 <span class="currency">₽</span></div>-->
      <!--              </div>-->
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
        total: 'total',
        checkoutStatus: 'checkoutStatus'
      }),
      ...mapGetters('checkout', {
        nextStepButton: 'nextStepButton',
      }),
      ...mapGetters({
        products: 'cart/availableProducts',
      }),
      // visibleProducts() {
      //   return this.products.filter(prod => prod.canBuy);
      // },
      productCountText() {
        return this.products.length + ' ' + Utils.declOfNum(this.products.length, ['товар', 'товара', 'товаров'])
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
