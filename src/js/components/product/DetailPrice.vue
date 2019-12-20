<template>
  <div class="p-price">
    <template v-if="isAvailableOffer">
      <div class="p-price__new">
        {{ activeOffer.price | formatPrice }}
      </div>
      <div
        v-if="activeOffer.old_price > activeOffer.price"
        class="p-price__old"
      >
        {{ activeOffer.old_price | formatPrice }}
      </div>
      <!--<div class="p-price__row">-->
      <!--  <div class="p-price__col">-->
      <!--    <span class="green">+225</span> бонусных рублей-->
      <!--  </div>-->
      <!--  <button-->
      <!--    class="icon-tooltip"-->
      <!--    data-toggle="tooltip"-->
      <!--    title=""-->
      <!--    data-original-title="Информация о бонусной программе marketdo4a. Как можно потратить бонусные рубли, условия."-->
      <!--  />-->
      <!--</div>-->
      <div class="p-price__row">
        <div class="p-price__col">
          <span class="gray">Цена актуальна только в интернет-магазине</span>
        </div>
        <button
          ref="tooltip"
          class="icon-tooltip"
          data-toggle="tooltip"
          title=""
          data-original-title="Цена в магазинах может отличаться. Данная цена актуальна только при онлайн заказе."
        />
      </div>
    </template>
    <template v-else>
      <div v-if="!isAvailableOffer" class="p-price__title">
        Последняя цена:
      </div>
      <div class="p-price__new disabled">
        {{ activeOffer.price | formatPrice }}
      </div>
      <div class="p-price__alert">
        Подпишитесь на товар, чтобы узнать, когда он снова будет в наличии.
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';


export default {
  name: 'Price',
  computed: {
    ...mapGetters('product', [
      'activeOffer',
      'isAvailableOffer',
    ]),
  },
  updated() {
    this.$nextTick(() => {
      $(this.$refs.tooltip).tooltip();
      // $('[data-toggle="tooltip"]').tooltip();
    });
  },
  mounted() {
    this.$nextTick(() => {
      $(this.$refs.tooltip).tooltip();
      // $('[data-toggle="tooltip"]').tooltip();
    });
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
