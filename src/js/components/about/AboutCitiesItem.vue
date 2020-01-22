<template>
  <div class="a-shops-city">
    <div class="a-shops-city__mask">
      <transition
        appear
        mode="out-in"
        :duration="duration"
      >
        <figure
          :key="index"
          class="a-shops-city__img"
          :style="{ backgroundImage: `url(${activeCity.img})` }"
        />
      </transition>
    </div>
    <div ref="label" class="a-shops-city__label">
      <transition
        appear
        mode="out-in"
        @before-leave="beforeLeave"
        @enter="enter"
      >
        <div :key="index" class="a-shops-city__body">
          <h3 class="a-shops-city__name">
            {{ activeCity.name }}
          </h3>
          <div class="a-shops-city__quantity">
            {{ text(activeCity.count) }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils';


export default {
  name: 'AboutCity',
  props: {
    duration: {
      type: Number,
      default: 500,
    },
    index: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    activeCity() {
      return this.list[this.index];
    },
  },
  methods: {
    beforeLeave(e) {
      this.$refs.label.style.width = `${e.offsetWidth}px`;
    },
    enter(e) {
      this.$refs.label.style.width = `${e.offsetWidth}px`;
    },
    text(count) {
      return `${count} ${Utils.declOfNum(count, ['магазин', 'магазина', 'магазинов'])}`;
    },
  },
};
</script>

<style scoped>
</style>
