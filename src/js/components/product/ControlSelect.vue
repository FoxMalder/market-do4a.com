<template>
  <div class="p-control-options">
    <div class="p-control-options__wrapper">
      <div class="p-control-options__weight">
        <div class="p-control-radio">
          <div class="p-control-radio__item"
                  v-for="pack in packing"
                  :key="pack.id"
                  :class="{active: pack.id === activePacking.id}">
            <div class="p-control-radio__tooltip" v-if="pack.price_benefit > 0">
              <div class="p-control-radio__tooltip-title">Экономия</div>
              <div class="p-control-radio__tooltip-price">{{pack.price_benefit}}₽</div>
            </div>
            <div class="p-control-radio__label" @click="selectPacking(pack)">{{pack.pack}}</div>
          </div>
        </div>
      </div>
      <div class="p-control-options__type">
        <div class="p-control-select">
          <button class="p-control-select__header" :class="{notAvailable: !isAvailableOffer}" data-toggle="dropdown" ref="dropdownHeader">
            <span class="p-control-select__header-label">{{activeOffer.name}}</span>
            <span class="p-control-select__header-badge" v-if="isAvailablePacking">{{availableMoreText}}</span>
          </button>
          <div class="p-control-select__list dropdown-menu" role="form">
            
            <template v-if="availableOffers.length > 0">
              <div class="p-control-select__delimiter">
                <span class="p-control-select__delimiter-text">В наличии в магазинах</span>
              </div>
              <div class="p-control-select__item"
                      v-for="offer in availableOffers"
                      :key="offer.id"
                      :class="{checked: offer.id === activeOffer.id}"
                      @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{offer.name}}</span>
                <span class="p-control-select__item-info">Осталось {{offer.count}} шт.</span>
              </div>
            </template>
            
            <template v-if="availableDeliveryOffers.length > 0">
              <div class="p-control-select__delimiter">
                <span class="p-control-select__delimiter-text">Доставка с центрального склада</span>
              </div>
              <div class="p-control-select__item"
                      v-for="offer in availableDeliveryOffers"
                      :key="offer.id"
                      :class="{checked: offer.id === activeOffer.id}"
                      @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{offer.name}}</span>
                <span class="p-control-select__item-info">Осталось {{offer.count_remote}} шт.</span>
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
                      :class="{checked: offer.id === activeOffer.id}"
                      @click="selectClick(offer)">
                <span class="p-control-select__item-name">{{offer.name}}</span>
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
  import Utils from '../../utils/utils';

  export default {
    name: "ControlSelect",
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
      availableMoreText() {
        if (this.visibleOffers.length === 2) {
          return 'Доступен еще 1 вкус';
        }
        return `Доступно еще ${this.visibleOffers.length - 1} ${Utils.declOfNum(this.visibleOffers.length - 1, ['вкус', 'вкуса', 'вкусов'])}`
      }
    },
    methods: {
      ...mapActions('product', [
        'selectPacking',
        'selectOffer'
      ]),
      // formatUnit(count, units) {
      //   return `${count} ${Utils.declOfNum(count, units)}`
      //   // return `${count} ${Utils.declOfNum(count, ['вкус', 'вкуса', 'вкусов'])}`
      // },
      selectClick(offer) {
        $(this.$refs.dropdownHeader).dropdown('hide');
        this.selectOffer(offer);
      }
    },
    mounted() {
      $(this.$refs.dropdownHeader).dropdown({
        display: 'static',
      });
    },
    // created() {
    //   this.$store.dispatch('product/getAllPacking');
    //
    // }
  }
</script>

<style scoped>

</style>
