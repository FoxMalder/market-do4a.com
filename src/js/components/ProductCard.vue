<template>
  <div class="product-card">
    <div
      class="product-card__wrapper"
      itemscope
      itemtype="http://schema.org/Product"
    >
      <div class="product-card__img">
        <img
          v-lazy="product.img"
          :data-srcset="`${product.img2x} 2x`"
          :alt="product.name"
        >
      </div>
      <div class="product-card__body">
        <!-- Доставка -->
        <template v-if="product.isAvailable && isLocaleStore && isRealCity">
          <div
            v-if="product.isDeliveryOneDay"
            class="product-card__badge product-card__badge_local"
            v-text="badgeTextLocal()"
          />
          <div
            v-else
            class="product-card__badge product-card__badge_central"
            v-text="badgeTextCentral()"
          />
        </template>
        <!-- Название -->
        <a
          class="product-card__title stretched-link"
          itemprop="name"
          :href="product.url"
          :title="product.urlTitle"
          v-text="product.name"
        />
        <!-- Категория -->
        <div
          class="product-card__description"
          itemprop="description"
          v-text="product.section"
        />
      </div>
      <div
        class="product-card__footer"
        itemprop="offers"
        itemscope
        itemtype="http://schema.org/Offer"
      >
        <div class="product-card__price">
          <meta itemprop="price" :content="product.price">
          <meta itemprop="priceCurrency" content="RUB">
          <span v-if="product.pack_count" class="small">от</span>
          <span class="price">{{ product.price | formatPrice }}</span>
        </div>
        <div v-if="product.price_benefit > 0" class="product-card__sale">
          Экономия до {{ product.price_benefit | formatPrice }}
        </div>
        <div class="product-card__row">
          <div
            class="product-card__reviews"
            itemprop="aggregateRating"
            itemscope
            itemtype="http://schema.org/AggregateRating"
          >
            <meta itemprop="ratingValue" :content="product.rating">
            <meta itemprop="bestRating" content="5">
            <meta itemprop="reviewCount" :content="product.review">
            <span v-if="product.rating > 2" class="product-card__rating">
              <i
                v-for="i in [1, 2, 3, 4, 5]"
                :key="i"
                class="i i-star"
                :class="{ red: i <= product.rating }"
              />
            </span>
            <span
              v-if="product.review > 0"
              v-text="getText(product.review, ['отзыв', 'отзыва', 'отзывов'])"
            />
          </div>
          <div class="product-card__stock">
            <link
              itemprop="availability"
              :href="product.isAvailable ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock'"
            >
            <div
              :class="[product.isAvailable ? 'green' : 'red']"
              v-text="product.isAvailable ? 'В наличии' : 'Нет в наличии'"
            />
            <div
              v-if="product.pack_count > 0"
              v-text="getText(product.pack_count, ['фасовка', 'фасовки', 'фасовок'])"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="product-stickers">
      <div
        v-if="product.isRecommend"
        class="product-stickers__item product-stickers__item_yellow"
        v-text="'Рекомендуем'"
      />
      <div
        v-if="product.isNew"
        class="product-stickers__item product-stickers__item_green"
        v-text="'Новинка'"
      />
      <div
        v-if="product.isHit"
        class="product-stickers__item product-stickers__item_red"
        v-text="'Хит!'"
      />
    </div>
    <div class="product-control">
      <button
        class="product-control__favorites"
        type="button"
        :class="{ active: isFavorite }"
        :title="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
        :aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
        @click.prevent="toggleFavorites"
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
      <!--      <button class="product-control__compare" type="button" title="Сравнить"-->
      <!--              @click.prevent="addToCompare(product)">-->
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

import Utils from '@/utils/utils';


export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      requared: true,
    },
  },
  computed: {
    ...mapState({
      isLocaleStore: 'isLocaleStore',
    }),
    ...mapGetters({
      isRealCity: 'isRealCity',
    }),
    isFavorite() {
      return this.$store.state.favorites.indexOf(this.product.id) !== -1;
    },
  },
  methods: {
    badgeTextCentral() {
      let period = 'от 1';
      let unit = 'дня';

      const city = this.$store.getters.currentCity;

      if (city && city.deliveryCountDays && city.deliveryCountDays.length > 1) {
        period = `${city.deliveryCountDays[0]}-${city.deliveryCountDays[1]}`;
        unit = Utils.declOfNum(city.deliveryCountDays[1], ['дня', 'дней', 'дней']);
      }

      return `Со склада в СПБ, ${period} ${unit}`;
    },

    badgeTextLocal() {
      return 'Магазин рядом, 1 день';
    },
    getText(count, arr) {
      return `${count} ${Utils.declOfNum(count, arr)}`;
    },
    toggleFavorites() {
      if (this.isFavorite) {
        this.$store.dispatch('removeFromFavorites', this.product.id);
      } else {
        this.$store.dispatch('addToFavorites', this.product.id);
      }
    },
  },
};
</script>

<style scoped>

</style>
