<template>
  <div class="p-price">
    <template v-if="isAvailableOffer">
      <div class="p-price__new">{{activeOffer.price | formatPrice}}</div>
      <div class="p-price__old" v-if="activeOffer.old_price > activeOffer.price">
        {{activeOffer.old_price | formatPrice}}
      </div>
      <!--      <div class="p-price__row">-->
      <!--        <div class="p-price__col">-->
      <!--          <span class="green">+225</span> бонусных рублей-->
      <!--        </div>-->
      <!--        <button class="icon-tooltip" data-toggle="tooltip" title="" data-original-title="Информация о бонусной программе marketdo4a. Как можно потратить бонусные рубли, условия."></button>-->
      <!--      </div>-->
      <div class="p-price__row">
        <div class="p-price__col">
          <span class="gray">Цена актуальна только в интернет-магазине</span>
        </div>
        <button class="icon-tooltip" ref="tooltip" data-toggle="tooltip" title="" data-original-title="Цена в магазинах может отличаться. Данная цена актуальна только при онлайн заказе. "></button>
      </div>
    </template>
    <template v-else>
      <div class="p-price__title" v-if="!isAvailableOffer">Последняя цена:</div>
      <div class="p-price__new disabled">{{activeOffer.price | formatPrice}}</div>
      <div class="p-price__alert">
        Подпишитесь на товар, чтобы узнать, когда он снова будет в наличии.
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "Price",
    computed: mapGetters('product', [
      'activeOffer',
      'isAvailableOffer'
    ]),
    mounted() {
      $('[data-toggle="tooltip"]').tooltip();
      // $(this.$refs.tooltip).tooltip();
    }
  }
</script>

<style scoped>

</style>
