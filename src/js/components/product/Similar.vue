<template>
  <section class="p-section-similar" :style="{display: similar.length === 0 ? 'none' : ''}">
    <div class="container">
      <h2 class="p-section-similar__title">Похожие товары</h2>
    </div>
    <div class="p-section-similar__inner">
      <div class="p-section-similar__list">
        <template v-for="item in similar">
          <ProductCard v-if="item.type === 'product'" :product="item.options"/>
        </template>
      </div>
      <div class="load-more-block">
        <button class="load-more-block__link" @click.prevent="showMore">Показать еще</button>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import ProductCard from '../ProductCard.vue';

  export default {
    name: "Similar",
    components: {
      ProductCard,
    },
    computed: mapState({
      similar: state => state.product.similar,
      loading: state => state.product.similarLoading,
    }),
    methods: {
      showMore() {
      }
    },
  }
</script>

<style scoped>

</style>
