<template>
  <div class="p-detail__info">
    <div class="p-detail__control">
      <ControlSelect/>
    </div>
    
    <div class="p-detail__availability">
      <template v-if="!isAvailableOffer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" fill="#C0C0C0"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3703 7.75295L12.2468 6.62941L10 8.87617L7.75324 6.62939L6.6297 7.75292L8.87649 9.99971L6.6291 12.2471L7.75264 13.3706L10 11.1232L12.2474 13.3706L13.3709 12.2471L11.1236 9.99971L13.3703 7.75295Z" fill="white"/>
        </svg>
        <span>Нет в наличии</span>
      </template>
      
      <template v-else-if="activeOffer.count_group > 0">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z" fill="#80C627"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7072 8.20706L9.00008 13.9142L5.29297 10.2071L6.70718 8.79285L9.00008 11.0857L13.293 6.79285L14.7072 8.20706Z" fill="white"/>
        </svg>
        <span>В наличии сейчас в
        <a class="text-link" data-anchor href="#stores"
        >{{ formatUnit(availableStore.length, ['магазине', 'магазинах', 'магазинах']) }}</a></span>
      </template>
      
      <template v-else-if="activeOffer.count_remote > 0">
        <svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.215 9.554L24.215 5.553C24.045 5.214 23.699 5 23.32 5H19.5L18.834 9.001H17.834L18.807 3.164C18.856 2.874 18.774 2.578 18.582 2.353C18.392 2.129 18.113 2 17.819 2H6.347C5.857 2 5.44 2.354 5.36 2.835L5.166 4H8.5C8.776 4 9 4.224 9 4.5C9 4.776 8.776 5 8.5 5H1.5C1.224 5 1 5.224 1 5.5C1 5.776 1.223 6 1.5 6H6.5C6.776 6 7 6.224 7 6.5C7 6.776 6.776 7 6.5 7H1C0.724 7 0.5 7.224 0.5 7.5C0.5 7.776 0.723 8 1 8H7.5C7.776 8 8 8.224 8 8.5C8 8.776 7.776 9 7.5 9H0.5C0.224 9 0 9.224 0 9.5C0 9.776 0.223 10 0.5 10H5.5C5.776 10 6 10.224 6 10.5C6 10.775 5.776 11 5.5 11H3.875L3.194 14.836C3.145 15.126 3.227 15.422 3.418 15.647C3.607 15.871 3.887 16 4.181 16H5C5 14.07 6.57 12.5 8.5 12.5C10.43 12.5 12 14.07 12 16H17C17 14.07 18.57 12.5 20.5 12.5C22.43 12.5 24 14.07 24 16V16.001H24.487C24.976 16.001 25.392 15.647 25.472 15.166L26.306 10.165C26.342 9.957 26.308 9.743 26.215 9.554ZM8.5 18.5C9.88071 18.5 11 17.3807 11 16C11 14.6193 9.88071 13.5 8.5 13.5C7.11929 13.5 6 14.6193 6 16C6 17.3807 7.11929 18.5 8.5 18.5ZM23 16C23 17.3807 21.8807 18.5 20.5 18.5C19.1193 18.5 18 17.3807 18 16C18 14.6193 19.1193 13.5 20.5 13.5C21.8807 13.5 23 14.6193 23 16Z" fill="#101010"/>
          <path d="M14 5.5C14 8.53757 11.5376 11 8.5 11C5.46243 11 3 8.53757 3 5.5C3 2.46243 5.46243 0 8.5 0C11.5376 0 14 2.46243 14 5.5Z" fill="#80C627"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0419 4.21477L7.77906 7.27372L5.97168 5.70033L6.62828 4.94609L7.75423 5.92627L10.358 3.48523L11.0419 4.21477Z" fill="#F7F7F7"/>
        </svg>
        <span>{{ textDelivery || 'Доставка почтой' }}</span>
      </template>
    </div>
    
    <div class="p-detail__row">
      <ProductPrice/>
      <ControlCounter :isAvailable="isAvailableOffer" :offer="activeOffer"/>
    </div>
    
    <div class="p-detail-delivery" v-if="isAvailableOffer">
      
      <template v-if="activeOffer.count_group > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">
            Самовывоз из
            <a class="text-link nowrap" data-anchor href="#stores" title="Смотреть магазины"
            >{{ formatUnit(availableStore.length, ['магазина', 'магазинов', 'магазинов']) }}</a>
            сегодня
          </div>
          <div class="p-detail-delivery__value">Бесплатно</div>
        </div>
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером завтра</div>
          <div class="p-detail-delivery__value">Бесплатно от {{ (currentCity && currentCity.priceDelivery) || '2 990'}} ₽</div>
        </div>
        <div class="p-detail-delivery-info__bottom">Оплата при получении</div>
      </template>
      
      <template v-else-if="activeOffer.count_remote > 0">
        <div class="p-detail-delivery__row">
          <div class="p-detail-delivery__key">Курьером</div>
          <div class="p-detail-delivery__value">Бесплатно от {{(currentCity && currentCity.priceDelivery) || '2 990'}} ₽</div>
        </div>
        <div class="p-detail-delivery-info__bottom">
          Оплата картой онлайн <i class="icon icon-visa"></i> <i class="icon icon-mastercard"></i>
          <i class="icon icon-mir"></i>
        </div>
      </template>
    
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex';
  import Utils from '../../utils/utils';

  import ControlCounter from './ControlCounter.vue';
  import ControlSelect from './ControlSelect.vue';
  import ProductImage from './ImageBlock.vue';
  import ProductPrice from './Price.vue';


  export default {
    name: "Detail",
    components: {
      ControlCounter,
      ControlSelect,
      ProductImage,
      ProductPrice,
    },
    computed: {
      ...mapState('product', {
        productName: state => state.name,
        textDelivery: state => state.textDelivery,
      }),
      ...mapGetters({
        currentCity: 'currentCity',
        activePacking: 'product/activePacking',
        activeOffer: 'product/activeOffer',
        isAvailableOffer: 'product/isAvailableOffer'
      }),
      availableStore() {
        return Object.keys(this.activeOffer.available_store).filter(key => this.activeOffer.available_store[key] > 0)
      },
    },
    methods: {
      formatUnit(count, units) {
        return `${count} ${Utils.declOfNum(count, units)}`
      }
    }
  }
</script>

<style scoped>

</style>
