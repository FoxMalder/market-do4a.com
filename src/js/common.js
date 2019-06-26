import $ from 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/scrollspy';

import '@fancyapps/fancybox/dist/jquery.fancybox.css';
import '@fancyapps/fancybox';


import 'simplebar';

import Header from './modules/Header';
import Input from './modules/Input';

// window.jQuery = $;
// window.$ = $;

$.fancybox.defaults.closeExisting = true;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.i18n.ru = {
  CLOSE: 'Закрыть',
  NEXT: 'Вперед',
  PREV: 'Назад',
  ERROR: 'Запрашиваемый контент не может быть загружен. <br/> Пожалуйста, повторите позднее.',
  PLAY_START: 'Начать слайд-шоу',
  PLAY_STOP: 'Остановить слайд-шоу',
  FULL_SCREEN: 'На полный экран',
  THUMBS: 'Thumbnails',
  DOWNLOAD: 'Скачать',
  SHARE: 'Поделиться',
  ZOOM: 'Увеличить',
};

$(() => {
  // $(document).on('click.bs.dropdown', '.multifilter [role="form"]', (e) => {
  $(document).on('click.bs.dropdown', '.dropdown-menu[role="form"]', (e) => {
    e.stopPropagation();
  });

  // svg4everybody();


  window.app.Header = new Header();
  Input();
});
