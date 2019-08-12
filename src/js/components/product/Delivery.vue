<template>
  <div class="p-detail-delivery">
    <div class="p-detail-delivery__row" v-if="activeOffer.count > 0">
      <div class="p-detail-delivery__key">
        Самовывоз из
        <a class="text-link nowrap" data-anchor href="#stores">{{formatUnit}}</a>
        сегодня
      </div>
      <div class="p-detail-delivery__value">Бесплатно</div>
    </div>
    <div class="p-detail-delivery__row" v-if="activeOffer.count_remote > 0">
      <div class="p-detail-delivery__key">Курьером послезавтра</div>
      <div class="p-detail-delivery__value">Бесплатно от 2 990 ₽</div>
    </div>
    <div class="p-detail-delivery-info__bottom">
      Оплата картой онлайн <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i>
      <i class="icon icon-mir"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Utils from '../../utils/utils';

  export default {
    name: "Delivery",
    data() {
      return {
        test: 11,
      };
    },
    computed: {
      ...mapGetters('product', [
        'activeOffer',
      ]),

      formatUnit() {
        return `${this.test} ${Utils.declOfNum(this.test, ['магазина', 'магазинов', 'магазинов'])}`
      }
    },
  }
</script>

<style scoped>

</style>
