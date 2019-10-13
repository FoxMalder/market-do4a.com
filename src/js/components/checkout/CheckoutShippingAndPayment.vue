<template>
  <div id="order-delivery" class="order-sap">
    <CheckoutAlert v-if="multiple"/>
    
    <div class="order-shiping" v-for="order in orderList">
      <template v-if="multiple">
        <div class="order-shiping__header">
          <div class="order-shiping__name">Отправление {{ order.index }}</div>
          <button
            class="order-shiping__btn-delete"
            type="button"
            @click="removeOrder(order)">
            <i class="icon icon-delete"></i>
            {{ 'Удалить' + (breakpoint === 'xl' ? ' отправление' : '') }}
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
               @click="selectShipping({ id: item.id, order })">
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
            
            <template v-if="item.category !== 'pickup' && breakpoint !== 'xl'">
              <div class="order-option__subtitle">Адрес доставки</div>
              <CheckoutAddress :category="item.category"/>
  
              <div class="n-form-group" v-for="prop in getPropsByDeliveryId(item.id)">
                <div class="n-form-group__field">
                  <InputField :prop="prop"/>
                </div>
                <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>
              </div>
            </template>
  
            <!-- Выбор пункта самовывоза СДЭК -->
            <CheckoutShippingSDEK v-if="item.category === 'sdek.pickup'"/>
  
            <!-- Выбор магазина для самовывоза -->
            <CheckoutShippingPickup v-if="item.category === 'pickup'" :order="order"/>
            
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
               @click="selectPayment({ id: item.id, order })">
            <div class="order-option__row-top">
              <div class="order-option__name">{{ item.name }}</div>
            </div>
            <div class="order-option__row-bottom">
              <div class="order-option__description" v-html="item.description"></div>
              <div v-if="!item.isCash">
                <i class="icon icon-visa"></i>
                <i class="icon icon-mastercard"></i>
                <i class="icon icon-mir"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="order-sap__amount">
      <CheckoutAmount/>
    </div>
    
    <div class="order-sap__footer">
      <slot></slot>
      <!--      <button-->
      <!--        class="btn btn-red btn-skew btn-block"-->
      <!--        type="button"-->
      <!--        @click.prevent="nextStep"-->
      <!--      >-->
      <!--        Оформить заказ-->
      <!--        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3431 0.928881L19.7071 7.29284C20.0976 7.68337 20.0976 8.31653 19.7071 8.70706L13.3431 15.071C12.9526 15.4615 12.3195 15.4615 11.9289 15.071C11.5384 14.6805 11.5384 14.0473 11.9289 13.6568L16.5858 8.99995L-7.31201e-07 8.99995L-5.56355e-07 6.99995L16.5858 6.99995L11.9289 2.34309C11.5384 1.95257 11.5384 1.31941 11.9289 0.928881C12.3195 0.538356 12.9526 0.538356 13.3431 0.928881Z" fill="currentColor"/>-->
      <!--        </svg>-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { SET_SHIPPING_METHOD, SET_PAYMENT_METHOD, REMOVE_ORDER } from './../../store/modules/checkout';
  import CheckoutAlert from './CheckoutAlert.vue';
  import CheckoutAmount from './CheckoutAmount.vue';
  import CheckoutAddress from './CheckoutAddress.vue';
  import CheckoutShippingSDEK from './CheckoutShippingSDEK.vue';
  import CheckoutShippingPickup from './CheckoutShippingPickup.vue';
  import InputField from './../InputField.vue';


  export default {
    name: 'CheckoutShippingAndPayment',
    components: {
      InputField,
      CheckoutAlert,
      CheckoutAmount,
      CheckoutAddress,
      CheckoutShippingSDEK,
      CheckoutShippingPickup,
    },
    props: {
      breakpoint: {
        type: String,
      }
    },
    computed: {
      ...mapState('checkout', {
        // orderList: 'orderList',
        // selectedShippingId: 'selectedShippingMethodId',
        // selectedPaymentId: 'selectedPaymentMethodId',
        // paymentMethods: 'paymentMethods',
        errors: 'errors',
        propertyList: 'propertyList',
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

      getPropsByDeliveryId(deliveryId) {
        return this.propertyList.filter(prop => prop.propsGroupId !== 2 && prop.relationDelivery.find(id => id === deliveryId))
      },

      nextStep() {
        console.log('Next step');
      }
    }
  }
</script>
