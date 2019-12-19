<template>
  <div class="vendor-card">
    <div class="vendor-card__wrapper">
      <div class="vendor-card__img">
        <img v-lazy="img" :alt="name">
      </div>
      <div class="vendor-card__body">
        <a class="vendor-card__title stretched-link" :href="url">{{ name }}</a>
        <div class="vendor-card__description" v-text="description">
          {{ description }}
        </div>
      </div>
      <div class="vendor-card__footer">
        <div class="vendor-card__row">
          <div v-if="quantity > 0" class="vendor-card__stock-title">
            {{ quantityText }}
          </div>
          <div v-else class="vendor-card__stock-value">
            Нет товаров в наличии
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils';

export default {
  name: 'BrandsItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '/upload/resizer/notfound.svg?Element+not+found',
    },
    description: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    quantityText() {
      return `${this.quantity} ${Utils.declOfNum(this.quantity, ['товар', 'товара', 'товаров'])}`;
    },
  },
};
</script>
