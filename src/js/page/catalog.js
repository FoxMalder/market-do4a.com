import noUiSlider from 'nouislider';
import SimpleBar from 'simplebar';

import StickySidebar from '../plugins/sticky-sidebar';
import Utils from '../utils/utils';


class ProductList {
  constructor() {
    this.init();
  }

  init() {
    $(document)
      .on('click.product.favorites', '[data-product-toggle]', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const productId = $(event.currentTarget).parents('.product-card').data('product-id');
        const toggle = $(event.currentTarget).data('product-toggle');

        this.toggleFavorites(productId, toggle);
      });
  }

  toggleFavorites = (productId, toggle) => {
    const $productCard = $(`[data-product-id="${productId}"]`);

    if (!productId || !$productCard.length) {
      return;
    }

    if (toggle === 'add-favorites') {
      if ($productCard.hasClass('added')) {
        $productCard.removeClass('added');
        $productCard.find('[data-product-toggle="add-favorites"]').removeClass('active');
        ProductList.removeFromFavoritesAPI(productId);
      } else {
        $productCard.addClass('added');
        $productCard.find('[data-product-toggle="add-favorites"]').addClass('active');
        ProductList.addToFavoritesAPI(productId);
      }
    }

    if (toggle === 'remove-favorites') {
      if ($productCard.hasClass('removed')) {
        $productCard.removeClass('removed');
        $productCard.find('[data-product-toggle="remove-favorites"]').addClass('active');
        ProductList.removeFromFavoritesAPI(productId);
      } else {
        $productCard.addClass('removed');
        $productCard.find('[data-product-toggle="remove-favorites"]').removeClass('active');
        ProductList.addToFavoritesAPI(productId);
      }
    }
  };

  static addToFavoritesAPI(productId) {
    console.log(productId);
  }

  static removeFromFavoritesAPI(productId) {
    console.log(productId);
  }
}

class Multifilter {
  constructor(el, options) {
    if (!el) return;

    this.el = el;
    this.options = {
      search: options.search || false,
      type: 'checkbox', // 'radio', 'price'
    };
  }
}

function initFilterSearch() {
  Array.prototype.forEach.call(document.querySelectorAll('.js-filter-search'), (el) => {
    const searchField = el.querySelector('.js-filter-search__input');
    const searchList = el.querySelectorAll('.js-filter-search__item');

    searchField.addEventListener('keyup', (event) => {
      const searchText = event.target.value.trim().toLowerCase();

      if (searchText.length) {
        Array.prototype.forEach.call(searchList, (el) => {
          if (el.getAttribute('data-filter-search').toLowerCase().indexOf(searchText) !== -1) {
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
        });
      } else {
        Array.prototype.forEach.call(searchList, (el) => {
          el.style.display = '';
        });
      }
    });
    searchField.addEventListener('change', () => 0);
  });
}

$(() => {
  /**
   * Set appropriate spanning to any masonry item
   *
   * Get different properties we already set for the masonry, calculate
   * height or spanning for any cell of the masonry grid based on its
   * content-wrapper's height, the (row) gap of the grid, and the size
   * of the implicit row tracks.
   *
   * @param item Object A brick/tile/cell inside the masonry
   * @link https://w3bits.com/css-grid-masonry/
   */
  function resizeMasonryItem(item) {
    /* Get the grid object, its row-gap, and the size of its implicit rows */
    const grid = document.getElementsByClassName('brand-name-list')[0];
    if (grid) {
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

      /*
       * Spanning for any brick = S
       * Grid's row-gap = G
       * Size of grid's implicitly create row-track = R
       * Height of item content = H
       * Net height of the item = H1 = H + G
       * Net height of the implicit row-track = T = G + R
       * S = H1 / T
       */
      const rowSpan = Math.ceil((item.querySelector('.brand-name-list__content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

      /* Set the spanning as calculated above (S) */
      item.style.gridRowEnd = `span ${rowSpan}`;
    }
  }

  /**
   * Apply spanning to all the masonry items
   *
   * Loop through all the items and apply the spanning to them using
   * `resizeMasonryItem()` function.
   *
   * @uses resizeMasonryItem
   * @link https://w3bits.com/css-grid-masonry/
   */
  function resizeAllMasonryItems() {
    // Get all item class objects in one list
    const allItems = document.querySelectorAll('.brand-name-list__col');

    /*
     * Loop through the above list and execute the spanning function to
     * each list-item (i.e. each masonry item)
     */
    if (allItems) {
      for (let i = 0; i > allItems.length; i++) {
        resizeMasonryItem(allItems[i]);
      }
    }
  }

  /* Resize all the grid items on the load and resize events */
  const masonryEvents = ['load', 'resize'];
  masonryEvents.forEach((event) => {
    window.addEventListener(event, resizeAllMasonryItems);
  });

  $('body').scrollspy({ target: '.card-list__nav' });

  new StickySidebar('.card-list__nav', {
    topSpacing: document.querySelector('.h-navbar-fixed').offsetHeight + 10,
  });


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

  app.ProductList = new ProductList();

  // new SimpleBar(document.getElementById('myElement'));
  Array.prototype.forEach.call(document.querySelectorAll('.multifilter > .dropdown-menu'), el => new SimpleBar(el, {
    autoHide: false,
  }));

  initFilterSearch();


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
