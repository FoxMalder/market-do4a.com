if (typeof IPOL_JSloader == 'undefined') {
  var IPOL_JSloader = {
    ver: 2,

    jqInited: false,

    bindReady: function(handler) {
      var called = false;

      function ready() {
        if (called) {
          return;
        }
        called = true;
        handler();
      }

      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
          ready();
        }, false);
      } else if (document.attachEvent) {
        if (document.documentElement.doScroll && window == window.top) {
          function tryScroll() {
            if (called) {
              return;
            }
            if (!document.body) {
              return;
            }
            try {
              document.documentElement.doScroll('left');
              ready();
            } catch (e) {
              setTimeout(tryScroll, 0);
            }
          }

          tryScroll();
        }
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState === 'complete') {
            ready();
          }
        });
      }
      if (window.addEventListener) {
        window.addEventListener('load', ready, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', ready);
      }
    },

    loadScript: function(src, ifJQ, callback) {
      if (typeof (ifJQ) == 'undefined') {
        ifJQ = false;
      }
      var loadedJS = document.createElement('script');
      loadedJS.src = src;
      loadedJS.type = 'text/javascript';
      loadedJS.language = 'javascript';
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(loadedJS);
      if (ifJQ || callback) {
        loadedJS.onload = (ifJQ) ? IPOL_JSloader.recall : callback;
        loadedJS.onreadystatechange = function() {
          //  IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            loadedJS.onload();
          }
        }
        ;
      }
    },

    loadJQ: function() {
      IPOL_JSloader.loadScript('/bitrix/js/main/jquery/jquery-1.8.3.min.js', true);
      jqInited = true;
    },

    recalled: [],
    checkScript: function(checker, src, callback) {
      if (typeof (callback) == 'undefined') {
        callback = false;
      }
      IPOL_JSloader.recalled.push([checker, src, callback]);
      if (!IPOL_JSloader.jqInited && !IPOL_JSloader.checkJQ()) {
        IPOL_JSloader.loadJQ();
      } else {
        IPOL_JSloader.recall();
      }
    },

    checkLoadJQ: function(callback) {
      if (!IPOL_JSloader.jqInited && !IPOL_JSloader.checkJQ()) {
        if (typeof (callback) == 'function') {
          IPOL_JSloader.recalled.push([true, false, callback]);
        }
        IPOL_JSloader.loadJQ();
      } else if (typeof (callback) == 'function') {
        callback();
      }
    },

    checkJQ: function() {
      return (typeof ($) != 'undefined' && typeof ($('body').html) != 'undefined');
    },

    recall: function() {
      if (IPOL_JSloader.recalled.length == 0) {
        return;
      } else {
        for (var i in IPOL_JSloader.recalled) {
          if (!IPOL_JSloader.recalled[i][0] || typeof (eval(IPOL_JSloader.recalled[i][0])) == 'undefined') {
            IPOL_JSloader.loadScript(IPOL_JSloader.recalled[i][1], false, IPOL_JSloader.recalled[i][2]);
          } else if (typeof (IPOL_JSloader.recalled[i][2]) == 'function') {
            IPOL_JSloader.recalled[i][2]();
          }
          delete (IPOL_JSloader.recalled[i]);
        }
      }
    },
  };
}


