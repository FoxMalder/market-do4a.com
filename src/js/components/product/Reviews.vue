<template>
  <div class="p-reviews-list">
    <div class="p-reviews-list__message" v-if="reviews.length === 0">Отзывов пока нет</div>
    <div class="p-reviews-list__list" v-else>
      <div class="p-review-item"
              v-for="review in reviews"
              :key="review.id">
        <div class="container">
          <div class="p-review-item__inner">
            <div class="p-review-item__header">
              <div class="p-review-item__name">{{review.author}}</div>
              <div class="p-review-item__rating">
                <i class="i i-star"
                        v-for="i in [1, 2, 3, 4, 5]"
                        :class="{red: i <= review.raiting}"></i>
              </div>
              <div class="p-review-item__date">{{review.created}}</div>
            </div>
            <div class="p-review-item__body">
              <div class="p-review-item__text">{{review.text}}</div>
              <div class="p-review-item__vote">
                <button class="btn p-review-item__down-vote" @click.prevent="voteMinus(review)">-</button>
                <span class="p-review-item__down-vote-count">{{review.countMinus}}</span>
                <button class="btn p-review-item__up-vote" @click.prevent="votePlus(review)">+</button>
                <span class="p-review-item__up-vote-count">{{review.countPlus}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more-block" :class="{loading: isLoading}" v-if="reviews.length < reviewsCount">
      <button class="load-more-block__link" @click="nextPage">Показать еще</button>
      <div class="load-more-block__value">Показано {{reviews.length}} из {{reviewsCount}}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "Reviews",
    computed: mapState({
      reviews: state => state.product.reviews,
      reviewsCount: state => state.product.reviewsCount,
      isLoading: state => state.product.reviewsLoading,
    }),
    methods: {
      ...mapActions('product', {
        nextPage: 'getNextReviews'
      }),
      voteMinus(review) {
        console.log('voteMinus');
      },
      votePlus(review) {
        console.log('votePlus');
      }
    }
  }
</script>

<style scoped>

</style>
