<template>
  <div class="c-promocode-modal">
    <h2 class="c-promocode-modal__title">Добавить промокод</h2>
    <div class="form-body"
         :class="{
           'form-body_loading':  status === 'loading',
           'form-body_success': status === 'success'
         }">
      <div class="form-body__loading">
        <div class="form-body__spinner"></div>
        <div class="form-body__loading-text">Отправляем...</div>
      </div>
      <div class="form-body__success">
        <div class="form-body__success-title">Добавлено!</div>
      </div>
      <div class="n-form-group">
        <div class="n-form-group__field">
          <div class="input-field input-field_primary">
            <label for="promocode-modal" class="input-field__label">Промокод</label>
            <input id="promocode-modal"
                   class="input-field__input" type="text" autocomplete="off"
                   v-model="promocode"
                   :disabled="status === 'success'">
          </div>
        </div>
      </div>
    </div>
    <div class="c-promocode-modal__footer">
      <button class="btn btn-red btn-skew btn-block" @click.prevent="send">Добавить</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PromocodeModal",
    props: {
      // promocode: {
      //   type: String,
      //   required: true,
      // },
      status: {
        type: String,
        required: false,
      }
    },
    data() {
      return {
        promocode: '',
      }
    },
    methods: {
      send() {
        this.$emit('submit', this.promocode);
        this.$emit('modal:close');
      }
    }
  }
</script>

<style scoped lang="scss">
  .c-promocode-modal {
    position: relative;
    padding: 27px 30px 50px;
    width: 320px;
    max-width: 100%;
    
    &__title {
      margin-bottom: 30px;
      font-size: 24px;
      line-height: 28px;
    }
    
    &__footer {
      margin-top: 25px;
    }
  }
</style>
