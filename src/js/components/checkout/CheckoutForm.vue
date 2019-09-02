<template>
  <div class="order-personal-info"
       id="order-props">
    <h3 class="order-personal-info__title">Ваши данные</h3>
    <div class="order-personal-info__form">
      
      <ul class="order-personal-info__error"
          v-if="errors.PROPERTY && errors.PROPERTY.length">
        <li v-for="error in errors.PROPERTY">{{error}}</li>
      </ul>
      
      <div class="order-personal-info__subtitle">Данные покупателя</div>
      
      <div class="order-personal-info__container">
        <div class="form-group"
             v-for="item in userProps">
          <InputField :prop="item"/>
        </div>
      </div>
      
      <template v-if="addressProps.length">
        <div class="order-personal-info__subtitle">Адрес доставки</div>
        <div class="order-personal-info__container">
          <div class="form-group"
               v-for="item in addressProps">
            <InputField :prop="item"/>
          </div>
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


  export default {
    name: "CheckoutForm",
    components: {
      InputField,
    },
    computed: {
      ...mapState('checkout', {
        propertyList: 'propertyList',
        personTypeId: state => state.param.personTypeId,
        errors: 'errors',
      }),

      userProps() {
        return this.propertyList.filter(item => item.isUserProps);
      },
      addressProps() {
        return this.propertyList.filter(item => !item.isUserProps);
      }
      // getPersonTypeId() {
      //   return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter((key) => window.soaData.result.PERSON_TYPE[key].CHECKED === 'Y')[0]].ID
      // },
    },
    methods: {
      ...mapActions('checkout', {
        validate: 'validatePropsData',
      })
    }
  }
</script>

<style scoped>

</style>
