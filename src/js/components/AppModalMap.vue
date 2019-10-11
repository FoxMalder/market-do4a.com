<template>
  <div class="m-store-on-map">
    <div class="m-store-on-map__header">
      <div class="m-store-on-map__title">Магазины на карте</div>
    </div>
    <div class="m-store-on-map__mask">
      <yandex-map
        class="m-store-on-map__map"
        :coords="coords"
        :controls="[]"
        :options="options"
        @map-was-initialized="mapInit">
        <!--        <ymap-marker-->
        <!--          v-for="store in $store.state.storeList"-->
        <!--          :key="store.id"-->
        <!--          :marker-id="store.id"-->
        <!--          :coords="store.coords"-->
        <!--          :options="options"-->
        <!--        ></ymap-marker>-->
      </yandex-map>
    </div>
    <!--    <div class="m-store-on-map__footer">-->
    <!--      dfgh-->
    <!--    </div>-->
  </div>
</template>

<script>
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';

  import YandexMaps from '../modules/Maps';


  export default {
    name: "AppModalMap",
    components: {
      yandexMap,
      ymapMarker
    },
    props: {
      storeId: {
        type: Number,
        default: null,
      }
    },
    data() {
      return {
        coords: [55.74954, 37.621587],
        options: {
          avoidFractionalZoom: false
        }
      }
    },
    methods: {
      mapInit(map) {
        map.margin.setDefaultMargin([100, 100, 100, 100]);

        const template = {
          iconLayout: ymaps.templateLayoutFactory.createClass(YandexMaps.defaultOptions.template.icon),
          iconActiveLayout: ymaps.templateLayoutFactory.createClass(YandexMaps.defaultOptions.template.iconActive),
          balloonLayout: ymaps.templateLayoutFactory.createClass(YandexMaps.defaultOptions.template.balloon),
          balloonContentLayout: ymaps.templateLayoutFactory.createClass(YandexMaps.defaultOptions.template.balloonContent),
        };

        const options = {
          hasHint: false,

          // Слой иконки
          iconLayout: template.iconLayout,
          // Смещение иконки
          iconOffset: [-29, -75],
          // Активная область
          iconShape: { type: 'Rectangle', coordinates: [[0, 0], [58, 75]] },

          balloonPanelMaxMapArea: 0,
          // Убираем тень
          balloonShadow: false,
          // Убираем автоматическое перемещение при открытии
          balloonAutoPan: false,
          // Не скрываем иконку при открытом балуне.
          hideIconOnBalloonOpen: false,
          // Смещаем балун, для открытия под иконкой.
          balloonOffset: [-64, 15],
          balloonLayout: template.balloonLayout,
          balloonContentLayout: template.balloonContentLayout,
        };
        
        
        this.$store.state.storeList.forEach((item) => {
          const myPlacemark = new ymaps.Placemark(item.coords, {
            address: item.name,
            tel: item.phone[0],
            link: 'Схема проезда',
            cityId: item.city,
          }, options);

          myPlacemark.events
            .add('balloonopen', () => {
              myPlacemark.options.set('iconLayout', template.iconActiveLayout);
            })
            .add('balloonclose', () => {
              myPlacemark.options.set('iconLayout', template.iconLayout);
            });
          
          // console.log(item);

          map.geoObjects.add(myPlacemark);
          
          if (item.id === this.storeId) {
            // console.log(myPlacemark);
            this.coords = item.coords;
            myPlacemark.balloon.open();
            // myPlacemark.balloon.autoPan();
            // map.panTo(myPlacemark.geometry.coordinates);
            //
          }
        });
        
        if (!this.storeId) {
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
      setPoint(t) {
        console.log('setPoint', t);
      }
    }
  }
</script>

<style scoped>

</style>
