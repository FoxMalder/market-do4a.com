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


function bindNumberInRange(el, binding, vnode) {
  console.log(el.min, el.max, binding.value);

  const model = binding.expression;
  const min = parseInt(el.min, 10);
  const max = parseInt(el.max, 10);
  const val = parseInt(binding.value, 10);

  if (Number.isNaN(min) && (min >= val)) {
    vnode.context[model] = min;
  } else if (Number.isNaN(max) && (max <= val)) {
    vnode.context[model] = max;
  }

  el.value = val;
}

Vue.directive('range', {
  bind: bindNumberInRange,
  componentUpdated: bindNumberInRange,
});

Vue.filter('formatPrice', value =>
  // if (!value) return '';
  // return value.toLocaleString();
  `${value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`);


if (!{}.hasOwnProperty.call(window, 'app')) {
  window.app = {};
}
