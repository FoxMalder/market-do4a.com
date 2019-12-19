<template>
  <div
    class="card-list"
    role="tabpanel"
  >
    <BrandsCardListItem
      v-for="brand in brands"
      :key="brand.id"
      :name="brand.name"
      :url="brand.url"
      :img="brand.img"
      :description="brand.desc"
      :quantity="brand.count"
    />
  </div>
</template>

<script>
import BrandsCardListItem from './BrandsCardListItem.vue';


export default {
  name: 'BrandsCardList',
  components: { BrandsCardListItem },
  props: {
    brands: {
      type: Array,
      required: true,
    },
  },
};
</script>
