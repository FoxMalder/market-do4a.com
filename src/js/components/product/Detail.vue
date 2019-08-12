<template>
  <div class="p-detail__col p-detail__col_top">
    <h1 class="p-detail__name">{{productName}}</h1>
    
    <div class="p-detail__subtitle">
      <div class="p-detail__message" v-if="!activeOffer.count && activeOffer.count_remote > 0">
        Доставка с центрального склада
      </div>
    </div>
    
    <div class="p-detail__left-block">
      <ProductImage/>
      
      <div class="p-brand-info">
        <div class="p-brand-info__logo">
          <img src="https://marketdo4a.com/upload/resizer/7d/66387_140x38_7dbec6b23aff8ec9f413175944ea2fc3.png">
        </div>
        <div class="p-brand-info__text">Официальная поставка от бренда</div>
        <a class="p-brand-info__link" href="#">Все товары Optimum Nutrition</a>
      </div>
    </div>
    
    <div class="p-detail__header">
      <a class="p-detail__reviews" href="#reviews" data-anchor>
        {{formatUnit(activePacking.review, ['отзыв', 'отзыва', 'отзывов'])}}
      </a>
      <div class="p-detail__category">Комплексный протеин</div>
      <div class="p-detail__country">Страна: <span class="black">США</span></div>
    </div>
    
    <div class="p-detail__control">
      <ControlSelect/>
    </div>
    
    <div class="p-detail__availability">
      <template
              v-if="activeOffer.count > 0">
        <i class="icon icon-circle-check green"></i> В наличии сейчас в
        <a class="text-link" data-anchor href="#stores">
          {{formatUnit(availableStore.length, ['магазине', 'магазинах', 'магазинах'])}}
        </a>
      </template>
      <template
              v-else-if="activeOffer.count_remote > 0">
        <i class="icon icon-truck"></i> Доставка почтой в Нижний новгород с 23.04 по 26.04
      </template>
    </div>
    
    <div class="p-detail__row">
      <ProductPrice/>
      <ControlCounter/>
    </div>
    
    <div class="p-detail-delivery">
      
      <div class="p-detail-delivery__row"
              v-if="activeOffer.count > 0">
        <div class="p-detail-delivery__key">
          Самовывоз из
          <a class="text-link nowrap" data-anchor href="#stores">
            {{formatUnit(availableStore.length, ['магазина', 'магазинов', 'магазинов'])}}</a>
          сегодня
        </div>
        <div class="p-detail-delivery__value">Бесплатно</div>
      </div>
      
      <div class="p-detail-delivery__row"
              v-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__key">Курьером послезавтра</div>
        <div class="p-detail-delivery__value">Бесплатно от 2 990 ₽</div>
      </div>
      
      <div class="p-detail-delivery-info__bottom">
        Оплата картой онлайн <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i>
        <i class="icon icon-mir"></i>
      </div>
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
      }),
      ...mapGetters('product', [
        'activePacking',
        'activeOffer',
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
