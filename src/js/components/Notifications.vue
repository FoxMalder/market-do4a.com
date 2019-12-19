<template>
  <div class="notifications">
    <transition-group
      class="notifications__wrapper"
      tag="div"
      name="notifications"
    >
      <div
        v-for="item in messages"
        :key="item.id"
        class="notifications__item"
      >
        <NotificationsItem
          :item="item"
          @close="remove(item)"
          @cancel="remove(item)"
        />
      </div>
    </transition-group>
  </div>
</template>
<script>
import NotificationsItem from './NotificationsItem.vue';


const Id = (i => () => i++)(0);

export default {
  name: 'Notifications',
  components: {
    NotificationsItem,
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
      messages: [
        // {
        //   id: Id(),
        //   type: 'cancelable',
        //   title: 'корзина очищена',
        //   text: 'Но вы еще можете вернуть всё обратно.',
        //   duration: 9000,
        // },
        // {
        //   id: Id(),
        //   type: 'cancelable',
        //   title: 'корзина очищена',
        //   text: 'Но вы еще можете вернуть всё обратно.',
        //   duration: 90000,
        // },
      ],
    };
  },
  computed: {
    // ...mapState({
    //   messages: state => state.notifications.messages
    // }),
  },
  methods: {
    addItem(type, options) {
      this.messages.push({
        type,
        id: Id(),
        duration: 4000,
        ...options,
      });
    },
    remove(item) {
      this.messages.splice(this.messages.indexOf(item), 1);
    },
  },
};
</script>


<style scoped>
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
