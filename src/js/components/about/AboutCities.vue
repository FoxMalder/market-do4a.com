<template>
  <div class="a-section-shops__list">
    <AboutCitiesItem :list="list" :duration="500" :index="index % list.length" />
    <AboutCitiesItem :list="list" :duration="700" :index="(index + 1) % list.length" />
    <AboutCitiesItem :list="list" :duration="900" :index="(index + 2) % list.length" />
  </div>
</template>

<script>
import AboutCitiesItem from './AboutCitiesItem.vue';


export default {
  name: 'AboutCities',
  components: {
    AboutCitiesItem,
  },
  data() {
    return {
      index: 0,
      list: [],
    };
  },
  created() {
    const list = [];

    this.$store.state.cityList.forEach((city) => {
      const storeList = this.$store.getters.getStoreListByCityId(city.id);
      if (!storeList) {
        return;
      }

      const store = storeList.find((item) => item.gallery);
      if (!store) {
        return;
      }

      if (city.id === this.$store.state.cityId) {
        list.unshift({
          name: city.name,
          img: store.gallery,
          count: storeList.length,
        });
      } else {
        list.push({
          name: city.name,
          img: store.gallery,
          count: storeList.length,
        });
      }
    });

    this.list = list;
  },
  mounted() {
    setInterval(() => {
      this.nextSlide();
    }, 6000);
  },
  methods: {
    nextSlide() {
      this.index = Math.round(Math.random() * (this.list.length - 1));
    },
  },
};
</script>

<style scoped>

</style>
