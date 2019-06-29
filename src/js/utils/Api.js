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
      // return new Promise((resolve, reject) => {
      //   resolve([111, 2345]);
      // })
      return Utils.sendRequest(`/ajax/favorite/add/${id}`)
        .then((array) => {
          const widgetEvent = new CustomEvent('favorites', {
            bubbles: true,
            detail: array,
          });
          window.dispatchEvent(widgetEvent);
          // window.app.Header.setFavorites(array.length);
          return array;
        });
    },
    /**
     * Удаление продукта из избранное
     * @param id - Id продукта
     * @returns {Promise}
     */
    delete(id) {
      // return new Promise((resolve, reject) => {
      //   resolve([11, 1234, 234]);
      // })
      return Utils.sendRequest(`/ajax/favorite/delete/${id}`)
        .then((array) => {
          const widgetEvent = new CustomEvent('favorites', {
            bubbles: true,
            detail: array,
          });
          window.dispatchEvent(widgetEvent);
          // window.app.Header.setFavorites(array.length);

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
