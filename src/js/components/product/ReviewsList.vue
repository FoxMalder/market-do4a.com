<template>
  <div class="p-reviews-list">
    <div v-if="count === 0" class="p-reviews-list__message">
      Отзывов пока нет
    </div>
    <template v-else>
      <div class="p-reviews-list__list">
        <ReviewsItem
          v-for="review in reviews"
          :key="review.id"
          :review="review"
        />
      </div>
      <div
        v-if="reviews.length < count"
        class="load-more-block"
        :class="{ loading: isLoading }"
      >
        <button class="load-more-block__link" @click="nextPage">
          Показать еще
        </button>
        <div class="load-more-block__value">
          Показано {{ reviews.length }} из {{ count }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import ReviewsItem from './ReviewsListItem.vue';


export default {
  name: 'Reviews',
  components: {
    ReviewsItem,
  },
  computed: mapState('product/reviews', {
    count: (state) => state.count,
    reviews: (state) => state.items,
    isLoading: (state) => state.reviewsLoading,
  }),
  mounted() {
    this.update();
  },
  methods: mapActions('product/reviews', {
    nextPage: 'nextPage',
    update: 'update',
  }),
};
</script>

<style scoped>
</style>
