<template>
  <div class="vue-modal" v-show="visible">
    <div class="vue-modal__overlay"></div>
    <div class="vue-modal__scroll" :style="modalStyle" @click.self="onClose">
      <div class="vue-modal__wrapper">
        <div class="vue-modal__outer">
          <button class="btn btn-red vue-modal__close" @click.prevent="onClose">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.02815 3.62882L3.71674 4.94023L6.7768 8.0003L3.71694 11.0602L5.02835 12.3716L8.08822 9.31171L11.1481 12.3716L12.4595 11.0601L9.39963 8.0003L12.4597 4.94024L11.1483 3.62883L8.08822 6.68888L5.02815 3.62882Z" fill="currentColor"></path>
            </svg>
          </button>
          <div class="vue-modal__inner">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import SdekModal from './checkout/SdekModal.vue';


  export default {
    name: "Modal",
    // components: {
    //   SdekModal,
    // },
    data() {
      return {
        visible: true,
        offsetX: 0,
      }
    },
    mounted() {
      this.calc();
      window.addEventListener('resize', this.calc)
    },
    computed: {
      modalStyle() {
        return {
          position: 'absolute',
          left: `${this.offsetX / -2}px`,
          right: `${this.offsetX / -2}px`,
          top: '0px',
          bottom: '0px',
          width: this.offsetX ? `calc(100% + ${this.offsetX}px)` : null,
          transform: this.offsetX ? 'skew(-9deg)' : null,
        }
      }
    },
    methods: {
      onClose() {
        this.$modal.close();
      },
      calc() {
        if (document.documentElement.clientWidth >= 768) {
          this.offsetX = Math.tan(9 / 180 * Math.PI) * document.documentElement.clientHeight;
        } else {
          this.offsetX = 0;
        }
      }
    }
  }
</script>
