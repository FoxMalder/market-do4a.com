<template>
  <form class="p-modal-form" @submit.prevent="onSubmit">
    <h2 class="p-modal-form__title">Оставить отзыв</h2>
    <div class="p-modal-form__rating">
      <div class="p-modal-form__rating-text">Твоя оценка:</div>
      <div class="p-modal-form__rating-stars">
        <div class="star-rating">
          <label class="star-rating__star" v-for="rating in [1, 2, 3, 4, 5]"
                 :class="{ 'selected': temp_value >= rating }"
                 @click="props.rating = temp_value = rating"
                 @mouseover="temp_value = rating"
                 @mouseout="temp_value = props.rating">
            <input class="star-rating__checkbox"
                   type="radio" name="rating" required
                   :value="rating"
                   v-model="props.rating">
            <svg class="star-rating__icon" viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 0L30.4656 16.1008L47.7764 17.2746L34.4616 28.3992L38.6946 45.2254L24 36L9.30537 45.2254L13.5384 28.3992L0.223587 17.2746L17.5344 16.1008L24 0Z" fill="currentColor"/>
            </svg>
          </label>
          <div class="star-rating__value">{{ temp_value }}</div>
        </div>
      </div>
    </div>
    <div class="n-form-row">
      <div class="col-md-6">
        <div class="n-form-group">
          <div class="n-form-group__field">
            <div class="input-field input-field_primary">
              <label class="input-field__label" for="modal-form-review-name">Как тебя зовут?*</label>
              <input class="input-field__input" id="modal-form-review-name"
                     type="text" name="name" required
                     v-model="props.name">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="n-form-group">
          <div class="n-form-group__field">
            <div class="input-field input-field_primary">
              <label class="input-field__label" for="modal-form-review-email">Твой e-mail*</label>
              <input class="input-field__input" id="modal-form-review-email"
                     type="email" name="email" required
                     v-model="props.email">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--      <div class="p-modal-form__row n-form-row">-->
    <!--        <div class="p-modal-form__col col-6">-->
    <!--          <div class="input-field input-field_primary">-->
    <!--            <label class="input-field__label" for="modal-form-review-name">Как тебя зовут?*</label>-->
    <!--            <input class="input-field__input" id="modal-form-review-name"-->
    <!--                   type="text" name="name" required-->
    <!--                   v-model="props.name">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="p-modal-form__col col-6">-->
    <!--          <div class="input-field input-field_primary">-->
    <!--            <label class="input-field__label" for="modal-form-review-email">Твой e-mail*</label>-->
    <!--            <input class="input-field__input" id="modal-form-review-email"-->
    <!--                   type="email" name="email" required-->
    <!--                   v-model="props.email">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <div class="p-modal-form__textarea">
      <div class="input-field input-field_primary">
        <label class="input-field__label" for="modal-form-review-text">Оставить свой отзыв</label>
        <textarea class="input-field__input" id="modal-form-review-text"
                  ref="textarea" name="text"
                  v-model="props.text"></textarea>
      </div>
    </div>
    <div class="p-modal-form__note">
      Оставляя отзыв на сайте, вы подтверждаете своё согласие на обработку <a href="/policy-privacy/" target="_blank">
      персональных данных</a>
    </div>
    <div class="p-modal-form__footer">
      <button class="p-modal-form__button btn btn-red btn-block btn-skew"
              type="submit" disabled
              v-if="status === 'loading'">
        <span class="btn-icon"><span class="spinner-border" role="status"></span></span>
      </button>
      <button class="p-modal-form__button btn btn-red btn-block btn-skew"
              type="submit"
              v-else>
        <svg class="btn-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.86372 5.40662C9.90956 5.34708 9.93209 5.27229 9.92694 5.19677C9.92178 5.12124 9.88931 5.05036 9.83582 4.99788C9.78233 4.94541 9.71165 4.91508 9.63748 4.91278C9.56331 4.91049 9.49096 4.93639 9.43445 4.98546L4.06854 9.6435L1.23493 8.52531C1.11167 8.47718 1.00454 8.39395 0.92627 8.28552C0.848003 8.17708 0.801892 8.048 0.793416 7.91361C0.784939 7.77921 0.814454 7.64517 0.878452 7.52739C0.942451 7.40961 1.03824 7.31305 1.15444 7.2492L12.9182 0.525365C13.0106 0.47455 13.1149 0.450302 13.2198 0.455211C13.3247 0.46012 13.4263 0.494001 13.5138 0.553238C13.6013 0.612474 13.6714 0.694843 13.7166 0.791554C13.7618 0.888265 13.7805 0.995686 13.7705 1.10236L12.7386 12.0778C12.7283 12.1904 12.6923 12.2989 12.6337 12.3948C12.575 12.4907 12.4952 12.5713 12.4006 12.6302C12.306 12.6891 12.1992 12.7247 12.0888 12.734C11.9784 12.7434 11.8673 12.7264 11.7645 12.6843L8.31587 11.3218L6.15093 13.3918C6.07103 13.468 5.971 13.5186 5.86321 13.5374C5.75542 13.5561 5.6446 13.5423 5.54446 13.4974C5.44432 13.4526 5.35926 13.3788 5.29978 13.2852C5.24031 13.1916 5.20903 13.0822 5.20983 12.9707V11.345L9.86372 5.40662Z" fill="currentColor"></path>
        </svg>
        Отправить отзыв
      </button>
    </div>
  </form>
</template>

<script>
  import TextareaAutoHeight from '../../plugins/TextareaAutoHeight';
  import Reviews from '../../api/reviews';
  import StarRating from '../StarRating.vue';


  export default {
    name: "ReviewsModal",
    components: {
      StarRating,
    },
    data() {
      return {
        status: '',
        temp_value: 5,
        props: {
          name: '',
          email: '',
          text: '',
          rating: 5,
          source: '',
        }
      }
    },
    mounted() {
      new TextareaAutoHeight(this.$refs.textarea);
    },
    methods: {
      onSubmit() {
        this.status = 'loading';

        this.$store.dispatch('product/addReview', this.props)
          .then(() => {
            this.$emit('modal:close');
            this.status = null;
          })
          .catch(() => {
            this.status = null;
          });
      }
    }
  }
</script>

<style scoped>

</style>
