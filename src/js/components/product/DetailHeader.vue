<template>
  <div class="p-detail__header">
    <div class="p-detail__note" v-if="$store.state.isLocaleStore">
      <div v-if="activeOffer.count_group > 0"
           class="p-delivery-badge p-delivery-badge_local">{{ textDeliveryLocal }}</div>
      <div v-else-if="activeOffer.count_remote > 0"
           class="p-delivery-badge p-delivery-badge_central">{{ textDeliveryCentral }}</div>
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
        country: 'country',
        textDeliveryCentral: 'textDeliveryCentral',
        textDeliveryLocal: 'textDeliveryLocal',
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
        if (this.currentCity && this.currentCity.deliveryCountDays) {
          const min = this.currentCity.deliveryCountDays[0];
          const max = this.currentCity.deliveryCountDays[1];

          return `Со склада из СПБ в ${this.currentCity.name}, ${min === max ? max : min + '-' + max} ${Utils.declOfNum(max, ['день', 'дня', 'дней'])}`;
        }

        return 'Со склада в Санкт-Петербурге';
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
