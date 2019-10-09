<template>
  <div class="o-shipping-sdek-pickup">
    <template v-if="currentPoint">
      <div class="o-shipping-sdek-pickup__address">{{ currentPoint.Address }}</div>
      <div class="o-shipping-sdek-pickup__info">
        <div>{{ currentPoint.WorkTime }}</div>
        <div><a :href="'tel:' + currentPoint.Phone">{{ currentPoint.Phone }}</a></div>
      </div>
    </template>
    <button class="o-shipping-sdek-pickup__button"
            type="button"
            @click="selectPickup"
    >{{ currentPoint ? 'Изменить' : 'Выбрать'}} пункт самовывоза</button>
  </div>
</template>

<script>
  import SdekModal from './SdekModal.vue';


  export default {
    name: "CheckoutShippingSDEK",
    data() {
      return {
        currentPoint: null,
      }
    },
    computed: {
      cityPointList() {
        // return window.IPOLSDEK_pvz ? window.IPOLSDEK_pvz[window.IPOLSDEK_pvz.curMode][window.IPOLSDEK_pvz.city] : {};
        return window.IPOLSDEK_pvz ? window.IPOLSDEK_pvz.PVZ[window.IPOLSDEK_pvz.city] : {};
      },
    },
    methods: {
      setPickup(id) {
        if (id) {

        }
      },
      selectPickup() {
        this.$modal.open(SdekModal, {
          onClose: (pvzId) => {
            if (!pvzId) {
              return;
            }

            const point = this.cityPointList[pvzId];

            if (!point) {
              return;
            }
            
            this.currentPoint = point;
            
            this.$store.state.checkout.props.sdekPickup = `${window.IPOLSDEK_pvz.city}, ${point.Address} #S${pvzId}`;
          },
          // onDismiss: (data) => {
          //   console.log(data);
          // },

          // Входные данные компонента
          props: {
            cityPointList: this.cityPointList,
          },
          // // Обработчики событий компонента
          // on: {
          //   click(data) {
          //     console.log('penis сработал ', data);
          //   },
          // },
        });
      }
    }
  }
</script>

<style scoped>

</style>
