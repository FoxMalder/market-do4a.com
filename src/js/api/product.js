import axios from 'axios';
import qs from 'qs';

import Utils from '../utils/utils';

export default {
  requestParam: {},
  getSimilar(productId) {
    const data = {
      sessid: Utils.sessid(),
      ...this.requestParam,
    };

    return axios
      .post(`/ajax/catalog/products/similarByProductId/${productId}/`, qs.stringify(data))
      .then(response => response.data)
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
