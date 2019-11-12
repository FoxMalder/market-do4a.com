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
    
    <div v-if="activeOffer.count_group > 0"
         class="p-detail-availability p-detail-availability_local">
      В наличии сейчас в
      <a class="text-link" data-anchor href="#stores">{{
        formatUnit(availableStore.length, ['магазине', 'магазинах', 'магазинах'])
        }}</a>
    </div>
    <div v-else-if="activeOffer.count_remote > 0"
         class="p-detail-availability p-detail-availability_central">
      В наличии на складе в Санкт-Петербурге
      <!-- {{ textDelivery || 'В наличии на складе в Санкт-Петербурге' }}-->
    </div>
    <div v-else
         class="p-detail-availability p-detail-availability_not-available">
      Нет в наличии
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
          <div class="p-detail-delivery__key">{{ 'До почтового отделения' + shipingPeriod }}</div>
          <div class="p-detail-delivery__value">{{ 'Бесплатно от ' + freeShipingPrice }}</div>
        </div>
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером до двери, от 2 дней</div>
          <div class="p-detail-delivery__value">От 300 ₽</div>
        </div>
      </template>
      
      <div class="p-detail-delivery__row">
        <div class="p-delivery-alert">
          Обратите внимание на <button class="p-delivery-alert__link" ref="tooltip">условия бесплатной доставки</button>
        </div>
        
        <div class="p-delivery-tooltip" ref="tooltipInner">
          <p class="p-delivery-tooltip__title">Товары могут быть из разных городов</p>
          <p>
            Доставка — бесплатно на заказы от {{ freeShipingPrice }}.<br>
            Сумма заказов <strong>считается отдельно</strong> для товаров из каждого города.<br>
            <br>
            Узнать, откуда товар, помогут стикеры:
          </p>
          <div class="p-delivery-tooltip__row">
            <div class="p-delivery-tooltip__col">
              <div class="p-delivery-badge p-delivery-badge_central">Со склада из СПБ, 7 дней</div>
              <div><span class="gray">Товары на </span> <strong>3 000 ₽</strong></div>
              <div>будут с бесплатной доставкой</div>
            </div>
            <div class="p-delivery-tooltip__col">
              <div class="p-delivery-badge p-delivery-badge_local">Магазин рядом, 1 день</div>
              <div><span class="gray">Товары на </span> <strong>1 000 ₽</strong></div>
              <div>будут с платной доставкой</div>
            </div>
          </div>
          <p><a href="#">Все условия доставки и оплаты</a></p>
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

  import ControlCounter from './DetailCounterControl.vue';
  import ControlSelect from './DetailSelect.vue';
  import ProductImage from './DetailGallery.vue';
  import ProductPrice from './DetailPrice.vue';


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
      shipingPeriod() {
        return (this.currentCity && this.currentCity.deliveryCountDays)
          ? `, ${this.currentCity.deliveryCountDays[0]}-${this.currentCity.deliveryCountDays[1]} дней`
          : '';
      },
      freeShipingPrice() {
        return `${(this.currentCity && this.currentCity.priceDelivery) || '2 990'} ₽`;
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
