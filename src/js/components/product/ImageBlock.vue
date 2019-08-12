<template>
  <div class="p-images-block">
    <div class="p-images-block__image">
      <img :src="activePacking.img" :alt="productName + ' ' + activePacking.pack">
    </div>
    <div class="product-stickers">
<!--      <div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery">-->
<!--        Доставка <br>1 день-->
<!--      </div>-->
      <div class="product-stickers__item product-stickers__item_yellow" v-if="activePacking.isRecommend">Рекомендуем</div>
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
      ])
    },
  }
</script>

<style scoped>

</style>
