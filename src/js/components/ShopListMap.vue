<template>
  <yandex-map
    class="s-map__map"
    :coords="coords"
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
<!--            cityId: store.city,-->
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
    props: {
      currentStoreId: {
        type: Number,
        requared: false,
      }
    },
    data() {
      return {
        coords: [55.74954, 37.621587],
        options: {
          // autoFitToViewport: 'always',
          avoidFractionalZoom: false
        }
      }
    },
    created() {
      console.log('created');
      
      this.featureCollection = {
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
            cityId: item.city,
          },
        })),
      };

      //
      // this.$root.$on('map:set', (id) => {
      //   console.log('map:set', id);
      //   this.map.container.fitToViewport();
      //   // const storeId = parseInt(id, 10);
      //   // this.openBalloon(storeId);
      // });
    },
    watch: {
      currentStoreId(a, b) {
        console.log('сменилось c', b, ' на ', a);
        if (!this.objectManager) {
          return;
        }

        if (a) {
          const object = this.objectManager.objects.getById(a);
          this.objectManager.objects.balloon.open(a);
          this.coords = object.geometry.coordinates;
        } else {
          this.objectManager.objects.balloon.close();
        }
      }
    },
    // computed: {
    //   storeList() {
    //     return this.$store.state.storeList
    //   },
    //   // placemarks() {
    //   //
    //   // }
    // },
    methods: {
      mapInit(map) {
        console.log('init');
        this.map = map;


        this.template = YandexMaps.createDefaultPreset(ymaps);


        map.margin.setDefaultMargin([100, 100, 100, 100]);


        // Создаем менеджер объектов
        this.objectManager = new ymaps.ObjectManager({
          clusterize: false,
        });


        // Устанавливаем пресет кластера
        this.objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

        this.objectManager.objects.options.set('preset', 'do4a#default');

        this.objectManager.objects.events
          // Меняем маркер при открытии балуна
          .add('balloonopen', (e) => {
            this.objectManager.objects.setObjectOptions(e.get('objectId'), {
              iconLayout: this.template.iconActiveLayout,
            });
          })
          // Меняем маркер обратно
          .add('balloonclose', (e) => {
            this.objectManager.objects.setObjectOptions(e.get('objectId'), {
              iconLayout: this.template.iconLayout,
            });
          })
          // Скрываем балун при повторном клике на метку
          .add('click', (e) => {
            if (this.objectManager.objects.balloon.isOpen(e.get('objectId'))) {
              this.objectManager.objects.balloon.close();
            }
          });

        this.objectManager.add(this.featureCollection);

        // Добавляем менеджер на карту
        map.geoObjects.add(this.objectManager);


        // this.$nextTick(() => {
        //   this.map.container.fitToViewport();
        // });


        if (this.currentStoreId) {
          console.log('init', this.currentStoreId);
          const object = this.objectManager.objects.getById(this.currentStoreId);
          this.objectManager.objects.balloon.close();
          this.objectManager.objects.balloon.open(this.currentStoreId);
          this.coords = object.geometry.coordinates;
        } else {
          const poits = this.$store.state.storeList
            .filter(item => item.city === this.$store.state.cityId)
            .map(item => item.coords);

          if (poits.length) {
            map.setBounds(ymaps.util.pixelBounds.fromPoints(poits), {
              // Проверяем наличие тайлов на данном масштабе.
              checkZoomRange: true,
              preciseZoom: true,
              useMapMargin: true,
            });
          } else {
            map.setBounds(map.geoObjects.getBounds(), {
              // Проверяем наличие тайлов на данном масштабе.
              checkZoomRange: true,
              preciseZoom: true,
              useMapMargin: true,
            });
          }
        }
      },

      openBalloon(objectId) {
        const object = this.objectManager.objects.getById(objectId);

        console.log(object, this.objectManager.getObjectState(objectId));

        this.objectManager.objects.balloon.open(objectId);
        // this.map.panTo(object.geometry.coordinates);
        this.coords = object.geometry.coordinates;
        // this.objectManager.objects.balloon.autoPan();

        // if (object) {
        //   this.objectManager.objects.balloon.open(objectId);
        //   this.objectManager.objects.balloon.autoPan();
        //   // this.map.panTo(object.geometry.coordinates);
        // }
      }
    }
  }
</script>

<style scoped>

</style>
