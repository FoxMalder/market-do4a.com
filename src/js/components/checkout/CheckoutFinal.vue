<template>
  <div class="checkout-final">
    <h3 class="checkout-final__title">Заказ оформлен, его номер:</h3>
    <p class="checkout-final__number">1354315</p>
    
    <!-- Общая сумма при нескольких заказах (правый макет) -->
<!--    <h3 class="checkout-final__sum-title">Сумма заказа:</h3>-->
<!--    <p class="checkout-final__sum">16 800 ₽</p>-->
    <!-- Общая сумма при нескольких заказах (правый макет) END -->
    
    <p class="checkout-final__description">
      Подробная информация о заказе отправлена на вашу почту
      <a class="link" href="mailto:konstantinopolsky@gmail.com">konstantinopolsky@gmail.com</a>.<br>
      В ближайшее время с вами свяжется менеджер для уточнения деталей заказа.
    </p>
    
    <!-- Только самовывоз (один заказ, левый макет) -->
    <ul class="checkout-final-info">
      <li class="checkout-final-info__item">
        <span class="gray">Доставка:</span>
        <span>самовывоз из магазина на</span>
        <a href="javascript:;"
           class="link-underline"
           data-marker-id="82955">ул. Подводников, 31</a>
      </li>
      <li class="checkout-final-info__item">
        <span class="gray">Оплата: </span>
        <span>наличными при получении</span>
      </li>
    </ul>
    
    <div class="checkout-final-pay">
      <h3 class="checkout-final-pay__title">оплатите заказ онлайн</h3>
      <div class="checkout-final-pay__row">
        <button class="btn btn-red btn-skew">Оплатить заказ</button>
        <span class="checkout-final-pay-logo">
          <i class="icon icon-visa"></i>
          <i class="icon icon-mastercard"></i>
          <i class="icon icon-mir"></i>
        </span>
      </div>
    </div>
    <!-- Только самовывоз (один заказ, левый макет) END -->
    
    
    <!-- Несколько заказов (правый макет) -->
    <div class="checkout-final-order checkout-final-order_card">
      <h3 class="checkout-final-order__title">Отправление 1</h3>
      
      <ul class="checkout-final-info">
        <li class="checkout-final-info__item">
          <span class="gray">Доставка:</span>
          <span>почтой по адресу г. Москва, ул. Мясницкая, д.15</span>
        </li>
        <li class="checkout-final-info__item">
          <span class="gray">Оплата: </span>
          <span>картой онлайн</span>
        </li>
      </ul>
      
      <ul class="checkout-final-order__total">
        <li class="checkout-final-order__item">
          <span class="gray">Стоимость товаров:</span>
          <span class="price">5 000 ₽</span>
        </li>
        <li class="checkout-final-order__item">
          <span class="gray">Доставка:</span>
          <span class="price">300 ₽</span>
        </li>
        <li class="checkout-final-order__item checkout-final-order__item_sum">
          <span class="gray">Сумма к оплате:</span>
          <span class="price">5 300 ₽</span>
        </li>
      </ul>
      <div class="checkout-final-order__footer">
        <button class="btn btn-red btn-skew">Оплатить заказ</button>
        <span class="checkout-final-pay-logo">
          <i class="icon icon-visa"></i>
          <i class="icon icon-mastercard"></i>
          <i class="icon icon-mir"></i>
        </span>
      </div>
    </div>
    <div class="checkout-final-order">
      <h3 class="checkout-final-order__title">Отправление 2</h3>
      
      <ul class="checkout-final-info">
        <li class="checkout-final-info__item">
          <span class="gray">Доставка:</span>
          <span>самовывоз из магазина на</span>
          <a href="javascript:;"
             class="link-underline"
             data-marker-id="82955">ул. Подводников, 31</a>
        </li>
        <li class="checkout-final-info__item">
          <span class="gray">Оплата: </span>
          <span>наличными при получении</span>
        </li>
      </ul>
      
      <ul class="checkout-final-order__total">
        <li class="checkout-final-order__item">
          <span class="gray">Стоимость товаров:</span>
          <span class="price">5 000 ₽</span>
        </li>
        <li class="checkout-final-order__item">
          <span class="gray">Доставка:</span>
          <span class="price">300 ₽</span>
        </li>
        <li class="checkout-final-order__item checkout-final-order__item_sum">
          <span class="gray">Сумма к оплате:</span>
          <span class="price">5 300 ₽</span>
        </li>
      </ul>
    </div>
    <!-- Несколько заказов (правый макет) END -->
    
    
    <p class="checkout-final__description">
      Обращаем ваше внимание, что товары, присутствующие в заказе,
      <strong>ставятся в бронь на срок от 1 до 3 дней.</strong><br>
      Точное время бронирования, а также все подробности о вашем заказе, вы можете уточнить по телефону выбранного
      магазина.
    </p>
    
    <div class="checkout-final-map">
      <div class="checkout-final-map__container">
        <div class="checkout-final-map__map" id="map"></div>
      </div>
      <div class="checkout-final-map__col">
        <p class="checkout-final-map__description">
          <strong>Добраться на машине:</strong><br>
          проезжаете по ул. Белинского до ТЦ «Этажи», паркуетесь на большой стоянке у торгового центра - с нее будет
          видно нашу вывеску в цоколе серой новостройки.
        </p>
        <p class="checkout-final-map__description">
          <strong>Добраться пешком:</strong><br>
          от остановки "Полтавская" - проходите вдоль улицы до ТЦ "Этажи". Выйдя на большую стоянку ТЦ "Этажи" увидите
          нашу вывеску - в цокольном этаже серой новостройки.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckoutFinal"
  }
</script>
