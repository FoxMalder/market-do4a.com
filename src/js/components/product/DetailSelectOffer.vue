<template>
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
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';


  export default {
    name: "DetailSelectOffer",
    data() {
      return {
        visible: false,
      }
    },
    computed: {
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
      selectClick(offer) {
        this.close();
        // this.selectOffer(offer);
        this.$store.dispatch('product/selectOffer', offer);
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
  }
</script>

<style scoped>

</style>
