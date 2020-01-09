<template>
  <div class="n-form-group">
    <div
      v-if="$store.state.isLocaleStore && locationName"
      class="n-form-group__field"
    >
      <CheckoutLocationLocked
        :value="locationName"
      />
    </div>
    <CheckoutLocationSearch
      v-else
      :disabled="!$store.getters.isRealCity"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

import CheckoutLocationSearch from './CheckoutLocationSearch.vue';
import CheckoutLocationLocked from './CheckoutLocationLocked.vue';


export default {
  name: 'CheckoutLocation',
  components: {
    CheckoutLocationLocked,
    CheckoutLocationSearch,
  },
  computed: {
    ...mapState('checkout', {
      locationName: 'locationName',
    }),
  },
};
</script>
