import enableInlineVideo from 'iphone-inline-video';
import ready from 'domready';
import AOS from 'aos';
import $$ from 'dom7';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/collapse';


import 'aos/dist/aos.css';
import './scss/franchise.scss';


import Parallax from '@/modules/Parallax';
import MainPage from '@/page/main';
import { handleForm } from '@/modules/Form';


function initVideo() {
  try {
    const video = document.querySelector('video');
    enableInlineVideo(video, {
      iPad: true,
    });
  } catch (e) {
    console.error(e);
  }
}

function initProgramList() {
  const programListEl = document.querySelector('.f-section-partnership__list');
  if (!programListEl) return;

  const programTabsEl = document.querySelectorAll('.f-section-partnership__tab-link');
  const programItemsEl = programListEl.querySelectorAll('.f-section-partnership__col');

  let lastActiveIndex = 0;

  try {
    programListEl.addEventListener('scroll', () => {
      const newActiveIndex = [].reduce.call(programItemsEl, (index, item) => {
        if (item.getBoundingClientRect().left < programListEl.offsetWidth / 2) {
          index += 1;
        }
        return index;
      }, -1);

      if (newActiveIndex !== lastActiveIndex) {
        [].forEach.call(programTabsEl, (item, index) => {
          index === newActiveIndex ? item.classList.add('active') : item.classList.remove('active');
        });
        lastActiveIndex = newActiveIndex;
      }
    });
  } catch (e) {
    console.error(e);
  }

  $('.f-section-partnership__tab-link').on('click', (event) => {
    event.preventDefault();
    const $this = $(event.currentTarget);
    const $target = $(event.currentTarget.getAttribute('href'));

    $('.f-section-partnership__tab-link').removeClass('active');
    $this.addClass('active');

    $(programListEl).animate({
      scrollLeft: Math.min(
        (programListEl.scrollWidth - programListEl.offsetWidth),
        (programListEl.scrollLeft + $target.position().left - $('.f-section-partnership__title').offset().left),
      ),
    });
  });


  $('.f-program-item[data-fancybox]').fancybox({
    afterLoad(instance, slide) {
      slide.$content
        .find('.f-modal-target')
        .append('<div class="f-program-item"></div>')
        .children()
        .append(slide.opts.$orig.children().clone());
      slide.$content
        .find('input#js-ask-more-info')
        .val(slide.opts.$orig.data('js-ask-more-info') || '');
    },
    afterClose(instance, slide) {
      slide.$content.find('.f-modal-target').empty();
      slide.$content.find('input#js-ask-more-info').val('');
    },
  });

  $('.f-program-item__button[data-fancybox]').fancybox({
    afterLoad(instance, slide) {
      slide.$content
        .find('.f-modal-target')
        .append('<div class="f-program-item"></div>')
        .children()
        .append(slide.opts.$orig.parents('.f-program-item').children().clone());
      slide.$content
        .find('input#js-ask-more-info')
        .val(slide.opts.$orig.data('js-ask-more-info') || '');
    },
    afterClose(instance, slide) {
      slide.$content.find('.f-modal-target').empty();
      slide.$content.find('input#js-ask-more-info').val('');
    },
  });
}


ready(() => {
  AOS.init({
    duration: 500,
    easing: 'ease-in-out',
    once: true,
  });

  initVideo();
  initProgramList();

  $$('.form-body').parents('form').on('submit', handleForm);

  const $top30TargetRow = $('.f-top30__row').eq(29);

  document.addEventListener('aos:in:top30', ({ detail }) => {
    const $block = $(detail).find('.f-top30');
    setTimeout(() => {
      $block.animate({
        scrollTop: $top30TargetRow.position().top - $block.height() / 2,
      }, 2000, 'swing', () => {
        $top30TargetRow.addClass('active');
      });
    }, 200);
  });

  $('.f-section-hero').addClass('animate');

  [].forEach.call(document.querySelectorAll('.f-horizontal-gallery__wrapper'), (el) => {
    Parallax.add(el, {
      y: 0,
      x: -0.2,
    });
  });

  if (document.documentElement.clientWidth >= 768) {
    Parallax.add(document.querySelector('.f-section-video__title'), {
      y: -0.08,
      x: 0,
    });
  }

  MainPage.initStarSlider('#stars-slider', '.f-section-stars__description');
});
