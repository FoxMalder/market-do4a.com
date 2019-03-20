// import '@fancyapps/fancybox';
// import 'owl.carousel';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';

import svg4everybody from 'svg4everybody';

import MreSlider from './modules/MreSlider';
import Header from './modules/Header';
import Input from './modules/Input';

svg4everybody();

function mainSlider() {
  const $controlItem = $('.hero-slider-control__item');

  function slideTo(count) {
    // $('.hero-slider__slide.last').removeClass('last');
    // $('.hero-slider__slide.active').addClass('last');

    $('.hero-slider-control__item').removeClass('active');
    $('.hero-slider-control__item').removeClass('animate');
    $(`.hero-slider-control__item[data-slide=${count}]`).addClass('active');

    $('.hero-slider__slide').removeClass('active');
    $('.hero-slider__slide').removeClass('animate');
    $(`.hero-slider__slide[data-slide=${count}]`).addClass('active');

    setTimeout(() => {
      $(`.hero-slider-control__item[data-slide=${count}]`).addClass('animate');
      $(`.hero-slider__slide[data-slide=${count}]`).addClass('animate');
    }, 1000);
  }

  $controlItem.on('click', function () {
    slideTo($(this).data('slide'));
  });
}


function initMain() {
  let createdForMobile = $(window).width() >= 768;

  const $brandsList = $('.brands__list');
  const $starSlider = document.getElementById('stars-slider');
  const $bestArticles = document.getElementById('best-articles');

  let starSlider;
  let articlesSlider;


  function initMobile() {
    if (starSlider) starSlider.destroy();
    if (articlesSlider) articlesSlider.destroy();

    $brandsList.addClass('owl-carousel');
    $($starSlider).addClass('owl-carousel');
    $($bestArticles).addClass('owl-carousel');

    $($bestArticles).owlCarousel({
      loop: false,
      items: 1,
      nav: false,
      dots: false,
      // center: true,
      margin: 10,
      autoWidth: true,
    });

    $($starSlider).owlCarousel({
      loop: true,
      items: 1,
      nav: false,
      dots: false,
      margin: 10,
      autoWidth: true,
      autoHeight: true,
      center: true,
    });

    $brandsList.owlCarousel({
      loop: false,
      items: 1,
      nav: false,
      dots: false,
      margin: 10,
      autoWidth: true,
      autoHeight: true,
      // center: true,
    });
  }

  function initDesktop() {
    $($bestArticles).trigger('destroy.owl.carousel');
    $($starSlider).trigger('destroy.owl.carousel');
    $brandsList.trigger('destroy.owl.carousel');
    $($bestArticles).removeClass('owl-carousel');
    $($starSlider).removeClass('owl-carousel');
    $brandsList.removeClass('owl-carousel');

    starSlider = new MreSlider($starSlider);
    articlesSlider = new MreSlider($bestArticles);
  }

  function init() {
    if ($(window).width() < 768 && !createdForMobile) {
      initMobile();
      createdForMobile = true;
    } else if ($(window).width() >= 768 && createdForMobile) {
      initDesktop();
      createdForMobile = false;
    }
  }

  init();
  $(window).on('resize', init);
  mainSlider();


  $('.set-block__slider').owlCarousel({
    loop: true,
    items: 1,
    center: true,
    autoWidth: true,
    // stagePadding: 10,
    nav: false,
    dots: false,
    margin: 10,
    navContainerClass: 'slider-nav',
    navText: [
      '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n'
      + '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z"/>\n'
      + '</svg>',
      '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n'
      + '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z"/>\n'
      + '</svg>',
    ],
    navClass: [
      'btn slider-nav__button slider-nav__button_left',
      'btn slider-nav__button slider-nav__button_right',
    ],
    responsive: {
      768: {
        autoWidth: false,
        center: false,
        margin: 0,
        nav: true,
      },
    },
  });
}

$(document).ready(() => {
  Header();
  Input();

  const bodyClass = document.body.classList;
  if (bodyClass.contains('main')) {
    initMain();
  }
});
