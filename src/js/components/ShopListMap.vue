<template>
  <yandex-map
    :coords="coords"
    :zoom="zoom"
    :options="options"
    :controls="[]"
    :debug="true"
    @map-was-initialized="mapInit">
    <!--    <ymap-marker-->
    <!--      v-for="store in storeList"-->
    <!--      :key="store.id"-->
    <!--      :marker-id="store.id"-->
    <!--      :coords="store.coords"-->
    <!--      :options="{ preset: 'do4a#default' }"-->
    <!--      :properties="{-->
    <!--            address: store.name,-->
    <!--            tel: store.phone[0],-->
    <!--            link: 'Схема проезда',-->
    <!--            cityId: store.cityId,-->
    <!--          }"-->
    <!--    />-->
  </yandex-map>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';

  import YandexMaps from '../modules/Maps';


  export default {
    name: "ShopListMap",
    components: {
      yandexMap,
      ymapMarker
    },
    model: {
      prop: 'currentStoreId',
      event: 'change'
    },
    props: {
      currentStoreId: {
        type: Number,
        requared: false,
      }
    },
    data() {
      return {
        coords: [55.74954, 37.621587],
        zoom: 17,
        options: {
          // autoFitToViewport: 'always',
          avoidFractionalZoom: false
        }
      }
    },
    watch: {
      currentStoreId(a, b) {
        console.log('сменилось c', b, ' на ', a);
        if (!this.objectManager) {
          return;
        }

        if (a) {
          this.openBalloon(a);
        } else {
          this.objectManager.objects.balloon.close();
        }
      }
    },
    methods: {
      mapInit(map) {
        console.log('init');
        this.map = map;

        // this.map.margin.setDefaultMargin([100, 100, 100, 100]);
        this.map.margin.setDefaultMargin(200);


        // Создаем менеджер объектов
        this.objectManager = YandexMaps.createObjectManager(ymaps);
        this.objectManager.add({
          type: 'FeatureCollection',
          features: this.$store.state.storeList.map((item) => ({
            type: 'Feature',
            id: item.id,
            geometry: {
              type: 'Point',
              coordinates: item.coords,
            },
            properties: {
              address: item.name,
              tel: item.phone[0],
              link: 'Схема проезда',
              cityId: item.cityId,
            },
          })),
        });


        this.objectManager.objects.options.set('openBalloonOnClick', false);


        this.objectManager.objects.events
          .add('click', (e) => {
            if (this.objectManager.objects.balloon.isOpen(e.get('objectId'))) {
              this.$emit('change', null);
              // this.currentStoreId = null;
            } else {
              this.$emit('change', e.get('objectId'));
              // this.currentStoreId = e.get('objectId');
            }
          });

        // Добавляем менеджер на карту
        this.map.geoObjects.add(this.objectManager);


        // this.$nextTick(() => {
        //   this.map.container.fitToViewport();
        // });

        const size = this.map.container.getSize();
        
        if (size[0] === 0 || size[1] === 0) {
          return;
        }

        if (this.currentStoreId) {
          console.log('setCenter', this.currentStoreId);
          this.openBalloon(this.currentStoreId);
          return;
        }

        console.log('setBounds');
        const poits = this.$store.state.storeList
          .filter(item => item.cityId === this.$store.state.cityId)
          .map(item => item.coords);

        if (poits.length) {
          this.map.setBounds(ymaps.util.pixelBounds.fromPoints(poits), {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true,
            // дробных коэффициентов масштабирования
            preciseZoom: true,
            useMapMargin: true,
          });
        } else {
          this.map.setBounds(this.map.geoObjects.getBounds(), {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true,
            // дробных коэффициентов масштабирования
            preciseZoom: true,
            useMapMargin: true,
          });
        }
      },

      openBalloon(objectId) {
        this.objectManager.objects.balloon
          .open(objectId)
          .then(() => {
            const object = this.objectManager.objects.getById(objectId);
            
            console.log('Открываем балун');
            // this.coords = object.geometry.coordinates;
            // this.zoom = 17;

            // console.log(this.objectManager);
            // console.log(object);
            
            // if (document.documentElement.clientWidth < 1240) {
              this.map.setCenter(object.geometry.coordinates, 16, {
                duration: 1000,
                timingFunction: 'ease-in-out',
                useMapMargin: true,
                checkZoomRange: true
              });
            // } else {
            //   this.map.panTo(object.geometry.coordinates, {
            //     // flying: false,
            //     checkZoomRange: true,
            //     // дробных коэффициентов масштабирования
            //     preciseZoom: true,
            //     useMapMargin: true,
            //   })
            // }
          })


        // this.map.setBounds(ymaps.util.pixelBounds.fromPoints([object.geometry.coordinates]), {
        //   // Проверяем наличие тайлов на данном масштабе.
        //   checkZoomRange: true,
        //   // дробных коэффициентов масштабирования
        //   preciseZoom: true,
        //   useMapMargin: true,
        // });


        // this.objectManager.objects.balloon.autoPan();

        // if (object) {
        //   this.objectManager.objects.balloon.open(objectId);
        //   this.objectManager.objects.balloon.autoPan();
        //   // this.map.panTo(object.geometry.coordinates);
        // }
      }
    },
    beforeDestroy() {
      this.objectManager.objects.balloon.close();
    }
  }
</script>

<style scoped>

</style>
