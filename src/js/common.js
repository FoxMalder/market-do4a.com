import axios from 'axios';
import 'simplebar';

import './fancybox';
import './bootstrap';
import './modules/Header';
import './modules/Input';

global.axios = axios;
axios.defaults.transformRequest = [
  (data, headers) => {
    if (data) {
      if (data instanceof FormData) {
        return data;
      }

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      return formData;
    }
    return data;
  },
];


if (!{}.hasOwnProperty.call(window, 'app')) {
  window.app = {};
}
