<template>
  <div class="order">
    <h3 class="order__title">{{ isMobile ? totalQuantityText : `В заказе ${totalQuantityText}` }}</h3>
    
    <div class="order__header">
      <button
        class="order__btn-clear"
        type="button"
        @click.prevent="clear"
      >
        <svg width="12" height="14" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57554 0H8.3765V1.77938H11.952V3.1223H0V1.77938H3.57554V0ZM4.91846 1.34292V1.77938H7.03357V1.34292H4.91846ZM1.60906 14V4.39808H2.95198V12.6571H8.99514V4.39808H10.3381V14H1.60906ZM5.3047 4.39808H3.96178V11.4904H5.3047V4.39808ZM6.64632 4.39808H7.98924V11.4904H6.64632V4.39808Z" fill="currentColor"/>
        </svg>
        <span>Очистить корзину</span>
      </button>
    </div>
    
    <div class="order__alert" v-if="orderList.length > 1 && isMobile">
      <CheckoutAlert/>
    </div>
    
    <div class="order__list">
      <ProductList
        v-for="order in orderList"
        :key="order.storeId"
        :order="order"
        :multiple="orderList.length > 1"
      />
    </div>
    
    <div class="order__promocode">
      <Promocode/>
    </div>
    
    <div class="order__amount">
      <CheckoutAmount/>
    </div>
    
    <div class="order__footer">
      
      <button
        class="order__btn-checkout btn btn-red btn-skew"
        type="submit"
        disabled
        v-if="checkoutStatus === 'loading'"
      ><span class="spinner-border spinner-border-sm" role="status"></span></button>
      
      <button
        class="order__btn-checkout btn btn-red btn-skew"
        type="submit"
        v-else
        @click.prevent="setStep(nextStepButton)"
      >{{ breakpoint === 'xl' ? 'Оформить заказ' : 'Перейти к оформлению' }}</button>
      
      <div class="order__footer-note">
        Нажимая на кнопку, вы подтверждаете согласие на обработку
        <a href="#">персональных данных</a> и <a href="#">политику конфиденциальности</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  // import stickySidebar from 'sticky-sidebar';

  import Utils from '../../utils/utils';

  import CheckoutAlert from './CheckoutAlert.vue';
  import CheckoutAmount from './CheckoutAmount.vue';
  import ProductList from './ProductList.vue';
  import Promocode from './Promocode.vue';


  export default {
    name: "CheckoutBasket",
    components: {
      CheckoutAlert,
      CheckoutAmount,
      ProductList,
      Promocode,
    },
    props: {
      breakpoint: {
        type: String,
      }
    },
    data() {
      return {
        isMobile: document.documentElement.clientWidth < 768,
      }
    },
    // mounted() {
    //   var sidebar = new StickySidebar(this.$el, {
    //     topSpacing: 150,
    //     bottomSpacing: 120,
    //     containerSelector: '.cart__inner',
    //     innerWrapperSelector: '.order__inner'
    //   });
    // },
    computed: {
      ...mapState('checkout', {
        checkoutStatus: 'checkoutStatus'
      }),
      ...mapGetters('checkout', {
        nextStepButton: 'nextStepButton',
        orderList: 'orderList',
        totalQuantity: 'totalQuantity',
        totalQuantityText: 'totalQuantityText',
      }),
      // ...mapGetters({
      //   products: 'cart/availableProducts',
      // }),
    },
    methods: {
      ...mapActions({
        // clear: 'checkout/clearCheckout',
        setStep: 'checkout/setStep',
      }),

      clear() {
        this.$store.dispatch('cart/clearCart');
      }
    }
  }
</script>

<style scoped>

</style>
