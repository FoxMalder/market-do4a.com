import Vue from 'vue';

import VueLazyload from 'vue-lazyload';

import VueModal from '@/plugins/vue-modal';
import VueNotify from '@/plugins/vue-notify';
import ClickOutside from '@/directives/ClickOutside';

import { formatNumber } from '@/utils';


Vue.config.productionTip = false;

Vue.use(VueModal);
Vue.use(VueNotify);
Vue.use(VueLazyload, {
  error: require('../../img/plug.svg'),
  loading: require('../../img/plug.svg'),
});

Vue.filter('formatPrice', (value) => formatNumber(value, '₽'));

Vue.directive('click-outside', ClickOutside);
