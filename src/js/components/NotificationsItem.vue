<template>
  <div class="notification">
    <div class="notification__wrapper">
      <button
        class="notification__btn-close"
        type="button"
        @click="close">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2581 14.2902L14.2903 12.258L9.54882 7.51648L14.2909 2.77437L12.2587 0.742145L7.5166 5.48426L2.77441 0.742065L0.742188 2.77429L5.48438 7.51648L0.742787 12.2581L2.77501 14.2903L7.5166 9.5487L12.2581 14.2902Z" fill="currentColor"/>
        </svg>
      </button>
      <div class="notification__title"
           v-if="item.title">
        {{ item.title }}
      </div>
      <div class="notification__descriprtion"
           v-if="item.title">
        {{ item.text }}
      </div>
      <div class="notification__footer">
      
      </div>
      <button class="notification__btn-cancel"
              type="button"
              v-if="typeof item.onCancel === 'function'"
              @click="cancel"
      >Отменить ({{ time }})</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { REMOVE_TOAST_MESSAGE } from '../store/modules/notifications';


  export default {
    name: "NotificationsItem",
    props: {
      item: Object,
    },
    data() {
      return {
        isRunning: false,
        time: 0,
        timer: null,
      }
    },
    mounted() {
      this.setTime(this.item.duration);
      this.start();
    },
    methods: {
      start() {
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.time > 0) {
              this.time -= 1;
            } else {
              this.close();
              if (typeof this.item.onTimeout === 'function') {
                this.item.onTimeout();
              }
            }
          }, 1000)
        }
      },
      stop() {
        clearInterval(this.timer);
        this.timer = null
      },

      setTime(payload) {
        this.time = Math.round(payload / 1000);
      },

      close() {
        this.stop();
        this.$store.dispatch(REMOVE_TOAST_MESSAGE, this.item.id);
      },
      cancel() {
        if (typeof this.item.onCancel === 'function') {
          this.item.onCancel();
          // this.setTime(2000);
          this.close();
        }
      }
    }
  }
</script>
