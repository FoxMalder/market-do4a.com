import YandexMapsLoader from 'ymaps';
import Utils from '../utils/utils';

import icon from '../../img/marker.svg';
import iconSelected from '../../img/marker-selected.svg';


export default class YandexMaps {
  constructor(element, data, options) {
    this.el = element;
    this.map = {};
    this.yandexMap = {};
    this.objectManager = {};

    this.insidePoints = {
      type: 'FeatureCollection',
      features: [],
    };
    this.outsidePoints = {
      type: 'FeatureCollection',
      features: [],
    };
    this.insideBounds = [];


    this.options = Utils.extend(YandexMaps.defaultOptions, options);


    this.initMap(data);
  }

  static defaultOptions = {
    map: {
      center: [55.76, 37.64],
      zoom: 7,
      controls: [],
    },
    apiUrl: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
    iconImage: icon,
    iconImageActive: iconSelected,
    icon: {
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: icon,
      // Размеры метки.
      iconImageSize: [58, 74],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-29, -74],
    },
    balloon: {
      balloonPanelMaxMapArea: 0,
      // Убираем тень
      balloonShadow: false,
      // Убираем автоматическое перемещение при открытии
      balloonAutoPan: false,
      // Не скрываем иконку при открытом балуне.
      hideIconOnBalloonOpen: false,
      // Смещаем балун, для открытия под иконкой.
      balloonOffset: [-64, 15],
    },
    template: {
      balloon:
        `<div class="map-balloon ">
          <div class="map-balloon__inner">
            $[[options.contentLayout observeSize]]
          </div>
        </div>`,
      balloonContent:
        `<div class="map-balloon__address">{{ properties.address }}</div>
         <div class="map-balloon__tel">{{ properties.tel }}</div>
         <div class="map-balloon__scheme">{{ properties.link }}</div>`,
    },
  };

  initMap(data) {
    if (!this.el || this.el === '') return;
    if (!data || data === '') return;

    // console.log('inner');


    Object.values(data.storeManagerData.stores).map((item) => {
      const point = {
        type: 'Feature',
        id: item.id,
        geometry: {
          type: 'Point',
          coordinates: item.coords.split(',').map(num => Number(num)),
        },
        properties: {
          address: item.name,
          tel: item.phone[0],
          link: 'Схема проезда',
        },
      };

      if (item.city === data.storeManagerData.currentCityId) {
        this.insidePoints.features.push(point);
      } else {
        this.outsidePoints.features.push(point);
      }

      return point;
    });


    this.loadMapApi();
  }

  createObjectManager() {
    this.objectManager = new this.yandexMap.ObjectManager();

    this.objectManager.objects.options
      .set(this.options.balloon)
      .set(this.options.icon)
      .set({
        balloonLayout:
          this.yandexMap.templateLayoutFactory.createClass(this.options.template.balloon),
        balloonContentLayout:
          this.yandexMap.templateLayoutFactory.createClass(this.options.template.balloonContent),
      });

    this.objectManager.objects.events
      // Меняем маркер при открытии балуна
      .add('balloonopen', (e) => {
        this.objectManager.objects.setObjectOptions(e.get('objectId'), {
          iconImageHref: this.options.iconImageActive,
        });
      })
      // Меняем маркер обратно
      .add('balloonclose', (e) => {
        this.objectManager.objects.setObjectOptions(e.get('objectId'), {
          iconImageHref: this.options.iconImage,
        });
      })
      // Скрываем балун при повторном клике на метку
      .add('click', (e) => {
        if (this.objectManager.objects.balloon.isOpen(e.get('objectId'))) {
          this.objectManager.objects.balloon.close();
        }
      });
  }

  createMap() {
    this.createObjectManager();

    // Создаем экземпляр карты
    this.map = new this.yandexMap.Map(this.el, this.options.map);
    this.map.geoObjects.add(this.objectManager);

    // Добавляем метки в выбранном городе
    this.objectManager.add(this.insidePoints);
    // Рассчитываем область этих меток (вернет null если objectManager не добавлен в geoObjects)
    this.insideBounds = this.objectManager.getBounds();
    // Добавляем оставшиеся метки
    this.objectManager.add(this.outsidePoints);

    // Позиционируем карту для показа нужного района
    this.map.setBounds(this.insideBounds, {
      // Проверка возможности установить указанный коэффициент масштабирования
      checkZoomRange: true,
    });

    this.initHtmlApi();
  }

  loadMapApi() {
    YandexMapsLoader.load(this.options.apiUrl)
      .then((maps) => {
        this.yandexMap = maps;
        this.createMap();
      })
      .catch(error => console.error('Failed to load Yandex Maps', error));
  }


  initHtmlApi() {
    Array.from(document.querySelectorAll('[data-marker-id]'))
      .map(item => item.addEventListener('click', (e) => {
        e.preventDefault();
        this.openBalloon(e.target.getAttribute('data-marker-id'));
      }));
  }

  openBalloon(objectId) {
    const object = this.objectManager.objects.getById(objectId);

    this.objectManager.objects.balloon.open(objectId)
      .then(
        this.map.panTo(object.geometry.coordinates),
      );
  }
}
