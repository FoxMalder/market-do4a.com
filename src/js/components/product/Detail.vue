<template>
  <div class="p-detail__info">
    <div class="p-detail__control">
      <ControlSelect/>
    </div>
    
    <!--    <div class="p-detail__availability" v-if="!isAvailableOffer">-->
    <!--      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
    <!--        <circle cx="10" cy="10" r="10" fill="#C0C0C0"/>-->
    <!--        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3703 7.75295L12.2468 6.62941L10 8.87617L7.75324 6.62939L6.6297 7.75292L8.87649 9.99971L6.6291 12.2471L7.75264 13.3706L10 11.1232L12.2474 13.3706L13.3709 12.2471L11.1236 9.99971L13.3703 7.75295Z" fill="white"/>-->
    <!--      </svg>-->
    <!--      <span>Нет в наличии</span>-->
    <!--    </div>-->
    
    <div class="p-detail__row">
      <ProductPrice/>
      <ControlCounter :isAvailable="isAvailableOffer" :offer="activeOffer"/>
    </div>
    
    
    <div class="p-detail-availability p-detail-availability_not-available"
         v-if="!isAvailableOffer">
      Нет в наличии
    </div>
    <div class="p-detail-availability p-detail-availability_local"
         v-else-if="activeOffer.count_group > 0">
      В наличии сейчас в
      <a class="text-link" data-anchor href="#stores">{{ formatUnit(availableStore.length,
        ['магазине', 'магазинах', 'магазинах']) }}</a>
    </div>
    <div class="p-detail-availability p-detail-availability_central"
         v-else-if="activeOffer.count_remote > 0">
      {{ textDelivery || 'В наличии на складе в Санкт-Петербурге' }}
    </div>
    
    <div class="p-detail-delivery" v-show="isAvailableOffer">
      <template v-if="activeOffer.count_group > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Самовывоз сегодня</div>
          <div class="p-detail-delivery__value">Бесплатно</div>
        </div>
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером до двери завтра</div>
          <div class="p-detail-delivery__value">Бесплатно от {{ freeShipingPrice }}</div>
        </div>
      </template>
      <template v-else-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">До почтового отделения, 2-7 дней</div>
          <div class="p-detail-delivery__value">Бесплатно от {{ freeShipingPrice }}</div>
        </div>
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером до двери, 2-7 дней</div>
          <div class="p-detail-delivery__value">Бесплатно от {{ freeShipingPrice }}</div>
        </div>
      </template>
      
      <div class="p-detail-delivery__row">
        <div class="p-delivery-alert">Обратите внимание на <a class="p-delivery-alert__link" href="#" ref="tooltip">условия бесплатной доставки</a></div>
  
        <div class="p-delivery-tooltip" ref="tooltipInner">
          <p class="p-delivery-tooltip__title">Бесплатная доставка от 2 990 ₽</p>
          <p>
            Сумма бесплатной доставки складывается отдельно для каждого склада.
            Стикеры укажут, с какого склада будет отправлен заказ. Например:
          </p>
          <div class="p-delivery-tooltip__row">
            <div class="p-delivery-tooltip__col">
              <div class="p-delivery-badge p-delivery-badge_local">Магазин рядом, 1 день</div>
              <div><span class="gray">Итого:</span> <strong>1 246 ₽</strong></div>
              <div>Платная доставка</div>
            </div>
            <div class="p-delivery-tooltip__col">
              <div class="p-delivery-badge p-delivery-badge_central">Со склада из СПБ, 7 дней</div>
              <div><span class="gray">Итого:</span> <strong>3 394 ₽</strong></div>
              <div class="red">Бесплатная доставка</div>
            </div>
          </div>
          <p class="p-delivery-tooltip__title">Стоимость обычной доставки</p>
          <p><span class="gray">Самовывоз</span> Всегда бесплатно</p>
          <p><span class="gray">Курьером до двери</span> от 300 ₽ по городу</p>
        </div>
      </div>
      
      <div class="p-detail-delivery__row" v-if="activeOffer.count_group > 0">
        <div class="p-detail-delivery__key">Оплата при получении</div>
        <div class="p-detail-delivery__value">Картой или наличными</div>
      </div>
      <div class="p-detail-delivery__row" v-else-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__key">Оплата картой онлайн</div>
        <div class="p-detail-delivery__value">
          <i class="icon icon-visa"></i>
          <i class="icon icon-mastercard"></i>
          <i class="icon icon-mir"></i>
        </div>
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
        textDelivery: state => state.textDelivery,
      }),
      ...mapGetters({
        currentCity: 'currentCity',
        activePacking: 'product/activePacking',
        activeOffer: 'product/activeOffer',
        isAvailableOffer: 'product/isAvailableOffer'
      }),
      freeShipingPrice() {
        return `${this.currentCity ? this.currentCity.priceDelivery : '2 990'} ₽`;
      },
      availableStore() {
        return Object.keys(this.activeOffer.available_store).filter(key => this.activeOffer.available_store[key] > 0)
      },
    },
    methods: {
      formatUnit(count, units) {
        return `${count} ${Utils.declOfNum(count, units)}`
      }
    },
    updated() {
      this.$nextTick(() => {
        $(this.$refs.tooltip).tooltip({
          html: true,
          title: this.$refs.tooltipInner,
          template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner tooltip-inner_auto"></div></div>'
        });
      })
    },
    mounted() {
      this.$nextTick(() => {
        $(this.$refs.tooltip).tooltip({
          html: true,
          title: this.$refs.tooltipInner,
          template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner tooltip-inner_auto"></div></div>'
        });
      })
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
