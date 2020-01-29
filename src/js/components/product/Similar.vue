<template>
  <section class="p-section-similar" v-show="similar.length > 0">
    <div class="container">
      <h2 class="p-section-similar__title">Похожие товары</h2>
    </div>
    <div class="product-list product-list_slider">
      <div class="product-list__wrapper">
        <template v-for="item in similar">
          <ProductCard v-if="item.type === 'product'" :product="item.options" />
        </template>
      </div>
      <!--<div class="product-list__control">-->
      <!--  <div class="load-more-block">-->
      <!--    <button class="load-more-block__link" type="button" @click.prevent="showMore">Показать еще</button>-->
      <!--  </div>-->
      <!--</div>-->
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ProductCard from '../ProductCard.vue';


export default {
  name: "Similar",
  data() {
    return {
      collapsed: true,
    }
  },
  components: {
    ProductCard,
  },
  computed: mapState({
    similar: state => state.product.similar,
    loading: state => state.product.similarLoading,
  }),
  methods: {
    showMore() {
      this.collapsed = false;
    }
  },
  created() {
    this.$store.dispatch('product/updateSimilar');
  }
}
</script>
