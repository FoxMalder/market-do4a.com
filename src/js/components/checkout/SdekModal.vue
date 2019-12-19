<template>
  <div class="sdek-pickup-modal">
    <div class="sdek-pickup-modal__header">
      <div class="sdek-pickup-modal__title">Выбрать пункт самовывоза</div>
    </div>
    <div class="sdek-pickup-modal__tabs">

    </div>

    <div class="sdek-pickup-modal__tabs" role="tablist">
      <a class="sdek-pickup-modal__tab" role="tab" href="#sdek-list" aria-controls="sdek-list"
         :class="{ active: currentTab === 'list' }"
         @click.prevent="currentTab = 'list'"
      >Из списка</a>
      <a class="sdek-pickup-modal__tab" role="tab" href="#sdek-map" aria-controls="sdek-map"
         :class="{ active: currentTab === 'map' }"
         @click.prevent="currentTab = 'map'"
      >Карта</a>
    </div>
    <div class="sdek-pickup-modal__container">
      <div class="sdek-pickup-modal__mask" role="tabpanel" id="#sdek-map"
           v-show="breakpoint !== 'xs' || currentTab === 'map'">
        <!--        <div class="sdek-pickup-modal__map"></div>-->
        <yandex-map class="sdek-pickup-modal__map"
                    :coords="coords"
                    @map-was-initialized="mapInit">
          <ymap-marker
            v-for="(item, name) in cityPointList"
            :key="name"
            :marker-id="name"
            :hint-content="item.Address"
            :balloon="{ body: item.Address }"
            :options="{ hideIconOnBalloonOpen: false }"
            :coords="[item.cY, item.cX]"
            :callbacks="{
              click() { onClick(name) },
              // mouseenter() { onEnter(name) },
              // mouseleave() { onLeave(name) },
             }"
          ></ymap-marker>
        </yandex-map>
      </div>
      <div class="sdek-pickup-modal__list" role="tabpanel" id="#sdek-list"
           v-show="breakpoint !== 'xs' || currentTab === 'list'">
        <div class="sdek-pickup-list">
          <div class="sdek-pickup-list__header">
            <div class="sdek-pickup-list__title">Сдэк в {{ currentCity }}</div>
          </div>
          <div class="sdek-pickup-list__list" ref="pickupList">
            <div class="sdek-pickup-item"
                 v-for="(item, name) in cityPointList"
                 :key="name"
                 :data-name="name"
                 @mouseenter="onEnter(name)"
                 @mouseleave="onLeave(name)">
              <div class="sdek-pickup-item__address">{{ item.Address }}</div>
              <div class="sdek-pickup-item__info">
                <!--                <div>Дата самовывоза: <span class="black">{15 мая}</span></div>-->
                <div>{{ item.WorkTime }}</div>
                <div><a href="#">{{ item.Phone }}</a></div>
              </div>
              <button class="sdek-pickup-item__button" @click="setPoint(name)">Выбрать</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

// // Полагаем, что на странице подключен jQuery.
// var $mapElement = $('#map'),
//   myMap = new ymaps.Map(
//     $mapElement[0],
//     ymaps.util.bounds.getCenterAndZoom([
//         [55.7, 37.6],
//         [55.8, 37.7]
//       ],
//       [$mapElement.width(), $mapElement.height()]
//     )
//   );


export default {
  name: "SdekModal",
  components: { yandexMap, ymapMarker },
  props: {
    cityPointList: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      coords: [55.74954, 37.621587],
      activePoint: '',
      currentTab: 'list',
      breakpoint: this.getBreakpoint(),
    }
  },
  computed: {
    currentCity() {
      return window.IPOLSDEK_pvz.city;
    },
    // cityPointList() {
    //   // return window.IPOLSDEK_pvz.PVZ[window.IPOLSDEK_pvz.city]
    //   return window.IPOLSDEK_pvz[window.IPOLSDEK_pvz.curMode][window.IPOLSDEK_pvz.city]
    // },
  },
  methods: {
    getBreakpoint() {
      if (document.documentElement.clientWidth < 768) {
        return 'xs';
      }
      if (document.documentElement.clientWidth < 1240) {
        return 'md';
      }
      return 'xl';
    },

    onClick(name) {
      const selEle = this.$refs.pickupList.querySelector(`[data-name="${name}"]`);

      [].forEach.call(this.$refs.pickupList.children, (item) => {
        item.classList.remove('active');
      });

      selEle.classList.add('active');
      if (selEle.offsetTop < this.$refs.pickupList.scrollTop) {
        // this.$refs.pickupList.scrollTop = selEle.offsetTop - 50;

        $(this.$refs.pickupList).animate({
          scrollTop: selEle.offsetTop - 50,
        }, 1000);

      } else if (selEle.offsetTop + selEle.clientHeight
        > this.$refs.pickupList.scrollTop + this.$refs.pickupList.clientHeight) {
        // this.$refs.pickupList.scrollTop = selEle.offsetTop
        //   - this.$refs.pickupList.clientHeight
        //   + selEle.clientHeight + 50;

        $(this.$refs.pickupList).animate({
          scrollTop: selEle.offsetTop
            - this.$refs.pickupList.clientHeight
            + selEle.clientHeight + 50,
        }, 1000);
      }


      // this.activePoint = name;
    },
    setPoint(name) {
      this.$emit('modal:close', name);
    },
    onEnter(name) {
      // console.log('Enter', name);
      this.activePoint = name;
    },
    onLeave(name) {
      // console.log('Leave', name);
    },
    mapInit(map) {
      const width = this.$refs.pickupList.getBoundingClientRect().width;
      map.margin.setDefaultMargin([0, 50, 0, width]);

      map.setBounds(map.geoObjects.getBounds(), {
        // Проверяем наличие тайлов на данном масштабе.
        checkZoomRange: true,
        preciseZoom: true,
        useMapMargin: true,
      });
    }
  }
}
</script>

<style scoped>
</style>