var IPOLSDEK_pvz = {
  label: 'ISDEK_widjet',

  buttonPVZ: '<a href="javascript:void(0);" class="SDEK_selectPVZ" onclick="IPOLSDEK_pvz.selectPVZ(\'#id#\',\'PVZ\'); return false;">Выбрать пункт самовывоза</a>',
  // html кнопки "выбрать ПВЗ". Profiler

  isActive: false, // открыт ли

  logging: false,

  curDelivery: '224', // какая доставка используется в данный момент

  curProfile: false, // какой профиль в данный момент расчитывается

  curMode: false, // какой тип ПВЗ в данный момент используется.

  deliveries: {
    'PVZ': {
      '262': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '262',
      },
      '225': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '225',
      },
      '229': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '229',
      },
      '233': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '233',
      },
      '237': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '237',
      },
      '241': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '241',
      },
      '270': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '270',
      },
      '250': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '250',
      },
      '254': {
        'tag': false,
        'price': false,
        'self': 'moreInfo_sdek-pickup',
        'link': '254',
      },
    },
  },

  city: 'Новосибирск',
  //�����

  cityID: '3890',
  // id �����

  cityCountry: {
    'Белгород': 'Россия',
    'Екатеринбург': 'Россия',
    'Михайловск': 'Россия',
    'Киров': 'Россия',
    'Новосибирск': 'Россия',
    'Одинцово': 'Россия',
    'Санкт-Петербург': 'Россия',
    'Москва': 'Россия',
    'Барнаул': 'Россия',
    'Арсеньев': 'Россия',
    'Саратов': 'Россия',
    'Великий Новгород': 'Россия',
    'Котлас': 'Россия',
    'Кириши': 'Россия',
    'Казань': 'Россия',
    'Тюмень': 'Россия',
    'Ростов-на-Дону': 'Россия',
    'Кубинка': 'Россия',
    'Ессентуки': 'Россия',
    'Анапа': 'Россия',
    'Уфа': 'Россия',
    'Балашиха': 'Россия',
    'Иркутск': 'Россия',
    'Орск': 'Россия',
    'Владивосток': 'Россия',
    'Волоколамск': 'Россия',
    'Новороссийск': 'Россия',
    'Колпино': 'Россия',
    'Пятигорск': 'Россия',
    'Махачкала': 'Россия',
    'Черногорск': 'Россия',
    'Подольск': 'Россия',
    'Минусинск': 'Россия',
    'Тамбов': 'Россия',
    'Армавир': 'Россия',
    'Челябинск': 'Россия',
    'Кемерово': 'Россия',
    'Домодедово': 'Россия',
    'Долгопрудный': 'Россия',
    'Аша': 'Россия',
    'Волгодонск': 'Россия',
    'Воронеж': 'Россия',
    'Людиново': 'Россия',
    'Железногорск': 'Россия',
    'Вологда': 'Россия',
    'Петергоф': 'Россия',
    'Черкесск': 'Россия',
    'Волжский': 'Россия',
    'Саяногорск': 'Россия',
    'Оренбург': 'Россия',
    'Дубна': 'Россия',
    'Чебоксары': 'Россия',
    'Грязи': 'Россия',
    'Троицк': 'Россия',
    'Глазов': 'Россия',
    'Сочи': 'Россия',
    'Смоленск': 'Россия',
    'Красноярск': 'Россия',
    'Ульяновск': 'Россия',
    'Нижний Новгород': 'Россия',
    'Томск': 'Россия',
    'Ногинск': 'Россия',
    'Минеральные Воды': 'Россия',
    'Каменск-Уральский': 'Россия',
    'Пермь': 'Россия',
    'Кинешма': 'Россия',
    'Юрга': 'Россия',
    'Петропавловск-Камчатский': 'Россия',
    'Луховицы': 'Россия',
    'Дмитров': 'Россия',
    'Назрань': 'Россия',
    'Краснодар': 'Россия',
    'Братск': 'Россия',
    'Королев': 'Россия',
    'Ангарск': 'Россия',
    'Петрозаводск': 'Россия',
    'Владимир': 'Россия',
    'Заволжье': 'Россия',
    'Симферополь': 'Россия',
    'Муром': 'Россия',
    'Азов': 'Россия',
    'Клинцы': 'Россия',
    'Торжок': 'Россия',
    'Пушкино': 'Россия',
    'Саки': 'Россия',
    'Тула': 'Россия',
    'Ярославль': 'Россия',
    'Астрахань': 'Россия',
    'Сухой Лог': 'Россия',
    'Балаково': 'Россия',
    'Красногорск': 'Россия',
    'Кисловодск': 'Россия',
    'Лиски': 'Россия',
    'Салават': 'Россия',
    'Урай': 'Россия',
    'Тверь': 'Россия',
    'Лесной': 'Россия',
    'Сургут': 'Россия',
    'Якутск': 'Россия',
    'Щекино': 'Россия',
    'Иваново': 'Россия',
    'Люберцы': 'Россия',
    'Арзамас': 'Россия',
    'Омск': 'Россия',
    'Златоуст': 'Россия',
    'Брянск': 'Россия',
    'Амурск': 'Россия',
    'Тольятти': 'Россия',
    'Нижневартовск': 'Россия',
    'Железнодорожный': 'Россия',
    'Краснокамск': 'Россия',
    'Набережные Челны': 'Россия',
    'Борзя': 'Россия',
    'Нарьян-Мар': 'Россия',
    'Лениногорск': 'Россия',
    'Мытищи': 'Россия',
    'Чебаркуль': 'Россия',
    'Лангепас': 'Россия',
    'Волгоград': 'Россия',
    'Майкоп': 'Россия',
    'Старый Оскол': 'Россия',
    'Нижний Тагил': 'Россия',
    'Междуреченск': 'Россия',
    'Горячий Ключ': 'Россия',
    'Мичуринск': 'Россия',
    'Куровское': 'Россия',
    'Вязьма': 'Россия',
    'Ижевск': 'Россия',
    'Клин': 'Россия',
    'Анжеро-Судженск': 'Россия',
    'Красноуфимск': 'Россия',
    'Выкса': 'Россия',
    'Белово': 'Россия',
    'Заинск': 'Россия',
    'Лермонтов': 'Россия',
    'Черноголовка': 'Россия',
    'Кстово': 'Россия',
    'Полевской': 'Россия',
    'Солнечногорск': 'Россия',
    'Ейск': 'Россия',
    'Орел': 'Россия',
    'Лабинск': 'Россия',
    'Лесосибирск': 'Россия',
    'Курск': 'Россия',
    'Магадан': 'Россия',
    'Аксай': 'Россия',
    'Боровичи': 'Россия',
    'Борисоглебск': 'Россия',
    'Советский': 'Россия',
    'Миллерово': 'Россия',
    'Ревда': 'Россия',
    'Лыткарино': 'Россия',
    'Верхняя Пышма': 'Россия',
    'Севастополь': 'Россия',
    'Дзержинский': 'Россия',
    'Судак': 'Россия',
    'Самара': 'Россия',
    'Грозный': 'Россия',
    'Зеленогорск': 'Россия',
    'Тейково': 'Россия',
    'Нальчик': 'Россия',
    'Шадринск': 'Россия',
    'Строитель': 'Россия',
    'Стерлитамак': 'Россия',
    'Новокуйбышевск': 'Россия',
    'Комсомольск-на-Амуре': 'Россия',
    'Серпухов': 'Россия',
    'Хабаровск': 'Россия',
    'Хасавюрт': 'Россия',
    'Нефтекамск': 'Россия',
    'Кострома': 'Россия',
    'Ханты-Мансийск': 'Россия',
    'Ставрополь': 'Россия',
    'Зеленоград': 'Россия',
    'Рыбинск': 'Россия',
    'Мелеуз': 'Россия',
    'Великие Луки': 'Россия',
    'Бердск': 'Россия',
    'Ржев': 'Россия',
    'Маркс': 'Россия',
    'Батайск': 'Россия',
    'Биробиджан': 'Россия',
    'Пушкин': 'Россия',
    'Протвино': 'Россия',
    'Курганинск': 'Россия',
    'Рубцовск': 'Россия',
    'Великий Устюг': 'Россия',
    'Белебей': 'Россия',
    'Усть-Илимск': 'Россия',
    'Электросталь': 'Россия',
    'Павловский Посад': 'Россия',
    'Артем': 'Россия',
    'Чистополь': 'Россия',
    'Всеволожск': 'Россия',
    'Юбилейный': 'Россия',
    'Звенигород': 'Россия',
    'Миасс': 'Россия',
    'Покров': 'Россия',
    'Джанкой': 'Россия',
    'Бирск': 'Россия',
    'Зерноград': 'Россия',
    'Геленджик': 'Россия',
    'Канск': 'Россия',
    'Йошкар-Ола': 'Россия',
    'Владикавказ': 'Россия',
    'Наро-Фоминск': 'Россия',
    'Славянск-на-Кубани': 'Россия',
    'Сызрань': 'Россия',
    'Климовск': 'Россия',
    'Калуга': 'Россия',
    'Рузаевка': 'Россия',
    'Березники': 'Россия',
    'Трехгорный': 'Россия',
    'Коломна': 'Россия',
    'Тайшет': 'Россия',
    'Рязань': 'Россия',
    'Энгельс': 'Россия',
    'Абакан': 'Россия',
    'Первоуральск': 'Россия',
    'Шарыпово': 'Россия',
    'Ивантеевка': 'Россия',
    'Апрелевка': 'Россия',
    'Октябрьский': 'Россия',
    'Апшеронск': 'Россия',
    'Усть-Джегута': 'Россия',
    'Южно-Сахалинск': 'Россия',
    'Новый Уренгой': 'Россия',
    'Волжск': 'Россия',
    'Алексин': 'Россия',
    'Гатчина': 'Россия',
    'Раменское': 'Россия',
    'Тавда': 'Россия',
    'Реутов': 'Россия',
    'Павловск': 'Россия',
    'Серов': 'Россия',
    'Голицыно': 'Россия',
    'Белогорск': 'Россия',
    'Ишимбай': 'Россия',
    'Уссурийск': 'Россия',
    'Саранск': 'Россия',
    'Заречный': 'Россия',
    'Магнитогорск': 'Россия',
    'Кудымкар': 'Россия',
    'Невинномысск': 'Россия',
    'Елабуга': 'Россия',
    'Нерюнгри': 'Россия',
    'Добрянка': 'Россия',
    'Конаково': 'Россия',
    'Усть-Лабинск': 'Россия',
    'Кингисепп': 'Россия',
    'Бийск': 'Россия',
    'Канаш': 'Россия',
    'Кропоткин': 'Россия',
    'Московский': 'Россия',
    'Улан-Удэ': 'Россия',
    'Псков': 'Россия',
    'Тихвин': 'Россия',
    'Заводоуковск': 'Россия',
    'Феодосия': 'Россия',
    'Озерск': 'Россия',
    'Вятские Поляны': 'Россия',
    'Павлово': 'Россия',
    'Пенза': 'Россия',
    'Щербинка': 'Россия',
    'Югорск': 'Россия',
    'Южноуральск': 'Россия',
    'Благовещенск': 'Россия',
    'Приозерск': 'Россия',
    'Ахтубинск': 'Россия',
    'Архангельск': 'Россия',
    'Жуковский': 'Россия',
    'Красное Село': 'Россия',
    'Тосно': 'Россия',
    'Нефтеюганск': 'Россия',
    'Соликамск': 'Россия',
    'Ленинск-Кузнецкий': 'Россия',
    'Липецк': 'Россия',
    'Фролово': 'Россия',
    'Новоалександровск': 'Россия',
    'Апатиты': 'Россия',
    'Воткинск': 'Россия',
    'Темрюк': 'Россия',
    'Бугульма': 'Россия',
    'Юрюзань': 'Россия',
    'Губаха': 'Россия',
    'Кимры': 'Россия',
    'Каменск-Шахтинский': 'Россия',
    'Руза': 'Россия',
    'Заринск': 'Россия',
    'Северодвинск': 'Россия',
    'Гуково': 'Россия',
    'Луга': 'Россия',
    'Ялта': 'Россия',
    'Нягань': 'Россия',
    'Кызыл': 'Россия',
    'Кашира': 'Россия',
    'Саров': 'Россия',
    'Дедовск': 'Россия',
    'Асбест': 'Россия',
    'Дзержинск': 'Россия',
    'Чехов': 'Россия',
    'Старая Купавна': 'Россия',
    'Череповец': 'Россия',
    'Шуя': 'Россия',
    'Шахты': 'Россия',
    'Георгиевск': 'Россия',
    'Калининград': 'Россия',
    'Усолье-Сибирское': 'Россия',
    'Новокузнецк': 'Россия',
    'Новошахтинск': 'Россия',
    'Бронницы': 'Россия',
    'Новочеркасск': 'Россия',
    'Краснотурьинск': 'Россия',
    'Новоуральск': 'Россия',
    'Зеленодольск': 'Россия',
    'Тихорецк': 'Россия',
    'Ефремов': 'Россия',
    'Россошь': 'Россия',
    'Егорьевск': 'Россия',
    'Ломоносов': 'Россия',
    'Железноводск': 'Россия',
    'Сальск': 'Россия',
    'Копейск': 'Россия',
    'Сергиев Посад': 'Россия',
    'Губкинский': 'Россия',
    'Белая Калитва': 'Россия',
    'Новоалтайск': 'Россия',
    'Камышин': 'Россия',
    'Химки': 'Россия',
    'Альметьевск': 'Россия',
    'Курчатов': 'Россия',
    'Кунгур': 'Россия',
    'Зеленокумск': 'Россия',
    'Вязники': 'Россия',
    'Находка': 'Россия',
    'Абинск': 'Россия',
    'Шатура': 'Россия',
    'Бузулук': 'Россия',
    'Котельники': 'Россия',
    'Ачинск': 'Россия',
    'Сарапул': 'Россия',
    'Евпатория': 'Россия',
    'Губкин': 'Россия',
    'Переславль-Залесский': 'Россия',
    'Благодарный': 'Россия',
    'Сертолово': 'Россия',
    'Искитим': 'Россия',
    'Михайловка': 'Россия',
    'Красноармейск': 'Россия',
    'Рославль': 'Россия',
    'Чусовой': 'Россия',
    'Сокол': 'Россия',
    'Гай': 'Россия',
    'Светлоград': 'Россия',
    'Отрадный': 'Россия',
    'Прохладный': 'Россия',
    'Мегион': 'Россия',
    'Ноябрьск': 'Россия',
    'Североуральск': 'Россия',
    'Снежинск': 'Россия',
    'Верхняя Салда': 'Россия',
    'Донецк': 'Россия',
    'Фрязино': 'Россия',
    'Щелково': 'Россия',
    'Мурманск': 'Россия',
    'Ярцево': 'Россия',
    'Каменка': 'Россия',
    'Орехово-Зуево': 'Россия',
    'Бор': 'Россия',
    'Таганрог': 'Россия',
    'Мирный': 'Россия',
    'Сысерть': 'Россия',
    'Изобильный': 'Россия',
    'Ковров': 'Россия',
    'Гусь-Хрустальный': 'Россия',
    'Александров': 'Россия',
    'Учалы': 'Россия',
    'Асино': 'Россия',
    'Когалым': 'Россия',
    'Буденновск': 'Россия',
    'Мончегорск': 'Россия',
    'Электрогорск': 'Россия',
    'Кронштадт': 'Россия',
    'Елизово': 'Россия',
    'Тимашевск': 'Россия',
    'Приморско-Ахтарск': 'Россия',
    'Горно-Алтайск': 'Россия',
    'Надым': 'Россия',
    'Хотьково': 'Россия',
    'Видное': 'Россия',
    'Прокопьевск': 'Россия',
    'Норильск': 'Россия',
    'Алексеевка': 'Россия',
    'Воскресенск': 'Россия',
    'Балашов': 'Россия',
    'Истра': 'Россия',
    'Сыктывкар': 'Россия',
    'Ухта': 'Россия',
    'Новомосковск': 'Россия',
    'Нижнекамск': 'Россия',
    'Цимлянск': 'Россия',
    'Березовский': 'Россия',
    'Камышлов': 'Россия',
    'Урюпинск': 'Россия',
    'Сосновый Бор': 'Россия',
    'Новочебоксарск': 'Россия',
    'Ступино': 'Россия',
    'Бахчисарай': 'Россия',
    'Кореновск': 'Россия',
    'Сосновоборск': 'Россия',
    'Керчь': 'Россия',
    'Электроугли': 'Россия',
    'Курган': 'Россия',
    'Кировск': 'Россия',
    'Салехард': 'Россия',
    'Острогожск': 'Россия',
    'Волхов': 'Россия',
    'Киржач': 'Россия',
    'Сестрорецк': 'Россия',
    'Невьянск': 'Россия',
    'Нижняя Тура': 'Россия',
    'Чайковский': 'Россия',
    'Чернушка': 'Россия',
    'Лобня': 'Россия',
    'Кольчугино': 'Россия',
    'Туймазы': 'Россия',
    'Назарово': 'Россия',
    'Обнинск': 'Россия',
    'Белорецк': 'Россия',
    'Северск': 'Россия',
    'Котельнич': 'Россия',
    'Чита': 'Россия',
    'Выборг': 'Россия',
    'Стрежевой': 'Россия',
    'Балахна': 'Россия',
    'Ишим': 'Россия',
    'Алушта': 'Россия',
    'Ивангород': 'Россия',
    'Кушва': 'Россия',
    'Галич': 'Россия',
    'Новотроицк': 'Россия',
    'Можайск': 'Россия',
    'Красноперекопск': 'Россия',
    'Похвистнево': 'Россия',
    'Ликино-Дулево': 'Россия',
    'Элиста': 'Россия',
    'Ялуторовск': 'Россия',
    'Димитровград': 'Россия',
    'Туапсе': 'Россия',
    'Елец': 'Россия',
    'Крымск': 'Россия',
    'Кизляр': 'Россия',
    'Городец': 'Россия',
    'Тобольск': 'Россия',
    'Шебекино': 'Россия',
    'Качканар': 'Россия',
    'Ирбит': 'Россия',
    'Семенов': 'Россия',
    'Вельск': 'Россия',
    'Белореченск': 'Россия',
    'Балабаново': 'Россия',
  },

  payer: false,

  paysystem: false,

  pvzInputs: [
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
  ],
  //������, ���� �������� ����� ���

  pickFirst: function(where) {
    if (typeof (where) != 'object') {
      return false;
    }
    for (var i in where)
      return i;
  },

  oldTemplate: false,

  ready: false,

  makeHTMLId: function(id) {
    return 'ID_DELIVERY_' + ((id == 'sdek_pickup') ? id : 'ID_' + id);
    // Profiler
  },

  checkCheckedDel: function(delId, delivery) {
    for (var i in delivery)
      if (delivery[i].CHECKED == 'Y') {
        if (delivery[i].ID == delId) {
          return true;
        } else {
          return false;
        }
      }
    return false;
  },

  guessCheckedDel: function(delId) {
    return ('ID_DELIVERY_ID_' + delId == $('[name="DELIVERY_ID"]:checked').attr('ID'));
  },
  PVZ: {},

  cityPVZ: {},
  //������ � ��� ������, ��� ����� ��� + ���������� ��� �������

  scrollPVZ: false,
  //������ ������� ���

  scrollDetail: false,
  //������ ��������� ����������

  multiPVZ: false,
  // false, ���� ��� � ������ ���������, ��� ��� id

  init: function() {
    if (!IPOLSDEK_pvz.isFull(IPOLSDEK_pvz.deliveries.PVZ))
    // Profiler
    {
      console.warn(IPOLSDEK_pvz.label + ' warn: no delivery for PVZ');
    }

    IPOLSDEK_pvz.oldTemplate = $('#ORDER_FORM').length;

    // ==== ������������� �� ������������ �����
    if (typeof BX !== 'undefined' && BX.addCustomEvent) {
      BX.addCustomEvent('onAjaxSuccess', IPOLSDEK_pvz.onLoad);
    }

    // ��� ������� JS-����
    if (window.jsAjaxUtil) {
      // ��������������� Ajax-����������� ������� ��� ����������� js-������� ����� ��-���
      jsAjaxUtil._CloseLocalWaitWindow = jsAjaxUtil.CloseLocalWaitWindow;
      jsAjaxUtil.CloseLocalWaitWindow = function(TID, cont) {
        jsAjaxUtil._CloseLocalWaitWindow(TID, cont);
        IPOLSDEK_pvz.onLoad();
      };
    }

    $(window).resize(IPOLSDEK_pvz.positWindow);
    // == END
    IPOLSDEK_pvz.onLoad();

    //html �����
    $('body').append('<div id=\'SDEK_mask\'></div>');
  },

  getPrices: function() {
    var request = {
      CITY_TO: IPOLSDEK_pvz.city,
      WEIGHT: '3800',
      PRICE: '3780',
      CITY_TO_ID: IPOLSDEK_pvz.cityID,
      CURPROF: IPOLSDEK_pvz.curProfile,
      DELIVERY: IPOLSDEK_pvz.curDelivery,
      GOODS: [
        {
          'ID': '1027487',
          'PRODUCT_ID': '64997',
          'PRICE': '945.0000',
          'QUANTITY': '4.00',
          'CAN_BUY': 'Y',
          'DELAY': 'N',
          'NAME': 'Do4a Lab Elite Gain 900 гр (клубника)',
          'DIMENSIONS': {
            'WIDTH': '0',
            'HEIGHT': '0',
            'LENGTH': '0',
          },
          'WEIGHT': '950.00',
          'SET_PARENT_ID': '',
          'LID': 's1',
          'CURRENCY': 'RUB',
          'VAT_RATE': '0.0000',
          'MEASURE_NAME': 'шт',
        },
      ],
      PERSON_TYPE_ID: IPOLSDEK_pvz.payer,
      PAY_SYSTEM_ID: IPOLSDEK_pvz.paysystem,
    };

    if (IPOLSDEK_pvz.logging) {
      console.log(IPOLSDEK_pvz.label + ': requesting prices', request);
    }

    request['isdek_action'] = 'countDelivery',

      $.ajax({
        url: '/bitrix/js/ipol.sdek/ajax.php',
        type: 'POST',
        dataType: 'JSON',
        data: request,
        success: function(data) {
          if (IPOLSDEK_pvz.logging) {
            console.log(IPOLSDEK_pvz.label + ': response prices', data);
          }
          var links = {
            pickup: 'PVZ',
          };
          //Profiler
          for (var i in links) {
            var det = i.substr(0, 1);
            if (data[i] != 'no') {
              if (typeof data[det + '_date'] == 'undefined') {
                transDate = data.date;
              } else {
                transDate = data[det + '_date'];
              }
              $('#SDEK_' + det + 'Price').html(data[i]);
              $('#SDEK_' + det + 'Date').html(transDate + ' дн.');
            } else {
              $('#SDEK_' + det + 'Price').html('');
              $('#SDEK_' + det + 'Date').html('Нет доставки.');
            }
          }
        },
      });
  },

  onLoad: function(ajaxAns) {
    // место, где будет кнопка "выбрать ПВЗ"
    var tag = false;

    IPOLSDEK_pvz.ready = false;

    var newTemplateAjax = (typeof (ajaxAns) != 'undefined' && ajaxAns !== null && typeof (ajaxAns.sdek) == 'object')
      ? true
      : false;

    var cityUpdated = true;
    if ($('#sdek_city').length > 0) {
      //��������� �����
      IPOLSDEK_pvz.city = $('#sdek_city').val();
      IPOLSDEK_pvz.cityID = $('#sdek_cityID').val();
      IPOLSDEK_pvz.payer = $('#sdek_payer').val();
      IPOLSDEK_pvz.paysystem = $('#sdek_paysystem').val();
    } else {
      if (newTemplateAjax) {
        IPOLSDEK_pvz.city = ajaxAns.sdek.city;
        IPOLSDEK_pvz.cityID = ajaxAns.sdek.cityId;
        IPOLSDEK_pvz.payer = ajaxAns.sdek.payer;
        IPOLSDEK_pvz.paysystem = ajaxAns.sdek.paysystem;
      } else {
        cityUpdated = false;
      }
    }

    var checkPrices = true;

    for (var i in IPOLSDEK_pvz.deliveries) {
      for (var j in IPOLSDEK_pvz.deliveries[i]) {
        tag = false;
        if (IPOLSDEK_pvz.deliveries[i][j].self) {
          tag = $('#' + IPOLSDEK_pvz.deliveries[i][j].self);
        } else {
          if (IPOLSDEK_pvz.oldTemplate) {
            var parentNd = $('#' + IPOLSDEK_pvz.makeHTMLId(j));
            if (!parentNd.length) {
              continue;
            }
            if (parentNd.closest('td', '#ORDER_FORM').length > 0) {
              tag = parentNd.closest('td', '#ORDER_FORM').siblings('td:last');
            } else {
              tag = parentNd.siblings('label').find('.bx_result_price');
            }
          } else if ((arguments.length > 0 && typeof (ajaxAns.order) != 'undefined' && IPOLSDEK_pvz.checkCheckedDel(j, ajaxAns.order.DELIVERY)) || (arguments.length == 0 && IPOLSDEK_pvz.guessCheckedDel(j))) {
            if (!$('#IPOLSDEK_injectHere').length) {
              $('#bx-soa-delivery').find('.bx-soa-pp-company-desc').after('<div id="IPOLSDEK_injectHere"></div>');
            }
            if ($('#IPOLSDEK_injectHere').length == 0) {
              IPOLSDEK_pvz.newTemplateLoader.listner();
              checkPrices = false;
            } else {
              tag = $('#IPOLSDEK_injectHere');
            }
          }
        }

        if (tag.length > 0 && (!tag.find('.SDEK_selectPVZ').length && (!IPOLSDEK_pvz.deliveries[i][j].self || $('#' + IPOLSDEK_pvz.makeHTMLId(j)).length))) {
          IPOLSDEK_pvz.deliveries[i][j].price = (tag.html()) ? tag.html() : false;
          IPOLSDEK_pvz.deliveries[i][j].tag = tag;
          IPOLSDEK_pvz.labelPzv(j, i);
        }
      }
    }

    if (!cityUpdated) {
      IPOLSDEK_pvz.loadProfile();
    }
    //���� ��� sdek_city - ������ � ������ ��� => �������� �� ������ ��� � ���������� ���

    // ����� �������� �������
    var sdekChecker = false;
    if ($('#sdek_dostav').length > 0) {
      sdekChecker = $('#sdek_dostav').val();
      sdekChecker = (sdekChecker.indexOf(':') !== -1) ? sdekChecker.replace(':', '_') : sdekChecker;
    } else if (newTemplateAjax) {
      sdekChecker = ajaxAns.sdek.dostav;
    }
    // ������ ��� - "��������" ��� ����� ������������
    if (sdekChecker && IPOLSDEK_pvz.curMode && IPOLSDEK_pvz.pvzId && IPOLSDEK_pvz.checkRightDelivery(sdekChecker)) {
      IPOLSDEK_pvz.choozePVZ(IPOLSDEK_pvz.pvzId, true);
    }

    if (sdekChecker) {
      IPOLSDEK_pvz.curDelivery = sdekChecker;
    }

    if (checkPrices) {
      IPOLSDEK_pvz.getPrices();
    }
  },

  newTemplateLoader: {
    timer: false,
    listner: function() {
      if (IPOLSDEK_pvz.newTemplateLoader.timer) {
        clearTimeout(IPOLSDEK_pvz.newTemplateLoader.timer);
        IPOLSDEK_pvz.newTemplateLoader.timer = false;
        IPOLSDEK_pvz.onLoad();
      } else {
        IPOLSDEK_pvz.newTemplateLoader.timer = setTimeout(IPOLSDEK_pvz.newTemplateLoader.listner, 1000);
      }
    },
  },

  checkRightDelivery: function(curSelected) {
    if (typeof (IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode]) == 'undefined') {
      return false;
    }
    if (typeof (IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode][curSelected]) != 'undefined') {
      return true;
    }
    for (var i in IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode])
      if (typeof (IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode][i].link != 'undefined') && IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode][i].link == curSelected) {
        return true;
      }
    return false;
  },

  labelPzv: function(i, mode) {
    // �������� ������ �� ����� ��� � �������
    if (typeof (IPOLSDEK_pvz.deliveries[mode][i]) == 'undefined') {
      return false;
    }
    var tmpHTML = '<div class=\'sdek_pvzLair\'>' + IPOLSDEK_pvz['button' + mode].replace('#id#', i) + '<br>';
    if (IPOLSDEK_pvz.pvzId && typeof (IPOLSDEK_pvz[mode][IPOLSDEK_pvz.city][IPOLSDEK_pvz.pvzId]) != 'undefined') {
      tmpHTML += '<span class=\'sdek_pvzAddr\'>' + IPOLSDEK_pvz[mode][IPOLSDEK_pvz.city][IPOLSDEK_pvz.pvzId].Address + '</span><br>';
    }
    if (IPOLSDEK_pvz.deliveries[mode][i].price) {
      tmpHTML += IPOLSDEK_pvz.deliveries[mode][i].price;
    }
    tmpHTML += '</div>';
    IPOLSDEK_pvz.deliveries[mode][i].tag.html(tmpHTML);
    if (!IPOLSDEK_pvz.oldTemplate) {
      $('.sdek_pvzLair .SDEK_selectPVZ').addClass('btn btn-default');
    }
  },

  loadProfile: function() {
    //�������� ��� �� �������
    var chznPnkt = false;
    for (var i in IPOLSDEK_pvz.pvzInputs) {
      if (typeof (IPOLSDEK_pvz.pvzInputs[i]) == 'function') {
        continue;
      }
      chznPnkt = $('[name="ORDER_PROP_' + IPOLSDEK_pvz.pvzInputs[i] + '"]');
      if (chznPnkt.length > 0) {
        break;
      }
    }
    if (!chznPnkt || chznPnkt.length == 0) {
      return;
    }

    var seltdPVZ = chznPnkt.val();
    if (seltdPVZ.indexOf('#S') == -1) {
      return;
    }

    seltdPVZ = seltdPVZ.substr(seltdPVZ.indexOf('#S') + 2);

    if (seltdPVZ <= 0) {
      return false;
    } else {
      var checks = ['PVZ'];
      // Profiler
      var pret = false;
      for (var i in checks) {
        if (typeof (checks[i]) == 'function') {
          continue;
        }
        if (typeof IPOLSDEK_pvz[checks[i]][IPOLSDEK_pvz.city] != 'undefined' && typeof IPOLSDEK_pvz[checks[i]][IPOLSDEK_pvz.city][seltdPVZ] != 'undefined') {
          pret = checks[i];
          break;
        }
      }
      if (!pret) {
        return false;
      } else {
        IPOLSDEK_pvz.curMode = pret;
      }
    }

    // ������� ���
    IPOLSDEK_pvz.pvzAdress = IPOLSDEK_pvz.city + ', ' + IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][IPOLSDEK_pvz.city][seltdPVZ]['Address'] + ' #S' + seltdPVZ;
    IPOLSDEK_pvz.pvzId = seltdPVZ;

    //������� ������� � ��������� ��� ����� � ������� "������� ���"
    for (var i in IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode]) {
      if (typeof (IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode][i]) == 'function') {
        continue;
      }
      if (IPOLSDEK_pvz.deliveries[IPOLSDEK_pvz.curMode][i].tag) {
        IPOLSDEK_pvz.labelPzv(i, IPOLSDEK_pvz.curMode);
      }
    }
  },

  initCityPVZ: function() {
    // ������ ������ ���������� ��� ���������� ������
    var city = IPOLSDEK_pvz.city;
    var cnt = [];
    IPOLSDEK_pvz.cityPVZ = {};
    for (var i in IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city]) {
      if (typeof (IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]) == 'function') {
        continue;
      }
      IPOLSDEK_pvz.cityPVZ[i] = {
        'Name': (IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Name'])
          ? IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Name']
          : IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Address'],
        'Address': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Address'],
        'WorkTime': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['WorkTime'],
        'Phone': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Phone'],
        'Note': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['Note'],
        'cX': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['cX'],
        'cY': IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][city][i]['cY'],
      };
      cnt.push(i);
    }
    IPOLSDEK_pvz.cityPVZHTML();
    //������ html PVZ (��� POSTAMAT'a). ��� ���� ��������� �� �������, �� �� ��������.
    IPOLSDEK_pvz.multiPVZ = (cnt.length == 1) ? cnt.pop() : false;
  },

  cityPVZHTML: function() {
    // ��������� ������ ��� ������
    var html = '';
    for (var i in IPOLSDEK_pvz.cityPVZ) {
      if (typeof (IPOLSDEK_pvz.cityPVZ[i]) == 'function') {
        continue;
      }
      html += '<p id="PVZ_' + i + '" onclick="IPOLSDEK_pvz.markChosenPVZ(\'' + i + '\')" onmouseover="IPOLSDEK_pvz.Y_blinkPVZ(\'' + i + '\',true)" onmouseout="IPOLSDEK_pvz.Y_blinkPVZ(\'' + i + '\')">' + IPOLSDEK_pvz.paintPVZ(i) + '</p>';
    }
    $('#SDEK_wrapper').html(html);
  },

  paintPVZ: function(ind) {
    //������ ������ ���, ���� ����� ����
    var addr = '';
    if (IPOLSDEK_pvz.cityPVZ[ind].color && IPOLSDEK_pvz.cityPVZ[ind].Address.indexOf(',') !== false) {
      addr = '<span style=\'color:' + IPOLSDEK_pvz.cityPVZ[ind].color + '\'>' + IPOLSDEK_pvz.cityPVZ[ind].Address.substr(0, IPOLSDEK_pvz.cityPVZ[ind].Address.indexOf(',')) + '</span><br>' + IPOLSDEK_pvz.cityPVZ[ind].Name;
    } else {
      addr = IPOLSDEK_pvz.cityPVZ[ind].Name;
    }
    return addr;
  },

  //������� ���
  pvzAdress: '',
  pvzId: false,
  choozePVZ: function(pvzId, isAjax) {
    // ������� ���
    if (typeof IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][IPOLSDEK_pvz.city][pvzId] == 'undefined') {
      return;
    }

    IPOLSDEK_pvz.pvzAdress = IPOLSDEK_pvz.city + ', ' + IPOLSDEK_pvz[IPOLSDEK_pvz.curMode][IPOLSDEK_pvz.city][pvzId]['Address'] + ' #S' + pvzId;

    IPOLSDEK_pvz.pvzId = pvzId;

    var chznPnkt = false;
    if (typeof (KladrJsObj) != 'undefined') {
      KladrJsObj.FuckKladr();
    }

    IPOLSDEK_pvz.markUnable();

    if (typeof isAjax == 'undefined') {
      // ������������� ����� (� ����������� ����� ��������� ��������)

      var htmlId = IPOLSDEK_pvz.makeHTMLId(IPOLSDEK_pvz.curProfile);
      if (typeof IPOLSDEK_DeliveryChangeEvent == 'function') {
        IPOLSDEK_DeliveryChangeEvent(htmlId);
      } else {
        if (IPOLSDEK_pvz.oldTemplate) {
          if (typeof $.prop == 'undefined')
          // <3 jquery
          {
            $('#' + htmlId).attr('checked', 'Y');
          } else {
            $('#' + htmlId).prop('checked', 'Y');
          }
          $('#' + htmlId).click();
        } else if (typeof (BX.Sale) != 'undefined' && BX.Sale.OrderAjaxComponent != 'undefined') {
          BX.Sale.OrderAjaxComponent.sendRequest();
        }
      }
      IPOLSDEK_pvz.close(true);
    }
  },

  markUnable: function() {
    for (var i in IPOLSDEK_pvz.pvzInputs) {
      if (typeof (IPOLSDEK_pvz.pvzInputs[i]) == 'function') {
        continue;
      }

      chznPnkt = $('#ORDER_PROP_' + IPOLSDEK_pvz.pvzInputs[i]);
      if (chznPnkt.length <= 0 || chznPnkt.get(0).tagName != 'INPUT') {
        chznPnkt = $('[name="ORDER_PROP_' + IPOLSDEK_pvz.pvzInputs[i] + '"]');
      }
      if (chznPnkt.length > 0) {
        chznPnkt.val(IPOLSDEK_pvz.pvzAdress);
        chznPnkt.css('background-color', '#eee').attr('readonly', 'readonly');
        break;
      }
    }
  },

  // �����������
  close: function(fromChoose) {
    //��������� ����������
    if (IPOLSDEK_pvz.multiPVZ !== false && typeof (fromChoose) == 'undefined') {
      IPOLSDEK_pvz.choozePVZ(IPOLSDEK_pvz.multiPVZ);
    }
    if (IPOLSDEK_pvz.scrollPVZ && typeof (IPOLSDEK_pvz.scrollPVZ.data('jsp')) != 'undefined') {
      IPOLSDEK_pvz.scrollPVZ.data('jsp').destroy();
    }
    $('#SDEK_pvz').css('display', 'none');
    $('#SDEK_mask').css('display', 'none');
    IPOLSDEK_pvz.isActive = false;
  },

  selectPVZ: function(id, mode) {
    // ����� ��� ���� ���
    if (!IPOLSDEK_pvz.isActive) {
      if (typeof (mode) == 'undefined') {
        mode = 'PVZ';
      }
      if (IPOLSDEK_pvz.curMode != mode || !IPOLSDEK_pvz.Y_map || !IPOLSDEK_pvz.ready) {
        IPOLSDEK_pvz.ready = true;
        if (IPOLSDEK_pvz.Y_map) {
          IPOLSDEK_pvz.Y_clearPVZ();
        }
        IPOLSDEK_pvz.curMode = mode;
        $('[id^="SDEK_delivInfo_"]').css('display', 'none');
        $('#SDEK_delivInfo_' + mode).css('display', 'block');

        if (arguments.length == 1 && typeof (IPOLSDEK_pvz.deliveries[mode][id] != 'undefined')) {
          IPOLSDEK_pvz.curProfile = id;
        } else {
          var link = (typeof (IPOLSDEK_pvz.deliveries[mode][id]) === 'undefined')
            ? IPOLSDEK_pvz.pickFirst(IPOLSDEK_pvz.deliveries[mode])
            : id;
          IPOLSDEK_pvz.curProfile = IPOLSDEK_pvz.deliveries[mode][link].link;
        }
        IPOLSDEK_pvz.getPrices();

        IPOLSDEK_pvz.initCityPVZ();

        IPOLSDEK_pvz.Y_init();
      }

      IPOLSDEK_pvz.scrollPVZ = $('#SDEK_wrapper').jScrollPane({
        autoReinitialise: true,
      });

      IPOLSDEK_pvz.isActive = true;

      IPOLSDEK_pvz.positWindow();

      $('#SDEK_mask').css('display', 'block');
    }
  },

  positWindow: function() {
    if (!IPOLSDEK_pvz.isActive) {
      return;
    }

    var hndlr = $('#SDEK_pvz');

    var left = ($(window).width() > hndlr.outerWidth()) ? (($(window).width() - hndlr.outerWidth()) / 2) : 0;

    if ($(window).height() < 542) {
      // hndlr.css('height','100%');
      $('#SDEK_wrapper').css('height', hndlr.height() - 82);
    } else {
      hndlr.css('height', '');
      $('#SDEK_wrapper').css('height', '');
    }

    hndlr.css({
      'display': 'block',
      'left': left,
    });
    hndlr.css({
      'top': ($(window).height() - hndlr.height()) / 2 + $(document).scrollTop(),
    });

    if (typeof (IPOLSDEK_pvz.Y_map.controls) != 'undefined') {
      var leftZK = (hndlr.width() < 900) ? hndlr.width() - 40 : 265;
      var topZK = (hndlr.height() < 540) ? (hndlr.height() - 206) / 2 : 146;
      var control = IPOLSDEK_pvz.Y_map.controls.getContainer();
      $(control).find('[class*="_control"]').css({
        left: leftZK,
        top: topZK,
      });
    }

    if (hndlr.width() > 700) {
      $('.SDEK_all-items').css('display', 'block');
    }
  },

  scrollHintInited: false,
  markChosenPVZ: function(id) {
    if (!IPOLSDEK_pvz.scrollHintInited) {
      IPOLSDEK_pvz.scrollHintInited = true;
      window.setTimeout(IPOLSDEK_pvz.makeScrollHint, 100);
    }
    if ($('.sdek_chosen').attr('id') != 'PVZ_' + id) {
      $('.sdek_chosen').removeClass('sdek_chosen');
      $('#PVZ_' + id).addClass('sdek_chosen');
      IPOLSDEK_pvz.Y_selectPVZ(id);
    }
    if ($('#SDEK_pvz').width() < 450 && $('.SDEK_all-items').css('display') != 'none') {
      IPOLSDEK_pvz.handleArrow();
    }
  },

  makeScrollHint: function() {
    $('.sdek_baloonInfo').jScrollPane({
      contentWidth: '0px',
      autoReinitialise: true,
    });
    IPOLSDEK_pvz.scrollHintInited = false;
  },

  handleArrow: function() {
    $('.SDEK_arrow').toggleClass('up');
    $('.SDEK_all-items').slideToggle(300);
  },

  //Y�����
  Y_map: false,
  //��������� �� y-�����

  Y_init: function() {
    IPOLSDEK_pvz.Y_readyToBlink = false;
    if (typeof IPOLSDEK_pvz.city == 'undefined') {
      IPOLSDEK_pvz.city = 'Москва';
    }
    var country = (typeof (IPOLSDEK_pvz.cityCountry[IPOLSDEK_pvz.city]) == 'undefined')
      ? 'Россия'
      : IPOLSDEK_pvz.cityCountry[IPOLSDEK_pvz.city];
    ymaps.geocode(country + ', ' + IPOLSDEK_pvz.city, {
      results: 1,
    }).then(function(res) {
      var checker = $('#SDEK_pvz').width();
      var firstGeoObject = res.geoObjects.get(0);
      var coords = firstGeoObject.geometry.getCoordinates();

      coords[1] -= (checker > 700) ? 0.2 : -(120 / checker);
      if (!IPOLSDEK_pvz.Y_map) {
        IPOLSDEK_pvz.Y_map = new ymaps.Map('SDEK_map', {
          zoom: 10,
          controls: [],
          center: coords,
        });

        var hCheck = $('#SDEK_pvz').height();

        var ZK = new ymaps.control.ZoomControl({
          options: {
            position: {
              left: (checker > 700) ? 265 : checker - 40,
              top: (hCheck > 540) ? 146 : (hCheck - 206) / 2,
            },
          },
        });

        IPOLSDEK_pvz.Y_map.controls.add(ZK);
      } else {
        IPOLSDEK_pvz.Y_map.setCenter(coords);
        IPOLSDEK_pvz.Y_map.setZoom(10);
      }
      IPOLSDEK_pvz.Y_clearPVZ();
      IPOLSDEK_pvz.Y_markPVZ();
    });
  },

  Y_markPVZ: function() {
    for (var i in IPOLSDEK_pvz.cityPVZ) {
      var baloonHTML = '<div id=\'SDEK_baloon\'>';
      baloonHTML += '<div class=\'SDEK_iAdress\'>';
      if (IPOLSDEK_pvz.cityPVZ[i].Address.indexOf(',') !== -1) {
        if (IPOLSDEK_pvz.cityPVZ[i].color) {
          baloonHTML += '<span style=\'color:' + IPOLSDEK_pvz.cityPVZ[i].color + '\'>' + IPOLSDEK_pvz.cityPVZ[i].Address.substr(0, IPOLSDEK_pvz.cityPVZ[i].Address.indexOf(',')) + '</span>';
        } else {
          baloonHTML += IPOLSDEK_pvz.cityPVZ[i].Address.substr(0, IPOLSDEK_pvz.cityPVZ[i].Address.indexOf(','));
        }
        baloonHTML += '<br>' + IPOLSDEK_pvz.cityPVZ[i].Address.substr(IPOLSDEK_pvz.cityPVZ[i].Address.indexOf(',') + 1)
          .trim();
      } else {
        baloonHTML += IPOLSDEK_pvz.cityPVZ[i].Address;
      }
      baloonHTML += '</div>';

      if (IPOLSDEK_pvz.cityPVZ[i].Phone) {
        baloonHTML += '<div><div class=\'SDEK_iTelephone sdek_icon\'></div><div class=\'sdek_baloonDiv\'>' + IPOLSDEK_pvz.cityPVZ[i].Phone + '</div><div style=\'clear:both\'></div></div>';
      }
      if (IPOLSDEK_pvz.cityPVZ[i].WorkTime) {
        baloonHTML += '<div><div class=\'SDEK_iTime sdek_icon\'></div><div class=\'sdek_baloonDiv\'>' + IPOLSDEK_pvz.cityPVZ[i].WorkTime + '</div><div style=\'clear:both\'></div></div>';
      }

      if (IPOLSDEK_pvz.cityPVZ[i].Note) {
        baloonHTML += '<div class=\'sdek_baloonInfo\'><div>' + IPOLSDEK_pvz.cityPVZ[i].Note + '</div></div><div style=\'clear:both\'></div>';
      }
      baloonHTML += '<div><a id=\'SDEK_button\' href=\'javascript:void(0)\' onclick=\'IPOLSDEK_pvz.choozePVZ("' + i + '")\'></a></div>';
      baloonHTML += '</div>';
      IPOLSDEK_pvz.cityPVZ[i].placeMark = new ymaps.Placemark([
        IPOLSDEK_pvz.cityPVZ[i].cY,
        IPOLSDEK_pvz.cityPVZ[i].cX,
      ], {
        balloonContent: baloonHTML,
      }, {
        iconLayout: 'default#image',
        iconImageHref: '/bitrix/images/ipol.sdek/widjet/sdekNActive.png',
        iconImageSize: [40, 43],
        iconImageOffset: [-10, -31],
      });
      IPOLSDEK_pvz.Y_map.geoObjects.add(IPOLSDEK_pvz.cityPVZ[i].placeMark);
      IPOLSDEK_pvz.cityPVZ[i].placeMark.link = i;
      IPOLSDEK_pvz.cityPVZ[i].placeMark.events.add('balloonopen', function(metka) {
        IPOLSDEK_pvz.markChosenPVZ(metka.get('target').link);
      });
    }
    IPOLSDEK_pvz.Y_readyToBlink = true;
  },

  Y_selectPVZ: function(wat) {
    var checker = $('#SDEK_pvz').width();
    var adr = (checker > 700) ? 0.2 : -(120 / checker);
    IPOLSDEK_pvz.Y_map.setCenter([IPOLSDEK_pvz.cityPVZ[wat].cY, parseFloat(IPOLSDEK_pvz.cityPVZ[wat].cX) - adr]);
    IPOLSDEK_pvz.cityPVZ[wat].placeMark.balloon.open();
  },

  Y_readyToBlink: false,
  Y_blinkPVZ: function(wat, ifOn) {
    if (IPOLSDEK_pvz.Y_readyToBlink) {
      if (typeof (ifOn) != 'undefined' && ifOn) {
        IPOLSDEK_pvz.cityPVZ[wat].placeMark.options.set({
          iconImageHref: '/bitrix/images/ipol.sdek/widjet/sdekActive.png',
        });
      } else {
        IPOLSDEK_pvz.cityPVZ[wat].placeMark.options.set({
          iconImageHref: '/bitrix/images/ipol.sdek/widjet/sdekNActive.png',
        });
      }
    }
  },

  Y_clearPVZ: function() {
    if (typeof (IPOLSDEK_pvz.Y_map.geoObjects.removeAll) !== 'undefined' && false) {
      IPOLSDEK_pvz.Y_map.geoObjects.removeAll();
    } else {
      do {
        IPOLSDEK_pvz.Y_map.geoObjects.each(function(e) {
          IPOLSDEK_pvz.Y_map.geoObjects.remove(e);
        });
      } while (IPOLSDEK_pvz.Y_map.geoObjects.getBounds());
    }
  },

  // ��������
  readySt: {
    ymaps: false,
    jqui: false,
  },
  inited: false,
  checkReady: function(wat) {
    if (typeof (IPOLSDEK_pvz.readySt[wat]) !== 'undefined') {
      IPOLSDEK_pvz.readySt[wat] = true;
    }
    if (IPOLSDEK_pvz.readySt.ymaps && (IPOLSDEK_pvz.readySt.jqui || typeof ($) != 'undefined') && !IPOLSDEK_pvz.inited) {
      IPOLSDEK_pvz.inited = true;
      var tmpHTML = $('#SDEK_pvz').html();
      $('#SDEK_pvz').replaceWith('');
      $('body').append('<div id=\'SDEK_pvz\'>' + tmpHTML + '</div>');
      IPOLSDEK_pvz.init();
    }
  },

  jquiready: function() {
    IPOLSDEK_pvz.checkReady('jqui');
  },
  ympsready: function() {
    IPOLSDEK_pvz.checkReady('ymaps');
  },

  ymapsBindCntr: 0,
  ymapsBindFinal: false,
  ymapsBlockLoad: false,
  ymapsBidner: function() {
    if (IPOLSDEK_pvz.ymapsBlockLoad) {
      return;
    }
    if (IPOLSDEK_pvz.ymapsBindCntr > 50) {
      if (IPOLSDEK_pvz.ymapsBindFinal) {
        console.error('SDEK widjet error: no Y-maps');
        return;
      } else {
        IPOLSDEK_pvz.ymapsBindFinal = true;
        IPOLSDEK_pvz.ymapsBlockLoad = true;
        IPOL_JSloader.checkScript('', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU', IPOLSDEK_pvz.ymapsForseCheck);
        IPOL_JSloader.recall();
        return;
      }
    }
    if (typeof (ymaps) == 'undefined') {
      IPOLSDEK_pvz.ymapsBindCntr++;
      setTimeout(IPOLSDEK_pvz.ymapsBidner, 100);
    } else {
      ymaps.ready(IPOLSDEK_pvz.ympsready);
    }
  },
  ymapsForseCheck: function() {
    IPOLSDEK_pvz.ymapsBindCntr = 0;
    IPOLSDEK_pvz.ymapsBlockLoad = false;
    IPOLSDEK_pvz.ymapsBidner();
  },
  // ���������
  isFull: function(wat) {
    if (typeof (wat) !== 'object') {
      return (wat);
    } else {
      for (var i in wat)
        return true;
    }
    return false;
  },
};
IPOLSDEK_pvz.ymapsBidner();
IPOL_JSloader.checkScript('', '/bitrix/js/ipol.sdek/jquery.mousewheel.js');
IPOL_JSloader.checkScript('$("body").jScrollPane', '/bitrix/js/ipol.sdek/jquery.jscrollpane.js', IPOLSDEK_pvz.jquiready);
