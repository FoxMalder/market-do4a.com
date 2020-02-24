<template>
  <section v-show="items.length > 0" class="p-section-similar">
    <div class="container">
      <h2 class="p-section-similar__title">
        Похожие товары
      </h2>
    </div>
    <div class="product-list product-list_slider">
      <div class="product-list__wrapper">
        <ProductCard
          v-for="item in items"
          :key="item.options.id"
          :product="item.options"
        />
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
  name: 'Similar',
  components: {
    ProductCard,
  },
  // data() {
  //   return {
  //     collapsed: true,
  //   };
  // },
  computed: mapState('product/similar', {
    items: (state) => state.items.filter((item) => item.type === 'product'),
    loading: (state) => state.similarLoading,
  }),
  mounted() {
    this.update();
  },
  methods: mapActions('product/similar', {
    update: 'update',
  }),
};
</script>

<style scoped>

</style>
