<template>
  <div class="order-product">
    <div class="order-product__col-image">
      <img class="order-product__img"
              :src="'https://marketdo4a.com' + item.DETAIL_PICTURE_SRC"
              :srcset="'https://marketdo4a.com' + item.DETAIL_PICTURE_SRC_2X + ' 2x'"
              :alt="item.NAME">
    </div>
    <div class="order-product__col-info">
      <a :href="item.DETAIL_PAGE_URL" class="order-product__name">{{item.NAME}}</a>
      <!--      <div class="order-product__description">900 гр.</div>-->
    </div>
    <div class="order-product__col-count">
      <div class="order-product__counter">
        <button class="order-product__decrement" type="button" @click.prevent="decrement(item)">-</button>
        <div class="order-product__quantity">{{item.QUANTITY}}</div>
        <button class="order-product__increment" type="button" @click.prevent="increment(item)">+</button>
      </div>
      <div class="order-product__count-note">{{item.SUM_NUM | formatPrice}}/{{item.MEASURE_NAME}}.</div>
    </div>
    <div class="order-product__col-price">
      <del class="order-product__old-price" v-if="item.SUM_BASE > item.SUM_NUM">{{item.SUM_BASE | formatPrice}}</del>
      <div class="order-product__price">{{item.SUM_NUM | formatPrice}}</div>
      <div class="order-product__profit" v-if="item.SUM_BASE > item.SUM_NUM">Выгода {{item.SUM_BASE - item.SUM_NUM | formatPrice}}
      </div>
    </div>
    <button class="order-product__btn-delete"
            @click.prevent="removeProductFromCart(item)">
      <i class="icon icon-delete"></i>
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  
  export default {
    name: "ProductItem",
    props: {
      item: {
        type: Object,
        required: true
      },
    },
    methods: mapActions('cart', {
      removeProductFromCart: 'removeProductFromCart',
      increment: 'incrementItemQuantity',
      decrement: 'decrementItemQuantity',
    }),
  }
</script>
