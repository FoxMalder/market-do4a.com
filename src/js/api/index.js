import axios from 'axios';
import qs from 'qs';

// import Utils from '../utils/utils';

/**
 * Добавление продукта в избранное
 *
 * @param {Number} productId - id продукта
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function addToFavorites(productId) {
  return axios
    .get(`/ajax/favorite/add/${productId}/`)
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
 * Удаление продукта из избранного
 *
 * @param {Number} productId - id продукта
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export function removeFromFavorites(productId) {
  return axios
    .get(`/ajax/favorite/delete/${productId}/`)
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


export function getFavorites() {
  return axios
    .get('/ajax/favorite/all/')
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
 * @returns {Promise<AxiosResponse<T>>}
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
 * @returns {Promise<AxiosResponse<T>>}
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
 * @returns {Promise<AxiosResponse<T>>}
 */
export function locationSearch(request) {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       result: true,
  //       errors: [],
  //       data: {
  //         ITEMS: [
  //           {
  //             CODE: '0000103664', TYPE_ID: '3', VALUE: '1305', PATH: [1276], DISPLAY: 'Санкт-Петербург',
  //           },
  //           {
  //             CODE: '0000105691', TYPE_ID: '3', VALUE: '4412', PATH: [1305, 1276], DISPLAY: 'Зеленогорск',
  //           },
  //           {
  //             CODE: '0000107755', TYPE_ID: '3', VALUE: '4419', PATH: [1305, 1276], DISPLAY: 'Петергоф',
  //           },
  //           {
  //             CODE: '0000107253', TYPE_ID: '3', VALUE: '4416', PATH: [1305, 1276], DISPLAY: 'Сестрорецк',
  //           },
  //           {
  //             CODE: '0000105827', TYPE_ID: '3', VALUE: '4413', PATH: [1305, 1276], DISPLAY: 'Кронштадт',
  //           },
  //           {
  //             CODE: '0000107940', TYPE_ID: '3', VALUE: '4420', PATH: [1305, 1276], DISPLAY: 'Ломоносов',
  //           },
  //           {
  //             CODE: '0000107443', TYPE_ID: '3', VALUE: '4417', PATH: [1305, 1276], DISPLAY: 'Пушкин',
  //           },
  //           {
  //             CODE: '0000107629', TYPE_ID: '3', VALUE: '4418', PATH: [1305, 1276], DISPLAY: 'Павловск',
  //           },
  //           {
  //             CODE: '0000106163', TYPE_ID: '3', VALUE: '4415', PATH: [1305, 1276], DISPLAY: 'Колпино',
  //           },
  //           {
  //             CODE: '0000105884', TYPE_ID: '3', VALUE: '4414', PATH: [1305, 1276], DISPLAY: 'Красное Село',
  //           },
  //           {
  //             CODE: '0000105683',
  //             TYPE_ID: '6',
  //             VALUE: '272941',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Обухово станция',
  //           },
  //           {
  //             CODE: '0000106319',
  //             TYPE_ID: '6',
  //             VALUE: '272957',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Песочный посёлок',
  //           },
  //           {
  //             CODE: '0000106976',
  //             TYPE_ID: '6',
  //             VALUE: '272973',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Металлострой посёлок',
  //           },
  //           {
  //             CODE: '0000105680',
  //             TYPE_ID: '6',
  //             VALUE: '272938',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Мурино станция',
  //           },
  //           {
  //             CODE: '0000106113',
  //             TYPE_ID: '6',
  //             VALUE: '272954',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Левашово посёлок',
  //           },
  //           {
  //             CODE: '0000106822',
  //             TYPE_ID: '6',
  //             VALUE: '272970',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Шушары посёлок',
  //           },
  //           {
  //             CODE: '0000107233', TYPE_ID: '6', VALUE: '272986', PATH: [1305, 1276], DISPLAY: 'Дружный-1 снт',
  //           },
  //           {
  //             CODE: '0000105677',
  //             TYPE_ID: '6',
  //             VALUE: '272935',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Пискаревка станция',
  //           },
  //           {
  //             CODE: '0000106732',
  //             TYPE_ID: '6',
  //             VALUE: '272967',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Александровская посёлок',
  //           },
  //           {
  //             CODE: '0000105690',
  //             TYPE_ID: '6',
  //             VALUE: '272948',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Предпортовая станция',
  //           },
  //           {
  //             CODE: '0000107216',
  //             TYPE_ID: '6',
  //             VALUE: '272980',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Смолячково посёлок',
  //           },
  //           {
  //             CODE: '0000107252', TYPE_ID: '6', VALUE: '272996', PATH: [1305, 1276], DISPLAY: 'Торики-2 снт',
  //           },
  //           {
  //             CODE: '0000105687', TYPE_ID: '6', VALUE: '272945', PATH: [1305, 1276], DISPLAY: 'Нева станция',
  //           },
  //           {
  //             CODE: '0000107092',
  //             TYPE_ID: '6',
  //             VALUE: '272977',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Тярлево посёлок',
  //           },
  //           {
  //             CODE: '0000107247',
  //             TYPE_ID: '6',
  //             VALUE: '272993',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Земледельцы снт',
  //           },
  //           {
  //             CODE: '0000105684',
  //             TYPE_ID: '6',
  //             VALUE: '272942',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Нарвская станция',
  //           },
  //           {
  //             CODE: '0000106992',
  //             TYPE_ID: '6',
  //             VALUE: '272974',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Петро-Славянка посёлок',
  //           },
  //           {
  //             CODE: '0000107241',
  //             TYPE_ID: '6',
  //             VALUE: '272990',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Ленмашзавод снт',
  //           },
  //           {
  //             CODE: '0000105681', TYPE_ID: '6', VALUE: '272939', PATH: [1305, 1276], DISPLAY: 'Новая деревня',
  //           },
  //           {
  //             CODE: '0000106257',
  //             TYPE_ID: '6',
  //             VALUE: '272955',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Ушково посёлок',
  //           },
  //           {
  //             CODE: '0000106900',
  //             TYPE_ID: '6',
  //             VALUE: '272971',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Серово посёлок',
  //           },
  //           {
  //             CODE: '0000107234', TYPE_ID: '6', VALUE: '272987', PATH: [1305, 1276], DISPLAY: 'Дружный-2 снт',
  //           },
  //           {
  //             CODE: '0000105678',
  //             TYPE_ID: '6',
  //             VALUE: '272936',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Заневка деревня',
  //           },
  //           {
  //             CODE: '0000106005',
  //             TYPE_ID: '6',
  //             VALUE: '272952',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Усть-Ижора посёлок',
  //           },
  //           {
  //             CODE: '0000106808',
  //             TYPE_ID: '6',
  //             VALUE: '272968',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Саперный посёлок',
  //           },
  //           {
  //             CODE: '0000106681',
  //             TYPE_ID: '6',
  //             VALUE: '272965',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Белоостров посёлок',
  //           },
  //           {
  //             CODE: '0000105688',
  //             TYPE_ID: '6',
  //             VALUE: '272946',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Станционный посёлок',
  //           },
  //           {
  //             CODE: '0000106578',
  //             TYPE_ID: '6',
  //             VALUE: '272962',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Стрельна посёлок',
  //           },
  //           {
  //             CODE: '0000107121',
  //             TYPE_ID: '6',
  //             VALUE: '272978',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Понтонный посёлок',
  //           },
  //           {
  //             CODE: '0000107249', TYPE_ID: '6', VALUE: '272994', PATH: [1305, 1276], DISPLAY: 'Кировец-1 снт',
  //           },
  //           {
  //             CODE: '0000105685',
  //             TYPE_ID: '6',
  //             VALUE: '272943',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Рыбацкое деревня',
  //           },
  //           {
  //             CODE: '0000106381',
  //             TYPE_ID: '6',
  //             VALUE: '272959',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Парголово посёлок',
  //           },
  //           {
  //             CODE: '0000107039',
  //             TYPE_ID: '6',
  //             VALUE: '272975',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Солнечное посёлок',
  //           },
  //           {
  //             CODE: '0000107243', TYPE_ID: '6', VALUE: '272991', PATH: [1305, 1276], DISPLAY: 'Малахит снт',
  //           },
  //           {
  //             CODE: '0000105682', TYPE_ID: '6', VALUE: '272940', PATH: [1305, 1276], DISPLAY: 'Ручьи станция',
  //           },
  //           {
  //             CODE: '0000106306',
  //             TYPE_ID: '6',
  //             VALUE: '272956',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Молодежное посёлок',
  //           },
  //           {
  //             CODE: '0000107236',
  //             TYPE_ID: '6',
  //             VALUE: '272988',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Константиновка снт',
  //           },
  //           {
  //             CODE: '0000105679',
  //             TYPE_ID: '6',
  //             VALUE: '272937',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Рыбацкое станция',
  //           },
  //           {
  //             CODE: '0000106034',
  //             TYPE_ID: '6',
  //             VALUE: '272953',
  //             PATH: [1305, 1276],
  //             DISPLAY: 'Комарово посёлок',
  //           },
  //           {
  //             CODE: '0000107160', TYPE_ID: '6', VALUE: '6220', PATH: [1305, 1276], DISPLAY: 'Репино посёлок',
  //           },
  //         ],
  //         ETC: {
  //           PATH_ITEMS: {
  //             1276: {
  //               CODE: '0000028023',
  //               TYPE_ID: '1',
  //               DISPLAY: 'Россия',
  //               CHILD_CNT: '84',
  //               VALUE: 1276,
  //             },
  //             1305: {
  //               CODE: '0000103664',
  //               TYPE_ID: '3',
  //               DISPLAY: 'Санкт-Петербург',
  //               CHILD_CNT: '60',
  //               VALUE: 1305,
  //             },
  //           },
  //         },
  //       },
  //     });
  //   }, 2000);
  // });

  // const {
  //   page = 0,
  //   pageSize = 20,
  //   search = '',
  //   siteID = 's1',
  // } = options;

  return axios
    .post('/bitrix/components/bitrix/sale.location.selector.search/get.php', qs.stringify(request))
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


/**
 *
 * @param {String} url
 * @param {FormData} formData
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getFiltredCatalog(url, formData) {
  return axios.post(url, formData)
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
