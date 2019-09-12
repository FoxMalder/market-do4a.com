<template>
  <label class="multifilter-checkbox">
    <input class="multifilter-checkbox__input"
            type="checkbox"
            v-bind="$attrs"
            :checked="checked"
            @change="$emit('change', $event.target.checked)">
    <span class="multifilter-checkbox__label"><slot></slot></span>
  </label>
</template>

<script>
  export default {
    name: "MultifilterCheckbox",
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
  }
</script>
