<template>
  <div class="order-product">
    <div class="order-product__col-image">
      <img class="order-product__img" :src="item.picture" :srcset="item.picture2x + ' 2x'" :alt="item.name">
    </div>
    <div class="order-product__col-info">
      <a :href="item.url" class="order-product__name">{{ item.name }}</a>
      <div class="order-product__description">{{ item.pack || '' }}</div>
    </div>
    <div class="order-product__col-count">
      <div class="order-product__counter">
        <button class="order-product__decrement"
                type="button"
                :disabled="item.quantity < 1"
                @click.prevent="decrement(item)"
        >-</button>
        <div class="order-product__quantity">{{ item.quantity }}</div>
        <button class="order-product__increment"
                type="button"
                :disabled="!item.quantity_max || item.quantity >= item.quantity_max"
                @click.prevent="increment(item)"
        >+</button>
      </div>
      <div class="order-product__count-note">{{item.priceBase | formatPrice}}/{{item.measureName || 'шт'}}</div>
    </div>
    <div class="order-product__col-price">
      <del class="order-product__old-price" v-if="item.price_benefit > 0">{{item.sumBase | formatPrice}}</del>
      <div class="order-product__price">{{ item.sum | formatPrice }}</div>
      <div class="order-product__profit" v-if="item.price_benefit > 0">
        Выгода {{ item.sumDiscount | formatPrice }}
      </div>
    </div>
    <button class="order-product__btn-delete"
            @click.prevent="remove(item)">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.67041 0H12.5289V2.54197H17.6368V4.46043H0.5625V2.54197H5.67041V0ZM7.58888 1.91847V2.54197H10.6105V1.91847H7.58888ZM2.86418 20V6.28298H4.78265V18.0815H13.4157V6.28298H15.3342V20H2.86418ZM8.14052 6.28298H6.22206V16.4149H8.14052V6.28298ZM10.0592 6.28298H11.9777V16.4149H10.0592V6.28298Z"
              fill="currentColor"/>
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import debounce from 'lodash.debounce';


  export default {
    name: "ProductItem",
    props: {
      item: {
        type: Object,
        required: true
      },
    },
    // computed: {
    //   basketItem() {
    //     return this.$store.getters['cart/getBasketItemById'](this.item.basketItemId);
    //   }
    // },
    created() {
      this.debouncedSetQuantity = debounce(this.setQuantity, 300);
    },
    methods: {
      remove() {
        this.$store.dispatch('cart/removeFromCart', {
          basketItemId: this.item.basketItemId,
        })
      },
      increment() {
        if (this.item.quantity_max && this.item.quantity < this.item.quantity_max) {
          this.item.quantity += 1;
          this.debouncedSetQuantity();
        }
      },
      decrement() {
        if (this.item.quantity > 0) {
          this.item.quantity -= 1;
          this.debouncedSetQuantity();
        }
      },
      setQuantity() {
        this.$store.dispatch('cart/setItemQuantity', {
          basketItemId: this.item.basketItemId,
          quantity: this.item.quantity
        })
      }
    }
  }
</script>
