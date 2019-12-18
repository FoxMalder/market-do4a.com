<template>
  <div class="order-promocode">
    <button
      class="order-promocode__btn-toggle btn btn-block btn-skew"
      type="button"
      :class="{'btn-black': isActive, 'btn-gray-2': !isActive}"
      @click="isActive = !isActive"
    >
      Добавить промокод
    </button>

    <div v-show="isActive" class="order-promocode__body">
      <div class="n-form-row">
        <div class="col-12 col-md-8">
          <div class="n-form-group">
            <div class="n-form-group__field">
              <div class="input-field input-field_primary-white">
                <label class="input-field__label">Добавить промокод</label>
                <input
                  v-model="promocode"
                  class="input-field__input"
                  type="text"
                  autocomplete="off"
                  :disabled="status === 'success'"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <button
            v-if="status === 'loading'"
            class="order-promocode__btn-submit btn btn-skew btn-block btn-gray-2"
            type="button"
          >
            <span class="spinner-border spinner-border-sm" role="status"></span>
          </button>
          <button
            v-else-if="status === 'success'"
            class="order-promocode__btn-submit btn btn-skew btn-block btn-green"
            type="button"
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.5588 3.06065L5.49816 13.1213L0.4375 8.06065L2.55882 5.93933L5.49816 8.87867L13.4375 0.939331L15.5588 3.06065Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            v-else-if="status === 'failed'"
            class="order-promocode__btn-submit btn btn-skew btn-block btn-red"
            type="button"
          >
            Ошибка
          </button>
          <button
            v-else
            class="order-promocode__btn-submit btn btn-skew btn-block btn-gray-2"
            type="button"
            @click="setPromocode"
          >
            Применить
          </button>
        </div>
      </div>
      <!--      <div class="order-promocode__field">-->
      <!--      -->
      <!--      </div>-->
      <!--      <div class="order-promocode__button">-->
      <!--        -->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';


export default {
  name: 'Promocode',
  data() {
    return {
      isActive: document.documentElement.clientWidth >= 768,
      promocode: '',
      status: null,
    };
  },
  methods: {
    ...mapActions({
      enterCoupon: 'checkout/enterCoupon',
    }),
    // toggle() {
    //   this.isActive = !this.isActive;
    // },
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
    },
  },
};
</script>
