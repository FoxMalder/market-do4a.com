<template>
  <div class="p-detail__header">
    <div v-if="$store.state.isLocaleStore && $store.getters.isRealCity" class="p-detail__note">
      <div
        v-if="activeOffer.count_group > 0"
        class="p-delivery-badge p-delivery-badge_local"
        v-text="textDeliveryLocal || 'Магазин рядом'"
      />
      <div
        v-else-if="activeOffer.count_remote > 0"
        class="p-delivery-badge p-delivery-badge_central"
        v-text="textDeliveryCentral || 'Со склада в Санкт-Петербурге'"
      />
    </div>
    <a
      class="p-detail__category"
      :href="sectionLink"
      :title="sectionTitle"
    >{{ category }}</a>

    <div v-if="country" class="p-detail__country">
      Страна: <span class="black">{{ country }}</span>
    </div>

    <a
      class="p-detail__reviews"
      data-anchor
      href="#reviews"
    >{{ reviewsQuantityText }}</a>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Utils from '@/utils/utils';


export default {
  name: 'DetailHeader',
  computed: {
    ...mapState('product', {
      category: 'category',
      country: 'country',
      sectionTitle: 'sectionTitle',
      sectionLink: 'sectionLink',
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
    reviewsQuantityText() {
      return this.activePacking.review > 0
        ? `${this.activePacking.review} ${Utils.declOfNum(this.activePacking.review, ['отзыв', 'отзыва', 'отзывов'])}`
        : 'Нет отзывов';
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
