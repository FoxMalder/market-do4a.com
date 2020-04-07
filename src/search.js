import ready from 'domready';


import App from '@/App';

import CatalogControl from '@/page/catalog';
import { initCategorySlider } from '@/components/sliders';


ready(() => {
  App.init();

  App.components.catalog = new CatalogControl({
    filter: document.querySelector('.filter'),
    sorting: document.querySelector('.sorting'),
    quantity: document.querySelector('[data-total-find]'),
    form: document.getElementById('catalog-filter'),
  }, {
    ajax: true,
  });

  if (document.documentElement.clientWidth >= 1240) {
    initCategorySlider();
  }
});
