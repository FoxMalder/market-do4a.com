import noUiSlider from 'nouislider';
import Utils from '../utils/utils';


$(() => {
  Utils.parseTargets('.input-range').map(item => noUiSlider.create(item, {
    start: [3000, 7000],
    step: 10,
    connect: true,
    tooltips: true,
    range: {
      min: 50,
      max: 10000,
    },
    format: {
      to(value) {
        return `${Math.floor(value)} ₽`;
      },
      from(value) {
        return value.replace(' ₽', '');
      },
    },
    cssPrefix: 'input-range',
    cssClasses: {
      target: '',
      base: '__base',
      origin: '__origin',
      handle: '__handle',
      handleLower: '__handle-lower',
      handleUpper: '__handle-upper',
      touchArea: '__touch-area',
      horizontal: '_horizontal',
      vertical: '_vertical',
      background: '__background',
      connect: '__connect',
      connects: '__connects',
      ltr: '_ltr',
      rtl: '_rtl',
      draggable: '_draggable',
      drag: '_state-drag',
      tap: '_state-tap',
      active: '__active',
      tooltip: '__tooltip',

      // Шкала
      pips: '__pips',
      pipsHorizontal: '__pips_horizontal',
      pipsVertical: '__pips_vertical',

      // Деления на шкале
      marker: '__marker',
      markerHorizontal: '__marker_horizontal',
      markerVertical: '__marker_vertical',
      markerNormal: '__marker_normal',
      markerLarge: '__marker_large',
      markerSub: '__marker_sub',

      // Значения на шкале
      value: '__value',
      valueHorizontal: '__value_horizontal',
      valueVertical: '__value_vertical',
      valueNormal: '__value_normal',
      valueLarge: '__value_large',
      valueSub: '__value_sub',
    },
  }));

  $(document).on('scroll', (event) => {
    $('.catalog-menu-mob.active').css('top', `${Math.max(app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
  });

  $(document)
    .on('click.filter.menu', '[data-toggle="m-filter"]', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $this = $(event.currentTarget);
      const selector = $this.data('target');

      const $target = selector ? $(selector) : $this.siblings('.catalog-menu-mob');

      $target.addClass('active');
      $target.css('top', `${Math.max(app.Header.header.fixedOffset - window.pageYOffset, 0)}px`);
      $('body').css('overflow', 'hidden');
    })
    .on('click.filter.close', '.catalog-menu-mob__btn-back, .catalog-menu-mob__btn-close', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const $this = $(event.currentTarget);
      const $target = $this.parents('.catalog-menu-mob').eq(0);

      $target.removeClass('active');

      if ($('.filter-menu-m.active').length === 0) {
        $('body').css('overflow', '');
      }
    });
// $(document)
//   .on('click.filter.menu', '[data-toggle="filter-menu"]', (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//
//     const $this = $(event.currentTarget);
//     const selector = $this.data('target');
//     const $target = selector ? $(selector) : $this.parent().children('.filter-menu-m');
//
//     $target.toggleClass('active');
//   })
//   .on('click.filter.menu', '.filter-menu-m-close', (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//
//     const $this = $(event.currentTarget);
//     const $target = $this.parents('.filter-menu-m');
//     $target.removeClass('active');
//   });
});
