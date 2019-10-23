<template>
  <div class="order-alert">
    <template v-if="type === 'multiple'">
      <div class="order-alert__title">Внимание! Этот заказ был разделён.</div>
      <div class="order-alert__text">Часть заказа будет отправлена с центрального склада. Вы получите товары разными
        способами доставки.</div>
    </template>
    <template v-else-if="type === 'central'">
      <div class="order-alert__title">Доставка с центрального склада</div>
      <div class="order-alert__text">Этот заказ будет отправлен с центрального склада. Доступна доставка СДЭК или Почтой
        России.</div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "CheckoutAlert",
    props: {
      type: {
        type: String,
        default: 'multiple',
      }
    }
  }
</script>
