import axios from 'axios';
import qs from 'qs';

// import Utils from '../utils/utils';

/**
 * Добавление продукта в избранное
 * @param productId - id продукта
 * @param cb - callback
 * @param errorCb - callback
 */
export function addToFavorites(productId, cb, errorCb) {
  axios
    .get(`/ajax/favorite/add/${productId}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
}


/**
 * Удаление продукта из избранного
 * @param productId - id продукта
 * @param cb - callback
 * @param errorCb - callback
 */
export function removeFromFavorites(productId, cb, errorCb) {
  axios
    .get(`/ajax/favorite/delete/${productId}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
}


/**
 * Получить актуальный список товаров в корзине
 * @param cb
 */
export function getBasketContents(cb) {
  return axios
    .get('/ajax/basket/')
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    // .then(data => cb(data));
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
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
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
    // .post(`/ajax/basket/${productId}/?quantity=${quantity}&storeId=${storeId}`)
    .post(`/ajax/basket/${productId}/`, null, {
      params: {
        quantity,
        storeId,
      },
    })
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
}


// /**
//  * Удалит продукт первый попавшийся в корзине (я хз, что это)
//  * @param productId
//  * @returns {Promise<AxiosResponse<T> | never>}
//  */
// export function removeProductFromBasket(productId) {
//   return axios
//     .delete(`/ajax/basket/product/${productId}/`)
//     .then(response => response.data)
//     .then((response) => {
//       if (response.success === 1) {
//         return response;
//       }
//       const error = new Error(response.message);
//       error.response = response;
//       throw error;
//     });
// }


/**
 * Установит нужное кол-во для конкретной позиции в корзине,
 * если отправить 0 - удалит товар из корзины
 * @param basketId
 * @param quantity
 * @param storeId
 * @param cb
 * @param errorCb
 */
export function setQuantityInBasket({ basketId, quantity, storeId }, cb, errorCb) {
  axios
  // .put(`/ajax/basket/${basketId}/?quantity=${quantity}&storeId=${storeId}`, {
    .put(`/ajax/basket/${basketId}/`, null, {
      params: {
        quantity,
        storeId,
      },
    })
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
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
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    })
    .then(data => cb(data))
    .catch((error) => {
      alert(error.message);
      // errorCb(error);
    });
}


export function getSoaData(url, data, cb, errorCb) {
  axios
    .post(url, qs.stringify(data))
    .then(response => response.data)
    .then((result) => {
      if (!result.error) {
        return result;
      }
      const error = new Error(result.error);
      error.response = result;
      throw error;
    })
    .then(result => cb(result))
    .catch((error) => {
      alert(error.message);
      errorCb(error);
    });
}
