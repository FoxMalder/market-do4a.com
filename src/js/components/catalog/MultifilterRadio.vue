<template>
  <label class="multifilter-radio">
    <input class="multifilter-radio__input"
            type="radio"
            v-bind="$attrs"
            :checked="checked"
            @change="onChange">
    <span class="multifilter-radio__label"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: "MultifilterRadio",
    inheritAttrs: false,
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: {
        default: false,
        type: Boolean,
      },
    },
    methods: {
      onChange(event) {
        console.log(event.target.checked);
        this.$emit('change', event.target.checked)
      }
    },
  }
</script>
