<template>
  <section class="p-section-similar" v-show="similar.length > 0">
    <div class="container">
      <h2 class="p-section-similar__title">Похожие товары</h2>
    </div>
    <div class="p-section-similar__inner">
      <div class="p-section-similar__list" :class="{ collapsed: collapsed }">
        <template v-for="item in similar">
          <ProductCard v-if="item.type === 'product'" :product="item.options"/>
        </template>
      </div>
      <div class="load-more-block" v-if="similar.length > 4" v-show="collapsed">
        <button class="load-more-block__link" type="button" @click.prevent="showMore">Показать еще</button>
      </div>
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
