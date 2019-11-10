<template>
  <div class="p-detail__header">
    <div class="p-detail__note">
      <div class="p-delivery-badge p-delivery-badge_local"
           v-if="activeOffer.count_group > 0"
      >Магазин рядом, доставка 1 день</div>
      <div class="p-delivery-badge p-delivery-badge_central"
           v-else-if="activeOffer.count_remote > 0"
      >{{ currentCity ? `Со склада из СПБ в ${currentCity.name}` : 'Со склада из СПБ' }}, 7 дней</div>
    </div>
    <div class="p-detail__category">{{ category }}</div>
    <div class="p-detail__country" v-if="country">Страна: <span class="black">{{ country }}</span></div>
    <a class="p-detail__reviews" data-anchor href="#reviews">{{ reviewsQuantityText }}</a>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Utils from './../../utils/utils';


  export default {
    name: "DetailHeader",
    computed: {
      ...mapState('product', {
        category: 'category',
        country: 'country'
      }),
      ...mapGetters({
        currentCity: 'currentCity',
        activeOffer: 'product/activeOffer',
        activePacking: 'product/activePacking',
      }),
      // isAvailableDeliveryOffer() {
      //   return this.activeOffer
      //     ? (this.activeOffer.count_group === 0 && this.activeOffer.count_remote > 0)
      //     : false;
      // },
      reviewsQuantityText() {
        return this.activePacking.review > 0
          ? `${this.activePacking.review} ${Utils.declOfNum(this.activePacking.review, ['отзыв', 'отзыва', 'отзывов'])}`
          : 'Нет отзывов';
      }
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
