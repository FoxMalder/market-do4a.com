<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="rating in ratings"
            :class="{ 'selected': ((temp_value >= rating) && temp_value != null), 'disabled': disabled }"
            @click="set(rating)"
            @mouseover="star_over(rating)"
            @mouseout="star_out">
      <input class="star-rating__checkbox" type="radio" name="rating" required
            :value="rating"
            v-model="value"
            :disabled="disabled">
      <svg class="star-rating__icon" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 0L30.4656 16.1008L47.7764 17.2746L34.4616 28.3992L38.6946 45.2254L24 36L9.30537 45.2254L13.5384 28.3992L0.223587 17.2746L17.5344 16.1008L24 0Z" fill="currentColor"/>
      </svg>
    </label>
    
    <div class="star-rating__value">{{ temp_value }}</div>
  </div>
</template>

<script>
  export default {
    name: "StarRating",
    props: {
      // 'name': String,
      'value': null,
      // 'id': String,
      'disabled': Boolean,
      // 'required': Boolean
    },
    data() {
      return {
        // value: null,
        temp_value: null,
        ratings: [1, 2, 3, 4, 5]
      };
    },

    methods: {
      /*
       * Behaviour of the stars on mouseover.
       */
      star_over(index) {
        if (!this.disabled) {
          this.temp_value = index;
        }
      },

      /*
       * Behaviour of the stars on mouseout.
       */
      star_out() {
        if (!this.disabled) {
          this.temp_value = this.value;
        }
      },

      /*
       * Set the rating.
       */
      set(value) {
        if (!this.disabled) {
          this.temp_value = value;
          this.value = value;
          this.$emit('input', value);
        }
      }
    }
  }
</script>

<style scoped>

</style>
