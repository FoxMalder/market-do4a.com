import './scss/main.scss';

import './js/common';
// import Masonry from 'masonry-layout';
import Macy from 'macy';
import StickySidebar from './js/plugins/sticky-sidebar';
import { CheckboxFilter } from './js/components/Multifilter';
// import './js/page/catalog';


if (process.env.NODE_ENV !== 'production') {
  require('./vendors.pug');
}

function initVendorsFilter() {
  const searchField = document.querySelector('.page-header .search-fild__input');
  const vendorsList = Array.from(document.querySelectorAll('.vendor-card'), item => ({
    el: item,
    shown: true,
    name: item.querySelector('.vendor-card__title').innerHTML.toLowerCase(),
    category: item.getAttribute('data-sections-id').split(','),
  }));

  const filterValues = {
    search: searchField.value || '',
    category: [],
  };

  /**
   * Фильтрация по категории и строке поиска
   * @param values
   */
  function filterItems(values = filterValues) {
    vendorsList.forEach((item) => {
      if (
        (item.name.indexOf(values.search) !== -1 || values.search.length === 0)
        && (item.category.filter(id => (values.category.indexOf(id) !== -1)).length > 0 || values.category.length === 0)
      ) {
        item.el.style.display = '';
      } else {
        item.el.style.display = 'none';
      }
    });
  }

  function onSearch(event) {
    event.preventDefault();

    filterValues.search = event.target.value.trim().toLowerCase();
    filterItems(filterValues);
  }
  searchField.addEventListener('input', onSearch);
  searchField.addEventListener('change', onSearch);


  new CheckboxFilter(document.querySelector('fieldset.multifilter'), (filter) => {
    filterValues.category = filter.data.value;
    filterItems(filterValues);
  });
}


function initVendorsList() {
  const masonryEl = document.querySelector('.brand-name-list');
  masonryEl.macy = Macy({
    container: masonryEl,
    trueOrder: false,
    useOwnImageLoader: true,
    // margin: 24,
    mobileFirst: true,
    columns: 2,
    breakAt: {
      1240: 6,
      768: 4,
    },
  });
  $('.multifilter__tab').on('shown.bs.tab', () => {
    masonryEl.macy.recalculate();
  });



  $('body').scrollspy({ target: '.card-list__nav' });

  const StickyNav = document.querySelector('.card-list__nav');
  if (StickyNav) {
    new StickySidebar(StickyNav, {
      topSpacing: document.querySelector('.h-navbar-fixed').offsetHeight + 10,
    });
  }
}

$(() => {
  initVendorsList();
  initVendorsFilter();
});
