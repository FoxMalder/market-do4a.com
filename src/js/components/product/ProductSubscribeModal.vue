<template>
  <form class="p-subscribe" action="/local/public/basket.php" @submit.prevent="onSubmit">
    <p class="p-subscribe__description">Уведомить, когда товар появится в наличии:</p>
    <div class="p-subscribe__body form-body"
         :class="{ 'form-body_loading': status === 'loading', 'form-body_success': status === 'success' }">
      
      <div class="form-body__loading">
        <div class="form-body__spinner"></div>
        <div class="form-body__loading-text">Отправляем...</div>
      </div>
      
      <div class="form-body__success">
        <div class="form-body__success-title">Готово!</div>
        <div class="form-body__success-text">Спасибо за вашу заявку</div>
      </div>
      
      <div class="n-form-group">
        <div class="n-form-group__field">
          <div class="input-field input-field_primary">
            <label for="product-subscribe-email" class="input-field__label">Email*</label>
            <input id="product-subscribe-email" class="input-field__input"
                   name="email" autocomplete="email" required type="email"
                   v-model="email">
          </div>
        </div>
      </div>
      
      <div class="n-form-group">
        <div class="n-form-group__field">
          <div class="input-field input-field_primary">
            <label for="product-subscribe-tel" class="input-field__label">Телефон*</label>
            <input id="product-subscribe-tel" class="input-field__input"
                   name="phone" autocomplete="tel" required type="tel"
                   v-model="tel">
          </div>
        </div>
      </div>
    
    </div>
    <div class="p-subscribe__footer">
      
      <button
        v-if="status === 'success'"
        class="btn btn-green btn-block btn-skew"
        disabled>
        <svg class="btn-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM19.0608 11.0608L16.9395 8.93945L12.0001 13.8788L10.0608 11.9395L7.93945 14.0608L12.0001 18.1214L19.0608 11.0608Z" fill="currentColor"/>
        </svg>
        Сохранено
      </button>
      
      <button
        v-else
        class="btn btn-red btn-block btn-skew"
        type="submit"
      >Подписаться</button>
    
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import Util from '../../utils/utils';
  import { mapGetters, mapState, mapActions } from 'vuex';


  export default {
    name: "ProductSubscribeModal",
    // props: {
    //   id: {
    //     type: Number,
    //     required: true,
    //   }
    // },
    data: () => ({
      status: null,
      tel: '',
      email: '',
    }),
    computed: {
      ...mapState('product', {
        packingId: 'packingId',
      })
    },
    methods: {
      onSubmit() {
        this.status = 'loading';
        // method: subscribe
        // id: 83382
        // email: reg@esf.sdf
        // phone: 0000000
        // sessid: 832c299dd60dba959f9e347a82e19997

        const request = {
          method: 'subscribe',
          id: this.packingId,
          email: this.email,
          phone: this.tel,
          sessid: Util.sessid(),
        };

        axios
          .post('/local/public/basket.php', qs.stringify(request))
          .then(response => response.data)
          .then(response => {
            if (response.status !== 'error') {
              return response.data;
            }
            const error = new Error(response.error);
            error.response = response;
            throw error;
          })
          .then(() => {
            this.status = 'success';

            setTimeout(() => {
              this.$emit('modal:close');
              this.status = null;
            }, 3000);
          })
          .catch((e) => {
            this.status = null;
            alert(e.message);
          })
      }
    }
  }
</script>

<style scoped>

</style>
