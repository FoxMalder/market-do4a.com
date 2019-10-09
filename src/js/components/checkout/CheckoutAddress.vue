<template>
  <div class="n-form-row">
    <div class="col-12">
      <div class="n-form-group">
        <div class="n-form-group__field" v-if="isLocaleStore && locationName">
          <div class="checkout-location">
            <div class="checkout-location__name">{{ locationName }}</div>
            <button class="checkout-location__button" type="button" @click="editCity">Изменить</button>
          </div>
        </div>
        <CheckoutLocationSearch v-else/>
        <!--        <small class="n-form-group__description" v-if="locationProp.description">{{ locationProp.description }}</small>-->
      </div>
    </div>
    
    <template v-if="category !== 'sdek.pickup'">
      <div class="col-12">
        <div class="n-form-group">
          <div class="n-form-group__field">
            <div class="input-field">
              <label class="input-field__label">Улица*</label>
              <input class="input-field__input" type="text" v-model="props.street">
            </div>
          </div>
          <!--              <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>-->
        </div>
      </div>
      <div class="col-5">
        <div class="n-form-group">
          <div class="n-form-group__field">
            <div class="input-field">
              <label class="input-field__label">Дом*</label>
              <input class="input-field__input" type="text" v-model="props.house">
            </div>
          </div>
          <!--              <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>-->
        </div>
      </div>
      <div class="col-7">
        <div class="n-form-group">
          <div class="n-form-group__field">
            <div class="input-field">
              <label class="input-field__label">Кв./офис*</label>
              <input class="input-field__input" type="text" v-model="props.flat">
            </div>
          </div>
          <!--              <small class="n-form-group__description" v-if="prop.description">{{ prop.description }}</small>-->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import CheckoutLocationSearch from './CheckoutLocationSearch.vue';
  import Utils from '../../utils/utils';


  export default {
    name: "CheckoutAddress",
    components: {
      CheckoutLocationSearch,
    },
    props: {
      category: {
        type: String,
        default: '',
      }
    },
    computed: {
      ...mapState({
        isLocaleStore: state => state.isLocaleStore,
        locationName: state => state.checkout.locationName,
        props: state => state.checkout.props,
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

<style scoped>

</style>
