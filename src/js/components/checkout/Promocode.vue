<template>
  <div class="order-promocode">
    <template v-if="isModal">
      <button class="btn btn-gray-2 btn-block" type="button" @click="openModal">Добавить промокод</button>
    </template>
    <template v-else>
      <div class="order-promocode__field">
        <div class="input-field input-field_primary-white">
          <label class="input-field__label">Добавить промокод</label>
          <input
            class="input-field__input" type="text" autocomplete="off"
            v-model="promocode"
            :disabled="status === 'success'">
        </div>
      </div>
      <div class="order-promocode__button">
        <button class="btn btn-gray-2 btn-block" type="button" v-if="status === 'loading'">
          <span class="spinner-border spinner-border-sm" role="status"></span>
        </button>
        <button class="btn btn-green btn-block" type="button" v-else-if="status === 'success'">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5588 3.06065L5.49816 13.1213L0.4375 8.06065L2.55882 5.93933L5.49816 8.87867L13.4375 0.939331L15.5588 3.06065Z" fill="currentColor"/>
          </svg>
        </button>
        <button class="btn btn-red btn-block" type="button" v-else-if="status === 'failed'">Ошибка</button>
        <button class="btn btn-gray-2 btn-block" type="button" v-else @click="setPromocode">Применить</button>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import PromocodeModal from './PromocodeModal.vue';


  export default {
    name: "Promocode",
    data() {
      return {
        promocode: '',
        isModal: document.documentElement.clientWidth < 768,
        status: null,
      }
    },
    methods: {
      ...mapActions({
        enterCoupon: 'checkout/enterCoupon',
      }),
      openModal() {
        this.$modal.open(PromocodeModal, {
          props: {
            // promocode: this.promocode,
            status: this.status,
          },
          // Обработчики событий компонента
          on: {
            // input(data) {
            //   console.log(data);
            // },
            submit: (data) => {
              this.promocode = data;
              this.setPromocode();
            },
          },
        });
      },
      setPromocode() {
        this.status = 'loading';

        if (this.promocode === '') {
          this.status = 'failed';
          setTimeout(() => {
            this.status = null;
          }, 300);
          return;
        }

        this.enterCoupon(this.promocode)
          .then(() => {
            this.status = 'success';
          })
          .catch(() => {
            this.status = 'failed';
            setTimeout(() => {
              this.status = null;
            }, 1000);
          });

      }
    }
  }
</script>
