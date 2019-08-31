<template>
  <div class="notification">
    <div class="notification__wrapper">
      <button
        class="notification__btn-close"
        type="button"
        @click="close()">close</button>
      <div
        class="notification__title"
        v-if="item.title">
        {{ item.title }}
      </div>
      <div class="notification__descriprtion"
           v-if="item.title">
        {{ item.text }}
      </div>
      <button
        class="notification__btn-cancel"
        type="button"
        v-if="typeof item.onCancel === 'function'"
        @click="cancel()">Отменить ({{ time }})</button>
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
