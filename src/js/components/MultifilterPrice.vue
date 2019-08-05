<template>
  <div class="multifilter-price">
    <input type="hidden" name="Price[from]" v-model="minRange">
    <input type="hidden" name="Price[to]" v-model="maxRange">
    <div class="multifilter-price__title">
      <div class="multifilter-price__start">От</div>
      <div class="multifilter-price__end">До</div>
    </div>
    <div class="multifilter-price__range">
      <div class="input-range" ref="slider"></div>
    </div>
    <div class="multifilter-price__num">
      <div class="multifilter-price__start">{{slider.priceMin}} ₽</div>
      <div class="multifilter-price__end">{{slider.priceMax}} ₽</div>
    </div>
  </div>
</template>

<script>
  import noUiSlider from 'nouislider';
  import Dropdown from './Dropdown.vue';

  export default {
    name: "MultifilterPrice",
    components: {
      Dropdown,
    },
    props: {
      slider: {
        default: false,
        type: Object,
      }
    },
    data() {
      return {
        callback: true,
        minRange: null,
        maxRange: null,
        // slider: {
        //   priceFrom: 0,
        //   priceTo: 2740,
        //   priceMin: 0,
        //   priceMax: 2740,
        // }
      }
    },
    mounted() {
      noUiSlider.create(this.$refs.slider, {
        start: [this.slider.priceFrom, this.slider.priceTo],
        step: 1,
        connect: true,
        tooltips: true,
        range: {
          min: this.slider.priceMin,
          max: this.slider.priceMax,
        },
        format: {
          to(value) {
            return `${Math.floor(value)} ₽`;
          },
          from(value) {
            return value.replace(/[^0-9]/g, '');
          },
        },
        cssPrefix: 'input-range',
        cssClasses: {
          target: '',
          base: '__base',
          origin: '__origin',
          handle: '__handle',
          handleLower: '__handle-lower',
          handleUpper: '__handle-upper',
          touchArea: '__touch-area',
          horizontal: '_horizontal',
          vertical: '_vertical',
          background: '__background',
          connect: '__connect',
          connects: '__connects',
          ltr: '_ltr',
          rtl: '_rtl',
          draggable: '_draggable',
          drag: '_state-drag',
          tap: '_state-tap',
          active: '__active',
          tooltip: '__tooltip',

          // Шкала
          pips: '__pips',
          pipsHorizontal: '__pips_horizontal',
          pipsVertical: '__pips_vertical',

          // Деления на шкале
          marker: '__marker',
          markerHorizontal: '__marker_horizontal',
          markerVertical: '__marker_vertical',
          markerNormal: '__marker_normal',
          markerLarge: '__marker_large',
          markerSub: '__marker_sub',

          // Значения на шкале
          value: '__value',
          valueHorizontal: '__value_horizontal',
          valueVertical: '__value_vertical',
          valueNormal: '__value_normal',
          valueLarge: '__value_large',
          valueSub: '__value_sub',
        },
      });

      this.$refs.slider.noUiSlider.on('update', (values, handle) => {
        const t = parseInt(values[handle]);
        this[handle ? 'maxRange' : 'minRange']
          = (t !== this.slider[handle ? 'priceMax' : 'priceMin']) ? t : '';
      });

      this.$refs.slider.noUiSlider.on('set', () => {
        if (this.callback) {
          // this.$root.$emit('filter:change');
          this.$emit('change');
          // this.$store.dispatch('filters/filterChange');
        }
      }, 100);

      // this.$store.subscribeAction((action, state) => {
      //   console.log(action.type);
      //   console.log(action.payload);
      // });

      this.$root.$on('filter:reset', () => {
        this.callback = false;
        this.$refs.slider.noUiSlider.reset();
        this.callback = true;
      });

      // this.rangeEl.noUiSlider.on('set', this.onChange, 100);
    },
    methods: {}
  }
</script>

<!--<style scoped>-->

<!--</style>-->
