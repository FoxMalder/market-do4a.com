<template>
  <div>
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
    
<!--        <div class="container">-->
<!--          <button @click.prevent="showOnMap">Открыть карту</button>-->
<!--        </div>-->
    
    <!--    <CheckoutShippingSDEK/>-->
    
    <!--    <div class="container">-->
    <!--      <CheckoutFinal/>-->
    <!--    </div>-->
    
    <section class="cart" :class="{'cart_loading': checkoutStatus === 'loading'}">
      <div class="cart-loading" v-if="checkoutStatus === 'initialization'">
        <div class="spinner-border" role="status">
          <span class="sr-only">Загрузка...</span>
        </div>
      </div>
      
      
      <!--            <CheckoutEmptyBasket v-else-if="totalQuantity === 0 || basketItems.length === 0"/>-->
      
      <template v-else-if="breakpoint === 'xl'">
        <div class="container">
          <div class="cart__inner">
            <div class="cart__col-left">
              <CheckoutForm :breakpoint="breakpoint"/>
              <CheckoutShippingAndPayment :breakpoint="breakpoint"/>
            </div>
            <div class="cart__col-right">
              <Affix relative-element-selector=".cart__inner"
                     style="width: 690px"
                     :scrollAffix="true"
                     :offset="{ top: 150, bottom: 15 }">
                <CheckoutBasket :breakpoint="breakpoint">
                  <button
                    class="btn btn-red btn-skew btn-block"
                    type="submit"
                    @click.prevent="setStep(nextStepButton)"
                  >Оформить заказ</button>
                </CheckoutBasket>
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
            <component :is="currentTabComponent" :breakpoint="breakpoint">
              <button
                class="btn btn-red btn-skew btn-block" type="button"
                ref="test"
                @click="setStep(nextStepButton)"
              >
                {{ nextStepButton.text }}
                <svg v-if="currentStep !== 'basket'" class="btn-icon" style="margin-left: 25px; width: 20px; height: 16px" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3431 0.928881L19.7071 7.29284C20.0976 7.68337 20.0976 8.31653 19.7071 8.70706L13.3431 15.071C12.9526 15.4615 12.3195 15.4615 11.9289 15.071C11.5384 14.6805 11.5384 14.0473 11.9289 13.6568L16.5858 8.99995L-7.31201e-07 8.99995L-5.56355e-07 6.99995L16.5858 6.99995L11.9289 2.34309C11.5384 1.95257 11.5384 1.31941 11.9289 0.928881C12.3195 0.538356 12.9526 0.538356 13.3431 0.928881Z" fill="currentColor"/>
                </svg>
              </button>
            </component>
          </keep-alive>
        </div>
        <div class="cart-mobile-bottom"
             :class="{ active: visibleFooter }">
          <button
            class="btn btn-red btn-block" type="button"
            @click="setStep(nextStepButton)"
          >
            {{ nextStepButton.text }}
            <svg v-if="currentStep !== 'basket'" class="btn-icon" style="margin-left: 25px; width: 20px; height: 16px" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3431 0.928881L19.7071 7.29284C20.0976 7.68337 20.0976 8.31653 19.7071 8.70706L13.3431 15.071C12.9526 15.4615 12.3195 15.4615 11.9289 15.071C11.5384 14.6805 11.5384 14.0473 11.9289 13.6568L16.5858 8.99995L-7.31201e-07 8.99995L-5.56355e-07 6.99995L16.5858 6.99995L11.9289 2.34309C11.5384 1.95257 11.5384 1.31941 11.9289 0.928881C12.3195 0.538356 12.9526 0.538356 13.3431 0.928881Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { Affix } from 'vue-affix';
  import CheckoutForm from './CheckoutForm.vue';
  import CheckoutShippingAndPayment from './CheckoutShippingAndPayment.vue';
  import CheckoutBasket from './CheckoutBasket.vue';
  import CheckoutFinal from './CheckoutFinal.vue';
  import CheckoutEmptyBasket from './CheckoutEmptyBasket.vue';

  import CheckoutShippingSDEK from './CheckoutShippingSDEK.vue';
  import AppModalMap from '../AppModalMap.vue';

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
      CheckoutShippingSDEK,
    },
    data() {
      return {
        visibleFooter: true,
        breakpoint: 'xs',
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

      getBreakpoint() {
        if (document.documentElement.clientWidth < 768) {
          return 'xs';
        }
        if (document.documentElement.clientWidth < 1240) {
          return 'md';
        }
        return 'xl';
      },


      showOnMap() {
        this.$modal.open(AppModalMap, {
          props: { storeId: 35900 },
        });
      },

      checkout() {
        console.log('оформить заказ');
      }
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
    mounted() {
      this.breakpoint = this.getBreakpoint();
      document.addEventListener('resize', () => {
        this.breakpoint = this.getBreakpoint();
      });

      document.addEventListener('scroll', () => {
        if (this.$refs.test) {
          this.visibleFooter = this.$refs.test.getBoundingClientRect().top > document.documentElement.clientHeight;
        }
      })
    }
  }
</script>
