<template>
  <div class="input-field input-field_primary"
       :class="{active: isActive}">
      <label class="input-field__label"
             :for="'property-' + prop.id">
        {{ prop.title }}{{ prop.required && '*' }}
      </label>
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
  </div>
</template>

<script>
  // import { ValidationProvider, extend } from 'vee-validate';
  // import { required, email } from 'vee-validate/dist/rules';
  //
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
    data() {
      return {
        isActive: this.value !== '',
      }
    },
    computed: {
      rules() {
        return { required: this.prop.required, email: this.prop.type === 'email' };
      }
    },
    mounted() {
      this.check();
    },
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
        this.isActive = this.value !== '';
        this.prop.isValid = this.$refs.input.checkValidity();
      },
      onFocus() {
        this.isActive = true;
      },
    }
  }
</script>
