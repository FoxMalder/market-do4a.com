<template>
  <div class="h-product-item"
       :class="{ disabled: !item.canBuy }">
    <div class="h-product-item__img">
      <img v-if="item.picture" :src="item.picture" :alt="item.name">
    </div>
    <div class="h-product-item__info">
      <a :href="item.url"
         class="h-product-item__name"
      >{{ item.name || 'Товар №' + item.productId }}</a>
      <div class="h-product-item__description"
           v-if="item.pack"
           v-text="item.pack"
      ></div>
    </div>
    <div class="h-product-item__controls">
      <div class="h-product-item__price-block">
        <span class="h-product-item__price price">{{ item.sum | formatPrice }}</span>
        <button class="h-product-item__remove"
                type="button"
                title="Удалить позицию"
                @click="remove(item)">
          <svg viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9504 2.08658H9.80004V1.39147C9.80004 0.624178 9.17262 0 8.40011 0H5.59971C4.8281 0 4.19996 0.624178 4.19996 1.39147V2.08658H1.04963C0.471056 2.08658 0 2.55449 0 3.1312V5.5648H0.699517V13.2172C0.699517 14.7513 1.95525 16 3.49973 16H10.5004C12.0448 16 13.3005 14.7513 13.3005 13.2174V5.56498H14V3.1312C14 2.55449 13.5286 2.08658 12.9504 2.08658ZM5.59971 1.39147H8.40011V2.08658H5.59971V1.39147ZM11.9006 13.2174C11.9006 13.9847 11.273 14.6084 10.5004 14.6084H3.49973C2.72794 14.6084 2.09962 13.9849 2.09962 13.2174V5.56498H11.9006V13.2174ZM1.39975 4.17351V3.47769H12.6001V4.17351H1.39975ZM3.49973 13.2174V6.95627C3.49973 6.57156 3.81335 6.26009 4.19996 6.26009C4.58586 6.26009 4.89984 6.57156 4.89984 6.95627V13.2174C4.89984 13.6016 4.58586 13.9134 4.19996 13.9134C3.81335 13.9134 3.49973 13.6014 3.49973 13.2174ZM6.30013 13.2174V6.95627C6.30013 6.57156 6.61374 6.26009 7 6.26009C7.38733 6.26009 7.69987 6.57156 7.69987 6.95627V13.2174C7.69987 13.6016 7.38733 13.9134 7 13.9134C6.61374 13.9134 6.30013 13.6014 6.30013 13.2174ZM9.10016 13.2174V6.95627C9.10016 6.57156 9.41324 6.26009 9.80004 6.26009C10.187 6.26009 10.5003 6.57156 10.5003 6.95627V13.2174C10.5003 13.6016 10.187 13.9134 9.80004 13.9134C9.41324 13.9134 9.10016 13.6014 9.10016 13.2174Z"
                  fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div class="input-counter">
        <button class="input-counter__down"
                type="button"
                title="Уменьшить количество"
                :disabled="item.quantity <= 1 || status === 'loading'"
                @click="decrement"
        >-</button>
        <span class="input-counter__count">{{ item.quantity }}</span>
        <button class="input-counter__up"
                type="button"
                title="Увеличить количество"
                :disabled="item.quantity >= item.quantity_max || status === 'loading'"
                @click="increment"
        >+</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import debounce from 'lodash.debounce';


  export default {
    name: "HeaderBasketItem",
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        quantity: 0,
        status: null,
      }
    },
    created() {
      this.quantity = this.item.quantity;
      this.debouncedSetQuantity = debounce(this.setQuantity, 300);
    },
    methods: {
      ...mapActions('cart', {
        remove: 'removeFromCart',
      }),
      increment() {
        if (this.quantity < this.item.quantity_max) {
          this.quantity += 1;
          this.debouncedSetQuantity();
        }
      },
      decrement() {
        if (this.quantity > 0) {
          this.quantity -= 1;
          this.debouncedSetQuantity();
        }
      },
      setQuantity() {
        this.status = 'loading';

        this.$store.dispatch('cart/setItemQuantity', {
          basketItemId: this.item.basketItemId,
          quantity: this.quantity
        }).then(() => {
          this.status = null;
          this.quantity = this.item.quantity;
        });
      }
    }
  }
</script>

<style scoped>

</style>
