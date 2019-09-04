<template>
  <div
    :class="['input-field', {
      'input-field_invalid': prop.error,
      'input-field_primary': true,
    }]">
    <label
      class="input-field__label"
      :for="'property-' + prop.id"
    >{{ prop.title }}{{ prop.required && '*' }}</label>
    <input class="input-field__input"
           ref="input"
           v-model="prop.value"
           @focus="onFocus"
           @change="check"
           @blur="check"
           :id="'property-' + prop.id"
           :name="prop.name"
           :type="prop.type"
           :autocomplete="prop.autocomplete"
           :inputmode="prop.inputmode"
           :required="prop.required">
    <transition name="fade-left">
      <div class="input-field__alert" v-if="prop.error">{{prop.error}}</div>
    </transition>
  </div>
</template>

<script>
  // import { ValidationProvider, extend, validate } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';

  // extend('required', {
  //   ...required,
  //   message: 'field is required'
  // });
  //
  //
  // extend('email', {
  //   ...email,
  //   message: 'field is email'
  // });


  export default {
    name: "InputField",
    props: {
      prop: Object,
    },
    // components: {
    //   ValidationProvider,
    // },
    // data() {
    //   return {
    //     isActive: this.prop.value !== '',
    //     value: this.prop.value,
    //   }
    // },
    // computed: {
    //   rules() {
    //     return { required: this.prop.required, email: this.prop.type === 'email' };
    //   }
    // },
    // mounted() {
    //   this.check();
    // },
    methods: {
      // castom({ errors, flags }) {
      //   this.prop.isValid = flags.valid;
      //
      //   if (errors.length) {
      //     return {
      //       on: ['input', 'change']
      //     };
      //   }
      //
      //   return {
      //     on: ['change', 'blur']
      //   };
      // },
      check() {
        // this.isActive = this.prop.value !== '';

        this.prop.error = '';

        // validate(this.value, 'email').then(({ errors }) => {
        //   if (errors.length) {
        //     this.prop.error = 'Введите верный email';
        //   }
        // });

        if (this.prop.required && this.prop.value === '') {
          return this.prop.error = 'Заполните это поле';
        }

        if (this.prop.type === 'email' && !this.$refs.input.checkValidity()) {
          return this.prop.error = 'Введите верный email';
        }

        if (this.prop.type === 'tel' && !this.$refs.input.checkValidity()) {
          return this.prop.error = 'Введите верный телефон';
        }

        // this.prop.error = error;

      },
      // onInput(e) {
      //   const value = e.target.value.trim();
      //
      //   if (this.value !== '') {
      //     this.prop.error = '';
      //   }
      //
      //   this.value = value;
      //   this.prop.value = value;
      // },
      onFocus() {
        // this.isActive = true;
        // this.prop.isValid = true;
        this.prop.error = '';
      },
    }
  }
</script>
