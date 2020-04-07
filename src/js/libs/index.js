import axios from 'axios';
import Qs from 'qs';
import Vue from 'vue';

import './lib.lazysizes.js';
import './lib.fancybox';
import './lib.vue.js';

import 'simplebar';

global.axios = axios;
global.qs = Qs;
global.Vue = Vue;
