<template>
  <div class="order-item">
    <div class="order-item__header order-item__header_local" v-if="order.isLocaleStore">
      <div class="order-item__title">Магазин рядом, доставка 1 день</div>
      <div class="order-number-badge">Отправление {{ order.index }}</div>
    </div>
    <div class="order-item__header order-item__header_central" v-else>
      <div class="order-item__title">{{ shipingPeriod }}</div>
      <div class="order-number-badge">Отправление {{ order.index }}</div>
    </div>
    
    <!--    <div v-if="multiple"-->
    <!--         class="order-item__header"-->
    <!--         :class="{'order-item__header_dark': order.index % 2 !== 0}">-->
    <!--      <div class="order-item__title">-->
    <!--        {{ order.isLocaleStore ? 'Получить в магазине или курьером' : 'Доставка с центрального склада' }}-->
    <!--      </div>-->
    <!--      <div class="order-number-badge">Отправление {{ order.index }}</div>-->
    <!--    </div>-->
    
    <transition-group
      class="order-item__list"
      tag="div"
      name="slide">
      <div class="order-item__product"
           v-for="item in order.productList"
           :key="item.basketItemId">
        <ProductItem :item="item"/>
      </div>
    </transition-group>
    
    <div class="order-item__amount"
         v-if="order.total">
      <div class="order-item__row">
        <div class="order-item__key">Товары</div>
        <div class="order-item__value">
          <small class="gray">{{ order.quantityText }}</small>
          <b>{{ order.total.ORDER_PRICE_FORMATED }}</b>
        </div>
      </div>
      <div class="order-item__row"
           v-show="order.deliveryItem">
        <div class="order-item__key">Доставка</div>
        <div class="order-item__value">
          <b v-if="order.total.DELIVERY_PRICE > 0">{{ order.total.DELIVERY_PRICE_FORMATED }}</b>
          <b v-else>Бесплатно</b>
        </div>
      </div>
      <div class="order-item__row"
           v-show="order.total.DISCOUNT_PRICE > 0">
        <div class="order-item__key">Скидка</div>
        <div class="order-item__value">
          <b class="red">{{ order.total.DISCOUNT_PRICE_FORMATED }}</b>
        </div>
      </div>
      <div class="order-item__row" v-if="multiple && order.paymentItem">
        <div class="order-item__key">Оплата</div>
        <!--        <div class="order-item__value">-->
        <!--          <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i> <i class="icon icon-mir"></i> Картой-->
        <!--          онлайн-->
        <!--        </div>-->
        <div class="order-item__value">{{ order.paymentItem.name }}</div>
      </div>
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
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Object
      }
    },
    computed: {
      ...mapState('checkout', {
        total: 'total',
      }),
      ...mapGetters({
        currentCity: 'currentCity',
      }),
      shipingPeriod() {
        return this.currentCity
          ? `Со склада из СПБ в ${this.currentCity.name}, ${this.currentCity.deliveryCountDays[0]}-${this.currentCity.deliveryCountDays[1]} дней`
          : 'С центрального склада';
      },
    }
  }
</script>
