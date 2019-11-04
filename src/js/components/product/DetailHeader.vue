<template>
  <div class="p-detail__header">
    <div class="p-detail__note">
      <transition name="fade">
        <span v-show="isAvailableDeliveryOffer">Доставка с центрального склада</span>
      </transition>
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
      ...mapGetters('product', [
        'activeOffer',
        'activePacking',
        'isAvailableDeliveryOffer',
      ]),
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

<style scoped>

</style>
