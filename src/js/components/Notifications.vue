<template>
  <div class="notifications">
<!--    <div class="notifications__wrapper">-->
<!--      <div class="notifications__item"-->
<!--           v-for="item in test"-->
<!--           :key="item.id">-->
<!--        <NotificationsItem :item="item"/>-->
<!--      </div>-->
<!--    </div>-->
<!--    -->
    
    
    <transition-group
      class="notifications__wrapper"
      tag="div"
      name="notifications">
      <div class="notifications__item"
           v-for="item in messages"
           :key="item.id">
        <NotificationsItem :item="item"/>
      </div>
    </transition-group>
  
  </div>
</template>
<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import NotificationsItem from './NotificationsItem.vue';


  export default {
    name: 'Notifications',
    components: {
      NotificationsItem
    },
    // props: {
    //   group: {
    //     type: String,
    //     default: ''
    //   },
    //   speed: {
    //     type: Number,
    //     default: 300
    //   },
    //   duration: {
    //     type: Number,
    //     default: 3000
    //   },
    //   delay: {
    //     type: Number,
    //     default: 0
    //   },
    //   max: {
    //     type: Number,
    //     default: Infinity
    //   },
    //   ignoreDuplicates: {
    //     type: Boolean,
    //     default: false
    //   },
    // },
    data() {
      return {
        test: [
          {
            type: 'cancelable',
            title: 'корзина очищена',
            text: 'Но вы еще можете вернуть всё обратно.',
            duration: 90000,
          },
        ]
      }
    },
    computed: {
      ...mapState({
        messages: state => state.notifications.messages
      }),
    },
  }
</script>


<style>
  
  .notifications {
    position: fixed;
    z-index: 10000;
    top: 10px;
    right: 10px;
    width: 520px;
  }
  
  .notifications__wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .notifications__item {
    transition: all .4s;
    margin-top: 10px;
    width: 100%;
  }
  
  .notifications-enter,
  .notifications-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .notifications-leave-active {
    position: absolute;
  }
</style>
