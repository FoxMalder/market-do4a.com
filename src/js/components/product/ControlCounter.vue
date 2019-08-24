<template>
  <div class="p-control-fixed">
    <transition name="fade">
      <div class="p-control-counter"
              ref="counter"
              :class="{ 'p-control-counter_hidden': !isAdded }"
              v-show="isAvailableOffer"
              v-touch-pan.vertical.prevent.mouse="handlePan">
        <div class="p-control-counter__header" @click.prevent="toggle">
          <div class="p-control-counter__icon"></div>
        </div>
        <label class="p-control-counter__title" for="product-counter">Количество</label>
        <div class="p-control-counter__row">
          <div class="p-control-counter__tooltip" v-show="isOpened && activeOffer.count && count > activeOffer.count">
            Часть товара будет доставлена с центрального склада
          </div>
          
          <button class="btn btn-white p-control-counter__decrement"
                  @click.prevent="decrement"
                  :disabled="count <= 1">-
          </button>
          <input class="input-text p-control-counter__input"
                  id="product-counter"
                  type="number"
                  v-model.number="count">
          <button class="btn btn-white p-control-counter__increment"
                  @click.prevent="increment"
                  :disabled="count >= maxCount">+
          </button>
        </div>
      </div>
    </transition>
    
    <button class="btn btn-black p-control-button"
            v-if="!isAvailableOffer"
            @click.prevent="subscribe">
      Подписаться <br>на товар
    </button>
    <button class="btn btn-red p-control-button"
            v-else-if="!isAdded"
            @click.prevent="addToCart">
      <svg class="p-control-button__icon" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.81034 2.95034H8.97929C9.36412 2.95034 9.68481 3.27103 9.68481 3.65586C9.68481 4.04068 9.36412 4.42551 8.97929 4.42551H5.06689L6.54206 12.9558H18.7282L20.2034 4.42551H16.291C15.9062 4.42551 15.5855 4.04068 15.5855 3.65586C15.5855 3.27103 15.9062 2.95034 16.291 2.95034H21.1013C21.5503 2.95034 21.871 3.33517 21.8069 3.84827L20.011 13.7896C19.9469 14.1745 19.6262 14.431 19.2413 14.431L5.96482 14.3669C5.57999 14.3669 5.32344 14.1103 5.19516 13.7896L3.07862 1.47517H0.705516C0.320689 1.47517 0 1.15448 0 0.705516C0 0.320689 0.320689 0 0.705516 0H3.65586C4.04068 0 4.29723 0.256551 4.36137 0.57724L4.81034 2.95034ZM11.8655 1.21862C11.8655 0.833791 12.2503 0.448965 12.6351 0.448965C13.02 0.448965 13.3407 0.833791 13.3407 1.21862V7.50412L14.3027 6.54206C14.6234 6.28551 15.0724 6.28551 15.3289 6.54206C15.6496 6.86275 15.6496 7.31171 15.3289 7.56826L13.1483 9.81308C13.02 9.94136 12.8276 10.0055 12.6351 10.0055C12.4427 10.0055 12.2503 9.94136 12.122 9.81308L9.94136 7.56826C9.62067 7.31171 9.62067 6.86275 9.94136 6.54206C10.1979 6.28551 10.6469 6.28551 10.9676 6.54206L11.8655 7.50412V1.21862ZM8.33792 15.842C9.55653 15.842 10.5827 16.8682 10.5827 18.0869C10.5827 19.2413 9.55653 20.2675 8.33792 20.2675C7.18344 20.2675 6.15723 19.3055 6.15723 18.0869C6.15723 17.4455 6.41378 16.9324 6.79861 16.4834C7.18344 16.0986 7.76068 15.842 8.33792 15.842ZM8.33792 17.3172C8.1455 17.3172 7.95309 17.3813 7.82481 17.5738C7.69654 17.702 7.6324 17.8303 7.6324 18.0869C7.6324 18.4717 7.95309 18.7924 8.33792 18.7924C8.78688 18.7924 9.10757 18.4717 9.10757 18.0869C9.10757 17.6379 8.78688 17.3172 8.33792 17.3172ZM16.8682 15.9062C18.0869 15.9062 19.1131 16.8682 19.1131 18.0869C19.1131 19.3055 18.0869 20.2675 16.8682 20.2675C15.7138 20.2675 14.6876 19.3055 14.6876 18.0869C14.6876 17.4455 14.9441 16.9324 15.3289 16.5476C15.7138 16.0986 16.291 15.9062 16.8682 15.9062ZM16.8682 17.3172C16.6758 17.3172 16.4834 17.4455 16.3551 17.5738C16.2269 17.702 16.1627 17.8944 16.1627 18.0869C16.1627 18.4717 16.4834 18.7924 16.8682 18.7924C17.3172 18.7924 17.6379 18.4717 17.6379 18.0869C17.6379 17.702 17.3172 17.3172 16.8682 17.3172Z" fill="currentColor"></path>
      </svg>
      В корзину
    </button>
    <a class="btn btn-green p-control-button" href="#" v-else>
      <svg class="p-control-button__icon" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.81034 2.95034H8.97929C9.36412 2.95034 9.68481 3.27103 9.68481 3.65586C9.68481 4.04068 9.36412 4.42551 8.97929 4.42551H5.06689L6.54206 12.9558H18.7282L20.2034 4.42551H16.291C15.9062 4.42551 15.5855 4.04068 15.5855 3.65586C15.5855 3.27103 15.9062 2.95034 16.291 2.95034H21.1013C21.5503 2.95034 21.871 3.33517 21.8069 3.84827L20.011 13.7896C19.9469 14.1745 19.6262 14.431 19.2413 14.431L5.96482 14.3669C5.57999 14.3669 5.32344 14.1103 5.19516 13.7896L3.07862 1.47517H0.705516C0.320689 1.47517 0 1.15448 0 0.705516C0 0.320689 0.320689 0 0.705516 0H3.65586C4.04068 0 4.29723 0.256551 4.36137 0.57724L4.81034 2.95034ZM8.33792 15.842C9.55653 15.842 10.5827 16.8682 10.5827 18.0869C10.5827 19.2413 9.55653 20.2675 8.33792 20.2675C7.18344 20.2675 6.15723 19.3055 6.15723 18.0869C6.15723 17.4455 6.41378 16.9324 6.79861 16.4834C7.18344 16.0986 7.76068 15.842 8.33792 15.842ZM8.33792 17.3172C8.1455 17.3172 7.95309 17.3813 7.82481 17.5738C7.69654 17.702 7.6324 17.8303 7.6324 18.0869C7.6324 18.4717 7.95309 18.7924 8.33792 18.7924C8.78688 18.7924 9.10757 18.4717 9.10757 18.0869C9.10757 17.6379 8.78688 17.3172 8.33792 17.3172ZM16.8682 15.9062C18.0869 15.9062 19.1131 16.8682 19.1131 18.0869C19.1131 19.3055 18.0869 20.2675 16.8682 20.2675C15.7138 20.2675 14.6876 19.3055 14.6876 18.0869C14.6876 17.4455 14.9441 16.9324 15.3289 16.5476C15.7138 16.0986 16.291 15.9062 16.8682 15.9062ZM16.8682 17.3172C16.6758 17.3172 16.4834 17.4455 16.3551 17.5738C16.2269 17.702 16.1627 17.8944 16.1627 18.0869C16.1627 18.4717 16.4834 18.7924 16.8682 18.7924C17.3172 18.7924 17.6379 18.4717 17.6379 18.0869C17.6379 17.702 17.3172 17.3172 16.8682 17.3172Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4939 5.43558C15.8056 5.70834 15.8372 6.18216 15.5644 6.49389L11.5597 11.0708L8.49393 8.26782C8.18823 7.98832 8.16698 7.51392 8.44648 7.20822C8.72598 6.90252 9.20038 6.88128 9.50608 7.16077L11.4403 8.92925L14.4356 5.50613C14.7083 5.1944 15.1822 5.16282 15.4939 5.43558Z" fill="white"/>
      </svg>
      В корзине <span class="p-control-button__count">{{count}}</span>
    </a>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  import TouchPan from '../../directives/TouchPan';

  function translateY(y) {
    if (y === 0)
      return '';

    return `translate3d(-50%, ${y}px, 0)`;
  }

  export default {
    name: "ControlCounter",
    directives: {
      TouchPan,
    },
    data() {
      return {
        count: 1,
        // maxCount: 5,
        panning: false,
        isOpened: document.documentElement.clientWidth >= 768,
        isAdded: false,
      };
    },
    computed: {
      // ...mapState('product', {
      //   productName: state => state.name,
      // }),
      ...mapGetters('product', [
        // 'activePacking',
        'activeOffer',
        'isAvailableOffer',
      ]),
      maxCount() {
        return this.activeOffer.count + this.activeOffer.count_remote;
      },
    },
    watch: {
      activeOffer: function(newValue, val) {
        if (val !== newValue) {
          this.count = 1;
          this.isAdded = false;
          // this.maxCount = newValue.count + newValue.count_remote
        }
      },
      count: function(val) {
        // if (val === '') {
        //   return;
        // }

        if (val < 1) {
          return this.count = 1;
        }
        if (val > this.maxCount) {
          return this.count = this.maxCount;
        }
      }
    },
    methods: {
      increment() {
        this.count += 1;
        
        if (this.isAdded) {
          this.addToCart();
        }
      },
      decrement() {
        this.count -= 1;
        
        if (this.isAdded) {
          this.addToCart();
        }
      },
      subscribe() {
        alert('Подписка на продукт оформлена')
      },
      addToCart() {

        this.$store.dispatch('cart/addProductToCart', {
          productId: this.activeOffer.id,
          productQuantity: this.count
        }).then((response) => {
          this.isAdded = true;
          if (document.documentElement.clientWidth < 768) {
            this.reveal('up');
          }
        }).catch((error) => {
          console.log(error);
          console.log(error.response);
        });

      },
      // onBlur() {
      //   if (this.count === '') {
      //    this.count = 1;
      //   }
      // },
      handlePan(event) {
        // console.log(event);

        if (document.documentElement.clientWidth >= 768)
          return false;

        if (this.disabled)
          return null;

        if (event.isFirst)
          return this.startListener(event);

        if (!this.panning)
          return false;

        if (event.isFinal)
          return this.stopListener(event);

        return this.swipeListener(event);
      },
      distanceSwiped() {
        const contentRect = this.$refs.counter.getBoundingClientRect();
        const elementRect = this.$el.getBoundingClientRect();

        return contentRect.top - elementRect.top + 32;
      },
      startListener({ distance }) {
        this.$refs.counter.classList.add('p-control-counter_no-transition');

        this.startTop = this.distanceSwiped();
        this.panning = true;
      },
      swipeListener({ offset }) {
        const newY = offset.y + this.startTop;

        if (newY > 0)
          return this.translateTo(0);

        if (newY < -132)
          return this.translateTo(-132); // return this.translateTo((newY + 132) / 2 - 132);

        return this.translateTo(newY);
      },
      stopListener({ offset, distance, direction }) {
        this.$refs.counter.classList.remove('p-control-counter_no-transition');
        const newX = this.startTop + offset.y;
        // this.panning = false;

        setTimeout(() => {
          this.panning = false;
        }, 100);

        if (distance.y > 40)
          return this.reveal(direction);

        return this.reveal(newX < (-132 / 2) ? 'up' : 'down');
      },
      toggle() {
        if (this.panning)
          return this.panning = false;


        if (this.isOpened) {
          this.reveal('down');
        } else {
          this.reveal('up');
        }
      },
      reveal(dir) {
        if (dir === 'up') {
          this.translateTo(-132);
          this.isOpened = true;
        }

        if (dir === 'down') {
          this.translateTo(0);
          this.isOpened = false;
        }
      },
      translateTo(to) {
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
          this.$refs.counter.style.transform = translateY(to);
        });
      },
    }
  }
</script>

<style scoped>

</style>
