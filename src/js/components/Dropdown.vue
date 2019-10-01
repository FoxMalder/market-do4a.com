<template>
  <fieldset
    :class="{ show: visible }"
    v-bind="$attrs"
    v-click-outside="close">
    
    <button
      class="multifilter__content multifilter__content_dropdown"
      type="button"
      @click.prevent="toggle">
      <slot name="btn"></slot>
    </button>
    
    <slot></slot>
    
    <div
      class="dropdown-menu"
      :class="{ show: visible }">
      <slot name="body"></slot>
    </div>
    
  </fieldset>
</template>

<script>
  import SimpleBar from 'simplebar';
  // import simplebar from 'simplebar-vue';

  export default {
    name: 'multifilter-dropdown',
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
      }
    },
    // mounted() {
    //   $(this.$el).on('hidden.bs.dropdown', () => {
    //     this.visible = false;
    //   });
    //   $(this.$el).on('shown.bs.dropdown', () => {
    //     this.visible = true;
    //   });
    //
    //   // if (this.scrolled) {
    //   //   new SimpleBar(this.$refs.menu, { autoHide: false });
    //   // }
    // },
    methods: {
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      toggle() {
        this.visible = !this.visible;
      }
    }
  }
</script>
