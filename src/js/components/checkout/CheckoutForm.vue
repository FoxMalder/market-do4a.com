<template>
  <div id="order-props" class="order-props">
    <h3 class="order-props__title">Ваши данные</h3>
    <div class="order-props__form">
      
      <ul class="order-props__error"
          v-if="errors.PROPERTY && errors.PROPERTY.length">
        <li v-for="error in errors.PROPERTY">{{ error }}</li>
      </ul>
      
      <fieldset class="order-props__group" v-for="group in groups">
        <legend class="order-props__subtitle">{{ group.name }}</legend>
        
        <template v-for="prop in group.props">
          <CheckoutLocation v-if="prop.type === 'location'" :prop="prop"/>
          <div class="n-form-group" v-else>
            <div class="n-form-group__field">
              <InputField :class="{'input-field_primary': breakpoint !== 'xs'}" :prop="prop"/>
            </div>
            <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>
          </div>
        </template>
      
      </fieldset>
      
      <fieldset class="order-props__description" v-if="propertyDescription">
        <div class="form-group" v-skew="10">
          <!--        <div class="form-group">-->
          <div class="input-field" :class="{'input-field_primary': breakpoint !== 'xs'}">
            <label
              for="property-description"
              class="input-field__label">{{ propertyDescription.title }}</label>
            <textarea
              ref="textarea"
              id="property-description"
              class="input-field__input autoheight"
              rows="5"
              :name="propertyDescription.name"
              :value="propertyDescription.value"
              @input="updateDescription"
            ></textarea>
          </div>
        </div>
        <div class="order-props__note">{{ propertyDescription.description }}</div>
      </fieldset>
      
      <!--      <div class="order-props__subtitle">Адрес доставки</div>-->
      <!--      <div class="order-props__container">-->
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
      <!--      </div>-->
    </div>
    
    <!--    <input type="hidden"-->
    <!--           name="PERSON_TYPE"-->
    <!--           v-if="personTypeId"-->
    <!--           :value="personTypeId"/>-->
    
    <div class="order-props__footer">
      <slot></slot>
<!--      <button-->
<!--        class="btn btn-red btn-skew btn-block"-->
<!--        type="button"-->
<!--        @click.prevent="nextStep"-->
<!--      >-->
<!--        Доставка и оплата-->
<!--        <svg width="20" height="16" style="margin-left: 30px" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3431 0.928881L19.7071 7.29284C20.0976 7.68337 20.0976 8.31653 19.7071 8.70706L13.3431 15.071C12.9526 15.4615 12.3195 15.4615 11.9289 15.071C11.5384 14.6805 11.5384 14.0473 11.9289 13.6568L16.5858 8.99995L-7.31201e-07 8.99995L-5.56355e-07 6.99995L16.5858 6.99995L11.9289 2.34309C11.5384 1.95257 11.5384 1.31941 11.9289 0.928881C12.3195 0.538356 12.9526 0.538356 13.3431 0.928881Z" fill="currentColor"/>-->
<!--        </svg>-->
<!--      </button>-->
    </div>
  </div>
</template>

<script>
  // import { ValidationObserver } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';

  import { mapGetters, mapState, mapActions } from 'vuex';
  import InputField from './../InputField.vue';
  import CheckoutLocation from './CheckoutLocation.vue';
  import TextareaAutoHeight from '../../plugins/TextareaAutoHeight';
  // import TransformSkew from './../TransformSkew.vue';


  export default {
    name: "CheckoutForm",
    components: {
      InputField,
      CheckoutLocation,
    },
    directives: {
      skew: {
        inserted(el, { value = 10 }) {
          el.style.transform = `matrix(1, 0, ${value * -2 / 158}, 1, 0, 0)`;
          el.style.marginLeft = `${value}px`;
          el.style.marginRight = `${value}px`;
        },
        // unbind(el) {
        //   console.log(el);
        // },
      },
    },
    props: {
      breakpoint: {
        type: String,
      }
    },
    // data() {
    //   return {
    //     isMobile: document.documentElement.clientWidth < 768,
    //     // description: '',
    //   }
    // },
    mounted() {
      new TextareaAutoHeight(this.$refs.textarea);
    },
    computed: {
      ...mapState('checkout', {
        propertyList: 'propertyList',
        propertyGroups: 'propertyGroups',
        // Old
        // propertyDescription: state => state.propertyDescription,
        propertyDescription: state => state.staticPropertyList.find(prop => prop.name === 'ORDER_DESCRIPTION'),
        errors: 'errors',
      }),
      groups() {
        return this.propertyGroups.map(group => ({
          ...group,
          props: this.propertyList.filter(prop => prop.propsGroupId === group.id)
        }))
      }
    },
    methods: {
      nextStep() {
        console.log('Next step');
      },
      // validate() {
      //   this.
      // },
      updateDescription(e) {
        this.$store.commit('checkout/SET_PROPERTY', {
          name: this.propertyDescription.name,
          value: e.target.value,
        })
      }
    }
  }
</script>
