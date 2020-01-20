<template>
  <div class="p-images-block">
    <!--    <div-->
    <!--      class="p-images-block__image p-images-block__image_success"-->
    <!--      :style="{ opacity: isAvailableOffer ? 1 : '0.3' }"-->
    <!--    >-->
    <div
      class="p-images-block__image"
      :class="{ 'p-images-block__image_success': imgStatus === 'success' && activePacking.gallery && activePacking.gallery.length > 0 }"
    >
      <!--      <img-->
      <!--        v-for="(image, index) in activePacking.gallery"-->
      <!--        v-show="index === activeIndex"-->
      <!--        class="p-images-block__img"-->
      <!--        :key="image.img.src2x"-->
      <!--        :src="image.img.src2x"-->
      <!--        :alt="activePacking.name"-->
      <!--      >-->

      <template v-if="activePacking.gallery && activePacking.gallery.length > 0">
        <img
          v-if="isSupport"
          class="p-images-block__img"
          :style="{ opacity: isAvailableOffer ? 1 : '0.3' }"
          :src="activePacking.gallery[0].img.src"
          :srcset="`${activePacking.gallery[0].img.src2x} 2x`"
          :alt="activePacking.imgAlt || activePacking.name"
          :title="activePacking.imgTitle"
          @load="imgStatus = 'success'"
          @error="imgStatus = 'error'"
        >
        <CanvasImage
          v-else
          class="p-images-block__img"
          :style="{ opacity: isAvailableOffer ? 1 : '0.3' }"
          :src="activePacking.gallery[0].img.src"
          :src2x="activePacking.gallery[0].img.src2x"
          @load="imgStatus = 'success'"
          @error="imgStatus = 'error'"
        />
      </template>
    </div>

    <!--    <div class="p-images-list" v-if="activePacking.gallery.length > 1">-->
    <!--      <ul class="p-images-list__wrapper" role="tablist">-->
    <!--        <li-->
    <!--          class="p-images-list__item" role="presentation"-->
    <!--          v-for="(image, index) in activePacking.gallery">-->
    <!--          <a-->
    <!--            class="p-images-list__link"-->
    <!--            :class="{ active: activeIndex === index }"-->
    <!--            :href="image.preview.src2x" target="_image"-->
    <!--            @click.prevent="activeIndex = index">-->
    <!--            <img-->
    <!--              class="p-images-list__img"-->
    <!--              :src="image.preview.src2x">-->
    <!--          </a>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->

    <div class="product-stickers">
      <!--<div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery"-->
      <!--     v-if="activePacking.isDeliveryOneDay && activeOffer.count_group > 0"-->
      <!--&gt;Доставка <br>1 день</div>-->

      <div
        v-if="activePacking.isRecommend"
        class="product-stickers__item product-stickers__item_yellow"
      >Рекомендуем</div>

      <div
        v-if="activePacking.isNew"
        class="product-stickers__item product-stickers__item_green"
      >Новинка</div>

      <div
        v-if="activePacking.isHit"
        class="product-stickers__item product-stickers__item_red"
      >Хит!</div>
    </div>

    <div class="product-control">
      <button
        class="product-control__favorites"
        type="button"
        title="Добавить в избранное"
        :class="{ active: isFavorite }"
        @click="toggleFavorites"
      >
        <svg viewBox="0 0 31 27" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.1065 3.81673L15.213 4.99927L16.3074 3.80551C17.6287 2.36432 19.5549 1.5 21.6674 1.5C25.6637 1.5 28.9273 4.75892 28.9337 8.7695C28.9367 10.7119 28.182 12.5375 26.7977 13.9221C26.7972 13.9226 26.7967 13.9231 26.7962 13.9235L15.1759 25.4703L3.63848 13.9236L3.63848 13.9236L3.63448 13.9196C2.2583 12.5527 1.5 10.7308 1.5 8.77825C1.5 4.74155 4.78042 1.50409 8.7695 1.50409C10.8195 1.50409 12.7446 2.36126 14.1065 3.81673ZM15.2282 25.5227L15.2277 25.5222C15.2279 25.5223 15.228 25.5225 15.2282 25.5227Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </button>
      <!--<button class="product-control__compare" type="button" @click="addToCompare(activePacking)" title="Сравнить">-->
      <!--  <svg viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--    <rect x="0.117188" y="3.7011" width="2.82316" height="16.939" rx="1" fill="currentColor" />-->
      <!--    <rect x="5.05762" y="9.34743" width="2.82316" height="11.2926" rx="1" fill="currentColor" />-->
      <!--    <rect x="9.99805" y="7.23006" width="2.82316" height="13.41" rx="1" fill="currentColor" />-->
      <!--    <rect x="14.9385" y="12.8764" width="2.82316" height="7.76369" rx="1" fill="currentColor" />-->
      <!--    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7616 0.877944C18.2094 0.877944 17.7616 1.32566 17.7616 1.87794V3.7011H15.9385C15.3862 3.7011 14.9385 4.14882 14.9385 4.7011V4.81848C14.9385 5.37076 15.3862 5.81848 15.9385 5.81848H17.7616V7.64164C17.7616 8.19392 18.2094 8.64164 18.7616 8.64164H18.879C19.4313 8.64164 19.879 8.19392 19.879 7.64164V5.81847H21.7022C22.2545 5.81847 22.7022 5.37076 22.7022 4.81847V4.7011C22.7022 4.14882 22.2545 3.7011 21.7022 3.7011H19.879V1.87794C19.879 1.32566 19.4313 0.877944 18.879 0.877944H18.7616Z" fill="currentColor" />-->
      <!--  </svg>-->
      <!--</button>-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import CanvasImage from './DetailGalleryCanvas.vue';


export default {
  name: 'ImageBlock',
  components: {
    CanvasImage,
  },
  data() {
    return {
      isSupport: CSS.supports('mix-blend-mode', 'darken'),
      imgStatus: 'loading',
      activeIndex: 0,
    };
  },
  computed: {
    ...mapGetters('product', [
      'activeOffer',
      'activePacking',
      'isAvailableOffer',
    ]),
    isFavorite() {
      return this.$store.state.favorites.indexOf(this.activePacking.id) !== -1;
    },
  },
  methods: {
    // addToFavorites() {
    //   this.activePacking.isFavorite = true;
    //   this.$store.dispatch('removeFromFavorites', this.activePacking.id)
    //     .catch(() => {
    //       this.activePacking.isFavorite = false;
    //     });
    // },
    //
    // removeFromFavorites() {
    //   this.activePacking.isFavorite = false;
    //   this.$store.dispatch('addToFavorites', this.activePacking.id)
    //     .catch(() => {
    //       this.activePacking.isFavorite = true;
    //     });
    // },

    toggleFavorites() {
      if (this.isFavorite) {
        this.$store.dispatch('removeFromFavorites', this.activePacking.id);
      } else {
        this.$store.dispatch('addToFavorites', this.activePacking.id);
      }
    },
  },
};
</script>
