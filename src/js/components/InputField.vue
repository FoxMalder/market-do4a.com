<template>
  <div
    class="input-field"
    :class="{'input-field_invalid': prop.error}"
  >
    <label
      class="input-field__label"
      :class="{ 'input-field__label_active': value !== '' }"
      :for="'property-' + prop.id"
    >{{ prop.title + (prop.required ? '*' : '') }}</label>
    <input
      ref="input"
      :id="'property-' + prop.id"
      class="input-field__input"
      :value="value"
      :name="prop.name"
      :type="prop.type"
      @keydown="onKeyDown"
      :autocomplete="prop.autocomplete"

      @keyup="onKeyUp"
      :inputmode="prop.inputmode"
      @input="onInput"
      :required="prop.required"
      @focus="onFocus"
      @change="check"
      @blur="check"
    >
    <transition name="fade-left">
      <div v-show="prop.error" class="input-field__alert">
        {{ prop.error }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
// import { mask } from 'vue-the-mask';


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


const tokens = {
  9: { pattern: /\d/ },
  '&': { pattern: /\d|,|\.| |\u00a0/ },
  '#': { pattern: /\d| / },
  S: { pattern: /\d|\// },
  s: { pattern: /\// },
  '*': { pattern: /\d|\*|×/, regexpToFind: /\*/g },
  $: { pattern: /\w/, regexpToFind: /\$/g },
  '@': { pattern: /7/ },
  '%': { pattern: /8/ },
  A: { pattern: /[а-яА-Яa-zA-Z]/ },
  H: { pattern: /[\dа-яёА-ЯЁ]/ },
  Z: { pattern: /[\dа-яА-Яa-zA-Z]/ },
  E: { pattern: /[a-zA-Z[\];'`{}:"<>~,.\-\s]+|[а-яА-Я\-\sёЁ]+/ },
  D: { pattern: /[a-zA-ZА-Яа-я\\-\\-\\sёЁ ]/ },
  L: { pattern: /\w|[@.]/ },
  P: { pattern: /\w|[+]|\*|×/ },
  U: { pattern: /[авекмнорстухabekmhopctyx\d]/i },
  C: { pattern: /[авекмнорстухfdtrvyjhcne[]/i },
  c: { pattern: /[авекмнорстух]/i },
  R: { pattern: /[А-ЯЁ]/i },
  X: { pattern: /[A-Z]/i },
  T: { pattern: /[\dA-Z]/i },
};

function parseMask(e, t, n) {
  void 0 === e && (e = '');
  for (var r, i, a, s = '', c = !1, u = '', l = t.length, p = e.length, d = 0, f = 0, h = !1; d < l && (f < p || f < l);) {
    i = f < p && e[f] || '', (a = t[d]) !== '\\' || h ? (r = h ? null : tokens[a], h = !1, r ? i.match(r.pattern)
      ? (s += i, u += i, d++, f++)
      : f++ : n && i === a ? (s += a, d += 1, f += 1) : n ? (s += a, d += 1) : (s += a, d++, i !== a || c
      ? c = !0
      : f++)) : (d++, h = !0);
  }

  return {
    maskedValue: s.slice(0, s.length),
    unmaskedValue: u,
    maskStep: d,
    valueStep: f,
  };
}

// class maskPhone {
//   constructor(el) {
//     this.mask = null;
//     this.state = {};
//
//     this.input = el;
//     this.isRemovingKeyPressed = false;
//
//
//     this.input.addEventListener('input', this.onInput);
//     this.input.addEventListener('keydown', this.onKeyDown);
//   }
//
//   isPhone(e) {
//     return /^(\+(\d+|@)|%|8)/.test(e) || /^7\d{10}$/.test(e);
//   }
//
//   defineMobileMask(mask, t) {
//     console.log('defineMobileMask', mask, t);
//
//     switch (true) {
//       case mask === '+@ (***) ***-**-**' && /\*{4,}/.test(t):
//         return '+@ (***) ***-**-**';
//       case /[a-zA-Z@_.-]/.test(t):
//         return '';
//       case /^\+7|^7/.test(t):
//         return '+@ (LLL) LLL-LL-LL';
//       case /^[349]/.test(t):
//         return '+7 (LLL) LLL-LL-LL';
//       case /^\+?8/.test(t):
//         return '% (LLL) LLL-LL-LL';
//       case /^[01256]/.test(t):
//         return '';
//       case /^[0-9+][^a-zA-Z@_.+-]*$/.test(t):
//         return 'PPPPPPPPPPPPPPPPPPPP';
//       default:
//         return false;
//     }
//   }
//
//   maskPhone(e, t, n = false) {
//     console.log('maskPhone', e, t, n);
//
//     const r = /^([0-9]{2})\*{0,6}\d{0,2}/.test(e) || /([0-9]{3})\×{5}\d{2}/.test(e) || /^\d+$/.test(e);
//     let i = e;
//     // const o = e.length - this.state.maskedValue.length;
//
//     // var a = Object(E.a)(this.input)
//     //   , s = a.start - o
//     //   , c = e.slice(s, s + o);
//
//     if (r) {
//       const u = parseMask(i || '', this.mask, n);
//
//       this.state = {
//         maskedValue: u.maskedValue,
//         unmaskedValue: u.unmaskedValue,
//       };
//
//       return u.unmaskedValue || e;
//     }
//
//     // if (o > 0 && s < this.firstMaskCharPosition && !this.props.useDefaultValue) {
//     //   (i = this.state.maskedValue.split("")).splice(this.firstMaskCharPosition, 0, c),
//     //     i = i.join(""),
//     //     a = {
//     //       start: this.firstMaskCharPosition + o,
//     //       end: this.firstMaskCharPosition + o
//     //     }
//     // } else if (!this.isPhone(i)) {
//     //   i = '';
//     // }
//
//     if (!this.isPhone(i)) {
//       i = '';
//     }
//
//     const d = parseMask(i || '', t, n);
//     this.state = {
//       value: d.unmaskedValue,
//       maskedValue: d.maskedValue,
//       unmaskedValue: d.unmaskedValue,
//       // selection: a
//     };
//     return d.unmaskedValue;
//   }
//
//   maskingValue(mask, value = '', n = false) {
//     if (mask && this.input && this.input.type !== 'number') {
//       if (this.isPhone(mask)) return this.maskPhone(value, mask, n);
//
//       const o = parseMask(value, mask, n);
//       this.state = {
//         value: o.unmaskedValue,
//         maskedValue: o.maskedValue,
//         unmaskedValue: o.unmaskedValue,
//         // selection: Object(E.a)(this.input)
//       };
//       return o.unmaskedValue;
//     }
//   }
//
//   update() {
//     const oldState = this.state;
//
//     // handleChange
//     const value = this.mask ? this.maskingValue(this.mask, this.input.value, true) : this.input.value;
//     console.log(value);
//     // setState
//     // state.value = c
//
//
//     // const newState = parseMask(event.target.value, mask || '', false);
//     const newMask = this.defineMobileMask(this.mask || '', value);
//
//     if (newMask) {
//       const n = value || ''; // Default Value
//
//       if (newMask !== this.mask) {
//         console.log(this.maskingValue(newMask, n)); // init
//       } else if (value && value !== oldState.unmaskedValue) {
//         console.log(this.maskingValue(newMask, n));
//       }
//     }
//
//     this.mask = newMask;
//   }
//
//   onKeyDown = (event) => {
//     if (event.keyCode === 8) { // Backspace
//       this.isRemovingKeyPressed = true;
//     } else if (event.keyCode === 46) { // Del
//       this.isRemovingKeyPressed = true;
//     }
//   };
//
//   onInput = (event) => {
//     this.update();
//     if (!this.isRemovingKeyPressed) {
//       this.input.value = this.state.maskedValue;
//     }
//     this.isRemovingKeyPressed = false;
//   }
// }

export default {
  name: 'InputField',
  // directives: {
  //   mask,
  // },
  props: {
    prop: Object,
    // value: {
    //   type: String,
    //   defau
    // }
  },
  // components: {
  //   ValidationProvider,
  // },
  data() {
    return {
      isRemovingKeyPressed: false,
      isAnyKeyPressed: false,
      maskedValue: '',
      unmaskedValue: '',
      // isActive: this.prop.value !== '',
      // value: this.prop.value,
    };
  },
  computed: {
    value() {
      return this.$store.state.checkout.props[this.prop.code] || '';
    },
  },
  watch: {
    value(newProp, oldProp) {
      if (this.isAnyKeyPressed) {
        return;
      }

      console.log('sdgsgsdg s df s df', newProp, this.maskedValue);

      if (newProp !== this.maskedValue && newProp !== '') {
        if (this.prop.type === 'tel') {
          this.update(newProp);
          // this.prop.value = this.maskedValue;
          this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.prop.code, message: this.maskedValue });
        }
      }
    },
  },
  created() {
    // if (this.$el.Input) {
    //   this.$el.Input.unMount();
    // }


    if (this.prop.type === 'tel') {
      this.update(this.prop.value);
      // this.prop.value = this.maskedValue;
      this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.prop.code, message: this.maskedValue });
    }
  },
  methods: {
    check() {
      // this.isActive = this.prop.value !== '';

      this.prop.error = '';

      // validate(this.value, 'email').then(({ errors }) => {
      //   if (errors.length) {
      //     this.prop.error = 'Введите верный email';
      //   }
      // });

      if (this.prop.required && this.$refs.input.value === '') {
        this.prop.error = 'Заполните это поле';
        return;
      }

      if (this.prop.type === 'email' && !this.$refs.input.checkValidity()) {
        this.prop.error = 'Введите верный email';
        return;
      }

      if (this.prop.type === 'tel' && !this.$refs.input.checkValidity()) {
        this.prop.error = 'Введите верный телефон';
        // return;
      }

      // this.prop.error = error;
    },

    isPhone(e) {
      return /^(\+(\d+|@)|%|8)/.test(e) || /^7\d{10}$/.test(e);
    },

    defineMobileMask(mask, t) {
      switch (true) {
        case mask === '+@ (***) ***-**-**' && /\*{4,}/.test(t):
          return '+@ (***) ***-**-**';
        case /[a-zA-Z@_.-]/.test(t):
          return '';
        case /^\+7|^7/.test(t):
          return '+@ (LLL) LLL-LL-LL';
        case /^[349]/.test(t):
          return '+7 (LLL) LLL-LL-LL';
        case /^\+?8/.test(t):
          return '% (LLL) LLL-LL-LL';
        case /^[01256]/.test(t):
          return '';
        case /^[0-9+][^a-zA-Z@_.+-]*$/.test(t):
          return 'PPPPPPPPPPPPPPPPPPPP';
        default:
          return false;
      }
    },

    maskPhone(value, t, n = false) {
      const r = /^([0-9]{2})\*{0,6}\d{0,2}/.test(value) || /([0-9]{3})\×{5}\d{2}/.test(value) || /^\d+$/.test(value);
      let i = value;

      if (r) {
        // const u = parseMask(i || '', this.mask || '', n);
        const u = parseMask(i || '', t || '', n);

        console.log('u', u);

        this.maskedValue = u.maskedValue;
        this.unmaskedValue = u.unmaskedValue;

        return u.unmaskedValue || value;
      }

      if (!this.isPhone(i)) {
        i = '';
      }

      const d = parseMask(i || '', t || '', n);
      console.log('d', d);

      this.maskedValue = d.maskedValue;
      this.unmaskedValue = d.unmaskedValue;

      return d.unmaskedValue;
    },

    maskingValue(mask, value = '', n = false) {
      if (mask && this.prop.type === 'tel') {
        if (this.isPhone(mask)) return this.maskPhone(value, mask, n);

        const o = parseMask(value, mask, n);
        // this.state = {
        //   value: o.unmaskedValue,
        //   maskedValue: o.maskedValue,
        //   unmaskedValue: o.unmaskedValue,
        //   // selection: Object(E.a)(this.input)
        // };
        this.maskedValue = o.maskedValue;
        this.unmaskedValue = o.unmaskedValue;

        return o.unmaskedValue;
      }
    },

    update(value) {
      // const oldState = this.state;
      const maskValue = this.mask ? this.maskingValue(this.mask, value, true) : value;
      const newMask = this.defineMobileMask(this.mask || '', maskValue);

      if (newMask) {
        const n = maskValue || ''; // Default Value

        this.maskingValue(newMask, n);


        // if (newMask !== this.mask) {
        //   this.maskingValue(newMask, n); // init
        // } else {
        //   if (value && value !== oldState.unmaskedValue) {
        //     this.maskingValue(newMask, n);
        //   }
        // }
      }

      this.mask = newMask;
    },

    onInput(e) {
      console.log('onInput', e.target.value);

      this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.prop.code, message: e.target.value });


      if (this.prop.type === 'tel') {
        this.update(e.target.value);

        if (!this.isRemovingKeyPressed) {
          // this.prop.value = this.maskedValue;
          this.$store.commit('checkout/UPDATE_PROP_BY_CODE', { code: this.prop.code, message: this.maskedValue });
        }
        // else {
        //   this.prop.value = this.maskedValue;
        // }
      }
    },
    onKeyUp() {
      console.log('onKeyUp');
      this.isRemovingKeyPressed = false;
      this.isAnyKeyPressed = false;
    },
    onKeyDown(event) {
      console.log('onKeyDown');
      this.isAnyKeyPressed = true;

      if (event.keyCode === 8) { // Backspace
        this.isRemovingKeyPressed = true;
      } else if (event.keyCode === 46) { // Del
        this.isRemovingKeyPressed = true;
      }
      // else {
      //   event.preventDefault();
      // }
    },
    onFocus() {
      // this.isActive = true;
      // this.prop.isValid = true;
      this.prop.error = '';
    },
  },
};
</script>
