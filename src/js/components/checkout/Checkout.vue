<template>
  <article>
    <header class="cart-section-header">
      <div class="container">
        <div class="breadcumps">
          <a href="/" class="breadcumps__link red">Главная</a>
          <span class="breadcumps__delimiter"></span>
          <span class="breadcumps__page">{{ currentStep === 'basket' ? 'Корзина' : 'Оформление заказа'}}</span>
        </div>
        <h2 class="cart-section-header__title">{{ currentStep === 'basket' ? 'Корзина' : 'Оформление заказа'}}</h2>
      </div>
    </header>
    
    <!--    <div class="container">-->
    <!--      <CheckoutFinal/>-->
    <!--    </div>-->
    
    <section class="cart" :class="{'cart_loading': checkoutStatus === 'loading'}">
      <div class="cart-loading" v-if="checkoutStatus === 'initialization'">
        <div class="spinner-border" role="status">
          <span class="sr-only">Загрузка...</span>
        </div>
      </div>
      
      <CheckoutEmptyBasket v-else-if="totalQuantity === 0 || basketItems.length === 0"/>
      
      <template v-else-if="!isMobile">
        <div class="container">
          <div class="cart__inner">
            <div class="cart__col-left">
              <CheckoutForm/>
              <CheckoutShippingAndPayment/>
            </div>
            <div class="cart__col-right">
              <Affix relative-element-selector=".cart__inner"
                     style="width: 690px"
                     :scrollAffix="true"
                     :offset="{ top: 150, bottom: 15 }">
                <CheckoutBasket/>
              </Affix>
            </div>
          </div>
        </div>
      </template>
      
      <template v-else>
        <ul class="cart-mobile-header" v-if="currentStep !== 'basket'">
          <li
            v-for="step in steps"
            :key="step.key"
            v-if="step.key !== 'basket'"
            :class="['cart-mobile-header__item', { active: currentStep === step.key }]">
            <a href="#"
               class="cart-mobile-header__link"
               @click.prevent="setStep(step)"
            >{{ step.title }}</a>
          </li>
        </ul>
        <div class="container">
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
        </div>
        <div class="cart-mobile-bottom">
          <button class="cart-mobile-bottom__button btn btn-red btn-block" type="button"
                  @click="setStep(nextStepButton)"
          >{{ nextStepButton.text }}</button>
        </div>
      </template>
    </section>
  </article>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { Affix } from 'vue-affix';
  import CheckoutForm from './CheckoutForm.vue';
  import CheckoutShippingAndPayment from './CheckoutShippingAndPayment.vue';
  import CheckoutBasket from './CheckoutBasket.vue';
  import CheckoutFinal from './CheckoutFinal.vue';
  import CheckoutEmptyBasket from './CheckoutEmptyBasket.vue';

  import Utils from './../../utils/utils';


  export default {
    name: "Checkout",
    components: {
      Affix,
      CheckoutForm,
      CheckoutShippingAndPayment,
      CheckoutBasket,
      CheckoutFinal,
      CheckoutEmptyBasket,
    },
    data() {
      return {
        isMobile: document.documentElement.clientWidth < 1240,
      }
    },
    computed: {
      ...mapState({
        steps: state => state.checkout.steps,
        currentStep: state => state.checkout.currentStepName,
        checkoutStatus: state => state.checkout.checkoutStatus,
      }),
      ...mapGetters({
        basketItems: 'cart/availableProducts',
        totalQuantity: 'checkout/totalQuantity',
        nextStepButton: 'checkout/nextStepButton',
      }),
      currentTabComponent() {
        return `checkout-${this.currentStep}`;
      },
      // isMobile() {
      //   return document.documentElement.clientWidth < 1240
      // }
    },
    methods: {
      ...mapActions('checkout', {
        setStep: 'setStep',
        // refreshOrderAjax: 'refreshOrderAjax',
      }),

      // validate() {
      //   Utils.scrollTo(this.$refs.form.$el)
      //   Utils.scrollTo(this.$refs.shippingAndPayment.$el)
      // }
    },
    created() {
      this.$store.dispatch('checkout/init');

      // this.$store.subscribeAction((action, state) => {
      //   if (action.type === 'cart/clearCart') {
      //     console.log(action.type);
      //   } else if (action.type === 'cart/removeFromCart') {
      //     // removeFromCart
      //     console.log(action.type);
      //     this.$store.dispatch('checkout/refreshOrderAjax');
      //   } else if (action.type === 'cart/setItemQuantity') {
      //     // setItemQuantity
      //     console.log(action.type);
      //     this.$store.dispatch('checkout/refreshOrderAjax');
      //   }
      // });

      // SET_BASKET
      // this.$store.subscribe((mutation, state) => {
      //   if (mutation.type === 'cart/SET_BASKET' && this.checkoutStatus !== 'initialization') {
      //     this.$store.dispatch('checkout/refreshOrderAjax');
      //   }
      // });
    },
    // mounted() {
    //
    // }
  }
</script>
