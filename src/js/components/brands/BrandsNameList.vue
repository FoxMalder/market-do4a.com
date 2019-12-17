<template>
  <div
    ref="macy"
    class="brand-name-list"
    role="tabpanel"
  >
    <div
      v-for="(item, key) in chars"
      :key="key"
      class="brand-name-list__col"
    >
      <div class="brand-name-list__content">
        <div class="brand-name-list__title">
          {{ key }}
        </div>
        <div
          v-for="brand in item"
          :key="brand.id"
          class="brand-name-list__item"
        >
          <a :href="brand.url">{{ brand.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Macy from 'macy';


export default {
  name: 'BrandsNameList',
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chars() {
      const f = {};

      this.brands.forEach((item) => {
        const char = item.name[0];
        if (!f[char]) {
          f[char] = [];
        }

        f[char].push(item);
      });


      return f;
    },
  },
  watch: {
    chars(newValue, oldValue) {
      this.$nextTick(() => {
        this.macy.reInit();
      });
    },
  },
  activated() {
    this.$nextTick(() => {
      this.macy.recalculate();
    });
  },
  mounted() {
    this.macy = Macy({
      container: this.$refs.macy,
      trueOrder: false,
      useOwnImageLoader: true,
      // margin: 24,
      mobileFirst: true,
      columns: 2,
      breakAt: {
        1240: 6,
        768: 4,
        576: 3,
      },
    });
  },
};
</script>
