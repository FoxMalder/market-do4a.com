<template>
  <fieldset
    v-click-outside="close"
    :class="{ show: visible }"
    v-bind="$attrs"
  >
    <button
      class="multifilter__content multifilter__content_dropdown"
      type="button"
      @click.prevent="toggle"
    >
      <slot name="btn" />
    </button>

    <slot />

    <div
      ref="menu"
      class="dropdown-menu"
      :class="{ show: visible }"
    >
      <slot name="body" />
    </div>

    <!--    <simplebar class="dropdown-menu" :class="{ show: visible }" data-simplebar-auto-hide="false">-->
    <!--      <slot name="body"></slot>-->
    <!--    </simplebar>-->
  </fieldset>
</template>

<script>
import SimpleBar from 'simplebar';
// import simplebar from 'simplebar-vue';
// import 'simplebar/dist/simplebar.min.css';

export default {
  name: 'MultifilterDropdown',
  // components: {
  //   simplebar
  // },
  props: {
    scrolled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    // $(this.$el).on('hidden.bs.dropdown', () => {
    //   this.visible = false;
    // });
    // $(this.$el).on('shown.bs.dropdown', () => {
    //   this.visible = true;
    // });

    if (this.scrolled) {
      new SimpleBar(this.$refs.menu, { autoHide: false });
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
  },
};
</script>
