<template>
  <div id="order-props" class="order-personal-info">
    <h3 class="order-personal-info__title">Ваши данные</h3>
    <div class="order-personal-info__form">
      
      <ul class="order-personal-info__error"
          v-if="errors.PROPERTY && errors.PROPERTY.length">
        <li v-for="error in errors.PROPERTY">{{error}}</li>
      </ul>
      
      <template v-show="userProps.length">
        <div class="order-personal-info__subtitle">Данные покупателя</div>
        <div class="order-personal-info__container">
          <div class="form-group" v-for="item in userProps">
            <InputField :class="{'input-field_primary': !isMobile}" :prop="item"/>
          </div>
        </div>
      </template>
      
      <template v-show="addressProps.length">
        <div class="order-personal-info__subtitle">Адрес доставки</div>
        <div class="order-personal-info__container">
          <template v-for="item in addressProps">
            <template v-if="item.isLocation">
              
              <CheckoutLocationSearch
                v-if="!isLocaleStore"
                :item="item"/>
              
              <div v-else
                   class="form-group">
                <CheckoutLocation :name="locationName"/>
              </div>
              
              <input type="hidden" :value="item.value">
            </template>
            <div
              v-else
              class="form-group">
              <InputField :class="{'input-field_primary': !isMobile}" :prop="item"/>
            </div>
          </template>
          <!--        <div class="form-group form-group_row">-->
          <!--          <div class="input-field input-field_primary">-->
          <!--            <label class="input-field__label">Дом</label>-->
          <!--            <input class="input-field__input"-->
          <!--                   type="text"-->
          <!--                   name="house"-->
          <!--                   autocomplete="address-line1">-->
          <!--          </div>-->
          <!--          <div class="input-field input-field_primary">-->
          <!--            <label class="input-field__label">Квартира/офис</label>-->
          <!--            <input class="input-field__input"-->
          <!--                   type="text"-->
          <!--                   autocomplete="address-line2">-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </template>
      
      <div class="order-personal-info__description">
        <div class="form-group" v-skew="10">
          <div class="input-field"
               :class="{'input-field_primary': !isMobile}">
            <label
              for="property-description"
              class="input-field__label">Комментарий</label>
            <textarea
              class="input-field__input"
              id="property-description"
              name="ORDER_DESCRIPTION"
              rows="5"
              v-model="propertyDescription"></textarea>
          </div>
        </div>
        <div class="order-personal-info__note">
          Например, уточнения по оформлению заказа, номер карты клиента или как найти ваш дом
        </div>
      </div>
    </div>
    <input type="hidden"
           name="PERSON_TYPE"
           v-if="personTypeId"
           :value="personTypeId"/>
  
  </div>
</template>

<script>
  // import { ValidationObserver } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';

  import { mapGetters, mapState, mapActions } from 'vuex';
  import InputField from './../InputField.vue';
  import CheckoutLocation from './CheckoutLocation.vue';
  import CheckoutLocationSearch from './CheckoutLocationSearch.vue';
  // import TransformSkew from './../TransformSkew.vue';


  export default {
    name: "CheckoutForm",
    components: {
      InputField,
      CheckoutLocation,
      CheckoutLocationSearch,
    },
    directives: {
      skew: {
        inserted(el, { value = 10 }) {
          console.log(el.clientHeight);
          el.style.transform = `matrix(1, 0, ${value * -2 / 158}, 1, 0, 0)`;
          el.style.marginLeft = `${value}px`;
          el.style.marginRight = `${value}px`;
        },
        // unbind(el) {
        //   console.log(el);
        // },
      },
    },
    data() {
      return {
        isMobile: document.documentElement.clientWidth < 768,
      }
    },
    computed: {
      ...mapState('checkout', {
        propertyList: 'propertyList',
        propertyDescription: 'propertyDescription',
        personTypeId: 'personTypeId',
        errors: 'errors',
        isLocaleStore: 'isLocaleStore',
        locationName: 'locationName',
      }),

      userProps() {
        return this.propertyList.filter(item => item.isUserProps && !item.isLocation);
      },
      addressProps() {
        return this.propertyList.filter(item => !item.isUserProps || item.isLocation);
      }
      // getPersonTypeId() {
      //   return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter((key) => window.soaData.result.PERSON_TYPE[key].CHECKED === 'Y')[0]].ID
      // },
    },
    // methods: {
    // ...mapActions('checkout', {
    //   validate: 'validatePropsData',
    // })
    // }
  }
</script>

<style scoped>

</style>
