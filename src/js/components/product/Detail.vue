<template>
  <div class="p-detail__info">
    <!-- Выбор фасовки -->
    <div class="p-detail__control">
      <ControlSelect />
    </div>

    <div class="p-detail__row">
      <ProductPrice />
      <ControlCounter :is-available="isAvailableOffer" :offer="activeOffer" />
    </div>

    <div
      v-if="activeOffer.count_group > 0"
      class="p-detail-availability p-detail-availability_local"
    >
      В наличии сейчас в
      <a
        class="text-link"
        data-anchor
        href="#stores"
      >{{ formatUnit(availableStore.length, ['магазине', 'магазинах', 'магазинах']) }}</a>
    </div>
    <div
      v-else-if="activeOffer.count_remote > 0"
      class="p-detail-availability p-detail-availability_central"
    >
      {{ $store.getters.isRealCity ? 'В наличии на складе в Санкт-Петербурге' : `Доставка в ${$store.getters.currentCity.name}` }}
    </div>
    <div v-else
         class="p-detail-availability p-detail-availability_not-available">
      Под заказ
    </div>

    <div v-show="isAvailableOffer" class="p-detail-delivery">
      <template v-if="activeOffer.count_group > 0">
        <div class="p-detail-delivery__row">
          <span class="p-detail-delivery__key">Самовывоз сегодня</span>
          <span class="p-detail-delivery__value">Бесплатно</span>
        </div>
        <div class="p-detail-delivery__row">
          <span class="p-detail-delivery__key">Курьером до двери завтра</span>
          <span class="p-detail-delivery__value">Бесплатно от {{ freeShipingPrice }}</span>
        </div>
      </template>
      <template v-else-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__row">
          <span class="p-detail-delivery__key">{{ 'До почтового отделения' + shipingPeriod }}</span>
          <span class="p-detail-delivery__value">Бесплатно от {{ freeShipingPrice }}</span>
        </div>
        <div class="p-detail-delivery__row">
          <span class="p-detail-delivery__key">Курьером до двери, от 2 дней</span>
          <span class="p-detail-delivery__value">От 300 ₽</span>
        </div>
      </template>

      <div class="p-detail-delivery__row">
        <transition name="fade">
          <div
            v-show="isVisible"
            class="p-delivery-alert-bg"
            @click.prevent="onClick"
          />
        </transition>

        <div
          class="p-delivery-alert"
          :class="{ 'p-delivery-alert_active': isVisible }"
          @mouseenter="onMouseover"
          @mouseleave="onMouseout"
        >
          Обратите внимание на <span class="p-delivery-alert__link">условия бесплатной доставки</span>

          <transition name="fade">
            <div v-show="isVisible" class="p-delivery-alert__tooltip">
              <div
                ref="tooltipInner"
                class="p-delivery-tooltip"
                @mouseenter="onMouseover"
                @mouseleave="onMouseout"
              >
                <div class="p-delivery-tooltip__title">
                  Товары могут быть из разных городов
                </div>

                <div v-if="courierAvailable">
                  Доставка — бесплатно на заказы от {{ freeShipingPrice }}.
                </div>
                <div>
                  Сумма заказов <strong>считается отдельно</strong> для товаров из каждого города.
                </div>

                <div class="p-delivery-tooltip__subtitle">
                  Узнать, откуда товар, помогут стикеры:
                </div>
                <div class="p-delivery-tooltip__row">
                  <div class="p-delivery-tooltip__col">
                    <div class="p-delivery-badge p-delivery-badge_central">
                      Со склада из СПБ, 7 дней
                    </div>
                    <div>
                      <span class="gray">Товары на </span>
                      <strong>3 000 ₽</strong>
                      <br>
                      будут с бесплатной доставкой
                    </div>
                  </div>

                  <div class="p-delivery-tooltip__col">
                    <div class="p-delivery-badge p-delivery-badge_local">
                      Магазин рядом, 1 день
                    </div>
                    <div v-if="courierAvailable">
                      <span class="gray">Товары от </span>
                      <strong>{{ freeShipingPrice }}</strong>
                      <br>
                      будут с бесплатной доставкой
                    </div>
                    <div v-else>
                      <span class="gray">Товары при любой сумме</span>
                      <br>
                      будут платной доставкой
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    class="p-delivery-tooltip__link"
                    href="/delivery/"
                    target="_blank"
                  >Все условия доставки и оплаты</a>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Utils from '@/utils';

import ControlCounter from './DetailCounterControl.vue';
import ControlSelect from './DetailSelect.vue';
import ProductImage from './DetailGallery.vue';
import ProductPrice from './DetailPrice.vue';


export default {
  name: 'Detail',
  components: {
    ControlCounter,
    ControlSelect,
    ProductImage,
    ProductPrice,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    ...mapState('product', {
      productName: state => state.name,
      textDelivery: state => state.textDelivery,
    }),
    ...mapGetters({
      currentCity: 'currentCity',
      currentStore: 'currentStore',
      activePacking: 'product/activePacking',
      activeOffer: 'product/activeOffer',
      isAvailableOffer: 'product/isAvailableOffer',
    }),
    shipingPeriod() {
      if (this.currentCity && this.currentCity.deliveryCountDays) {
        const min = this.currentCity.deliveryCountDays[0];
        const max = this.currentCity.deliveryCountDays[1];

        return `, ${min === max ? max : `${min}-${max}`} ${Utils.declOfNum(max, ['день', 'дня', 'дней'])}`;
      }

      return '';
    },
    freeShipingPrice() {
      return `${(this.currentCity && this.currentCity.priceDelivery) || '2 990'} ₽`;
    },
    availableStore() {
      return Object.keys(this.activeOffer.available_store)
        .filter(key => this.activeOffer.available_store[key] > 0);
    },
    /**
     * Доступность курьерской доставки
     * @returns {Boolean}
     */
    courierAvailable() {
      return this.currentStore && this.currentStore.courier;
    },
  },
  methods: {
    formatUnit(count, units) {
      return `${count} ${Utils.declOfNum(count, units)}`;
    },

    onClick() {
      clearTimeout(this.timer);
      this.isVisible = false;
    },

    onMouseover() {
      clearTimeout(this.timer);
      // $(this.$refs.tooltip).tooltip('show');
      this.isVisible = true;
    },

    onMouseout() {
      this.timer = setTimeout(() => {
        // $(this.$refs.tooltip).tooltip('hide');
        this.isVisible = false;
      }, 200);
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
