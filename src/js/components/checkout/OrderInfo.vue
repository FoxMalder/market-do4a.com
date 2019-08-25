<template>
  <div class="order">
    <h3 class="order__title">В заказе {{productCountText}}</h3>
    <div class="order__subtitle">
      <button class="order__btn-clear" type="button" @click.prevent="clearCart">
        <i class="icon icon-delete"></i> <span>Очистить корзину</span>
      </button>
    </div>
    
    <ProductList/>
    <Promocode/>
    
    <div class="order-amount">
      <div class="order-amount__sale">
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
      <button class="order__btn-checkout btn btn-red btn-skew" type="submit">оформить заказ</button>
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
    name: "OrderInfo",
    components: {
      ProductList,
      Promocode,
    },
    computed: {
      ...mapState('checkout', {
        // result: state => state.result,
        total: state => state.result.TOTAL,
      }),
      ...mapGetters('cart', {
        products: 'products',
      }),
      productCountText() {
        return this.products.length + ' ' + Utils.declOfNum(this.products.length, ['товар', 'товара', 'товаров'])
      }
    },
    methods: {
      ...mapActions('cart', {
        clearCart: 'clearCart',
      }),
    }
  }
</script>

<style scoped>

</style>
