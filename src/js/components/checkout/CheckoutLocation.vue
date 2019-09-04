<template>
  <div class="checkout-location">
    <div class="checkout-location__name">{{name}}</div>
    <button class="checkout-location__button" @click="editCity">Изменить</button>
  </div>
</template>

<script>
  import Utils from '../../utils/utils';

  export default {
    name: "CheckoutLocation",
    props: {
      name: {
        type: String,
        default: '',
      },
    },
    methods: {
      editCity() {
        Utils.scrollTo(document.querySelector('.h-navbar-collapse'));
        $('.change-city-collapse').collapse('show');
      },
    }
  }
</script>
