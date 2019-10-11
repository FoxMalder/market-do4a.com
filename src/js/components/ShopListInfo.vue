<template>
  <div class="s-map">
    <div class="s-map__header">
      <a href="#" class="s-map__tab"
         v-for="tab in tabs"
         :class="{active: tab.key === currentTab}"
         @click.prevent="currentTab = tab.key">{{ tab.name }}</a>
    </div>
    <div class="s-map__content">
      <yandex-map
        v-show="currentTab === 'map'"
        class="s-map__map"
        :coords="coords"
        :controls="[]"
        :options="options"
        @map-was-initialized="mapInit">
      </yandex-map>
      <div
        v-show="currentTab === 'way'"
        class="s-map__way"
      >
        <b>Добраться на машине:</b>
        <p>проезжаете по ул. Белинского до ТЦ «Этажи», паркуетесь на большой стоянке у торгового центра - с нее будет
          видно нашу вывеску в цоколе серой новостройки.
        </p>
        <b>Добраться пешком:</b>
        <p>от остановки "Полтавская" - проходите вдоль улицы до ТЦ "Этажи". Выйдя на большую стоянку ТЦ "Этажи" увидите
          нашу вывеску - в цокольном этаже серой новостройки.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { yandexMap, ymapMarker } from 'vue-yandex-maps';

  import YandexMaps from '../modules/Maps';


  export default {
    name: "ShopListInfo",
    components: {
      yandexMap,
      ymapMarker
    },
    data() {
      return {
        currentTab: 'map',
        tabs: [
          {
            key: 'map',
            name: 'Карта',
          },
          {
            key: 'way',
            name: 'Как добраться',
          },
          // {
          //   key: 'photo',
          //   name: 'Фото',
          // },
        ],
        coords: [55.74954, 37.621587],
        options: {
          avoidFractionalZoom: false
        }
      }
    },
    created() {
      this.$root.$on('map:set', this.openBalloon);
    },
    methods: {
      mapInit(map) {
        this.map = map;
        
        
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


        // Создаем менеджер объектов
        this.objectManager = new ymaps.ObjectManager({
          clusterize: true,
        });


        // Устанавливаем пресет кластера
        this.objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

        this.objectManager.objects.options.set(options);

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

        // Добавляем менеджер на карту
        map.geoObjects.add(this.objectManager);

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
              cityId: item.city,
            },
          })),
        });


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
      },
      setPoint(t) {
        console.log(this.currentTab, 'setPoint', t);
      },
      openBalloon(objectId) {
        const object = this.objectManager.objects.getById(objectId);

        this.objectManager.objects.balloon.open(objectId);
        // this.objectManager.objects.balloon.autoPan();
        this.map.panTo(object.geometry.coordinates);
      }
    }
  }
</script>

<style scoped>

</style>
