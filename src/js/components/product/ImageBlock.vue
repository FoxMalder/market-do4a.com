<template>
  <div class="p-images-block" :class="{disabled: !isAvailableOffer}">
    <div class="p-images-block__image">
      <!--      <img ref="image" :src="activePacking.img" :alt="productName + ' ' + activePacking.pack">-->
      <canvas class="p-images-block__img" ref="canvas"></canvas>
<!--      <div class="p-images-block__img" ref="canvas" :style="{backgroundImage: `url(${activePacking.img})`}"></div>-->
    </div>
    <div class="product-stickers">
      <!--      <div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery">-->
      <!--        Доставка <br>1 день-->
      <!--      </div>-->
      <div class="product-stickers__item product-stickers__item_yellow" v-if="activePacking.isRecommend">Рекомендуем
      </div>
      <div class="product-stickers__item product-stickers__item_green" v-if="activePacking.isNew">Новинка</div>
      <div class="product-stickers__item product-stickers__item_red" v-if="activePacking.isHit">Хит!</div>
    </div>
    <div class="product-control">
      <button class="product-control__favorites" @click="addToFavorites(activePacking)">
        <svg>
          <use xlink:href="images/new-sprite.svg#sprite-product-card-heart"></use>
        </svg>
      </button>
      <button class="product-control__compare" @click="addToCompare(activePacking)">
        <svg>
          <use xlink:href="images/new-sprite.svg#sprite-compare-icon"></use>
        </svg>
      </button>
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

<style scoped>

</style>
