<template>
  <div class="order-item">
<!--    <div class="order-item__header" :class="{'order-item__header_dark': i % 2 !== 0}" v-if="orderLength > 1">-->
<!--      <div class="order-item__title">Доставка с центрального склада</div>-->
<!--      <div class="order-number-badge" :class="{'order-number-badge_dark': i % 2 !== 0}">Отправление {{i}}</div>-->
<!--    </div>-->
    <div class="order-item__product-list">
      <CartProductItem
              v-for="item in rows"
              :key="item.id"
              :item="item.data"
              @remove="$emit('remove-product', item.id)"/>
    </div>
    <div class="order-item__amount">
      <div class="order-item__row">
        <div class="order-item__key">Товары</div>
        <div class="order-item__value">
          <small class="gray">{{getProductLengthFormated}}</small>
          <b>{{total.ORDER_PRICE}} <span class="currency">₽</span></b></div>
      </div>
      <div class="order-item__row">
        <div class="order-item__key">Доставка</div>
        <div class="order-item__value" v-if="total.DELIVERY_PRICE > 0">
          <b>{{total.DELIVERY_PRICE}} <span class="currency">₽</span></b>
        </div>
        <div class="order-item__value" v-else><b>Бесплатно</b></div>
      </div>
      <div class="order-item__row" v-if="total.DISCOUNT_PRICE > 0">
        <div class="order-item__key">Скидка</div>
        <div class="order-item__value"><b class="red">{{total.DISCOUNT_PRICE}} <span class="currency">₽</span></b>
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
  import Utils from '../utils/utils';
  import CartProductItem from './CartProductItem.vue';

  // console.log(Utils.declOfNum(3, ['товар', 'товара', 'товаров']));

  export default {
    name: "CartProductList",
    data() {
      return {
        orderLength: 1,
      }
    },
    props: {
      rows: Object,
      total: Object,
    },
    components: {
      CartProductItem,
    },
    computed: {
      getProductLength: function() {
        return Object.keys(this.rows).length
      },
      getProductLengthFormated: function() {
        return this.getProductLength + ' ' + Utils.declOfNum(this.getProductLength, ['товар', 'товара', 'товаров'])
      }
    }
  }
</script>
