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
 *
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function getBasketContents() {
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
    });
}


/**
 * Очистить корзину
 *
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function clearBasket() {
  return axios
    .delete('/ajax/basket/')
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Добавить продукт в корзину
 * @param productId - ID продукта
 * @param productQuantity - Добавляемое количество
 * @param storeId
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function addProductToBasket({ productId, quantity, storeId }) {
  // const data = {
  //   method: 'add',
  //   id: productId,
  //   quantity: productQuantity,
  //   ajax: 'Y',
  //   sessid: Utils.sessid(),
  // };

  return axios({
    method: 'post',
    url: `/ajax/basket/${productId}/`,
    params: { quantity, storeId },
  })
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
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
 *
 * @param basketId
 * @param quantity
 * @param storeId
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function setQuantityInBasket({ basketId, quantity, storeId }) {
  return axios({
    method: 'put',
    url: `/ajax/basket/${basketId}/`,
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
    });
}


/**
 * Удалит конкретную позицию в корзине
 *
 * @param basketId
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function removeFromBasket(basketId) {
  return axios
    .delete(`/ajax/basket/${basketId}/`)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 *
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function fetchSaleOrderAjax(url, data) {
  return axios
    .post(url, qs.stringify(data))
    .then(response => response.data)
    .then((result) => {
      if (!result.error) {
        return result;
      }
      const error = new Error(result.error);
      error.response = result;
      throw error;
    });
}


/**
 * Поиск города по строке
 *
 * @param options
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function locationSearch(options = {}) {
  const {
    page = 0,
    pageSize = 20,
    search = '',
    siteID = 's1',
  } = options;
  return axios
    .post('/bitrix/components/bitrix/sale.location.selector.search/get.php', qs.stringify({
      select: {
        1: 'CODE',
        2: 'TYPE_ID',
        VALUE: 'ID',
        DISPLAY: 'NAME.NAME',
      },
      additionals: {
        1: 'PATH',
      },
      filter: {
        '=PHRASE': search,
        '=NAME.LANGUAGE_ID': 'ru',
        '=SITE_ID': siteID,
      },
      version: 2,
      PAGE_SIZE: pageSize,
      PAGE: page,
    }))
    .then(response => JSON.parse(response.data.replace(/["']/g, '"')))
    .then((result) => {
      if (result.result) {
        return result;
      }
      const error = new Error(result.error[0]);
      error.response = result;
      throw error;
    });
}


export function getFiltredCatalog(formData, page = 1) {
  formData.append('page', page.toString());

  return axios.post('/local/public/catalog.php', formData)
    .then(response => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}
