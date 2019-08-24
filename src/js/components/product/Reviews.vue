<template>
  <div class="p-reviews-list">
    <div class="p-reviews-list__message" v-if="reviews.length === 0">Отзывов пока нет</div>
    <div class="p-reviews-list__list" v-else>
      <Review
              v-for="review in reviews"
              :key="review.id"
              :review="review"/>
    </div>
    <div class="load-more-block" :class="{loading: isLoading}" v-if="reviews.length < reviewsCount">
      <button class="load-more-block__link" @click="nextPage">Показать еще</button>
      <div class="load-more-block__value">Показано {{reviews.length}} из {{reviewsCount}}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Review from './Review.vue';

  export default {
    name: "Reviews",
    components: {
      Review,
    },
    computed: mapState({
      reviews: state => state.product.reviews,
      reviewsCount: state => state.product.reviewsCount,
      isLoading: state => state.product.reviewsLoading,
    }),
    methods: {
      ...mapActions('product', {
        nextPage: 'getNextReviews',
        update: 'updateReviews',
        // voteMinus: 'voteMinus',
        // votePlus: 'votePlus',
      }),
    },
    created() {
      // this.update();
    }
  }
</script>

<style scoped>

</style>
