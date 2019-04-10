import ymaps from 'ymaps';

import icon from '../../img/marker.svg';
import iconSelected from '../../img/marker-selected.svg';

const mapCofig = {
  map: {
    center: [55.76, 37.64],
    zoom: 7,
    controls: [],
  },
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
};


const app = {
  storeManagerData: {
    currentCityId: '35899',
    noCityId: '35899',
    remoteStoreId: '24396',
    chars: {
      А: ['54314', '35920'],
      Б: ['65717', '68225', '55304', '70337', '80431'],
      В: ['35904', '35888', '88027', '97770', '53076'],
      Е: ['35908'],
      И: ['35896'],
      К: ['35892', '49062', '97113', '65718', '80429', '35919', '35906'],
      М: ['88950', '101341', '35883'],
      Н: ['35884', '35899', '49060', '43641', '2933', '99314', '53074'],
      О: ['64117'],
      П: ['67602', '54756'],
      Р: ['35890'],
      С: ['53765', '35916', '68340', '95370', '35881'],
      Т: ['35886', '35914'],
      У: ['53078', '80427', '53075'],
      Х: ['35912'],
      Ч: ['54186', '35897'],
      Ю: ['68341'],
      Я: ['49061'],
    },
    breaks: ['М', 'С'],
    cities: {
      2933: {
        id: '2933', name: 'Новосибирск', disconnected: '', name5: 'Новосибирске',
      },
      24468: {
        id: '24468', name: 'Доставка по России', disconnected: '', name5: 'Интернет-магазине',
      },
      35881: {
        id: '35881', name: 'Сургут', disconnected: '', name5: 'Сургуте',
      },
      35883: {
        id: '35883', name: 'Москва', disconnected: '', name5: 'Москве',
      },
      35884: {
        id: '35884', name: 'Нижневартовск', disconnected: '', name5: 'Нижневартовске',
      },
      35886: {
        id: '35886', name: 'Томск', disconnected: '', name5: 'Томске',
      },
      35888: {
        id: '35888', name: 'Владивосток', disconnected: '', name5: 'Владивостоке',
      },
      35890: {
        id: '35890', name: 'Ростов-на-Дону', disconnected: '', name5: 'Ростове-на-Дону',
      },
      35892: {
        id: '35892', name: 'Казань', disconnected: '', name5: 'Казани',
      },
      35896: {
        id: '35896', name: 'Иркутск', disconnected: '', name5: 'Иркутске',
      },
      35897: {
        id: '35897', name: 'Чита', disconnected: '', name5: 'Чите',
      },
      35899: {
        id: '35899', name: 'Нижний Новгород', disconnected: '', name5: 'Нижнем Новгороде',
      },
      35904: {
        id: '35904', name: 'Великий Новгород', disconnected: '', name5: 'Великом Новгороде',
      },
      35906: {
        id: '35906', name: 'Красноярск', disconnected: '', name5: 'Красноярске',
      },
      35908: {
        id: '35908', name: 'Екатеринбург', disconnected: '', name5: 'Екатеринбурге',
      },
      35912: {
        id: '35912', name: 'Хабаровск', disconnected: '', name5: 'Хабаровске',
      },
      35914: {
        id: '35914', name: 'Тюмень', disconnected: '', name5: 'Тюмени',
      },
      35916: {
        id: '35916', name: 'Санкт-Петербург', disconnected: '', name5: 'Санкт-Петербурге',
      },
      35919: {
        id: '35919', name: 'Краснодар', disconnected: '', name5: 'Краснодаре',
      },
      35920: {
        id: '35920', name: 'Астана', disconnected: '', name5: 'Астане',
      },
      43641: {
        id: '43641', name: 'Новороссийск', disconnected: '', name5: 'Новороссийске',
      },
      49060: {
        id: '49060', name: 'Новокузнецк', disconnected: '', name5: 'Новокузнецке',
      },
      49061: {
        id: '49061', name: 'Якутск', disconnected: '', name5: 'Якутске',
      },
      49062: {
        id: '49062', name: 'Калуга', disconnected: '', name5: 'Калуге',
      },
      53074: {
        id: '53074', name: 'Новый Уренгой', disconnected: '', name5: 'новом уренгое',
      },
      53075: {
        id: '53075', name: 'Уфа', disconnected: '', name5: 'уфе',
      },
      53076: {
        id: '53076', name: 'Воронеж', disconnected: '', name5: 'воронеже',
      },
      53078: {
        id: '53078', name: 'Ульяновск', disconnected: '', name5: 'ульяновске',
      },
      53765: {
        id: '53765', name: 'Самара', disconnected: '', name5: 'Самаре',
      },
      54186: {
        id: '54186', name: 'Челябинск', disconnected: '', name5: 'Челябинске',
      },
      54314: {
        id: '54314', name: 'Ангарск', disconnected: '', name5: 'Ангарске',
      },
      54756: {
        id: '54756', name: 'Пермь', disconnected: '', name5: 'Перми',
      },
      55304: {
        id: '55304', name: 'Бердск', disconnected: '', name5: 'Бердске',
      },
      64117: {
        id: '64117', name: 'Оренбург', disconnected: '', name5: 'Оренбурге',
      },
      65717: {
        id: '65717', name: 'Барнаул', disconnected: '', name5: 'Барнауле',
      },
      65718: {
        id: '65718', name: 'Комсомольск-на-Амуре', disconnected: '', name5: 'Комсомольске-на-Амуре',
      },
      67602: {
        id: '67602', name: 'Павлодар', disconnected: '', name5: 'Павлодаре',
      },
      68225: {
        id: '68225', name: 'Белорецк', disconnected: '', name5: 'Белорецке',
      },
      68340: {
        id: '68340', name: 'Симферополь', disconnected: '', name5: 'Симферополе',
      },
      68341: {
        id: '68341', name: 'Южно-Сахалинск', disconnected: '', name5: 'Южно-Сахалинске',
      },
      70337: {
        id: '70337', name: 'Березники', disconnected: '', name5: 'Березниках',
      },
      80427: {
        id: '80427', name: 'Уссурийск', disconnected: '', name5: 'Уссурийске',
      },
      80429: {
        id: '80429', name: 'Кострома', disconnected: '', name5: 'Костроме',
      },
      80431: {
        id: '80431', name: 'Березовский', disconnected: '', name5: 'Березовском',
      },
      88027: {
        id: '88027', name: 'Владимир', disconnected: '', name5: 'Владимире',
      },
      88950: {
        id: '88950', name: 'Магадан', disconnected: '', name5: 'Магадане',
      },
      95370: {
        id: '95370', name: 'Сочи', disconnected: '', name5: 'Сочи',
      },
      97113: {
        id: '97113', name: 'Кемерово', disconnected: '', name5: 'Кемерове',
      },
      97770: {
        id: '97770', name: 'Волгоград', disconnected: '', name5: 'Волгограде',
      },
      99314: {
        id: '99314', name: 'Новочеркасск', disconnected: '', name5: 'Новочеркасске',
      },
      101341: {
        id: '101341', name: 'Майкоп', disconnected: '', name5: 'Майкопе',
      },
    },
    stores: {
      24390: {
        id: '24390',
        name: 'ул. Кирова, д. 27',
        sort: '10',
        city: '2933',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'м.Октябрьская, между Бахетле и ГПНТБ',
        phone: ['8-983-000-13-27'],
        vk: 'https://vk.com/do4alab',
        instagram: 'https://www.instagram.com/do4alab/',
        coords: '55.018122402267,82.944041570144',
      },
      24391: {
        id: '24391',
        name: 'ул. Ильича, д. 6',
        sort: '20',
        city: '2933',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Академгородока, внутри отдела INTERSPORT',
        phone: ['8-983-000-13-28'],
        vk: 'https://vk.com/do4alab',
        instagram: 'https://www.instagram.com/do4alab/',
        coords: '54.838785589764,83.09591339154',
      },
      24392: {
        id: '24392',
        name: 'ул. Таганская, д. 3',
        sort: '502',
        city: '35883',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Таганский Пассаж&quot;, этаж 3а; ст. м. Марксистская | Таганская',
        phone: ['8-495-203-62-09'],
        vk: 'https://vk.com/do4a_market_msk',
        instagram: 'https://www.instagram.com/do4amsk_taganka/',
        coords: '55.741281618456,37.658459736771',
      },
      35882: {
        id: '35882',
        name: 'ул. Ленинградская, д. 1/2',
        sort: '500',
        city: '35881',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Невский&quot;, 2 этаж',
        phone: ['8-3462-59-09-07'],
        vk: 'https://vk.com/do4asurgut',
        instagram: 'https://www.instagram.com/do4asurgut/',
        coords: '61.250761491811,73.377752809899',
      },
      35885: {
        id: '35885',
        name: 'ул. Ленина, д. 3п, стр. 6',
        sort: '500',
        city: '35884',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ “Континент ACTIVE”',
        phone: ['8-3466-408-308'],
        vk: 'https://vk.com/do4a.market_nv',
        instagram: 'https://www.instagram.com/do4a_nv/',
        coords: '60.941227956049,76.537885068732',
      },
      35887: {
        id: '35887',
        name: 'ул. Советская, д. 46',
        sort: '500',
        city: '35886',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Вход с ул. Советской',
        phone: ['8-3822-933-899'],
        vk: 'https://vk.com/do4amarkettomsk',
        instagram: 'https://www.instagram.com/do4a_market_tomsk/',
        coords: '56.471293558387,84.953716135582',
      },
      35889: {
        id: '35889',
        name: 'пр-т Красного знамени, д. 51А',
        sort: '500',
        city: '35888',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Остановка &quot;Гоголя&quot;.',
        phone: ['8-914-209-47-55'],
        vk: 'https://vk.com/do4a25',
        instagram: 'https://www.instagram.com/do4a25/',
        coords: '43.128110799052,131.90569858466',
      },
      35891: {
        id: '35891',
        name: 'ул. Красноармейская, д.103/123',
        sort: '500',
        city: '35890',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Напротив входа в ТЦ &quot;Вавилон&quot;.',
        phone: ['8-863-264-83-22'],
        vk: 'https://vk.com/do4a_rostov',
        instagram: 'https://www.instagram.com/do4a_rostov/',
        coords: '47.230777452203,39.724558220238',
      },
      35893: {
        id: '35893',
        name: 'ул. Чернышевского, д. 17',
        sort: '500',
        city: '35892',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: '7 минут ходьбы от станции метро Кремлёвская, рядом с кафе &quot;Агафредо&quot;.',
        phone: ['8-953-408-71-78'],
        vk: 'https://vk.com/do4a_kazan',
        instagram: 'https://www.instagram.com/do4a_kazan/',
        coords: '55.792263465199,49.109790660713',
      },
      35898: {
        id: '35898',
        name: 'ул. Чкалова, д. 164',
        sort: '500',
        city: '35897',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ “Вега” (рядом с пенсионным фондом), 2 этаж',
        phone: ['8-924-577-38-38 '],
        vk: 'https://vk.com/do4a75',
        instagram: 'https://www.instagram.com/do4a.chita/',
        coords: '52.040429562379,113.49489758466',
      },
      35900: {
        id: '35900',
        name: 'ул. Невзоровых, д. 64к2',
        sort: '500',
        city: '35899',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'За ТЦ “Этажи”',
        phone: ['8-920-028-20-44'],
        vk: 'https://vk.com/do4a_nizhniy_novgorod',
        instagram: 'https://www.instagram.com/do4a_nizhniy_novgorod/',
        coords: '56.316650419498,44.021708517197',
      },
      35901: {
        id: '35901',
        name: 'ул. Лермонтова, д. 90/1',
        sort: '500',
        city: '35896',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Лермонтов&quot;, 2 этаж',
        phone: ['8-3952-64-00-51'],
        vk: 'https://vk.com/do4a_irkutsk',
        instagram: 'https://www.instagram.com/do4a_irkutsk/',
        coords: '52.262965707609,104.25924831349',
      },
      35905: {
        id: '35905',
        name: 'пр-т А. Корсунова, д. 21А',
        sort: '500',
        city: '35904',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Панорама&quot;, 3-й этаж',
        phone: ['8-8162-55-28-31'],
        vk: 'https://vk.com/do4a53',
        instagram: 'https://www.instagram.com/vnov.marketdo4a_com/',
        coords: '58.543828851341,31.245691135582',
      },
      35907: {
        id: '35907',
        name: 'ул. Белинского, д. 8',
        sort: '500',
        city: '35906',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ “Комсомол”, 3 этаж',
        phone: ['8-923-377-24-24'],
        vk: 'https://vk.com/do4a.com.krasnoyarsk',
        instagram: 'https://www.instagram.com/do4a_krsk/',
        coords: '56.020033087342,92.901418864418',
      },
      35913: {
        id: '35913',
        name: 'ул. Серышева, д. 88',
        sort: '500',
        city: '35912',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Успех&quot;. За остановкой &quot;Университет путей сообщения&quot;.',
        phone: ['8-4212-670-650'],
        vk: 'https://vk.com/do4a_khv',
        instagram: 'https://www.instagram.com/do4a_khv',
        coords: '48.494795885908,135.06528577116',
      },
      35915: {
        id: '35915',
        name: 'ул. 50 лет Октября, д. 21А',
        sort: '500',
        city: '35914',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Перекресток ул. 50 лет Октября и ул. Максима Горького',
        phone: ['8-9044-97-66-77'],
        vk: 'https://vk.com/do4a.com72',
        instagram: 'https://www.instagram.com/do4a.com72/',
        coords: '57.151925912504,65.570420660713',
      },
      35918: {
        id: '35918',
        name: 'ул. Восстания, д. 9',
        sort: '501',
        city: '35916',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'Ст. м. Площадь Восстания.',
        phone: ['+7-812-426-88-36'],
        vk: 'https://vk.com/do4a_market_spb',
        instagram: 'https://www.instagram.com/do4a_spb/',
        coords: '59.933439989303,30.360481118385',
      },
      35921: {
        id: '35921',
        name: 'ул. Ставропольская, д. 157',
        sort: '500',
        city: '35919',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: '',
        phone: ['8-918-217-10-75'],
        vk: 'https://vk.com/do4a_market_krd',
        instagram: 'https://www.instagram.com/do4a_market_krd/',
        coords: '45.018382151921,39.035309949074',
      },
      43642: {
        id: '43642',
        name: 'ул. Энгельса, д. 79',
        sort: '500',
        city: '43641',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Вход со стороны ул. Серова',
        phone: ['8-918-44-84-333'],
        vk: 'https://vk.com/do4a_market_novoros',
        instagram: 'https://www.instagram.com/do4a.com_nvrsk/',
        coords: '44.708720077515,37.781518313492',
      },
      43644: {
        id: '43644',
        name: 'ул. Дмитриевского, д. 3',
        sort: '503',
        city: '35883',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ст. м. Выхино | Новокосино',
        phone: ['8-495-755-95-47'],
        vk: 'https://vk.com/do4a_market_moscow',
        instagram: 'https://www.instagram.com/do4a_moscow/',
        coords: '55.710046719994,37.883049415344',
      },
      49059: {
        id: '49059',
        name: 'пр-т Стачки, д. 190',
        sort: '500',
        city: '35890',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Пересечение проспекта Стачки с ул. Зорге.',
        phone: ['8-863-241-83-22'],
        vk: 'https://vk.com/do4a_rostov',
        instagram: 'https://www.instagram.com/do4a_rostov/',
        coords: '47.212853905315,39.636735544314',
      },
      49458: {
        id: '49458',
        name: 'ул. Суворова, д. 77',
        sort: '500',
        city: '49062',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Плехановский&quot;',
        phone: ['8-953-315-17-72'],
        vk: 'https://vk.com/do4a_klg',
        instagram: 'https://www.instagram.com/do4a_klg/',
        coords: '54.518115466008,36.248212987436',
      },
      49459: {
        id: '49459',
        name: 'пр-т Ермакова, д. 30А',
        sort: '500',
        city: '49060',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТПЦ &quot;Виктория&quot;',
        phone: ['8-951-611-11-56'],
        vk: 'https://vk.com/do4a_nvkz',
        instagram: 'https://www.instagram.com/do4a.com_nvkz/',
        coords: '53.768346433472,87.134942550268',
      },
      49460: {
        id: '49460',
        name: 'ул. Петра Алексеева, д. 11',
        sort: '500',
        city: '49061',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: '',
        phone: ['8-984-104-76-47'],
        vk: 'https://vk.com/do4a_ykt',
        instagram: 'https://www.instagram.com/do4a.com_ykt/',
        coords: '62.035837996899,129.73847264418',
      },
      53079: {
        id: '53079',
        name: '1905 года переулок, д. 14/1',
        sort: '500',
        city: '35886',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Новый ГУМ&quot;, 3 этаж',
        phone: ['8-3822-933-558'],
        vk: 'https://vk.com/do4amarkettomsk',
        instagram: 'https://www.instagram.com/do4a_market_tomsk/',
        coords: '56.494087731371,84.949883736113',
      },
      53080: {
        id: '53080',
        name: 'ул. Бакалинская, д. 64',
        sort: '500',
        city: '53075',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'мкр. Солнечный',
        phone: ['+7-927-236-36-29 '],
        vk: 'https://vk.com/ufa_do4a',
        instagram: 'https://www.instagram.com/ufa_do4a/',
        coords: '54.719454519832,55.988851604166',
      },
      53761: {
        id: '53761',
        name: 'ул. Никитинская 27',
        sort: '500',
        city: '53076',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Напротив Воронежской областной юношеской библиотеки им. В.М. Кубанева',
        phone: ['8-919-244-11-91'],
        vk: 'https://vk.com/do4a_vrn',
        instagram: 'https://www.instagram.com/do4a_vrn/',
        coords: '51.663744485734,39.194909246033',
      },
      53763: {
        id: '53763',
        name: 'ул. Интернациональная 4',
        sort: '500',
        city: '53074',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Сибирь',
        phone: ['8-900-4000-441'],
        vk: 'https://vk.com/do4a_nur',
        instagram: 'https://www.instagram.com/do4a_nur/',
        coords: '66.08564,76.678333',
      },
      53764: {
        id: '53764',
        name: 'ул. Минаева, д. 3',
        sort: '500',
        city: '53078',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Остановка &quot;12 Сентября&quot;',
        phone: ['8-8422-71-02-03 '],
        vk: 'https://vk.com/73do4a',
        instagram: 'https://www.instagram.com/73do4a/',
        coords: '54.307569213891,48.381249387732',
      },
      54185: {
        id: '54185',
        name: 'пр-т Ленина, д. 12А',
        sort: '500',
        city: '53765',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Мелодия | м. Алабинская',
        phone: ['8-846-990-49-00'],
        vk: 'https://vk.com/do4a_samara',
        instagram: 'https://www.instagram.com/do4a_samara/',
        coords: '53.20915350627,50.137008058982',
      },
      54194: {
        id: '54194',
        name: 'ул. Куйбышева, д. 57',
        sort: '500',
        city: '35908',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ст. м. Геологическая',
        phone: ['8-922-619-36-26'],
        vk: 'https://vk.com/do4aekb',
        instagram: 'https://www.instagram.com/do4a_ekb/',
        coords: '56.82726509703,60.601521266865',
      },
      54195: {
        id: '54195',
        name: 'ул. Труда, д. 156',
        sort: '602',
        city: '54186',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТК Западный Луч, 2 этаж (Основной Магазин)',
        phone: ['8-900-025-20-04'],
        vk: 'https://vk.com/do4achel',
        instagram: 'https://www.instagram.com/do4achel/',
        coords: '55.168983896404,61.378874093918',
      },
      54315: {
        id: '54315',
        name: 'ул. 188-й квартал, д. 17',
        sort: '500',
        city: '54314',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Напротив касс ДК &quot;Современник&quot;.',
        phone: ['8-914-878-99-97'],
        vk: 'http://vk.com/do4a_138',
        instagram: 'https://www.instagram.com/do4a_138/',
        coords: '52.507877989693,103.83582963988',
      },
      54581: {
        id: '54581',
        name: 'Варшавское шоссе, д. 26, стр. 5',
        sort: '500',
        city: '35883',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ст. м. Нагатинская; ТЦ &quot;FOR YOU&quot;, 2 этаж',
        phone: ['8-929-592-78-77'],
        vk: 'https://vk.com/do4a_market_msk',
        instagram: 'https://www.instagram.com/do4amoscow/',
        coords: '55.684038384862,37.621486317791',
      },
      54757: {
        id: '54757',
        name: 'ул. Куйбышева, д. 65',
        sort: '500',
        city: '54756',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Громовский, 2 этаж. Напротив Alex Fitness ТЦ Триада',
        phone: ['8-342-202-24-46 '],
        vk: 'https://vk.com/do4aperm',
        instagram: 'https://www.instagram.com/do4a_perm/',
        coords: '57.998428745152,56.242348930059',
      },
      55305: {
        id: '55305',
        name: 'ул. Ленина 6/1, 2 этаж',
        sort: '500',
        city: '55304',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;А\'стор&quot;, 2 этаж',
        phone: ['8-383-299-06-42'],
        vk: 'https://vk.com/do4a_berdsk',
        instagram: 'https://www.instagram.com/do4a_berdsk/',
        coords: '54.764994,83.08077',
      },
      64118: {
        id: '64118',
        name: 'ул. Салмышская, д. 24',
        sort: '500',
        city: '64117',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Уют&quot;, 1 этаж',
        phone: ['92-79-60'],
        vk: 'https://vk.com/do4a_market_orenburg',
        instagram: 'https://www.instagram.com/do4a_oren56/',
        coords: '51.832799200531,55.150471922581',
      },
      65719: {
        id: '65719',
        name: 'пр-т Ленина, д. 105',
        sort: '500',
        city: '65717',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ост. Площадь Октября',
        phone: ['8 (3852) 573-574'],
        vk: 'https://vk.com/do4a_22',
        instagram: 'https://www.instagram.com/do4a_22/',
        coords: '53.357996932513,83.765750881615',
      },
      65720: {
        id: '65720',
        name: 'пр. Ленина, д. 46',
        sort: '500',
        city: '65718',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Оникс&quot;',
        phone: ['8-929-406-3939'],
        vk: 'https://vk.com/club143276213',
        instagram: 'https://www.instagram.com/do4a_market_27/',
        coords: '50.5465215806,137.0011539173',
      },
      67096: {
        id: '67096',
        name: 'ул. Щорса, д. 44',
        sort: '500',
        city: '35906',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТРК &quot;Мави&quot;',
        phone: ['8-923-377-24-24'],
        vk: 'https://vk.com/do4a.com.krasnoyarsk',
        instagram: 'https://www.instagram.com/do4a_krsk/',
        coords: '55.992378262038,92.953947809193',
      },
      67603: {
        id: '67603',
        name: 'ул. Естая, д. 134',
        sort: '500',
        city: '67602',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Рядом с ТЦ &quot;Квазар&quot;',
        phone: ['8-705-500-84-48'],
        vk: 'https://vk.com/do4a_pvl',
        instagram: 'https://www.instagram.com/do4a_pvl/',
        coords: '52.282608071903,76.961718118385',
      },
      67617: {
        id: '67617',
        name: 'ул.Туркестан, д.4а',
        sort: '500',
        city: '35920',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'рядом с ЖК &quot;АртХаус&quot;',
        phone: ['8-778-941-942-1'],
        vk: 'https://vk.com/do4a_astana_kz',
        instagram: 'https://www.instagram.com/do4a.com.astana/',
        coords: '51.116667821209,71.430145353713',
      },
      68226: {
        id: '68226',
        name: 'ул. 50 лет Октября, д. 78',
        sort: '500',
        city: '68225',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;8 Марта&quot;, 3 этаж',
        phone: ['8-903-353-12-34'],
        vk: 'https://vk.com/club147195221',
        instagram: 'https://www.instagram.com/do4a_bel/',
        coords: '53.97145354649,58.426328423279',
      },
      68342: {
        id: '68342',
        name: 'ул.Куйбышева, д. 2',
        sort: '500',
        city: '68340',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: '',
        phone: ['8-978-970-33-39'],
        vk: 'https://vk.com/do4a_simf',
        instagram: 'https://www.instagram.com/do4a_simf/',
        coords: '44.959984343129,34.109289153788',
      },
      68343: {
        id: '68343',
        name: 'ул.Комсомольская, д. 241/1',
        sort: '500',
        city: '68341',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Аист&quot;',
        phone: ['8-4242-609-111'],
        vk: 'https://vk.com/do4a.sakh',
        instagram: 'https://www.instagram.com/do4a.sakh/',
        coords: '46.940418034196,142.7520955086',
      },
      70338: {
        id: '70338',
        name: 'ул. Пятилетки, д. 150',
        sort: '500',
        city: '70337',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТРЦ &quot;Оранж Молл&quot;',
        phone: ['8-952-337-37-37'],
        vk: 'https://vk.com/do4a_berezniki',
        instagram: 'https://www.instagram.com/do4a_berezniki/',
        coords: '59.392861730348,56.856684161377',
      },
      78869: {
        id: '78869',
        name: 'ул.Карла Маркса, д. 30',
        sort: '500',
        city: '35896',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'Между улицами Чехова и Володарского, напротив &quot;Сони-центра&quot;. ',
        phone: ['8-3952-62-92-91'],
        vk: 'https://vk.com/do4a_irkutsk',
        instagram: 'https://www.instagram.com/do4a_irkutsk/',
        coords: '52.2867556343,104.29128142003',
      },
      80428: {
        id: '80428',
        name: 'ул. Горького, д. 95/1',
        sort: '500',
        city: '80427',
        courier: '',
        tempUnavailableText: '',
        shortAddress: '',
        phone: ['8-984-264-0574'],
        vk: 'https://vk.com/do4a25',
        instagram: 'https://www.instagram.com/do4a25/',
        coords: '43.80523859262,131.94235589881',
      },
      80430: {
        id: '80430',
        name: 'ул. Советская, д. 103А',
        sort: '500',
        city: '80429',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Остановка &quot;площадь Конституции&quot;.',
        phone: ['(4942) 36-01-39'],
        vk: 'https://vk.com/do4a_kostroma',
        instagram: 'https://www.instagram.com/do4a_kostroma/',
        coords: '57.760119114627,40.95925114418',
      },
      80432: {
        id: '80432',
        name: 'ул. Театральная, д. 6',
        sort: '500',
        city: '80431',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;Райт&quot;, второй этаж, офис 265',
        phone: ['8-967-858-0153'],
        vk: 'https://vk.com/do4abrz',
        instagram: 'https://www.instagram.com/do4a_berezovskiy/',
        coords: '56.907184546534,60.810665296295',
      },
      82451: {
        id: '82451',
        name: 'пл. Карла Маркса, д. 6/1',
        sort: '500',
        city: '2933',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'м. Площадь Маркса, ТЦ &quot;Калейдоскоп&quot;, 4 этаж',
        phone: ['8-983-000-13-29'],
        vk: 'https://vk.com/do4alab',
        instagram: 'https://www.instagram.com/do4alab',
        coords: '54.98097070396,82.894914965607',
      },
      82955: {
        id: '82955',
        name: 'ул. Подводников, д. 31',
        sort: '500',
        city: '35899',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ст. м. &quot;Двигатель Революции&quot;',
        phone: ['8-920-024-33-14'],
        vk: 'https://vk.com/do4a_nizhniy_novgorod',
        instagram: 'https://www.instagram.com/do4a_nizhniy_novgorod/',
        coords: '56.274694074637,43.922635985322',
      },
      88028: {
        id: '88028',
        name: 'Мира, д.26',
        sort: '500',
        city: '88027',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'перекресток ул.Мира и Горького',
        phone: ['+7-900-590-90-04'],
        vk: 'https://vk.com/do4a_vladimir',
        instagram: 'https://www.instagram.com/do4a_vladimir',
        coords: '56.138545130333,40.4008879709',
      },
      88951: {
        id: '88951',
        name: 'Магадан, ул. Коммуны д.2',
        sort: '500',
        city: '88950',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'ул. Коммуны д.2',
        phone: ['89140326542'],
        vk: 'https://vk.com/do4a__magadan',
        instagram: 'https://www.instagram.com/do4a_magadan/',
        coords: '59.568711131484,150.80351818125',
      },
      90958: {
        id: '90958',
        name: 'ул. Советская, д. 42',
        sort: '500',
        city: '64117',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ЦУМ &quot;МЕРИДИАН&quot;, 1 этаж',
        phone: ['92-79-50'],
        vk: 'https://vk.com/do4a_market_orenburg',
        instagram: 'https://www.instagram.com/do4a_oren56/',
        coords: '51.764556204758,55.100662787697',
      },
      93858: {
        id: '93858',
        name: 'ул. Хошимина, д.11, к.1',
        sort: '501',
        city: '35916',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'Ст. метро Проспект Просвещения',
        phone: ['+7-812-426-88-36'],
        vk: 'https://vk.com/do4a_market_spb',
        instagram: 'https://www.instagram.com/do4a_spb/',
        coords: '60.052259955011,30.326147201056',
      },
      94168: {
        id: '94168',
        name: 'Коломяжский проспект, дом 26',
        sort: '501',
        city: '35916',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'Ст. метро Пионерская',
        phone: ['+7-812-426-88-36'],
        vk: 'https://vk.com/do4a_market_spb',
        instagram: 'https://www.instagram.com/do4a_spb/',
        coords: '60.004244,30.295135',
      },
      94671: {
        id: '94671',
        name: 'ул. Бухарестская, 30-32',
        sort: '501',
        city: '35916',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'метро Бухарестская, ТРК &quot;Континент&quot;',
        phone: ['+7-812-426-88-36'],
        vk: 'https://vk.com/do4a_market_spb',
        instagram: 'https://www.instagram.com/do4a_spb/',
        coords: '59.883611,30.36956',
      },
      95355: {
        id: '95355',
        name: 'Проспект Ленина 86',
        sort: '603',
        city: '54186',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Курчатов, 1 этаж',
        phone: ['7-908-099-79-07'],
        vk: 'https://vk.com/do4achel',
        instagram: 'https://www.instagram.com/do4achel/',
        coords: '55.159347,61.363701',
      },
      95356: {
        id: '95356',
        name: 'ул. Северная, 6',
        sort: '501',
        city: '95370',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Sun City',
        phone: ['+7-918-105-81-96'],
        vk: 'https://vk.com/do4a__sochi',
        instagram: 'https://www.instagram.com/do4a.sochi/',
        coords: '43.594555,39.727589',
      },
      95817: {
        id: '95817',
        name: 'проспект Ульяновский, д 5А',
        sort: '500',
        city: '53078',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ &quot;ДА&quot;',
        phone: false,
        vk: 'https://vk.com/73do4a',
        instagram: 'https://www.instagram.com/73do4a/',
        coords: '54.371936,48.58381',
      },
      97114: {
        id: '97114',
        name: 'пр. Кузнецкий 33А, 2 этаж',
        sort: '20',
        city: '97113',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'Остановка ТЦ «Сити парк», рядом с ТЦ «Я»',
        phone: ['8-905-917-87-77'],
        vk: 'https://vk.com/do4a_kmr',
        instagram: 'https://www.instagram.com/do4a_kmr/',
        coords: '55.357695,86.066339',
      },
      97771: {
        id: '97771',
        name: 'ул Ким, д.7а',
        sort: '20',
        city: '97770',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'ул. Ким 7А, ТЦ Новый Континент,  2 этаж',
        phone: ['8-995-403-35-44'],
        vk: 'https://vk.com/do4a_volgograd',
        instagram: 'https://www.instagram.com/do4a_volgograd/',
        coords: '48.697714,44.501856',
      },
      99315: {
        id: '99315',
        name: 'Платовский проспект 59А',
        sort: '602',
        city: '99314',
        courier: 'Y',
        tempUnavailableText: '',
        shortAddress: 'ТЦ Универмаг, 3 этаж',
        phone: ['+7-988-588-01-99'],
        vk: 'https://vk.com/do4a_novocherkassk',
        instagram: 'https://www.instagram.com/do4a_novocherkassk',
        coords: '47.410955,40.104037',
      },
      101342: {
        id: '101342',
        name: 'ул. Жуковского, 51',
        sort: '604',
        city: '101341',
        courier: '',
        tempUnavailableText: '',
        shortAddress: 'Бизнес центр &quot;Портал&quot;',
        phone: ['8-918-224-84-12'],
        vk: 'https://vk.com/do4a_maykop',
        instagram: 'https://www.instagram.com/do4a_maykop/',
        coords: '44.61439,40.108259',
      },
    },
  },
  storeId: 24396,
};


