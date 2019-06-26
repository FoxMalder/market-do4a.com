import Utils from './utils';

/**
 * Глобальное API
 * @type {{favorites: {add(*): Promise, delete(*): Promise}}}
 */
const Api = {
  favorites: {
    /**
     * Добавление продукта в избранное
     * @param id - Id продукта
     * @returns {Promise}
     */
    add(id) {
      return Utils.sendRequest(`/ajax/favorite/add/${id}`)
        .then((array) => {
          const $headerCount = $('.header-control__button_favorites').find('.header-control__notifications');

          if (array.length) {
            $headerCount.show();
            $headerCount.html(array.length);
          } else {
            $headerCount.hide();
          }
          return array;
        });
    },
    /**
     * Удаление продукта из избранное
     * @param id - Id продукта
     * @returns {Promise}
     */
    delete(id) {
      return Utils.sendRequest(`/ajax/favorite/delete/${id}`)
        .then((array) => {
          const $headerCount = $('.header-control__button_favorites').find('.header-control__notifications');

          if (array.length) {
            $headerCount.show();
            $headerCount.html(array.length);
          } else {
            $headerCount.hide();
          }

          return array;
        });
    },
  },
  cart: {
    add(id) {
      const promise = new Promise((resolve, reject) => {
        resolve();
      });

      promise.then(() => {
        console.log('Добавлено в корзину:', id);
      });

      return promise;
    },
    remove(id) {
      const promise = new Promise((resolve, reject) => {
        resolve();
      });

      promise.then(() => {
        console.log('Удалено из корзины:', id);
      });


      return promise;
    },
  },
};

export default Api;
