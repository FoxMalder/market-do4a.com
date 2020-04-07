import { Lazy, Mousewheel, Navigation, Pagination, Scrollbar, Swiper, Virtual } from 'swiper/js/swiper.esm';



Swiper.use([Navigation, Scrollbar, Mousewheel, Lazy]);
export default async function initHeroSlider(selector) {
  const sliderEl = document.querySelector(selector);

  if (!sliderEl) {
    return;
  }

  if (sliderEl.querySelectorAll('.slider__slide').length < 2) {
    [].forEach.call(sliderEl.querySelectorAll('.swiper-lazy'), (lazyImage) => {
      lazyImage.classList.remove('swiper-lazy');
      lazyImage.classList.add('lazyload');
    });

    return;
  }

  sliderEl.classList.add('slider');

  const {
    default: HeaderSlider,
  } = await import('@/modules/HeaderSlider');

  Swiper.use([Pagination, HeaderSlider, Virtual]);

  const slider = new Swiper(sliderEl, {
    init: false,
    touchEventsTarget: 'wrapper',
    effect: 'hero-slider',

    // watchSlidesVisibility: true,
    lazy: {
      loadPrevNext: true,
    },

    containerModifierClass: 'slider_',
    slideClass: 'slider__slide',
    slideBlankClass: 'slider__slide_invisible-blank',
    slideActiveClass: 'slider__slide_active',
    slideDuplicateActiveClass: 'slider__slide_duplicate-active',
    slideVisibleClass: 'slider__slide_visible',
    slideDuplicateClass: 'slider__slide_duplicate',
    slideNextClass: 'slider__slide_next',
    slideDuplicateNextClass: 'slider__slide_duplicate-next',
    slidePrevClass: 'slider__slide_prev',
    slideDuplicatePrevClass: 'slider__slide_duplicate-prev',
    wrapperClass: 'slider__wrapper',

    pagination: {
      el: '.hero-slider-control',
      clickable: true,
      bulletClass: 'hero-slider-control__item',
      bulletActiveClass: 'active',

      renderBullet(index, className) {
        return `
            <div class="${className}">
              <div class="hero-slider-control__title">${this.slides[index].querySelector('.hero-slider__title').textContent}</div>
              <div class="hero-slider-control__loader">
                <div class="hero-slider-control__loader-line"></div>
              </div>
            </div>`;
      },
    },
  });
  slider.pagination.render();
  slider.init();
}
