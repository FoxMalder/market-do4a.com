import Vue from 'vue';

import axios from 'axios';
import Qs from 'qs';
import ready from 'domready';

import 'simplebar';

import './fancybox';
import './bootstrap';
import './modules/Input';


import App from './App';
import Utils from './utils/utils';
// import ProductDetail from './components/product/Detail';


// global.baseURL = 'https://marketdo4a.com/';
global.utils = Utils;
global.axios = axios;
global.qs = Qs;

// if (global.dev) {
//   axios.defaults.baseURL = 'http://dev1.marketdo4a.com/';
// }
// axios.defaults.withCredentials = true;
// axios.defaults.transformRequest = [
//   (data, headers) => {
//     // console.log(data, headers);
//     if (data && data instanceof Object) {
//       const formData = new FormData();
//
//       Object.keys(data).forEach((key) => {
//         formData.append(key, data[key]);
//       });
//
//       return formData;
//       // if (data instanceof FormData) {
//       //   return data;
//       // }
//     }
//     return data;
//   },
// ];


//
// Vue.components('toast-transition', {
//   functional: true,
//   render(h, { children }) {
//     const data = {
//       attrs: { tag: 'div', name: 'toast', type: 'transition' },
//     };
//     return h('transition-group', data, children);
//   },
// });


// const data = { 'bar': 123 };
// const options = {
//   method: 'POST',
//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
//   data: qs.stringify(data),
//   url,s
// };
// axios(options);

// axios.defaults.paramsSerializer = params => Qs.stringify(params, { arrayFormat: 'brackets' });

//
// function bindNumberInRange(el, binding, vnode) {
//   console.log(el.min, el.max, binding.value);
//
//   const model = binding.expression;
//   const min = parseInt(el.min, 10);
//   const max = parseInt(el.max, 10);
//   const val = parseInt(binding.value, 10);
//
//   if (Number.isNaN(min) && (min >= val)) {
//     vnode.context[model] = min;
//   } else if (Number.isNaN(max) && (max <= val)) {
//     vnode.context[model] = max;
//   }
//
//   el.value = val;
// }
//
// Vue.directive('range', {
//   bind: bindNumberInRange,
//   componentUpdated: bindNumberInRange,
// });

Vue.filter('formatPrice', (value) => {
  // if (!value) return '';
  // return value.toLocaleString();
  return `${value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
});
