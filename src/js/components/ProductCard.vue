<template>
  <div class="product-card">
    <div class="product-card__wrapper" itemscope itemtype="http://schema.org/Product">
      <div class="product-card__img">
        <img :src="product.img" :srcset="product.img2x + ' 2x'" :alt="product.name">
      </div>
      <div class="product-card__body">
        <template v-if="product.isAvailable && isLocaleStore && $store.getters.isRealCity">
          <div v-if="product.isDeliveryOneDay"
               class="product-card__badge product-card__badge_local">Магазин рядом, 1 день</div>
          <div v-else
               class="product-card__badge product-card__badge_central">Со склада в СПБ, {{ shipingPeriod }}</div>
        </template>
        <a class="product-card__title stretched-link" :href="product.url" itemprop="name">{{product.name}}</a>
        <div class="product-card__description" itemprop="description">{{product.section}}</div>
      </div>
      <div class="product-card__footer" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">
        <div class="product-card__price">
          <meta itemprop="price" :content="product.price">
          <meta itemprop="priceCurrency" content="RUB">
          <span class="small">от</span>
          <span class="price">{{ product.price | formatPrice }}</span>
        </div>
        <div class="product-card__sale" v-if="product.price_benefit > 0">
          Экономия до {{ product.price_benefit | formatPrice }}
        </div>
        <div class="product-card__row">
          <div class="product-card__reviews" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
            <meta itemprop="ratingValue" :content="product.rating">
            <meta itemprop="bestRating" content="5">
            <meta itemprop="reviewCount" :content="product.review">
            <span class="product-card__rating" v-if="product.rating >= 3">
              <i class="i i-star"
                 v-for="i in [1, 2, 3, 4, 5]"
                 :class="{ red: i <= product.rating }"></i>
            </span>
            <span>{{ product.review ? getText(product.review, ['отзыв', 'отзыва', 'отзывов']) : '' }}</span>
          </div>
          <div class="product-card__stock">
            <template v-if="product.isAvailable">
              <link itemprop="availability" href="http://schema.org/InStock"/>
              <div class="green">В наличии</div>
            </template>
            <template v-else>
              <link itemprop="availability" href="http://schema.org/OutOfStock"/>
              <div class="red">Нет в наличии</div>
            </template>
            <div v-if="product.pack_count > 0">{{getText(product.pack_count, ['фасовка', 'фасовки', 'фасовок'])}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-stickers">
      <!--      <div class="product-stickers__item product-stickers__item_red product-stickers__item_delivery"-->
      <!--           v-if="product.isDeliveryOneDay">Доставка <br>1 день</div>-->
      <div class="product-stickers__item product-stickers__item_yellow"
           v-if="product.isRecommend">Рекомендуем</div>
      <div class="product-stickers__item product-stickers__item_green"
           v-if="product.isNew">Новинка</div>
      <div class="product-stickers__item product-stickers__item_red"
           v-if="product.isHit">Хит!</div>
    </div>
    <div class="product-control">
      <button class="product-control__favorites" type="button" title="Добавить в избранное"
              :class="{ active: product.isFavorite }"
              @click.prevent="toggleFavorites(product)">
        <svg viewBox="0 0 31 27" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1065 3.81673L15.213 4.99927L16.3074 3.80551C17.6287 2.36432 19.5549 1.5 21.6674 1.5C25.6637 1.5 28.9273 4.75892 28.9337 8.7695C28.9367 10.7119 28.182 12.5375 26.7977 13.9221C26.7972 13.9226 26.7967 13.9231 26.7962 13.9235L15.1759 25.4703L3.63848 13.9236L3.63848 13.9236L3.63448 13.9196C2.2583 12.5527 1.5 10.7308 1.5 8.77825C1.5 4.74155 4.78042 1.50409 8.7695 1.50409C10.8195 1.50409 12.7446 2.36126 14.1065 3.81673ZM15.2282 25.5227L15.2277 25.5222C15.2279 25.5223 15.228 25.5225 15.2282 25.5227Z" fill="currentColor" stroke="currentColor" stroke-width="3"/>
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

  import Utils from '../utils/utils';


  export default {
    name: "ProductCard",
    props: {
      product: Object,
    },
    computed: {
      ...mapState({
        isLocaleStore: state => state.isLocaleStore
      }),

      shipingPeriod() {
        const city = this.$store.getters.currentCity;
        return city
          ? `от ${city.deliveryCountDays[0]} ${Utils.declOfNum(city.deliveryCountDays[0], ['дня', 'дней', 'дней'])}`
          : 'от 1 дня';
      }
    },
    methods: {
      ...mapActions([
        'addToCompare',
      ]),
      toggleFavorites(product) {
        if (product.isFavorite) {
          product.isFavorite = false;
          this.$store.dispatch('removeFromFavorites', product.id)
            .catch(() => {
              product.isFavorite = true;
            });
        } else {
          product.isFavorite = true;
          this.$store.dispatch('addToFavorites', product.id)
            .catch(() => {
              product.isFavorite = false;
            });
        }
      },
      getText(count, arr) {
        return `${count} ${Utils.declOfNum(count, arr)}`;
      }
    },
  }
</script>

<style scoped>

</style>
