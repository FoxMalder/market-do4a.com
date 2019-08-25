import axios from 'axios';
import Utils from '../utils/utils';

/**
 * Добавление продукта в избранное
 * @param id - Id продукта
 * @param cb - Callback
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
 * @param cb - Callback
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
 * Добавить продукт в корзину
 * @param productId - ID продукта
 * @param productQuantity - Добавляемое количество
 * @param cb - Callback
 * @returns {Promise<AxiosResponse<T> | never>}
 */
export function addProductToCart({ productId, productQuantity }) {
  const data = {
    method: 'add',
    id: productId,
    quantity: productQuantity,
    ajax: 'Y',
    sessid: Utils.sessid(),
  };

  return axios
    .post('/local/public_/basket.php', data)
    .then(response => response.data)
    .then((response) => {
      if (response.status === 'ok') {
        return response;
      }
      const error = new Error(response.error);
      error.response = response;
      throw error;
    });
}
