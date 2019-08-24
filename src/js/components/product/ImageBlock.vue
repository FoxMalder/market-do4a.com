<template>
  <div class="p-images-block">
    <div class="p-images-block__image" :class="{disabled: !isAvailableOffer}">
      <!--      <img ref="image" :src="activePacking.img" :alt="productName + ' ' + activePacking.pack">-->
      <canvas class="p-images-block__img" ref="canvas"></canvas>
      <!--      <div class="p-images-block__img" ref="canvas" :style="{backgroundImage: `url(${activePacking.img})`}"></div>-->
    </div>
    <div class="product-stickers">
      <!--      <div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery">-->
      <!--        Доставка <br>1 день-->
      <!--      </div>-->
      <div class="product-stickers__item product-stickers__item_yellow" v-if="activePacking.isRecommend">
        Рекомендуем
      </div>
      <div class="product-stickers__item product-stickers__item_green" v-if="activePacking.isNew">Новинка</div>
      <div class="product-stickers__item product-stickers__item_red" v-if="activePacking.isHit">Хит!</div>
    </div>
    <div class="product-control">
      <button class="product-control__favorites" type="button" title="Добавить в избранное"
              :class="{active: activePacking.isFavorite}"
              @click="toggleFavorites(activePacking)">
        <svg viewBox="0 0 31 27" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1065 3.81673L15.213 4.99927L16.3074 3.80551C17.6287 2.36432 19.5549 1.5 21.6674 1.5C25.6637 1.5 28.9273 4.75892 28.9337 8.7695C28.9367 10.7119 28.182 12.5375 26.7977 13.9221C26.7972 13.9226 26.7967 13.9231 26.7962 13.9235L15.1759 25.4703L3.63848 13.9236L3.63848 13.9236L3.63448 13.9196C2.2583 12.5527 1.5 10.7308 1.5 8.77825C1.5 4.74155 4.78042 1.50409 8.7695 1.50409C10.8195 1.50409 12.7446 2.36126 14.1065 3.81673ZM15.2282 25.5227L15.2277 25.5222C15.2279 25.5223 15.228 25.5225 15.2282 25.5227Z" fill="currentColor" stroke="currentColor" stroke-width="3"/>
        </svg>
      </button>
      <!--      <button class="product-control__compare" type="button" @click="addToCompare(activePacking)" title="Сравнить">-->
      <!--        <svg viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--          <rect x="0.117188" y="3.7011" width="2.82316" height="16.939" rx="1" fill="currentColor"/>-->
      <!--          <rect x="5.05762" y="9.34743" width="2.82316" height="11.2926" rx="1" fill="currentColor"/>-->
      <!--          <rect x="9.99805" y="7.23006" width="2.82316" height="13.41" rx="1" fill="currentColor"/>-->
      <!--          <rect x="14.9385" y="12.8764" width="2.82316" height="7.76369" rx="1" fill="currentColor"/>-->
      <!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7616 0.877944C18.2094 0.877944 17.7616 1.32566 17.7616 1.87794V3.7011H15.9385C15.3862 3.7011 14.9385 4.14882 14.9385 4.7011V4.81848C14.9385 5.37076 15.3862 5.81848 15.9385 5.81848H17.7616V7.64164C17.7616 8.19392 18.2094 8.64164 18.7616 8.64164H18.879C19.4313 8.64164 19.879 8.19392 19.879 7.64164V5.81847H21.7022C22.2545 5.81847 22.7022 5.37076 22.7022 4.81847V4.7011C22.7022 4.14882 22.2545 3.7011 21.7022 3.7011H19.879V1.87794C19.879 1.32566 19.4313 0.877944 18.879 0.877944H18.7616Z" fill="currentColor"/>-->
      <!--        </svg>-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';

  export default {
    name: 'ImageBlock',
    computed: {
      ...mapState('product', {
        productName: state => state.name,
      }),
      ...mapGetters('product', [
        'activePacking',
        'isAvailableOffer'
      ])
    },
    watch: {
      activePacking(newPacking) {
        this.img.src = newPacking.img;
      },
    },
    methods: {
      ...mapActions('product', [
        'toggleFavorites',
        'addToCompare',
      ])
    },
    mounted() {
      // this.canvas = this.$refs.canvas;
      this.ctx = this.$refs.canvas.getContext('2d');

      this.img = new Image();

      this.img.onload = () => {
        this.$refs.canvas.width = this.img.naturalWidth;
        this.$refs.canvas.height = this.img.naturalHeight;
        this.ctx.drawImage(this.img, 0, 0);

        this.ctx.globalCompositeOperation = 'darken';
        this.ctx.fillStyle = '#f7f7f7';
        this.ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      };

      // img.src = 'https://marketdo4a.com/upload/resizer/eb/86081_380x380_eb3e46411c38f8c29a12f9b64be3e26d.jpg?1534642513';
      this.img.src = this.activePacking.img;

    }
  }
</script>
