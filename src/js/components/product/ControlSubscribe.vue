<template>
  <div class="p-control-fixed">
    <button class="btn btn-black p-control-button"
            v-if="!isAvailableOffer"
            @click.prevent="subscribe">
      Подписаться <br>на товар
    </button>
  </div>
</template>

<script>
  export default {
    name: "ControlSubscribe"
  }
</script>

<style scoped>

</style>
