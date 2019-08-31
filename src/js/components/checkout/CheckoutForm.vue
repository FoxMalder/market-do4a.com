<template>
  <div class="order-personal-info">
    <h3 class="order-personal-info__title">Ваши данные</h3>
    <div class="order-personal-info__form">
      <template v-if="errors.PROPERTY && errors.PROPERTY.length">
        <div class="order-personal-info__error"
             v-for="error in errors.PROPERTY">{{error}}
        </div>
      </template>
      <div class="order-personal-info__subtitle">Данные покупателя</div>
      
      <div class="order-personal-info__container">
        <div class="form-group"
             v-for="item in propertyList">
          <InputField
            :prop="item"
            v-model="item.value"/>
        </div>
      </div>
      
      <div class="order-personal-info__subtitle">Адрес доставки</div>
      <div class="order-personal-info__container">
        <div class="form-group">
          <div class="input-field input-field_primary">
            <label class="input-field__label">Населённый пункт</label>
            <input class="input-field__input"
                   type="text"
                   autocomplete="address-level2">
          </div>
        </div>
        <div class="form-group">
          <div class="input-field input-field_primary">
            <label class="input-field__label">Улица</label>
            <input class="input-field__input"
                   type="text"
                   autocomplete="address-line1">
          </div>
        </div>
        <div class="form-group form-group_row">
          <div class="input-field input-field_primary">
            <label class="input-field__label">Дом</label>
            <input class="input-field__input"
                   type="text">
          </div>
          <div class="input-field input-field_primary">
            <label class="input-field__label">Квартира/офис</label>
            <input class="input-field__input"
                   type="text"
                   autocomplete="address-line2">
          </div>
        </div>
        <div class="form-group form-group_row">
          <div class="input-field input-field_primary">
            <label class="input-field__label">Этаж</label>
            <input class="input-field__input"
                   type="text">
          </div>
          <div class="input-field input-field_primary">
            <label class="input-field__label">Подъезд</label>
            <input class="input-field__input"
                   type="text">
          </div>
        </div>
        <div class="form-group">
          <div class="input-field input-field_primary">
            <label class="input-field__label">Индекс</label>
            <input class="input-field__input"
                   type="number"
                   autocomplete="postal-code">
          </div>
        </div>
      </div>
    </div>
    
    <input type="hidden"
           name="PERSON_TYPE"
           v-if="getPersonTypeId"
           :value="getPersonTypeId"/>
  
  </div>
</template>

<script>
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
        errors: 'errors',
      }),
      getPersonTypeId() {
        return window.soaData.result.PERSON_TYPE[Object.keys(window.soaData.result.PERSON_TYPE).filter((key) => window.soaData.result.PERSON_TYPE[key].CHECKED === 'Y')[0]].ID
      },
    }
  }
</script>

<style scoped>

</style>
