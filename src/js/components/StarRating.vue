<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="rating in ratings"
            :class="{'is-selected': ((temp_value >= rating) && temp_value != null), 'is-disabled': disabled}"
            @click="set(rating)"
            @mouseover="star_over(rating)"
            @mouseout="star_out">
      <input class="star-rating star-rating__checkbox" type="radio" name="rating"
            :value="rating"
            v-model="value"
            :disabled="disabled">★ </label>
  </div>
</template>

<script>
  export default {
    name: "StarRating",
    props: {
      // 'name': String,
      // 'value': null,
      // 'id': String,
      'disabled': Boolean,
      // 'required': Boolean
    },
    data() {
      return {
        value: null,
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
        }
      }
    }
  }
</script>

<style scoped>
  .star-rating__checkbox {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
  
  .star-rating__star {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    line-height: 1;
    font-size: 1.5em;
    color: #ababab;
    /*transition: color 0.2s ease-out;*/
  }
  
  .star-rating__star:hover {
    cursor: pointer;
  }
  
  .star-rating__star.is-selected {
    color: #f4412d;
  }
  
  .star-rating__star.is-disabled:hover {
    cursor: default;
  }

</style>
