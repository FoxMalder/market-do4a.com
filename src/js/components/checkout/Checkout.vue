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
    <section class="cart">
      <div class="container">
        <CheckoutFinal/>
      </div>
      <CheckoutEmptyBasket v-if="!products.length"/>
      
      <template v-else-if="!isMobile">
        <div class="container">
          <CheckoutFinal v-if="currentStep === 'final'"/>
          <div class="cart__inner" v-else>
            <div class="cart__col-left">
              <CheckoutForm/>
              <!-- <CheckoutAlert/> -->
              <CheckoutShippingAndPayment/>
            </div>
            <div class="cart__col-right">
              <CheckoutBasket/>
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
            <a href="#" class="cart-mobile-header__link"
                    @click.prevent="setStep(step)">{{ step.title }}
            </a>
          </li>
        </ul>
        <div class="container">
          <keep-alive>
            <component :is="currentTabComponent"></component>
          </keep-alive>
        </div>
        <div class="cart-mobile-bottom">
          <button class="cart-mobile-bottom__button btn btn-red btn-block" type="button"
                  @click="setStep(nextStepButton)">
            {{ nextStepButton.text }}
          </button>
        </div>
      </template>
    </section>
  </article>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import CheckoutForm from './CheckoutForm.vue';
  import CheckoutShippingAndPayment from './CheckoutShippingAndPayment.vue';
  import CheckoutBasket from './CheckoutBasket.vue';
  import CheckoutAlert from './CheckoutAlert.vue';
  import CheckoutFinal from './CheckoutFinal.vue';
  import CheckoutEmptyBasket from './CheckoutEmptyBasket.vue';
  
  import Utils from './../../utils/utils';

  export default {
    name: "Checkout",
    components: {
      CheckoutAlert,
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
        products: state => state.cart.items,
        steps: state => state.checkout.steps,
        currentStep: state => state.checkout.currentStepName,
        checkoutStatus: state => state.checkout.checkoutStatus
      }),
      ...mapGetters('checkout', {
        nextStepButton: 'nextStepButton',
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
        refreshOrderAjax: 'refreshOrderAjax',
      }),
      
      // validate() {
      //   Utils.scrollTo(this.$refs.form.$el)
      //   Utils.scrollTo(this.$refs.shippingAndPayment.$el)
      // }
    },
  }
</script>


<style scoped>

</style>
