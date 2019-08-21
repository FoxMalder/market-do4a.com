<template>
  <div class="p-detail__info">
    <div class="p-detail__control">
      <ControlSelect/>
    </div>
    
    <div class="p-detail__availability">
      <template v-if="activeOffer.count > 0">
        <i class="icon icon-available"></i> В наличии сейчас в
        <a class="text-link" data-anchor href="#stores">
          {{formatUnit(availableStore.length, ['магазине', 'магазинах', 'магазинах'])}}
        </a>
      </template>
      
      <template v-else-if="activeOffer.count_remote > 0"
      ><i class="icon icon-truck"></i> {{textDelivery}}</template>
      
      <template v-else
      ><i class="icon icon-not-available"></i> Нет в наличии</template>
    </div>
    
    <div class="p-detail__row">
      <ProductPrice/>
      <ControlCounter/>
    </div>
    
    <div class="p-detail-delivery" v-if="isAvailableOffer">
      
      <template v-if="activeOffer.count > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">
            Самовывоз из
            <a class="text-link nowrap" data-anchor href="#stores">{{ formatUnit(availableStore.length, ['магазина',
              'магазинов', 'магазинов'])}}
            </a>
            сегодня
          </div>
          <div class="p-detail-delivery__value">Бесплатно</div>
        </div>
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером завтра</div>
          <div class="p-detail-delivery__value">Бесплатно от 2 990 ₽</div>
        </div>
        <div class="p-detail-delivery-info__bottom">Оплата при получении</div>
      </template>
      
      <template v-else-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером</div>
          <div class="p-detail-delivery__value">Бесплатно от 2 990 ₽</div>
        </div>
        <div class="p-detail-delivery-info__bottom">
          Оплата картой онлайн <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i>
          <i class="icon icon-mir"></i>
        </div>
      </template>
    
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Utils from '../../utils/utils';

  import ControlCounter from './ControlCounter.vue';
  import ControlSelect from './ControlSelect.vue';
  import ProductImage from './ImageBlock.vue';
  import ProductPrice from './Price.vue';

  export default {
    name: "Detail",
    components: {
      ControlCounter,
      ControlSelect,
      ProductImage,
      ProductPrice,
    },
    computed: {
      ...mapState('product', {
        productName: state => state.name,
        textDelivery: state => state.textDelivery,
      }),
      ...mapGetters('product', [
        'activePacking',
        'activeOffer',
        'isAvailableOffer'
      ]),
      availableStore() {
        return Object.keys(this.activeOffer.available_store).filter(key => this.activeOffer.available_store[key] > 0)
      },
    },
    methods: {
      formatUnit(count, units) {
        return `${count} ${Utils.declOfNum(count, units)}`
      }
    }
  }
</script>

<style scoped>

</style>
