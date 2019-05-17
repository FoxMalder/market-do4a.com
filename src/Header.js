import './scss/header-style.scss';

import $ from 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';

import 'simplebar';

import Header from './js/modules/Header';


$(() => {
  window.app.Header = new Header();
});
