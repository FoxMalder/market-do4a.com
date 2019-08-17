<template>
  <div class="order-item">
    <!--    <div class="order-item__header" :class="{'order-item__header_dark': i % 2 !== 0}" v-if="orderLength > 1">-->
    <!--      <div class="order-item__title">Доставка с центрального склада</div>-->
    <!--      <div class="order-number-badge" :class="{'order-number-badge_dark': i % 2 !== 0}">Отправление {{i}}</div>-->
    <!--    </div>-->
    <div class="order-item__product-list">
      <ProductItem
              v-for="item in products"
              :key="item.ID"
              :item="item"/>
    </div>
    <div class="order-item__amount">
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
      <div class="order-item__row" v-if="total.DISCOUNT_PRICE > 0">
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
        total: state => state.result.TOTAL
      }),
      ...mapGetters('cart', {
        products: 'products',
      }),
      productCountText() {
        return this.products.length + ' ' + Utils.declOfNum(this.products.length, ['товар', 'товара', 'товаров'])
      }
    }
  }
</script>
