<template>
  <div class="header-control">
    <template v-if="device === 'desktop'">
      <a href="/" class="header-control__logo" />

      <HeaderSearch />
      <HeaderButtonFavorites />
      <HeaderBasket />
    </template>

    <template v-else>
      <HeaderButtonMenu />
      <a href="/" class="header-control__logo" />

      <HeaderSearch />
      <HeaderButtonSearch />
      <HeaderButtonFavorites />
      <HeaderButtonLogin />
      <HeaderButtonBasket />
    </template>
  </div>
</template>

<script>
import HeaderSearch from './Search.vue';
import HeaderBasket from './HeaderBasket.vue';

import HeaderButtonMenu from './HeaderButtonMenu.vue';
import HeaderButtonLogin from './HeaderButtonLogin.vue';
import HeaderButtonBasket from './HeaderButtonBasket.vue';
import HeaderButtonSearch from './HeaderButtonSearch.vue';
import HeaderButtonFavorites from './HeaderButtonFavorites.vue';


function getDevice() {
  if (document.documentElement.clientWidth < 768) {
    return 'mobile';
  }
  if (document.documentElement.clientWidth < 1240) {
    return 'tablet';
  }
  return 'desktop';
}

export default {
  name: 'Header',
  components: {
    HeaderButtonMenu,
    HeaderBasket,
    HeaderSearch,

    HeaderButtonLogin,
    HeaderButtonSearch,
    HeaderButtonBasket,
    HeaderButtonFavorites,
  },
  data() {
    return {
      device: 'mobile',
    };
  },
  mounted() {
    this.device = getDevice();

    window.addEventListener('resize', () => {
      this.device = getDevice();
    });
  },
};
</script>

<style scoped>

</style>

