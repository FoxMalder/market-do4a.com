<template>
  <header class="h-navbar-collapse">
    <div class="change-city-collapse collapse" data-parent=".h-navbar-collapse">
      <div class="container">
        <div class="change-city">
          <div class="change-city__header">
            <span class="change-city__title">Города в которых есть <span class="font-weight-normal">market</span>do<span class="selected">4</span>a</span>
            <button class="change-city__btn-close btn" data-toggle="collapse" data-target=".change-city-collapse"></button>
          </div>
          <ul class="change-city__list">
            <template v-for="(list, char) in chars">
              <li class="change-city__item" v-for="(cityId, index) in list" :data-letter="index === 0 ? char : ''">
                <a class="change-city__link" href="#" @click.prevent="setCity(cityId)">{{ cities[cityId].name }}</a>
              </li>
            </template>
          </ul>
          <div class="change-city__footer">
            <a class="change-post" href="#" @click.prevent="setPost">
              <svg class="change-post__icon">
                <use xlink:href="images/new-sprite.svg#sprite-change-store-stock-icon"></use>
              </svg>
              <div class="change-post__title">Отправлять почтой<br> с центрального склада</div>
              <div class="change-post__note">Срок от 5 дней</div>
            </a>
            <div class="change-city__note"><b>Не нашли магазина в вашем городе?</b> Отправим с центрального склада почтой
              или транспортной компанией. Доставка от 250 ₽. Отправка на следующий рабочий день.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="change-store-collapse collapse" data-parent=".h-navbar-collapse">
      <div class="container">
        <div class="change-store">
          <div class="change-store__header">
            <span class="change-store__title">Выберите магазин<br> в <span class="selected">{{cities[currentCityId].name5}}</span></span>
            <button class="change-city__btn-close btn" data-toggle="collapse" data-target=".change-store-collapse"></button>
          </div>
          <ul class="change-store__list">
            <li class="change-store__item" v-for="store in stores" v-if="store.city === currentCityId && store.hidden !== 'Y'">
              <a class="change-store__link" href="#" :class="{active: isActive(store.id)}" @click.prevent="setStore(store.id)">
                <div class="change-store__item-name">{{store.name}}</div>
                <div class="change-store__item-subtitle">{{store.shortAddress}}</div>
                <div class="change-store__item-note">
                  {{store.courier === 'Y' ? 'Курьер и самовывоз' : 'Только самовывоз'}}
                </div>
              </a>
            </li>
          </ul>
          <div class="change-store__footer">
            <a class="change-post" href="#" @click.prevent="setPost">
              <svg class="change-post__icon">
                <use xlink:href="images/new-sprite.svg#sprite-change-store-stock-icon"></use>
              </svg>
              <div class="change-post__title">Отправлять почтой<br> с центрального склада</div>
              <div class="change-post__note">Срок от 5 дней</div>
            </a>
            <div class="change-store__note"><b>Не нашли нужный товар?</b> Отправим с центрального склада почтой или
              транспортной компанией. Доставка от 250 ₽. Отправка на следующий рабочий день.
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "HeaderCollapse",
    data() {
      return global.app.storeManagerData
    },
    methods: {
      setCity(cityId) {
        this.currentCityId = cityId;

        $(document.querySelector('.change-store-collapse')).collapse('show');
      },
      setStore(storeId) {
        this.sendRequest(this.currentCityId, storeId);
      },
      setPost() {
        this.sendRequest(this.noCityId, this.remoteStoreId);
      },
      isActive(storeId) {
        return parseInt(global.app.storeId, 10) === parseInt(storeId, 10);
      },
      sendRequest(cityId, storeId) {
        $.ajax({
          url: document.location.href,
          data: {
            method: 'store.set',
            cityId: cityId,
            storeId: storeId,
            backUrl: document.location.pathname + document.location.search,
            ajax: 'Y',
            sessid: global.BX ? global.BX.bitrix_sessid() : global.app.bitrix_sessid,
          },
          dataType: 'json',
        }).done((response) => {
          if (response.status === 'error') {
            alert(response.error);
            return;
          }

          if (response.redirectUrl) {
            document.location.href = response.redirectUrl;
          } else {
            document.location.reload();
          }
        });
      },
    },
  }
</script>

<style scoped>

</style>
