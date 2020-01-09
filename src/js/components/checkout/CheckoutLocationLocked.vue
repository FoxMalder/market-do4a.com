<template>
  <div class="checkout-location">
    <div class="checkout-location__name">
      {{ value }}
    </div>
    <button
      class="checkout-location__button"
      type="button"
      @click="editCity"
    >
      Изменить
    </button>
  </div>
</template>

<script>
import Utils from '@/utils';

export default {
  name: 'CheckoutLocationLocked',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    editCity() {
      Utils.scrollTo(document.querySelector('.h-navbar-collapse'));
      $('.change-city-collapse').collapse('show');
    },
  },
};
</script>
