import ymaps from 'ymaps';

function initMap(el, param, data) {
  if (!el || el === '') return;

  const init = (maps) => {
    // Создание карты.
    const mainPageMap = new maps.Map(el, param);

    const objectManager = new maps.ObjectManager({
      // Чтобы метки начали кластеризоваться, выставляем опцию.
      clusterize: true,
      // ObjectManager принимает те же опции, что и кластеризатор.
      gridSize: 32,
      clusterDisableClickZoom: true,
    });

    const templateBalloonLayout = maps.templateLayoutFactory.createClass(
      `<div class="map-balloon ">
        <div class="map-balloon__inner">
          $[[options.contentLayout observeSize]]
        </div>
      </div>`,
      {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build() {
          this.constructor.superclass.build.call(this);

          this.$element = $('.map-balloon', this.getParentElement());

          this.applyElementOffset();

          // this.$element.find('.close')
          //   .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear() {
          // this._$element.find('.close')
          //   .off('click');

          this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange() {
          templateBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this.isElement(this.$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset() {
          this.$element.css({
            left: -(this.$element[0].offsetWidth / 2),
            // top: -(this._$element[0].offsetHeight),
            // top: -(this._$element[0].offsetHeight / 2),
          });
        },

        // /**
        //  * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
        //  * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
        //  * @function
        //  * @name onCloseClick
        //  */
        // onCloseClick: function (e) {
        //   e.preventDefault();
        //
        //   this.events.fire('userclose');
        // },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape() {
          if (!this.isElement(this.$element)) {
            return templateBalloonLayout.superclass.getShape.call(this);
          }

          const position = this.$element.position();

          return new maps.shape.Rectangle(new maps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [position.left + this.$element[0].offsetWidth, 0],
          ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        isElement(element) {
          return element && element[0];
        },
      },
    );

    const templateBalloonContentLayout = maps.templateLayoutFactory.createClass(`
        <div class="map-balloon__address">{{ properties.address }}</div>
        <div class="map-balloon__tel">{{ properties.tel }}</div>
        <div class="map-balloon__scheme">{{ properties.link }}</div>`);

    objectManager.objects.options
      .set({
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/marker.svg',
        // Размеры метки.
        iconImageSize: [58, 74],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-29, -74],

        balloonShadow: false,
        balloonLayout: templateBalloonLayout,
        balloonContentLayout: templateBalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        // balloonContentLayout: balloonLayout
        // Не скрываем иконку при открытом балуне.
        hideIconOnBalloonOpen: false,
        // И дополнительно смещаем балун, для открытия над иконкой.
        balloonOffset: [40, 15],
      });

    objectManager.objects.events
      .add('balloonopen', (e) => {
        e.get('target').options.set('iconImageHref', 'img/marker-selected.svg');
      })
      .add('balloonclose', (e) => {
        e.get('target').options.set('iconImageHref', 'img/marker.svg');
      });

    mainPageMap.geoObjects.add(objectManager);
    objectManager.add(data);
  };

  ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then(init)
    .catch(error => console.log('Failed to load Yandex Maps', error));
}


initMap(
  document.querySelector('#map'), {
    center: [55.76, 37.64],
    zoom: 7,
    controls: [],
  }, {
    type: 'Feature',
    id: 0,
    geometry: {
      type: 'Point',
      coordinates: [55.76, 37.64],
    },
    properties: {
      address: 'ул. Невзоровых, 64к2',
      tel: '8 (920) 028-20-44',
      link: 'Схема проезда',
    },
  },
);
