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
      <div class="notification__header">
        <svg v-if="item.type === 'error'"
             width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13" cy="13" r="13" fill="#F4412D"/>
          <rect x="9" y="7" width="2" height="6" fill="white"/>
          <rect x="15" y="7" width="2" height="6" fill="white"/>
          <path d="M8 19C8 19 9.44738 17 13 17C16.5526 17 18 19 18 19" stroke="white" stroke-width="2"/>
        </svg>
        
        <div class="notification__title">
          {{ item.title }}
        </div>
      </div>
      <div class="notification__descriprtion"
           v-if="item.text">
        {{ item.text }}
      </div>
      <div class="notification__footer">
        <div v-if="item.type !== 'error'" class="notification__timer" :class="{'notification__timer_animate': time > 0}">
          <svg width="31" height="31" viewBox="0 0 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle stroke-width="2" cx="15.5" cy="15.5" r="14.5" fill="none"></circle>
          </svg>
          <span>{{ time }}</span>
          <svg width="31" height="31" viewBox="0 0 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle stroke-width="2" cx="15.5" cy="15.5" r="14.5" fill="none"></circle>
          </svg>
        </div>
        <button
          v-if="item.type === 'cancelable'"
          class="notification__btn-cancel"
          type="button"
          @click="cancel"
        >Отменить</button>
        <button
          v-else-if="item.type === 'error'"
          class="notification__btn-cancel"
          type="button"
          @click="close"
        >Закрыть</button>
      </div>
      
      <!--      <button class="notification__btn-cancel"-->
      <!--              type="button"-->
      <!--              v-if="typeof item.onCancel === 'function'"-->
      <!--              @click="cancel"-->
      <!--      >Отменить ({{ time }})</button>-->
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
        console.log('Start');

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
        console.log('Close');
        this.stop();
        this.$emit('close');
        // this.$store.dispatch(REMOVE_TOAST_MESSAGE, this.item.id);
      },
      cancel() {
        console.log('Cancel');
        this.$emit('cancel');

        if (typeof this.item.onCancel === 'function') {
          this.item.onCancel();
          // this.setTime(2000);
          this.close();
        }
      }
    }
  }
</script>
