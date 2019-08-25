import axios from 'axios';
import Utils from '../utils/utils';

export default {
  requestParam: {},
  addReview(productId, review) {
    const data = {
      ajax: 'Y',
      method: 'post',
      sessid: Utils.sessid(),
      productId,
      ...review,
    };

    return axios
      .post('/local/public/product_reviews.php', data)
      .then((response) => {
        if (response.status === 'ok') {
          return response; // { reviewId, status }
        }
        const error = new Error(response.error);
        error.response = response;
        throw error;
      });
  },
  vote(productId, value) {
    const data = {
      id: productId,
      method: value === 'minus' ? 'voteMinus' : 'votePlus',
      sessid: Utils.sessid(),
    };

    return axios
      .post('/local/public/product_reviews.php', data)
      .then((response) => {
        if (response.status === 'ok') {
          return response; // { value, status }
        }
        const error = new Error(response.error);
        error.response = response;
        throw error;
      });
  },
  getReviews(productId, page = 0) {
    const data = {
      sessid: Utils.sessid(),
      ...this.requestParam,
      page,
    };

    if (global.demo) {
      return new Promise((resolve, reject) => {
        let id = Math.ceil(Math.random() * 1000);

        setTimeout(() => {
          resolve({
            count: 16,
            items: [
              {
                id: id += 1,
                author: `User ${id}`,
                text: 'Покупал первый раз я взял вкус печенье-крем с водой мешаю так лучше всего потому что, вкус мне понравился, живот не крутит все ок) ещё завёл себе карту дисконтную до кучи жду товаров по скидке! Купил я до что начала 900 гр большую пока не стал линейка вкусов большой банки очень ограничен.',
                raiting: 4,
                countMinus: 5,
                countPlus: 10,
                created: '25.02.2019',
              }, {
                id: id += 1,
                author: `User ${id}`,
                text: 'text',
                raiting: 2,
                countMinus: 2,
                countPlus: 1,
                created: '25.02.2019',
              },
            ],
          });
          // resolve({
          //   count: 0,
          //   items: [],
          // });
        }, 1000);
      });
    }

    return axios
      .post(`/ajax/review/byProduct/${productId}/`, data)
      .then((response) => {
        if (response.success) {
          return response.data;
        }
        const error = new Error(response.message);
        error.response = response;
        throw error;
      });
  },
};
