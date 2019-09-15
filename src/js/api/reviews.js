import axios from 'axios';
import qs from 'qs';
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
      .post('/local/public/product_reviews.php', qs.stringify(data))
      .then(response => response.data)
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
      .post('/local/public/product_reviews.php', qs.stringify(data))
      .then(response => response.data)
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

    return axios
      .post(`/ajax/review/byProduct/${productId}/`, qs.stringify(data))
      .then(response => response.data)
      .then((response) => {
        if (response.success) {
          return response;
        }
        const error = new Error(response.message);
        error.response = response;
        throw error;
      });
  },
};
