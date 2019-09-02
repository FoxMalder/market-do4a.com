<template>
  <div class="order-item">
    <!--    <div class="order-item__header" :class="{'order-item__header_dark': i % 2 !== 0}" v-if="orderLength > 1">-->
    <!--      <div class="order-item__title">Доставка с центрального склада</div>-->
    <!--      <div class="order-number-badge" :class="{'order-number-badge_dark': i % 2 !== 0}">Отправление {{i}}</div>-->
    <!--    </div>-->
    <transition-group
      class="order-item__list"
      tag="div"
      name="slide">
      <div class="order-item__product"
           v-for="item in products"
           :key="item.basketItemId">
        <ProductItem :item="item"/>
      </div>
    </transition-group>
    <div class="order-item__amount"
         v-if="total">
      <div class="order-item__row">
        <div class="order-item__key">Товары</div>
        <div class="order-item__value">
          <small class="gray">{{productCountText}}</small>
          <b>{{total.ORDER_PRICE | formatPrice}}</b>
        </div>
      </div>
      <div class="order-item__row">
        <div class="order-item__key">Доставка</div>
        <div class="order-item__value">
          <b>{{total.DELIVERY_PRICE > 0 ? total.DELIVERY_PRICE : 'Бесплатно'}}</b>
        </div>
      </div>
      <div class="order-item__row"
           v-if="total.DISCOUNT_PRICE > 0">
        <div class="order-item__key">Скидка</div>
        <div class="order-item__value"><b class="red">{{total.DISCOUNT_PRICE | formatPrice}}</b>
        </div>
      </div>
      <!--      <div class="order-item__row">-->
      <!--        <div class="order-item__key">Оплата</div>-->
      <!--        <div class="order-item__value">-->
      <!--          <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i> <i class="icon icon-mir"></i> Картой-->
      <!--          онлайн-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import Utils from '../../utils/utils';
  import ProductItem from './ProductItem.vue';


  export default {
    name: "ProductList",
    components: {
      ProductItem,
    },
    computed: {
      ...mapState('checkout', {
        total: 'total',
      }),
      // ...mapState({
      //   products: state => state.cart.items,
      // }),
      ...mapGetters({
        products: 'cart/availableProducts',
      }),
      // visibleProducts() {
      //   return this.products.filter(prod => prod.canBuy);
      // },
      productCountText() {
        return this.products.length + ' ' + Utils.declOfNum(this.products.length, ['товар', 'товара', 'товаров'])
      }
    }
  }
</script>

<style>
  .slide-enter,
  .slide-leave-to {
    height: 0;
  }
</style>
