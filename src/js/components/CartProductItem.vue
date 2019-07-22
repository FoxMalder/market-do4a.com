<template>
  <div class="order-product">
    <div class="order-product__col-image">
      <img class="order-product__img"
              :src="'https://marketdo4a.com' + item.DETAIL_PICTURE_SRC"
              :srcset="'https://marketdo4a.com' + item.DETAIL_PICTURE_SRC_2X + ' 2x'"
              :alt="item.NAME">
    </div>
    <div class="order-product__col-info">
      <a :href="item.DETAIL_PAGE_URL" class="order-product__name">{{item.NAME}}</a>
      <!--      <div class="order-product__description">900 гр.</div>-->
    </div>
    <div class="order-product__col-count">
      <!--      <div class="order-product__counter">{{item.QUANTITY}}</div>-->
      <div class="order-product__count-note">{{item.SUM_NUM}} ₽/шт.</div>
    </div>
    <div class="order-product__col-price" v-if="item.SUM_BASE > item.SUM_NUM">
      <del class="order-product__old-price">{{item.SUM_BASE}} <span class="currency">₽</span></del>
      <div class="order-product__price">{{item.SUM_NUM}} <span class="currency">₽</span></div>
      <div class="order-product__profit">Выгода {{item.SUM_BASE - item.SUM_NUM}} ₽</div>
    </div>
    <div class="order-product__col-price" v-else>
      <div class="order-product__price">{{item.SUM_NUM}} <span class="currency">₽</span></div>
    </div>
    <button class="order-product__btn-delete"
            @click.prevent="$emit('remove')">
      <i class="icon icon-delete"></i>
    </button>
  </div>
</template>

<script>
  const example = {
    'MODULE': 'catalog',
    'PRODUCT_ID': '68504',
    'ID': '894239',
    'LID': 's1',
    'QUANTITY': '1',
    'WEIGHT': '0.00',
    'DELAY': 'N',
    'CAN_BUY': 'Y',
    'PRICE': '1080',
    'CUSTOM_PRICE': 'N',
    'BASE_PRICE': '1200.0000',
    'PRODUCT_PRICE_ID': '260560',
    'PRICE_TYPE_ID': '4',
    'CURRENCY': 'RUB',
    'BARCODE_MULTI': 'N',
    'RESERVED': 'N',
    'RESERVE_QUANTITY': '',
    'NAME': 'Do4a Lab Premium Whey 80% (без вкуса) 900 гр',
    'CATALOG_XML_ID': '39d444e9-5c50-414d-81a2-f4dc0e43542e#',
    'VAT_RATE': '0.0000',
    'NOTES': 'BASE',
    'DISCOUNT_PRICE': '120',
    'PRODUCT_PROVIDER_CLASS': '\\nav\\ProductProvider',
    'CALLBACK_FUNC': '',
    'ORDER_CALLBACK_FUNC': '',
    'PAY_CALLBACK_FUNC': '',
    'CANCEL_CALLBACK_FUNC': '',
    'DIMENSIONS': 'a:3:{s:5:\"WIDTH\";s:1:\"0\";s:6:\"HEIGHT\";s:1:\"0\";s:6:\"LENGTH\";s:1:\"0\";}',
    'TYPE': '',
    'SET_PARENT_ID': '',
    'DETAIL_PAGE_URL': '/catalog/product/do4a_lab_premium_whey_80_bez_vkusa_900_gr/',
    'FUSER_ID': '22828394',
    'MEASURE_CODE': '796',
    'MEASURE_NAME': 'шт',
    'ORDER_ID': '',
    'DATE_INSERT': '15.07.2019 23:20:35',
    'DATE_UPDATE': '15.07.2019 23:20:35',
    'PRODUCT_XML_ID': '214ecf00-5a55-11e7-80c1-a0b3ccedefb6',
    'SUBSCRIBE': 'N',
    'RECOMMENDATION': '',
    'VAT_INCLUDED': 'Y',
    'SORT': '100',
    'DATE_REFRESH': '',
    'DISCOUNT_NAME': '',
    'DISCOUNT_VALUE': '',
    'DISCOUNT_COUPON': '',
    'PRICE_FORMATED': '1 080.00 р.',
    'WEIGHT_FORMATED': '0 кг',
    'DISCOUNT_PRICE_PERCENT': '10',
    'DISCOUNT_PRICE_PERCENT_FORMATED': '10%',
    'BASE_PRICE_FORMATED': '1 200.00 р.',
    'PROPS': [],
    'SUM_NUM': '1080',
    'SUM': '1 080.00 р.',
    'SUM_BASE': '1200',
    'SUM_BASE_FORMATED': '1 200.00 р.',
    'DETAIL_PICTURE': '85889',
    'PREVIEW_TEXT': 'Do4a Lab Premium Whey 80% (без вкуса) 900 гр',
    'PREVIEW_TEXT_TYPE': 'text',
    'PREVIEW_PICTURE_SRC': '',
    'DETAIL_PICTURE_SRC': '/upload/resize_cache/iblock/595/160_160_1/whey_copy.png',
    'DETAIL_PICTURE_SRC_2X': '/upload/resize_cache/iblock/595/320_320_1/whey_copy.png',
    'DETAIL_PICTURE_SRC_ORIGINAL': '/upload/iblock/595/whey_copy.png',
    'MEASURE_TEXT': 'шт',
    'MEASURE': '796'
  };
  // const data = {
  //   id: item.data.ID,
  //   name: item.data.NAME,
  //   url: item.data.DETAIL_PAGE_URL,
  //   price: item.data.PRICE,
  //   quantity: item.data.QUANTITY,
  //   amount: offer.AMOUNT // max quantity
  // };

  export default {
    name: "CartProductItem",
    props: {
      item: {
        type: Object,
        required: true
      },
    },
    methods: {
      remove() {
        this.$emit('remove', this.item.ID);
      }
    },
    destroyed() {
      console.log('destroyed');
    }
  }
</script>
