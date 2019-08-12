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
              <div class="p-control-radio__tooltip-price">{{pack.price_benefit}}</div>
            </div>
            <div class="p-control-radio__label" @click="selectPacking(pack)">{{pack.pack}}</div>
          </div>
        </div>
      </div>
      <div class="p-control-options__type">
        <div class="p-control-select">
          <button class="p-control-select__header" data-toggle="dropdown" ref="dropdownHeader">
            <div class="p-control-select__header-label">{{activeOffer.name}}</div>
            <div class="p-control-select__header-badge">
              Доступно {{formatUnit(availableOffers.length + remoteOffers.length)}}
            </div>
          </button>
          <div class="p-control-select__list dropdown-menu" role="form">
            
            <div class="p-control-select__delimiter" v-if="availableOffers.length > 0">
              <div class="p-control-select__delimiter-text">В наличии в магазинах</div>
            </div>
            <div class="p-control-select__item" v-for="offer in availableOffers" @click="selectClick(offer)">
              <div class="p-control-select__label">
                <div class="p-control-select__item-name">{{offer.name}}</div>
                <div class="p-control-select__item-info">Осталось {{offer.count}} шт.</div>
              </div>
            </div>
            
            <div class="p-control-select__delimiter" v-if="remoteOffers.length > 0">
              <div class="p-control-select__delimiter-text">Доставка с центрального склада</div>
            </div>
            <div class="p-control-select__item" v-for="offer in remoteOffers" @click="selectClick(offer)">
              <div class="p-control-select__label">
                <div class="p-control-select__item-name">{{offer.name}}</div>
                <div class="p-control-select__item-info">Осталось {{offer.count_remote}} шт.</div>
              </div>
            </div>
            
            <div class="p-control-select__delimiter" v-if="notAvailableOffers.length > 0">
              <div class="p-control-select__delimiter-text">Нет в наличии</div>
            </div>
            <div class="p-control-select__item disabled" v-for="offer in notAvailableOffers">
              <div class="p-control-select__label">
                <div class="p-control-select__item-name">{{offer.name}}</div>
              </div>
            </div>
          
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
        'visibleOffers',
        'activeOffer',
      ]),
      availableOffers() {
        return this.visibleOffers.filter(item => item.count > 0);
      },
      remoteOffers() {
        return this.visibleOffers.filter(item => item.count === 0 && item.count_remote > 0);
      },
      notAvailableOffers() {
        return this.visibleOffers.filter(item => item.count === 0 && item.count_remote === 0);
      },
    },
    methods: {
      ...mapActions('product', [
        'selectPacking',
        'selectOffer'
      ]),
      formatUnit(count) {
        return `${count} ${Utils.declOfNum(count, ['вкус', 'вкуса', 'вкусов'])}`
      },
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
