<template>
  <div class="m-store-on-map">
    <div class="m-store-on-map__header">
      <div class="m-store-on-map__title">Магазины на карте</div>
    </div>
    <div class="m-store-on-map__mask">
      <ShopListMap
        class="m-store-on-map__map"
        v-model="currentStoreId"
      />
      <!--      <ShopListMap-->
      <!--        class="m-store-on-map__map"-->
      <!--        @change="setPoint"-->
      <!--        :currentStoreId="currentStoreId"-->
      <!--      />-->
    </div>
    <div class="m-store-on-map__footer">
      <div class="m-store-on-map__way row" v-if="activeStore">
        <div class="col-xl-6" v-if="activeStore.wayOnAuto">
          <div>Добраться на машине:</div>
          <p class="gray" v-html="activeStore.wayOnAuto"></p>
        </div>
        <div class="col-xl-6" v-if="activeStore.wayOnFoot">
          <div>Добраться пешком:</div>
          <p class="gray" v-html="activeStore.wayOnFoot"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopListMap from './ShopListMap.vue';


  export default {
    name: "AppModalMap",
    components: {
      ShopListMap
    },
    props: {
      storeId: {
        type: Number,
        default: null,
      }
    },
    data() {
      return {
        currentStoreId: this.storeId,
      }
    },
    computed: {
      activeStore() {
        return this.$store.getters.getStoreById(this.currentStoreId);
      },
    },
    methods: {
      setPoint(storeId) {
        console.log('setPoint', storeId);
        this.currentStoreId = storeId;
      }
    }
  }
</script>

<style scoped>

</style>
