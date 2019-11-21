<template>
  <div class="p-detail__header">
    <div class="p-detail__note">
      <div class="p-delivery-badge p-delivery-badge_central"
           v-if="activeOffer.count_group === 0 && activeOffer.count_remote > 0"
      >Доставка с центрального склада</div>
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
      shipingPeriod() {
        return this.currentCity
          ? `Со склада из СПБ в ${this.currentCity.name}, ${this.currentCity.deliveryCountDays[0]}-${this.currentCity.deliveryCountDays[1]} дней`
          : 'Со склада в Санкт-Петербурге';
      },
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
