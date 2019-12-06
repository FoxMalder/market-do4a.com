<template>
  <div class="p-review-item" itemprop="review" itemscope itemtype="http://schema.org/Review">
    <div class="container">
      <div class="p-review-item__inner">
        <div class="p-review-item__header">
          <div class="p-review-item__name" itemprop="author">{{review.author}}</div>
          <div class="p-review-item__rating" itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
            <meta itemprop="worstRating" content="0">
            <meta itemprop="bestRating" content="5">
            <meta itemprop="ratingValue" :content="review.raiting">
            <i class="i i-star"
                    v-for="i in [1, 2, 3, 4, 5]"
                    :class="{red: i <= review.raiting}"></i>
          </div>
          <div class="p-review-item__date">{{review.created}}</div>
        </div>
        <div class="p-review-item__body">
          <div class="p-review-item__text" itemprop="description">{{review.text}}</div>
          <div class="p-review-item__vote">
            <button class="btn p-review-item__down-vote"
                    :class="{ active: vote === 'minus' }"
                    @click.prevent="voteMinus(review)">-</button>
            <span class="p-review-item__down-vote-count">{{review.countMinus}}</span>
            <button class="btn p-review-item__up-vote"
                    :class="{ active: vote === 'plus' }"
                    @click.prevent="votePlus(review)">+</button>
            <span class="p-review-item__up-vote-count">{{review.countPlus}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Reviews from '../../api/reviews';
  
  export default {
    name: 'Review',
    props: {
      review: Object,
    },
    data() {
      return {
        vote: '',
      }
    },
    methods: {
      voteMinus(review) {
        if (this.vote === '') {
          Reviews.vote(this.review.id, 'voteMinus').then((data) => {
            this.review.countMinus = data.value;
            this.vote = 'minus';
          });
        } else if (this.vote === 'minus') {
          Reviews.vote(this.review.id, 'voteMinusCanceled').then((data) => {
            this.review.countMinus = data.value;
            this.vote = '';
          });
        }
      },
      votePlus(review) {
        if (this.vote === '') {
          Reviews.vote(this.review.id, 'votePlus').then((data) => {
            this.review.countPlus = data.value;
            this.vote = 'plus';
          });
        } else if (this.vote === 'plus') {
          Reviews.vote(this.review.id, 'votePlusCanceled').then((data) => {
            this.review.countMinus = data.value;
            this.vote = '';
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
