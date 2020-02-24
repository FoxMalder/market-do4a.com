<template>
  <section id="reviews" class="p-section-reviews">
    <div class="container">
      <ReviewsHeader />
    </div>
    <ReviewsList />
  </section>
</template>

<script>
import ReviewsHeader from './ReviewsHeader.vue';
import ReviewsList from './ReviewsList.vue';


export default {
  name: 'SectionReviews',
  components: {
    ReviewsHeader,
    ReviewsList,
  },
};
</script>

<style scoped>

</style>
