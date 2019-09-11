<template>
  <div class="n-form-group">
    
    <div class="n-form-group__field" v-if="isLocaleStore && locationName">
      <div class="checkout-location">
        <div class="checkout-location__name">{{locationName}}</div>
        <button class="checkout-location__button" @click="editCity">Изменить</button>
      </div>
    </div>
    <CheckoutLocationSearch v-else :item="prop"/>
    
    <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>
  </div>
</template>

<script>
  import Utils from '../../utils/utils';
  import CheckoutLocationSearch from './CheckoutLocationSearch.vue';
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: "CheckoutLocation",
    components: {
      CheckoutLocationSearch,
    },
    props: {
      prop: {
        type: Object,
      },
    },
    computed: {
      ...mapState('checkout', {
        isLocaleStore: 'isLocaleStore',
        locationName: 'locationName',
      }),
    },
    methods: {
      editCity() {
        Utils.scrollTo(document.querySelector('.h-navbar-collapse'));
        $('.change-city-collapse').collapse('show');
      },
    }
  }
</script>
