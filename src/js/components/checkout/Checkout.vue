<template>
  <div class="cart">
    <div class="container">
      <div class="cart__empty" v-if="!products.length">
        <h3>Ваша корзина пуста</h3>
        <p>Добавьте покупки, чтобы начать оформление заказа</p>
        <button class="btn btn-red btn-skew">Начать покупать</button>
      </div>
      <div class="cart__inner" v-else>
        <div class="cart__col-left">
          
          <div class="order-personal-info">
            <h3 class="order-personal-info__title">Ваши данные</h3>
            <div class="order-personal-info__form">
              <div class="order-personal-info__subtitle">Данные покупателя</div>
              
              <div class="order-personal-info__container">
                <div class="form-group" v-for="item in propertyList">
                  <InputField :prop="item" v-model="item.value"/>
                </div>
              </div>
              
              <div class="order-personal-info__subtitle">Адрес доставки</div>
              <div class="order-personal-info__container">
                <div class="form-group">
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Населённый пункт</label>
                    <input class="input-field__input" type="text" autocomplete="address-level2">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Улица</label>
                    <input class="input-field__input" type="text" autocomplete="address-line1">
                  </div>
                </div>
                <div class="form-group form-group_row">
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Дом</label> <input class="input-field__input" type="text">
                  </div>
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Квартира/офис</label>
                    <input class="input-field__input" type="text" autocomplete="address-line2">
                  </div>
                </div>
                <div class="form-group form-group_row">
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Этаж</label> <input class="input-field__input" type="text">
                  </div>
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Подъезд</label> <input class="input-field__input" type="text">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-field input-field_primary">
                    <label class="input-field__label">Индекс</label>
                    <input class="input-field__input" type="number" autocomplete="postal-code">
                  </div>
                </div>
              </div>
            </div>
            
            <input type="hidden" name="PERSON_TYPE"
                    v-if="getPersonTypeId"
                    :value="getPersonTypeId"/>
          
          </div>
          
          <div class="order-shiping">
            
            <div class="order-shiping__shipping-type">
              <h3 class="order-shiping__title">Способ получения</h3>
              <div class="order-option"
                      v-for="item in shippingMethods"
                      :key="item.ID"
                      :class="{active: item.ID === selectedShipingMethod}">
                <input type="radio" name="DELIVERY_ID" style="display: none"
                        :value="item.ID"
                        :checked="item.CHECKED === 'Y'"
                        v-model="selectedShipingMethod">
                <div class="order-option__header"
                        @click="selectShiping(item)">
                  <div class="order-option__title">{{item.NAME}}</div>
                  <div class="order-option__info">
                    <span :class="{green: parseInt(item.PRICE) === 0}">
                      {{item.PRICE > 0 ? `${item.PRICE} Р` : 'Бесплатная доставка'}}
                    </span>
                    <span v-if="item.PERIOD_TEXT">{{item.PERIOD_TEXT}}</span>
                  </div>
                  <div class="order-option__img" v-if="item.LOGOTIP_SRC">
                    <img :src="item.LOGOTIP_SRC" alt="item.NAME">
                  </div>
                </div>
                <div class="order-option__body" :style="{display: item.ID === selectedShipingMethod ? '' : 'none'}">
                  <div class="order-option-store" v-if="item.TYPE === 'P'">
                    <div class="order-option-store__title">{{currentStore.NAME}}</div>
                    <a class="order-option-store__link" href="#">Показать на карте</a>
                  </div>
                  
                  <!--                  <div class="order-option__subtitle">Срок доставки 14.05 - 17.05</div>-->
                  <p class="order-option__text" v-html="item.DESCRIPTION"></p>
                </div>
              </div>
            </div>
            
            <div class="order-shiping__payment-type">
              <h3 class="order-shiping__title">Способ оплаты</h3>
              <div class="order-option"
                      v-for="item in paymentMethods"
                      :key="item.ID"
                      :class="{active: item.ID === selectedPaymentMethod}">
                <input type="radio" name="PAY_SYSTEM_ID" style="display: none"
                        :value="item.ID"
                        :checked="item.CHECKED === 'Y'"
                        v-model="selectedPaymentMethod">
                <div class="order-option__header" @click="selectPayment(item)">
                  <div class="order-option__title">{{item.NAME}}</div>
                  <div class="order-option__info">
                    <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i> <i class="icon icon-mir"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
          <!--          <div class="order-alert">-->
          <!--            <div class="order-alert__title">Внимание! Этот заказ был разделён.</div>-->
          <!--            <div class="order-alert__text">Часть заказа будет отправлена с центрального склада. Вы получите товары-->
          <!--              разными способами доставки.-->
          <!--            </div>-->
          <!--          </div>-->
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
        </div>
        <div class="cart__col-right">
          <OrderInfo/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import InputField from './../InputField.vue'
  import OrderInfo from './OrderInfo.vue'

  export default {
    name: "Checkout",
    data() {
      return {
        selectedPaymentMethod: null,
        selectedShipingMethod: null,

        propertyList: [],
        orderList: [],
      }
    },
    components: {
      OrderInfo,
      InputField,
    },
    mounted() {
      this.propertyList = window.soaData.result.ORDER_PROP.properties.map((property) => ({
        id: property.ID,
        name: property.NAME,
        code: property.CODE,
        description: property.DESCRIPTION,
        fieldName: 'ORDER_PROP_' + property.ID,
        value: property.VALUE[0],
        required: property.REQUIRED === 'Y',
      }));

      let order = window.soaData.result;
      order.DELIVERY = this.getDeliverySortedArray(order.DELIVERY);

      // let order = {
      //   productList: Object.keys(this.result.GRID.ROWS).map((productId) => this.result.GRID.ROWS[productId]),
      //   total: this.result.TOTAL,
      //   localStore: this.result.LOCAL_STORE,
      //   delivery: this.getDeliverySortedArray(this.result.DELIVERY)
      // };

      // this.orderList.push(window.soaData);
    },
    computed: {
      // ...mapState
      ...mapState('checkout', {
        // result: state => state.result,
        total: state => state.result.TOTAL,
        // delivery: state => state.result.DELIVERY,
        paymentMethods: state => state.result.PAY_SYSTEM,
        currentStore: state => state.result.CURRENT_STORE,
      }),
      ...mapGetters('cart', {
        products: 'products',
      }),
      ...mapGetters('checkout', {
        shippingMethods: 'shippingMethods',
      }),


      deliverySortedArray() {

      },
      getPersonTypeId() {
        return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter((key) => window.soaData.result.PERSON_TYPE[key].CHECKED === 'Y')[0]].ID
      },
      productCountText() {
        return this.products.length + ' ' + Utils.declOfNum(this.products.length, ['товар', 'товара', 'товаров'])
      },
    },
    methods: {
      selectShiping({ ID }) {
        this.selectedShipingMethod = ID;
      },
      selectPayment({ ID }) {
        this.selectedPaymentMethod = ID;
      },


      /**
       * Преобразование и сортировка видов доставки
       * @param {Object | Array} objDelivery
       * @returns {Array}
       */
      getDeliverySortedArray(objDelivery) {
        let arDelivery = [];

        if (Array.isArray(objDelivery)) {
          arDelivery = objDelivery;
        } else {
          arDelivery = Object.keys(objDelivery).map((key) => objDelivery[key])
        }

        arDelivery.sort(function(a, b) {
          const sort = parseInt(a.SORT) - parseInt(b.SORT);
          if (sort === 0)
            return a.OWN_NAME.toLowerCase() > b.OWN_NAME.toLowerCase() ? 1 : (a.OWN_NAME.toLowerCase() < b.OWN_NAME.toLowerCase() ? -1 : 0);
          else
            return sort;
        });

        return arDelivery;
      }
    },
  }
</script>


<style scoped>

</style>
