<template>
  <div class="checkout-location">
    <div class="checkout-location__name">{{locationName}}</div>
    <button class="checkout-location__button" @click="editCity">Изменить</button>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Utils from '../../utils/utils';;

  export default {
    name: "CheckoutLocation",
    computed: {
      ...mapState('checkout', {
        locationName: 'locationName',
      })
    },
    methods: {
      editCity() {
        Utils.scrollTo(document.querySelector('.h-navbar-collapse'));
        $('.change-city-collapse').collapse('show');
      },
    }
  }
</script>
