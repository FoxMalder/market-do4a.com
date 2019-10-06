<template>
  <div class="p-control-options">
    <div class="p-control-options__wrapper">
      <div class="p-control-options__weight" v-if="packing.length > 1">
        <div class="p-control-radio" :class="{ 'p-control-radio_scroll': packing.length > 4 }">
          <div class="p-control-radio__shadow-left"
               v-if="packing.length > 4"
               :style="{ opacity: Math.min(scrollLeft, 30) / 30 }"
          ></div>
          <div class="p-control-radio__wrapper"
               ref="tabWrapper">
            <div class="p-control-radio__item"
                 v-for="pack in packing"
                 :key="pack.id"
                 :class="{active: pack.id === activePacking.id}">
              <div class="p-control-radio__tooltip" v-if="pack.price_benefit > 0">
                <div class="p-control-radio__tooltip-title">Экономия</div>
                <div class="p-control-radio__tooltip-price">{{pack.price_benefit}}₽</div>
              </div>
              <div class="p-control-radio__label" @click="selectPacking(pack, $event)">{{pack.pack}}</div>
            </div>
          </div>
          <div class="p-control-radio__shadow-right"
               v-if="packing.length > 4"
               :style="{ opacity: Math.min(scrollRight, 30) / 30 }"
          ></div>
        </div>
      </div>
      <div class="p-control-options__type">
        <div class="p-control-select"
             :class="{ show: visible }"
             v-click-outside="close">
          <button class="p-control-select__header"
                  :class="{ notAvailable: !isAvailableOffer }"
                  @click.prevent="toggle">
            <span class="p-control-select__header-label">{{ activeOffer.name }}</span>
            <span class="p-control-select__header-badge"
                  v-show="(availableOffers.length || availableDeliveryOffers.length) && activePacking.textCountOffer"
            >{{activePacking.textCountOffer}}</span>
          </button>
          <div class="p-control-select__list dropdown-menu"
               :class="{ show: visible }">
            
            <template v-if="availableOffers.length > 0">
              <div class="p-control-select__delimiter">
                <span class="p-control-select__delimiter-text">В наличии в магазинах</span>
              </div>
              <div class="p-control-select__item"
                   v-for="offer in availableOffers"
                   :key="offer.id"
                   :class="{ checked: offer.id === activeOffer.id }"
                   @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{ offer.name }}</span>
                <span class="p-control-select__item-info">Осталось {{ offer.count_group }} шт.</span>
              </div>
            </template>
            
            <template v-if="availableDeliveryOffers.length > 0">
              <div class="p-control-select__delimiter">
                <span class="p-control-select__delimiter-text">Доставка с центрального склада</span>
              </div>
              <div class="p-control-select__item"
                   v-for="offer in availableDeliveryOffers"
                   :key="offer.id"
                   :class="{ checked: offer.id === activeOffer.id }"
                   @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{offer.name}}</span>
                <span class="p-control-select__item-info">Осталось {{ offer.count_remote }} шт.</span>
              </div>
            </template>
            
            <template v-if="notAvailableOffers.length > 0">
              <div class="p-control-select__delimiter">
                <span class="p-control-select__delimiter-text">
                  <i class="icon icon-not-available"></i> Нет в наличии
                </span>
              </div>
              <div class="p-control-select__item disabled"
                   v-for="offer in notAvailableOffers"
                   :key="offer.id"
                   :class="{ checked: offer.id === activeOffer.id }"
                   @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{ offer.name }}</span>
              </div>
            </template>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  // import Utils from '../../utils/utils';

  export default {
    name: "ControlSelect",
    data() {
      return {
        visible: false,
        scrollLeft: 0,
        scrollRight: 0,
      }
    },
    computed: {
      ...mapState('product', {
        packing: state => state.packing,
      }),
      ...mapGetters('product', [
        'activePacking',
        'activeOffer',
        'visibleOffers',

        'availableOffers',
        'availableDeliveryOffers',
        'notAvailableOffers',

        'isAvailablePacking',
        'isAvailableOffer'
      ]),
      // availableMoreText() {
      //   if (this.visibleOffers.length === 2) {
      //     return 'Доступен еще 1 вкус';
      //   }
      //   return `Доступно еще ${this.visibleOffers.length - 1} ${Utils.declOfNum(this.visibleOffers.length - 1, ['вкус', 'вкуса', 'вкусов'])}`
      // },
    },
    methods: {
      ...mapActions('product', [
        'selectOffer'
      ]),
      selectPacking(pack, event) {
        this.$store.dispatch('product/selectPacking', pack);

        const selEl = event.currentTarget.parentElement;

        if (selEl.offsetLeft < this.scrollLeft) {
          // this.$refs.tabWrapper.scrollLeft = selEl.offsetLeft - 20;

          $(this.$refs.tabWrapper).animate({
            scrollLeft: selEl.offsetLeft - 20,
          }, 500);

        } else if (this.$refs.tabWrapper.scrollWidth - selEl.offsetLeft - selEl.clientWidth < this.scrollRight) {
          // this.$refs.tabWrapper.scrollLeft = selEl.offsetLeft
          //   + selEl.clientWidth - this.$refs.tabWrapper.clientWidth + 20;

          $(this.$refs.tabWrapper).animate({
            scrollLeft: selEl.offsetLeft
              + selEl.clientWidth - this.$refs.tabWrapper.clientWidth + 20,
          }, 500);
        }
      },
      selectClick(offer) {
        this.close();
        this.selectOffer(offer);
      },
      scrollCalc() {
        this.scrollLeft = this.$refs.tabWrapper.scrollLeft;
        this.scrollRight = this.$refs.tabWrapper.scrollWidth
          - this.$refs.tabWrapper.clientWidth - this.$refs.tabWrapper.scrollLeft;
      },
      
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      toggle() {
        this.visible = !this.visible;
      },
    },
    mounted() {
      if (this.packing.length > 4) {
        this.scrollCalc();
        this.$refs.tabWrapper.addEventListener('scroll', this.scrollCalc);
      }
    },
  }
</script>

<style scoped>

</style>
