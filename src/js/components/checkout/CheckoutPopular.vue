<template>
  <section
    v-show="items.length > 0 && (totalQuantity === 0 || basketItems.length === 0)"
    class="p-section-popular"
  >
    <div class="container">
      <h2 class="p-section-popular__title">Популярные товары</h2>
    </div>
    <div class="product-list">
      <div class="product-list__wrapper" :class="{ collapsed: collapsed }">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="product-list__container">
        <div class="load-more-block" v-if="products.length > 4" v-show="collapsed">
          <button class="load-more-block__link" type="button" @click.prevent="showMore">Показать еще</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ProductCard from '../ProductCard.vue';
import axios from 'axios';
import qs from 'qs';

// import Utils from '../utils/utils';

export default {
  name: 'CheckoutPopular',
  components: {
    ProductCard,
  },
  props: {
    requestParam: {
      type: Object,
    }
  },
  data() {
    return {
      collapsed: true,
      items: [],
      status: null,
    }
  },
  computed: {
    ...mapGetters({
      basketItems: 'cart/availableProducts',
      totalQuantity: 'checkout/totalQuantity',
      // nextStepButton: 'checkout/nextStepButton',
    }),
    products() {
      return this.items
        .filter((item) => item.type === 'product')
        .map((item) => item.options);
    },
  },
  methods: {
    showMore() {
      this.collapsed = false;
    },
    sendRequest() {
      this.status = 'loading';

      const data = {
        // sessid: Utils.sessid(),
        ...this.requestParam,
      };

      return axios
        .post('/ajax/catalog/products/by-params/', qs.stringify(data))
        .then(response => response.data)
        .then((response) => {
          if (response.success) {
            return response;
          }
          const error = new Error(response.message);
          error.response = response;
          throw error;
        })
        .then((response) => {
          this.items = response.data.items;
        })
        .catch((error) => {
          // console.log('getSimilar catch', error);
          // alert(error.message || error.response.message);
        })
        .finally(() => {
          this.status = null;
        });
    }
  },
  mounted() {
    this.sendRequest();
  },
  created() {

  }
}
</script>
