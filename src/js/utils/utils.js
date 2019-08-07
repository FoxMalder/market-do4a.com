const Utils = {
  isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },

  flattenArray(arr) {
    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? Utils.flattenArray(b) : b), []);
  },

  /**
   * Функция, которая возвращает преобразованный массив элементов
   * @function
   * @param {Array | Node | NodeList} o - Element which position & rectangle are returned
   * @return {Array}
   */
  toArray(o) {
    if (Array.isArray(o)) return o;
    if (typeof o === 'string') o = document.querySelectorAll(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) {
      return [].slice.call(o);
    }
    return [o];
  },

  parseTargets(targets) {
    if (targets) {
      return Utils.flattenArray(
        Array.isArray(targets) ? targets.map(Utils.toArray) : Utils.toArray(targets),
      );
    }
    return [];
  },

  extend(...args) {
    const to = Object(args[0]);
    for (let i = 1; i < args.length; i += 1) {
      const nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        const keysArray = Object.keys(Object(nextSource));
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },


  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  },

  parseJSON(response) {
    return response.json();
  },

  /**
   * Создает элемент из строки
   *
   * @param {String} html - html-код в виде строки
   * @returns {ChildNode}
   */
  htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  },

  /**
   * Склонение слова в зависимости от числа
   *
   * @param {Number} n - Число
   * @param {Array|String} titles - Слово или массив из форм слова [товар, товара, товаров]
   * @returns {String}
   */
  declOfNum(n, titles) {
    if (typeof titles === 'string' || titles.length !== 3) {
      return titles;
    }

    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  },

  sendRequest(url, options = {}) {
    return fetch(url, options)
      .then(Utils.checkStatus)
      .then(Utils.parseJSON)
      .then((data) => {
        if (data.success) {
          return data.data;
        }
        throw data.message;
      });
  },

  /**
   * Плавная прокрутка к элементу
   * @param {HTMLElement} element - Элемент
   * @param {Number} duration - Длительность анимации прокрутки
   */
  scrollTo(element, duration = 1000) {
    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;

    $('html, body').animate({
      scrollTop: offsetTop - global.app.Header.header.fixedTargets.clientHeight,
    }, duration);
  },
};
export default Utils;