function initMap(el, data, data2) {
  if (!el || el === '') return;

  const init = (maps) => {
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

    const objectManager = new maps.ObjectManager({});

    objectManager.objects.options
      .set({
        balloonAutoPan: false,
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

    objectManager.objects.options
      .set(mapCofig.icon);

    objectManager.objects.events
      .add('balloonopen', (e) => {
        objectManager.objects.setObjectOptions(e.get('objectId'), {
          iconImageHref: iconSelected,
        });
      })
      .add('balloonclose', (e) => {
        objectManager.objects.setObjectOptions(e.get('objectId'), {
          iconImageHref: icon,
        });
      });

    objectManager.add(data2);


    // Создание карты.
    const mainPageMap = new maps.Map(el, mapCofig.map);

    mainPageMap.geoObjects.add(objectManager);
    mainPageMap.setBounds(objectManager.getBounds(), {
      checkZoomRange: true,
    });

    objectManager.add(data);

    function openBalloon(objectId) {
      const object = objectManager.objects.getById(objectId);

      objectManager.objects.balloon.open(objectId).then(
        () => {
          mainPageMap.panTo(object.geometry.coordinates);
        },
      );
    }

    Array.from(document.querySelectorAll('[data-marker-id]'))
      .map(item => item.addEventListener('click', (e) => {
        e.preventDefault();
        openBalloon(e.target.getAttribute('data-marker-id'));
      }));
  };

  ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then(init)
    .catch(error => console.error('Failed to load Yandex Maps', error));
}


const mapBlock = document.querySelector('#map');

if (mapBlock) {
  const data = {
    type: 'FeatureCollection',
    features: [],
  };

  const data2 = {
    type: 'FeatureCollection',
    features: [],
  };

  if (typeof app !== 'undefined') {
    Object.values(app.storeManagerData.stores).map((item) => {
      const coord = item.coords.split(',').map(num => Number(num));
      const point = {
        type: 'Feature',
        id: item.id,
        geometry: { type: 'Point', coordinates: coord },
        properties: { address: item.name, tel: item.phone[0], link: 'Схема проезда' },
      };

      if (item.city === app.storeManagerData.currentCityId) {
        // currentStoreList.push(point);
        // currentStoreList.push(coord);
        data2.features.push(point);
      } else {
        data.features.push(point);
      }

      return point;
    });
  }

  initMap(mapBlock, {}, data, data2);
}