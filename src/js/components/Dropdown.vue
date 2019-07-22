<template>
  <fieldset :class="{ show: visible }" v-bind="$attrs">
    <button class="multifilter__content" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-flip="false">
      <slot name="btn"></slot>
    </button>
    
    <slot></slot>
    
    <div class="dropdown-menu" ref="menu" role="form">
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
    mounted() {
      $(this.$el).on('hidden.bs.dropdown', () => {
        this.visible = false;
      });
      $(this.$el).on('shown.bs.dropdown', () => {
        this.visible = true;
      });

      // if (this.scrolled) {
      //   new SimpleBar(this.$refs.menu, { autoHide: false });
      // }
    },
  }
</script>
