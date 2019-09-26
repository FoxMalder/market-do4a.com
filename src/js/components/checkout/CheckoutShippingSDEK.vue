<template>
  <div class="o-shipping-sdek-pickup">
    <div class="o-shipping-sdek-pickup__address">{пр-т Ленинский 95 корп. 1, 53-Н}</div>
    <div class="o-shipping-sdek-pickup__info">
      <div>{Вс 10:00-16:00, Сб 10:00-16:00, Пн-Пт 10:00-20:00}</div>
      <div><a href="#">{+79061946080}</a></div>
    </div>
    <button class="o-shipping-sdek-pickup__button"
            type="button"
            @click="selectPickup"
    >{{ sdek ? 'Изменить' : 'Выбрать'}} пункт самовывоза</button>
  </div>
</template>

<script>
  export default {
    name: "CheckoutShippingSDEK",
    data() {
      return {
        sdek: false,
      }
    },
    methods: {
      selectPickup() {
        IPOLSDEK_pvz.selectPVZ('moreInfo_sdek-pickup', 'PVZ');
        this.sdek = true;
      }
    }
  }
</script>

<style scoped>

</style>
