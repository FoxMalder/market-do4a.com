<template>
  <form class="cart">
    <div class="container">
      <div class="cart__inner">
        <div class="cart__col-left">
          <div class="order-personal-info">
            <h4>Ваши данные</h4>
            <div class="order-personal-info__form">
              <div class="form-group"
                      v-for="item in propertyList">
                <InputField
                        :prop="item"
                        v-model="item.value"/>
              </div>
              <div class="order-personal-info__note">*поля, обязательные для заполнения</div>
            </div>
            <input type="hidden" name="PERSON_TYPE"
                    v-if="getPersonTypeId"
                    :value="getPersonTypeId"/>
          </div>
          
          <div class="order-shiping">
            <div class="order-shiping__shipping-type">
              <h4>Способ получения</h4>
              <div class="order-option" v-for=""></div>
              <div class="order-option active">
                <div class="order-option__header">
                  <div class="order-option__title">Почтой России</div>
                  <div class="order-option__info"><span class="green">Бесплатная доставка</span><span> Сегодня</span>
                  </div>
                  <div class="order-option__img"><img src="images/logo-rp.svg"></div>
                </div>
                <div class="order-option__body">
                  <div class="order-option__subtitle">Срок доставки 14.05 - 17.05</div>
                  <p class="order-option__text">В удалённые районы доставка от 14 дней. При получении обязательно
                    проверяйте целостность упаковки</p>
                  <div class="order-option__subtitle">Адрес доставки</div>
                  <div class="form-group">
                    <div class="input-field input-field_primary-white"><label class="input-field__label">Населённый
                      пункт</label><input class="input-field__input" type="text" autocomplete="address-level2"></div>
                  </div>
                  <div class="form-group">
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Улица</label><input class="input-field__input" type="text" autocomplete="address-line1">
                    </div>
                  </div>
                  <div class="form-group form-group_row">
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Дом</label><input class="input-field__input" type="text">
                    </div>
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Квартира/офис</label><input class="input-field__input" type="text" autocomplete="address-line2">
                    </div>
                  </div>
                  <div class="form-group form-group_row">
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Этаж</label><input class="input-field__input" type="text">
                    </div>
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Подъезд</label><input class="input-field__input" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-field input-field_primary-white">
                      <label class="input-field__label">Индекс</label><input class="input-field__input" type="number" autocomplete="postal-code">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-shiping__payment-type">
              <h4>Способ оплаты</h4>
              <div class="order-option active">
                <div class="order-option__header">
                  <div class="order-option__title">Картой онлайн</div>
                  <div class="order-option__info">
                    <i class="icon icon-visa"></i><i class="icon icon-mastercard"></i><i class="icon icon-mir"></i>
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
          
          <div class="order">
            <div class="order__header">
              <div class="order__header-col">
                <!--                <h4 class="order__title">В заказе {{getProductLengthFormated}}</h4>-->
                <h4 class="order__title">В заказе 2354532</h4>
                <button class="order__btn-clear" type="button" @click.prevent="clearCart">
                  <i class="icon icon-delete"></i> <span>Очистить корзину</span>
                </button>
              </div>
              <button class="order__btn-checkout btn btn-red btn-skew" type="submit">оформить заказ</button>
            </div>
            
            
            <CartProductList
                    :rows="result.GRID.ROWS"
                    :total="result.TOTAL"
                    @remove-product="removeProduct"/>
            
            <CartPromocode/>
            
            <div class="order-amount">
              <div class="order-amount__sale">
                <div class="order-amount__key">ваша Скидка</div>
                <div class="order-amount__value">{{result.TOTAL.DISCOUNT_PRICE}} <span class="currency">₽</span></div>
              </div>
              <div class="order-amount__sum">
                <div class="order-amount__key">Итого к оплате</div>
                <div class="order-amount__value">{{result.TOTAL.ORDER_TOTAL_PRICE}} <span class="currency">₽</span>
                </div>
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
              <div class="order__footer-note">Нажимая на кнопку, вы подтверждаете согласие на обработку
                <a href="#"> персональных данных</a>
                и
                <a href="#"> политику конфиденциальности</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import CartProductList from './CartProductList.vue';
  import CartPromocode from './CartPromocode.vue';
  import InputField from './InputField.vue'

  export default {
    name: "Cart",
    data() {
      return {
        propertyList: [],
        orderList: [],
        ...window.soaData
      }
    },
    components: {
      CartProductList,
      CartPromocode,
      InputField,
    },
    mounted() {
      this.propertyList = this.result.ORDER_PROP.properties.map((property) => ({
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
      deliverySortedArray() {
      
      },
      getPersonTypeId() {
        return this.result.PERSON_TYPE[Object.keys(this.result.PERSON_TYPE).filter((key) => this.result.PERSON_TYPE[key].CHECKED === 'Y')[0]].ID
      }
    },
    methods: {
      removeProduct(productId) {
        // this.$delete(window.soaData.result['GRID']['ROWS'], productId)
        console.log('Удален товар №' + productId);
      },
      clearCart() {
        console.log('Корзина очищена');
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
