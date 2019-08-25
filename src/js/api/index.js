import axios from 'axios';
import Utils from '../utils/utils';

/**
 * Добавление продукта в избранное
 * @param id - Id продукта
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function addToFavorites(id) {
  return axios
    .get(`/ajax/favorite/add/${id}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success) {
        return response;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Удаление продукта из избранное
 * @param id - Id продукта
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function removeFromFavorites(id) {
  return axios
    .get(`/ajax/favorite/delete/${id}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success) {
        return response;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Получить актуальный список товаров в корзине
 * @param cb
 */
export function getBasketContents(cb) {
  axios
    .get('/ajax/basket/')
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data.items;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(items => cb(items));
    // .catch(error => alert(error.message));
}


/**
 * Очистить корзину
 * @param cb
 * @param errorCb
 */
export function clearBasket(cb, errorCb) {
  axios
    .delete('/ajax/basket/')
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data.items;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(() => cb())
    .catch(() => errorCb());
}


/**
 * Добавить продукт в корзину
 * @param productId - ID продукта
 * @param productQuantity - Добавляемое количество
 * @param storeId
 * @param cb
 * @param errorCb
 */
export function addProductToBasket({ productId, quantity, storeId }, cb, errorCb) {
  // const data = {
  //   method: 'add',
  //   id: productId,
  //   quantity: productQuantity,
  //   ajax: 'Y',
  //   sessid: Utils.sessid(),
  // };

  axios
    .post(`/ajax/basket/${productId}/`, {
      quantity,
      storeId,
    })
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data.items;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(items => cb(items))
    .catch((error) => {
      alert(error.message);
      errorCb();
    });
}


/**
 * Удалит продукт первый попавшийся в корзине (я хз, что это)
 * @param productId
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function removeProductFromBasket(productId) {
  return axios
    .delete(`/ajax/basket/product/${productId}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Установит нужное кол-во для конкретной позиции в корзине, если отправить 0 - удалит товар из корзины
 * @param basketId
 * @param quantity
 * @param storeId
 * @param cb
 * @param errorCb
 */
export function setQuantityInBasket({ basketId, quantity, storeId }, cb, errorCb) {
  axios
    .put(`/ajax/basket/${basketId}/`, {
      quantity,
      storeId,
    })
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data.items;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(items => cb(items))
    .catch(() => errorCb());
}


/**
 * Удалит конкретную позицию в корзине
 * @param basketId
 * @param cb
 */
export function removeFromBasket(basketId, cb) {
  axios
    .delete(`/ajax/basket/${basketId}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data.items;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(items => cb(items))
    .catch(error => alert(error.message));
}
