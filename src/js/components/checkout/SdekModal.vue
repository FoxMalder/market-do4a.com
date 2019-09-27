<template>
  <div class="sdek-pickup-modal">
    <div class="sdek-pickup-modal__header">
      <div class="sdek-pickup-modal__title">Выбрать пункт самовывоза</div>
    </div>
    <div class="sdek-pickup-modal__container">
      <div class="sdek-pickup-modal__mask">
        <yandex-map class="sdek-pickup-modal__map" :coords="[0, 0]">
          <ymap-marker
            v-for="(item, name) in cityPointList"
            :marker-id="name"
            :coords="[item.cY, item.cX]"
            :callbacks="{ click: onClick(name) }"
          ></ymap-marker>
        </yandex-map>
      </div>
      <div class="sdek-pickup-modal__list">
        <div class="sdek-pickup-list">
          <div class="sdek-pickup-list__header">
            <div class="sdek-pickup-list__title">Сдэк в {city}</div>
          </div>
          <div class="sdek-pickup-list__list">
            <div class="sdek-pickup-item"
                 v-for="(item, name) in cityPointList"
                 :data-name="name"
                 :class="{ active: name === activePoint }"
                 @mouseenter="onEnter(name)"
                 @mouseleave="onLeave(name)">
              <div class="sdek-pickup-item__address">{{ item.Address }}</div>
              <div class="sdek-pickup-item__info">
                <div>Дата самовывоза: <span class="black">{15 мая}</span></div>
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


  export default {
    name: "SdekModal",
    components: { yandexMap, ymapMarker },
    props: {
      cityPointList: {
        type: Object,
        required: true,
      }
    },
    data: () => ({
      // coords: [54, 39],
      activePoint: null,
    }),
    // computed: {
    //   cityPointList() {
    //     // return window.IPOLSDEK_pvz.PVZ[window.IPOLSDEK_pvz.city]
    //     return window.IPOLSDEK_pvz[window.IPOLSDEK_pvz.curMode][window.IPOLSDEK_pvz.city]
    //   },
    // },
    methods: {
      onClick(name) {
        // console.log('Click', name);
        // this.activePoint = name;
        // // this.coords = e.get('coords');
      },
      setPoint(name) {
        this.$emit('modal:close', name);
      },
      onEnter(name) {
        // console.log('Enter', name);
      },
      onLeave(name) {
        // console.log('Leave', name);
      },
    }
  }
</script>

<style scoped>
</style>
