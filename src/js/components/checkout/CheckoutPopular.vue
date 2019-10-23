<template>
  <section
    class="p-section-popular"
    v-show="items.length > 0 && (totalQuantity === 0 || basketItems.length === 0)">
    <div class="container">
      <h2 class="p-section-popular__title">Популярные товары</h2>
    </div>
    <div class="p-section-popular__inner">
      <div class="p-section-popular__list" :class="{ collapsed: collapsed }">
        <template v-for="item in items">
          <ProductCard v-if="item.type === 'product'" :product="item.options"/>
        </template>
      </div>
      <div class="load-more-block" v-if="items.length > 4" v-show="collapsed">
        <button class="load-more-block__link" type="button" @click.prevent="showMore">Показать еще</button>
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
    name: "CheckoutPopular",
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
    components: {
      ProductCard,
    },
    computed: {
      ...mapGetters({
        basketItems: 'cart/availableProducts',
        totalQuantity: 'checkout/totalQuantity',
        // nextStepButton: 'checkout/nextStepButton',
      }),
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
