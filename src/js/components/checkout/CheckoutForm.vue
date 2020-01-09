<template>
  <div id="order-props" class="order-props">
    <h3 class="order-props__title">Ваши данные</h3>
    <div class="order-props__form">

      <ul class="order-props__error"
          v-if="errors.PROPERTY && errors.PROPERTY.length">
        <li v-for="error in errors.PROPERTY">{{ error }}</li>
      </ul>

      <!-- Детали доставки -->
      <fieldset class="order-props__group" v-for="group in groups">
        <legend class="order-props__subtitle">{{ group.name }}</legend>

        <template v-for="prop in group.props">
<!--          <CheckoutAddress v-if="prop.type === 'location' && visibleAddress"/>-->
          <CheckoutLocation v-if="prop.type === 'location'"/>
          <div class="n-form-group" v-else>
            <div class="n-form-group__field">
              <InputField :class="{'input-field_primary': breakpoint !== 'xs'}" :prop="prop"/>
            </div>
            <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>
          </div>
        </template>
      </fieldset>

      <!--      &lt;!&ndash; Адрес доставки &ndash;&gt;-->
      <!--      <fieldset class="order-props__group" v-show="visibleAddress" v-if="breakpoint === 'xl'">-->
      <!--        <legend class="order-props__subtitle">Адрес доставки</legend>-->
      <!--        <CheckoutAddress/>-->
      <!--      </fieldset>-->

      <fieldset class="order-props__description">
        <div class="form-group" v-skew="10">
          <div class="input-field" :class="{'input-field_primary': breakpoint !== 'xs'}">
            <label
              for="property-description"
              class="input-field__label">Комментарий</label>
            <textarea
              ref="textarea"
              id="property-description"
              class="input-field__input autoheight"
              rows="5"
              :value="propertyDescription"
              @input="updateDescription"
            ></textarea>
          </div>
        </div>
        <div class="order-props__note">Например, уточнения по оформлению заказа, номер карты клиента или как найти ваш
          дом</div>
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
    </div>
  </div>
</template>

<script>
  // import { ValidationObserver } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';

  import { mapGetters, mapState, mapActions } from 'vuex';
  import InputField from './../InputField.vue';
  import CheckoutLocation from './CheckoutLocation.vue';
  import CheckoutAddress from './CheckoutAddress.vue';
  import TextareaAutoHeight from '../../plugins/TextareaAutoHeight';
  // import TransformSkew from './../TransformSkew.vue';
  import Utils from './../../utils/utils';


  export default {
    name: "CheckoutForm",
    components: {
      InputField,
      CheckoutLocation,
      CheckoutAddress,
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
    watch: {
      filtredProps(newList, oldList) {
        console.log(newList, oldList);

        if (this.breakpoint === 'xl') {
          if (newList.length !== oldList.length) {
            const f = newList.find(prop => {
              return prop.required && prop.value === '' && !this.$store.state.checkout.props[prop.code]
            });

            if (f) {
              Utils.scrollTo(document.getElementById('order-props'));
            }
          }
        }

        // if (newList.length > oldList.length && this.breakpoint === 'xl') {
        //   Utils.scrollTo(document.getElementById('order-props'));
        // }
      },
    },
    computed: {
      ...mapState('checkout', {
        // propertyList: 'propertyList',
        propertyGroups: 'propertyGroups',
        // Old
        // propertyDescription: state => state.propertyDescription,

        propertyDescription: state => state.props.DESCRIPTION,
        errors: 'errors',
      }),
      ...mapGetters('checkout', {
        orderList: 'orderList',
        propertyList: 'propertyList',
      }),

      visibleAddress() {
        return this.orderList.find(order => order.deliveryItem && order.deliveryItem.category !== 'pickup');
      },

      filtredProps() {
        // return this.propertyList.filter(prop => prop.relationDelivery.length < 1)
        return this.propertyList
          .filter(item => this.breakpoint === 'xl' || item.relationDelivery.length === 0)
          .filter(item => item.type !== 'location' || this.visibleAddress)
      },

      groups() {
        return this.propertyGroups
          .map(group => ({
            ...group,
            props: this.filtredProps.filter(prop => prop.propsGroupId === group.id)
            // props: this.propertyList
            //   .filter(prop => prop.propsGroupId === group.id)
            //   .filter(item => this.breakpoint === 'xl' || item.relationDelivery.length === 0)
            //   .filter(item => item.type !== 'location' || this.visibleAddress)
          }))
          .filter(group => group.props.length)
      }
    },
    methods: {
      // nextStep() {
      //   console.log('Next step');
      // },
      // validate() {
      //   this.
      // },
      updateDescription(e) {
        this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: 'DESCRIPTION', message: e.target.value });
        // this.$store.commit('checkout/UPDATE_DESCRIPTION', e.target.value);
      }
    }
  }
</script>
