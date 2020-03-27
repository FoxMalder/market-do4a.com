<template>
  <a
    class="header-control__button header-control__button_search"
    href="/search/"
    @click.prevent="$emit('click', $event)"
  >
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.8028 7.00142C11.8028 9.65317 9.65317 11.8028 7.00142 11.8028C4.34967 11.8028 2.2 9.65317 2.2 7.00142C2.2 4.34967 4.34967 2.2 7.00142 2.2C9.65317 2.2 11.8028 4.34967 11.8028 7.00142ZM10.7823 12.8952C9.69183 13.5962 8.39411 14.0028 7.00142 14.0028C3.13464 14.0028 0 10.8682 0 7.00142C0 3.13464 3.13464 0 7.00142 0C10.8682 0 14.0028 3.13464 14.0028 7.00142C14.0028 8.6849 13.4087 10.2296 12.4186 11.4373L17 16.0186L15.4529 17.5658L10.7823 12.8952Z"
        fill="currentColor"
      />
    </svg>
  </a>
</template>

<script>
export default {
  name: 'HeaderButtonSearch',
};
</script>

<style scoped>

</style>
