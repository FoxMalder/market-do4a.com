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
      if (global.demo) {
        return new Promise((resolve, reject) => {
          resolve([111, 2345]);
        });
      }
      return Utils.sendRequest(`/ajax/favorite/add/${id}/`)
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
      if (global.demo) {
        return new Promise((resolve, reject) => {
          resolve([11, 1234, 234]);
        });
      }
      return Utils.sendRequest(`/ajax/favorite/delete/${id}/`)
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
  catalog: {
    send(url, formData, page = 1) {
      formData.append('page', page.toString());

      if (global.demo) {
        console.log(Object.fromEntries(formData));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetch(url)
              .then(response => response.json())
              .then((dataJson) => {
                resolve(dataJson.data);
              });
          }, 500);
        });
      }

      return Utils.sendRequest(url, {
        method: 'post',
        body: formData,
      });
    },
    // reload(url, formData) {
    //   return Utils.sendRequest(url, {
    //     method: 'post',
    //     body: formData,
    //   });
    // },
    // nextPage(url, formData, page) {
    //
    // }
  },
};

export default Api;
