import $ from 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/scrollspy';

import '@fancyapps/fancybox/dist/jquery.fancybox.css';
import '@fancyapps/fancybox';


import 'simplebar';

import './modules/Header';
import Input from './modules/Input';

// window.jQuery = $;
// window.$ = $;

$.fancybox.defaults.closeExisting = true;
$.fancybox.defaults.lang = 'ru';
$.fancybox.defaults.slideClass = 'modal';
$.fancybox.defaults.btnTpl.smallBtn = '<button data-fancybox-close class="btn btn-red modal-close" title="{{CLOSE}}">'
  + '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.02815 3.62882L3.71674 4.94023L6.7768 8.0003L3.71694 11.0602L5.02835 12.3716L8.08822 9.31171L11.1481 12.3716L12.4595 11.0601L9.39963 8.0003L12.4597 4.94024L11.1483 3.62883L8.08822 6.68888L5.02815 3.62882Z" fill="currentColor"/></svg>'
  + '</button>';
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

if (!Object.prototype.hasOwnProperty.call(window, 'app')) {
  window.app = {};
}

$(() => {
  // $(document).on('click.bs.dropdown', '.multifilter [role="form"]', (e) => {
  $(document).on('click.bs.dropdown', '.dropdown-menu[role="form"]', (e) => {
    e.stopPropagation();
  });

  // svg4everybody();

  Input();
});
