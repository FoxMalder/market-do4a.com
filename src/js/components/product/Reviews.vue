<template>
  <div class="p-reviews-list">
    <div class="p-reviews-list__message" v-if="activePacking.review === 0">Отзывов пока нет</div>
    <template v-else>
      <div class="p-reviews-list__list">
        <Review v-for="review in reviews"
                :key="review.id"
                :review="review"/>
      </div>
      <div class="load-more-block" :class="{ loading: isLoading }" v-if="reviews.length < activePacking.review">
        <button class="load-more-block__link" @click="nextPage">Показать еще</button>
        <div class="load-more-block__value">Показано {{ reviews.length }} из {{ activePacking.review }}</div>
      </div>
    </template>
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
    computed: {
      ...mapState('product', {
        reviews: state => state.reviews,
        // reviewsCount: state => state.reviewsCount,
        isLoading: state => state.reviewsLoading,
      }),
      ...mapGetters({
        activePacking: 'product/activePacking',
      })
    },
    methods: mapActions('product', {
      nextPage: 'getNextReviews',
    }),
    created() {
      this.$store.dispatch('product/updateReviews');
    }
  }
</script>

<style scoped>
</style>
