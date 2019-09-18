<template>
  <article>
    <div class="vue-modal">
      <div class="vue-modal__scroll" :style="modalStyle">
        <div class="vue-modal__wrapper">
          <div class="vue-modal__outer">
            <button class="btn btn-red modal-close">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.02815 3.62882L3.71674 4.94023L6.7768 8.0003L3.71694 11.0602L5.02835 12.3716L8.08822 9.31171L11.1481 12.3716L12.4595 11.0601L9.39963 8.0003L12.4597 4.94024L11.1483 3.62883L8.08822 6.68888L5.02815 3.62882Z" fill="currentColor"></path>
              </svg>
            </button>
            <div class="vue-modal__inner">
              <div class="test">
                <h2 class="test__title">Title</h2>
                <div class="test__b">
                  <div class="test__map">map</div>
                  <div class="test__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aperiam
                    distinctio ipsa libero magni sequi. Aliquid aperiam at autem dolor dolorem ducimus, eaque magnam
                    nihil
                    pariatur porro quod, sunt veritatis vero? Consectetur distinctio fugiat impedit ipsum pariatur
                    reprehenderit sunt ullam? Consequuntur impedit numquam quasi! Ea incidunt reiciendis sapiente
                    tenetur.</div>
                </div>
                <div class="test__b test__b_n">
                  <div class="test__map">map</div>
                  <div class="test__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aperiam
                    distinctio ipsa libero magni sequi. Aliquid aperiam at autem dolor dolorem ducimus, eaque magnam
                    nihil
                    pariatur porro quod, sunt veritatis vero? Consectetur distinctio fugiat impedit ipsum pariatur
                    reprehenderit sunt ullam? Consequuntur impedit numquam quasi! Ea incidunt reiciendis sapiente
                    tenetur.</div>
                </div>
                <div class="test__b">
                  <div class="test__map">map</div>
                  <div class="test__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aperiam
                    distinctio ipsa libero magni sequi. Aliquid aperiam at autem dolor dolorem ducimus, eaque magnam
                    nihil
                    pariatur porro quod, sunt veritatis vero? Consectetur distinctio fugiat impedit ipsum pariatur
                    reprehenderit sunt ullam? Consequuntur impedit numquam quasi! Ea incidunt reiciendis sapiente
                    tenetur.</div>
                </div>
                <div class="test__b test__b_n">
                  <div class="test__map">map</div>
                  <div class="test__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aperiam
                    distinctio ipsa libero magni sequi. Aliquid aperiam at autem dolor dolorem ducimus, eaque magnam
                    nihil
                    pariatur porro quod, sunt veritatis vero? Consectetur distinctio fugiat impedit ipsum pariatur
                    reprehenderit sunt ullam? Consequuntur impedit numquam quasi! Ea incidunt reiciendis sapiente
                    tenetur.</div>
                </div>
                <div class="test__b">
                  <div class="test__map">map</div>
                  <div class="test__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci aperiam
                    distinctio ipsa libero magni sequi. Aliquid aperiam at autem dolor dolorem ducimus, eaque magnam
                    nihil
                    pariatur porro quod, sunt veritatis vero? Consectetur distinctio fugiat impedit ipsum pariatur
                    reprehenderit sunt ullam? Consequuntur impedit numquam quasi! Ea incidunt reiciendis sapiente
                    tenetur.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
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
      
      <!--      <CheckoutEmptyBasket v-else-if="totalQuantity === 0 || basketItems.length === 0"/>-->
      
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
        modalStyle: {},
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
    mounted() {
      const offset = Math.tan(9 / 180 * Math.PI) * document.documentElement.clientHeight;
      document.body.style.overflow = 'hidden';
      this.modalStyle = {
        position: 'absolute',
        left: `${offset / -2}px`,
        right: `${offset / -2}px`,
        width: `${document.documentElement.clientWidth + offset}px`,
        top: '0px',
        bottom: '0px',
      };
      window.addEventListener('resize', () => {
        const offset = Math.tan(9 / 180 * Math.PI) * document.documentElement.clientHeight;
        this.modalStyle = {
          position: 'absolute',
          left: `${offset / -2}px`,
          right: `${offset / -2}px`,
          width: `${document.documentElement.clientWidth + offset}px`,
          top: '0px',
          bottom: '0px',
          // width: `calc(100% + ${offset}px)`
        };
      })
    }
  }
</script>
