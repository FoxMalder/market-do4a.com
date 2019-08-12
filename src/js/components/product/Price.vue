<template>
  <div class="p-price">
    <div class="p-price__new">{{activeOffer.price | formatPrice}}</div>
    <div class="p-price__old" v-if="activeOffer.old_price < activeOffer.price">{{activeOffer.old_price | formatPrice}}</div>
<!--    <div class="p-price__bonuses"><span class="green">+225</span><span class="black"> бонусных рублей</span>-->
<!--      <button class="icon-tooltip" data-toggle="tooltip" title="" data-original-title="Информация о бонусной программе marketdo4a. Как можно потратить бонусные рубли, условия."></button>-->
<!--    </div>-->
    <div class="p-price__note"><span class="gray">Цена актуальна только в интернет-магазине</span>
      <button class="icon-tooltip" data-toggle="tooltip" title="" data-original-title="Информация о бонусной программе marketdo4a. Как можно потратить бонусные рубли, условия."></button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "Price",
    computed: mapGetters('product', [
      'activeOffer',
    ]),
  }
</script>

<style scoped>

</style>
