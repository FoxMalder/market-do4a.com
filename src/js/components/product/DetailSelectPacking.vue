<template>
  <div class="p-control-radio" :class="{ 'p-control-radio_scroll': packing.length > 4 }">
    <!--    <div class="p-control-radio__shadow-left"-->
    <!--         v-if="packing.length > 4"-->
    <!--         :style="{ opacity: Math.min(scrollLeft, 30) / 30 }"-->
    <!--    ></div>-->
    <div
      ref="tabWrapper"
      class="p-control-radio__wrapper"
    >
      <div
        v-for="pack in packing"
        :key="pack.id"
        class="p-control-radio__item"
        :class="{
          active: pack.id === activePacking.id,
          disabled: pack.availableOffers === 0
        }"
      >
        <div
          v-if="pack.price_benefit > 0"
          class="p-control-radio__tooltip"
        >
          <div class="p-control-radio__tooltip-title">
            Экономия
          </div>
          <div class="p-control-radio__tooltip-price">
            {{ pack.price_benefit + '₽' }}
          </div>
        </div>
        <div class="p-control-radio__label" @click="selectPacking(pack, $event)">
          {{ pack.pack }}
        </div>
      </div>
    </div>
    <!--    <div class="p-control-radio__shadow-right"-->
    <!--         v-if="packing.length > 4"-->
    <!--         :style="{ opacity: Math.min(scrollRight, 30) / 30 }"-->
    <!--    ></div>-->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';


export default {
  name: 'DetailSelectPacking',
  data() {
    return {
      scrollLeft: 0,
      scrollRight: 0,
    };
  },
  computed: {
    ...mapState('product', {
      packing: (state) => state.packing
        .map((pack) => ({
          ...pack,
          availableOffers: pack.sku.filter((item) => item.count_group > 0 || item.count_remote > 0).length,
        }))
        // Сортируем по количеству доступных фасовок
        .sort((a, b) => b.availableOffers - a.availableOffers)
        // Перемещаем пробники в конец
        .sort((a, b) => {
          if (a.isTester && !b.isTester) {
            return 1;
          }
          if (!a.isTester && b.isTester) {
            return -1;
          }
          return 0;
        }),
    }),

    ...mapGetters('product', [
      'activePacking',
    ]),
  },
  mounted() {
    if (this.packing.length > 4) {
      this.scrollCalc();
      // this.$refs.tabWrapper.addEventListener('scroll', this.scrollCalc);
      this.$refs.tabWrapper.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          this.$refs.tabWrapper.scrollLeft = this.$refs.tabWrapper.scrollLeft + e.deltaY;
          // console.log(e.deltaY);
        }
      });
    }
  },
  methods: {
    selectPacking(pack, event) {
      this.$store.dispatch('product/selectPacking', pack);

      const selEl = event.currentTarget.parentElement;

      $(this.$refs.tabWrapper).animate({
        scrollLeft: selEl.offsetLeft - (this.$refs.tabWrapper.clientWidth / 2) + (selEl.clientWidth / 2),
      }, 300);


      // if (selEl.offsetLeft < this.scrollLeft) {
      //   // this.$refs.tabWrapper.scrollLeft = selEl.offsetLeft - 20;
      //
      //   $(this.$refs.tabWrapper).animate({
      //     scrollLeft: selEl.offsetLeft - 20,
      //   }, 200);
      //
      // } else if (this.$refs.tabWrapper.scrollWidth - selEl.offsetLeft - selEl.clientWidth < this.scrollRight) {
      //   // this.$refs.tabWrapper.scrollLeft = selEl.offsetLeft
      //   //   + selEl.clientWidth - this.$refs.tabWrapper.clientWidth + 20;
      //
      //   $(this.$refs.tabWrapper).animate({
      //     scrollLeft: selEl.offsetLeft
      //       + selEl.clientWidth - this.$refs.tabWrapper.clientWidth + 20,
      //   }, 200);
      // }
    },

    scrollCalc() {
      this.scrollLeft = this.$refs.tabWrapper.scrollLeft;
      this.scrollRight = this.$refs.tabWrapper.scrollWidth
        - this.$refs.tabWrapper.clientWidth - this.$refs.tabWrapper.scrollLeft;
    },
  },
};
</script>

<style scoped>

</style>
