<template>
  <div class="modals-container">
    <transition name="fade">
      <keep-alive>
        <Modal
          v-for="modal in modals"
          :key="modal.id"
        >
          <component
            :is="modal.component"
            v-bind="modal.param.props"
            v-on="modal.param.on"
          />
        </Modal>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import { Bus } from './index';


const Id = (i => () => i += 1)(0);


export default {
  name: 'ModalsContainer',
  components: {
    Modal,
  },
  data() {
    return {
      modals: [],
    };
  },
  computed: {
    lastId() {
      return this.modals[this.modals.length - 1].id;
    },
  },
  created() {
    Bus.$on('new', (modal) => {
      this.add(modal);
    });

    Bus.$on('close', (data) => {
      let id = null;

      if (data && data.$index) id = data.$index;

      if (id === null) id = this.lastId;

      this.close(data, id);
    });

    Bus.$on('dismiss', (id) => {
      if (id === null) id = this.lastId;

      this.dismiss(id);
    });
  },
  methods: {
    add({ component, param = {} }) {
      const id = Id();

      this.modals.push({
        id,
        component,
        param,
      });
      // console.log(this.modals);
      // this.$nextTick(() => {
      //   this.$modal.show(name)
      // })
    },

    remove(id) {
      const index = this.modals.findIndex(v => v.id === id);
      if (index !== -1) {
        this.modals.splice(index, 1);
      }
    },

    close(data = null, id = null) {
      if (this.modals.length === 0) {
        return;
      }

      let localId = id;

      if (id && typeof id === 'function') {
        localId = id(data, this.modals);
      }

      if (typeof localId !== 'number') {
        localId = this.lastId;
      }

      const instance = this.modals.find(item => item.id === localId);

      Bus.$emit('closed', {
        id: localId,
        instance,
        data,
      });

      if (instance && typeof instance.param.onClose === 'function') {
        if (instance.param.onClose(data) === false) {
          return;
        }
      }

      this.remove(localId);
    },
  },
};
</script>

<style scoped>

</style>
