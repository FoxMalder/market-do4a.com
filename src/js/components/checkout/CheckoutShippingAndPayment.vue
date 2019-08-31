<template>
  <div class="order-shiping">
    
    <div class="order-shiping__shipping-type">
      
      <template v-if="errors.DELIVERY && errors.DELIVERY.length">
        <div class="order-shiping__error"
             v-for="error in errors.DELIVERY">
          {{error}}
        </div>
      </template>
      
      <h3 class="order-shiping__title">Способ получения</h3>
      <div class="order-option"
           v-for="item in shippingMethods"
           :key="item.id">
        <input class="order-option__input"
               type="radio"
               name="DELIVERY_ID"
               :id="'DELIVERY_' + item.id"
               :value="item.id"
               :change="item.id === selectedShippingId"
               @change="selectShipping(item)">
        <label class="order-option__header"
               :for="'DELIVERY_' + item.id">
          <img class="order-option__img"
               v-if="item.logoUrl"
               :src="item.logoUrl"
               :alt="item.name">
          <div class="order-option__title">{{item.name}}</div>
          <div class="order-option__info">
            <span class="green"
                  v-if="item.price === 0">Бесплатная доставка</span>
            <span v-else>{{item.price | formatPrice}}</span>
            <span v-if="item.period">{{item.period}}</span>
          </div>
        </label>
        <div class="order-option__body"
             v-if="item.description || item.type === 'P'">
          <ul class="order-option-list"
              v-if="item.type === 'P'">
            <li class="order-option-list__item">
              <div class="order-option-list__title">{{currentStore.NAME}}</div>
              <a class="order-option-list__link"
                 href="#">Показать на карте</a>
            </li>
          </ul>
          <!--                  <div class="order-option__subtitle">Срок доставки 14.05 - 17.05</div>-->
          <p class="order-option__description"
             v-html="item.description"></p>
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
           v-for="item in paymentMethods"
           :key="item.id">
        <input class="order-option__input"
               type="radio"
               name="PAY_SYSTEM_ID"
               :id="'PAY_SYSTEM_' + item.id"
               :value="item.id"
               :checked="item.id === selectedPaymentId"
               @change="selectPayment(item)">
        <label class="order-option__header"
               :for="'PAY_SYSTEM_' + item.id">
          <div class="order-option__title">{{item.name}}</div>
          <div class="order-option__description"
               v-if="item.description">{{item.description}}
          </div>
          <div class="order-option__info"
               v-if="!item.isCash">
            <i class="icon icon-visa"></i><i class="icon icon-mastercard"></i><i class="icon icon-mir"></i>
          </div>
        </label>
      </div>
    </div>
  </div>
  <!--          <div class="order-shiping">-->
  <!--            <div class="order-shiping__header">-->
  <!--              <div class="order-shiping__name">Отправление 1</div>-->
  <!--              <button class="order-shiping__btn-delete" type="button" data-cart="remove-shiping">-->
  <!--                <i class="icon icon-delete"></i> Удалить отправление-->
  <!--              </button>-->
  <!--            </div>-->
  <!--            <div class="order-shiping__quantity">2 товара</div>-->
  <!--            <div class="order-shiping__list"></div>-->
  <!--            <div class="order-shiping__shipping-type">-->
  <!--              <h4>Способ получения</h4>-->
  <!--              <div class="order-option active">-->
  <!--                <div class="order-option__header">-->
  <!--                  <div class="order-option__title">Почтой России</div>-->
  <!--                  <div class="order-option__info"><span class="green">Бесплатная доставка</span><span> Сегодня</span>-->
  <!--                  </div>-->
  <!--                  <div class="order-option__img"><img src="images/logo-rp.svg"></div>-->
  <!--                </div>-->
  <!--                <div class="order-option__body">-->
  <!--                  <div class="order-option__subtitle">Срок доставки 14.05 - 17.05</div>-->
  <!--                  <p class="order-option__text">В удалённые районы доставка от 14 дней. При получении обязательно-->
  <!--                    проверяйте целостность упаковки</p>-->
  <!--                  <div class="order-option__subtitle">Адрес доставки</div>-->
  <!--                  <div class="form-group">-->
  <!--                    <div class="input-field input-field_primary-white"><label class="input-field__label">Населённый-->
  <!--                      пункт</label><input class="input-field__input" type="text" autocomplete="address-level2"></div>-->
  <!--                  </div>-->
  <!--                  <div class="form-group">-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Улица</label><input class="input-field__input" type="text" autocomplete="address-line1">-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                  <div class="form-group form-group_row">-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Дом</label><input class="input-field__input" type="text">-->
  <!--                    </div>-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Квартира/офис</label><input class="input-field__input" type="text" autocomplete="address-line2">-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                  <div class="form-group form-group_row">-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Этаж</label><input class="input-field__input" type="text">-->
  <!--                    </div>-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Подъезд</label><input class="input-field__input" type="text">-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                  <div class="form-group">-->
  <!--                    <div class="input-field input-field_primary-white">-->
  <!--                      <label class="input-field__label">Индекс</label><input class="input-field__input" type="number" autocomplete="postal-code">-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="order-shiping__payment-type">-->
  <!--              <h4>Способ оплаты</h4>-->
  <!--              <div class="order-option active">-->
  <!--                <div class="order-option__header">-->
  <!--                  <div class="order-option__title">Картой онлайн</div>-->
  <!--                  <div class="order-option__info">-->
  <!--                    <i class="icon icon-visa"></i><i class="icon icon-mastercard"></i><i class="icon icon-mir"></i>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="order-shiping">-->
  <!--            <div class="order-shiping__header">-->
  <!--              <div class="order-shiping__name">Отправление 2</div>-->
  <!--            </div>-->
  <!--            <div class="order-shiping__quantity">3 товара</div>-->
  <!--            <div class="order-shiping__list"></div>-->
  <!--            <div class="order-shiping__shipping-type">-->
  <!--              <h4>Способ получения</h4>-->
  <!--              <div class="order-option active">-->
  <!--                <div class="order-option__header">-->
  <!--                  <div class="order-option__title">Самовывоз из магазина</div>-->
  <!--                  <div class="order-option__info"><span class="green">Бесплатная доставка</span><span> Сегодня</span>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--                &lt;!&ndash;.order-option__body&ndash;&gt;-->
  <!--              </div>-->
  <!--              <div class="order-option">-->
  <!--                <div class="order-option__header">-->
  <!--                  <div class="order-option__title">Курьером до двери</div>-->
  <!--                  <div class="order-option__info"><span>300 ₽</span><span> В течение 24 часов</span></div>-->
  <!--                </div>-->
  <!--                &lt;!&ndash;.order-option__body&ndash;&gt;-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="order-shiping__payment-type">-->
  <!--              <h4>Способ оплаты</h4>-->
  <!--              <div class="order-option active">-->
  <!--                <div class="order-option__header">-->
  <!--                  <div class="order-option__title">Оплата при получении</div>-->
  <!--                  <div class="order-option__info">-->
  <!--                    <small>Наличными или картой при самовывозе в магазине</small>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { SET_SHIPPING_METHOD, SET_PAYMENT_METHOD } from './../../store/modules/checkout';

  export default {
    name: 'CheckoutShippingAndPayment',
    computed: {
      ...mapState('checkout', {
        selectedShippingId: 'selectedShippingMethodId',
        selectedPaymentId: 'selectedPaymentMethodId',
        paymentMethods: 'paymentMethods',
        errors: 'errors',
        currentStore: state => state.result.CURRENT_STORE,
      }),
      ...mapGetters('checkout', {
        shippingMethods: 'visibleShippingMethods',
      }),
      // paymentMethod: {
      //   get() {
      //     // return this.$store.state.checkout.selectedPaymentMethodId;
      //     return this.selectedPaymentId;
      //   },
      //   set(value) {
      //     this.$store.dispatch(`checkout/${SET_PAYMENT_METHOD}`, value);
      //     // this.selectPayment(value);
      //   }
      // },
      // shippingMethod: {
      //   get() {
      //     // return this.$store.state.checkout.selectedShippingMethodId;
      //     return this.selectedShippingId
      //   },
      //   set(value) {
      //     this.$store.dispatch(`checkout/${SET_SHIPPING_METHOD}`, value);
      //     // this.selectShipping(value);
      //   }
      // }
    },
    methods: mapActions('checkout', {
      selectPayment: SET_PAYMENT_METHOD,
      selectShipping: SET_SHIPPING_METHOD,
    })
  }
</script>
