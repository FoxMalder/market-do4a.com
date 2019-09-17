<template>
  <div id="order-delivery">
    <CheckoutAlert v-if="multiple"/>
    <div class="order-shiping" v-for="order in orderList">
      <template v-if="multiple">
        <div class="order-shiping__header">
          <div class="order-shiping__name">Отправление {{ order.index }}</div>
          <button class="order-shiping__btn-delete"
                  type="button"
                  @click="removeOrder(order)">
            <i class="icon icon-delete"></i>
            Удалить отправление
          </button>
        </div>
        <div class="order-shiping__quantity">{{ order.quantityText }}</div>
        <div class="order-shiping__list">
          <div class="order-mini-product"
               v-for="product in order.productList"
               :key="product.basketItemId">
            <div class="order-mini-product__photo">
              <img class="order-mini-product__img"
                   :src="product.picture"
                   :srcset="product.picture2x + ' 2x'"
                   :alt="product.name">
            </div>
            <div class="order-mini-product__caption">{{ `${product.quantity} ${product.measureName || 'шт'}` }}</div>
          </div>
        </div>
      </template>
      
      <div class="order-shiping__shipping-type">
        
        <template v-if="errors.DELIVERY && errors.DELIVERY.length">
          <div class="order-shiping__error"
               v-for="error in errors.DELIVERY">
            {{ error }}
          </div>
        </template>
        
        <h3 class="order-shiping__title">Способ получения</h3>
        <div class="order-option"
             v-for="item in order.deliveryMethods"
             :key="item.id"
             :class="{ active: item.id === order.deliveryId }">
          <!--          <input class="order-option__input"-->
          <!--                 type="radio"-->
          <!--                 name="DELIVERY_ID"-->
          <!--                 :id="'DELIVERY_' + item.id"-->
          <!--                 :value="item.id"-->
          <!--                 :checked="item.id === order.deliveryId"-->
          <!--                 @change="selectShipping({ id: item.id, storeId: order.storeId })">-->
          <!--          <input class="order-option__input"-->
          <!--                 type="radio"-->
          <!--                 name="DELIVERY_ID"-->
          <!--                 :id="'DELIVERY_' + item.id"-->
          <!--                 :value="item.id"-->
          <!--                 :checked="item.id === order.deliveryId"-->
          <!--                 v-model="order.deliveryId">-->
          <div class="order-option__header"
               @click="selectShipping({ id: item.id, storeId: order.storeId })">
            <div class="order-option__row-top">
              <img class="order-option__icon" v-if="item.logoUrl" :src="item.logoUrl" :alt="item.name">
              <div class="order-option__name">{{ item.name }}</div>
            </div>
            <div class="order-option__row-bottom">
              <div class="order-option__own-name" v-if="item.ownName">{{ item.ownName }}</div>
              <div class="order-option__price green" v-if="item.price === 0">Бесплатно</div>
              <div class="order-option__price" v-else>{{ item.priceFormated }}</div>
              <div class="order-option__period" v-if="item.period">{{ item.period }}</div>
            </div>
          </div>
          <div class="order-option__body">
            <div class="order-option__subtitle" v-if="item.period">Сроки доставки: {{ item.period }}</div>
            <p class="order-option__description" v-if="item.description" v-html="item.description"></p>
            
            <div class="order-option__place" v-if="item.type === 'P'">
              <div class="order-option__place-address">{пр-т Ленинский 95 корп. 1, 53-Н}</div>
              <div class="order-option__place-info">
                <div>{Вс 10:00-16:00, Сб 10:00-16:00, Пн-Пт 10:00-20:00}</div>
                <a href="#">{+79061946080}</a>
              </div>
              <a href="#" class="order-option__place-link">Показать на карте</a>
            </div>
            
            <div id="moreInfo_sdek-pickup" v-if="item.category === 'sdek.pickup'">
              <div class="order-option__place" v-if="sdek">
                <div class="order-option__place-address">{пр-т Ленинский 95 корп. 1, 53-Н}</div>
                <div class="order-option__place-info">
                  <div>{Вс 10:00-16:00, Сб 10:00-16:00, Пн-Пт 10:00-20:00}</div>
                  <a href="#">{+79061946080}</a>
                </div>
              </div>
              <button class="order-option__button" type="button" @click="selectPickup">Выбрать пункт самовывоза</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="order-shiping__payment-type">
        <template v-if="errors.PAY_SYSTEM && errors.PAY_SYSTEM.length">
          <div class="order-shiping__error"
               v-for="error in errors.PAY_SYSTEM">
            {{error}}
          </div>
        </template>
        
        <h3 class="order-shiping__title">Способ оплаты</h3>
        <div class="order-option"
             v-for="item in order.paymentMethods"
             :key="item.id"
             :class="{ active: item.id === order.paymentId }">
          <!--          <input class="order-option__input"-->
          <!--                 type="radio"-->
          <!--                 name="PAY_SYSTEM_ID"-->
          <!--                 :id="'PAY_SYSTEM_' + item.id"-->
          <!--                 :value="item.id"-->
          <!--                 :checked="item.id === order.paymentId"-->
          <!--                 @change="selectPayment({ id: item.id, storeId: order.storeId })">-->
          <!--          <input class="order-option__input"-->
          <!--                 type="radio"-->
          <!--                 name="PAY_SYSTEM_ID"-->
          <!--                 :id="'PAY_SYSTEM_' + item.id"-->
          <!--                 :value="item.id"-->
          <!--                 v-model="order.paymentId">-->
          <div class="order-option__header"
               @click="selectPayment({ id: item.id, storeId: order.storeId })">
            <div class="order-option__row-top">
              <div class="order-option__name">{{ item.name }}</div>
            </div>
            <div class="order-option__row-bottom">
              <div class="order-option__description" v-html="item.description"></div>
              <template v-if="!item.isCash">
                <i class="icon icon-visa"></i>
                <i class="icon icon-mastercard"></i>
                <i class="icon icon-mir"></i>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { SET_SHIPPING_METHOD, SET_PAYMENT_METHOD, REMOVE_ORDER } from './../../store/modules/checkout';
  import CheckoutAlert from './CheckoutAlert.vue';


  export default {
    name: 'CheckoutShippingAndPayment',
    data() {
      return {
        sdek: false,
      }
    },
    components: {
      CheckoutAlert,
    },
    computed: {
      ...mapState('checkout', {
        // orderList: 'orderList',
        // selectedShippingId: 'selectedShippingMethodId',
        // selectedPaymentId: 'selectedPaymentMethodId',
        // paymentMethods: 'paymentMethods',
        errors: 'errors',
        // currentStore: 'currentStore',
      }),
      ...mapGetters('checkout', {
        orderList: 'orderList',
      }),
      multiple() {
        return this.orderList.length > 1;
      }
    },
    methods: {
      ...mapActions('checkout', {
        selectPayment: SET_PAYMENT_METHOD,
        selectShipping: SET_SHIPPING_METHOD,
        removeOrder: REMOVE_ORDER,
      }),

      selectPickup() {
        IPOLSDEK_pvz.selectPVZ('moreInfo_sdek-pickup', 'PVZ');
        this.sdek = true;
      }
    }
  }
</script>
