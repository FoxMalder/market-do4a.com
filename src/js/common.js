import Vue from 'vue/dist/vue.esm';
import axios from 'axios';
import 'simplebar';

import './fancybox';
import './bootstrap';
import './modules/Header';
import './modules/Input';

global.baseURL = 'https://marketdo4a.com/';
global.axios = axios;

if (global.dev) {
  axios.defaults.baseURL = 'http://dev1.marketdo4a.com/';
}
axios.defaults.withCredentials = true;
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


Vue.filter('formatPrice', (value) => {
  // if (!value) return '';
  // return value.toLocaleString();
  return `${value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
});


if (!{}.hasOwnProperty.call(window, 'app')) {
  window.app = {};
}
