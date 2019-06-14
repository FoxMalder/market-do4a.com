import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tooltip';


/**
 * Инициализирует компонент переключения (выбор вкуса)
 */
function initProductSelect() {
  function update(el) {
    const selectedEL = el.querySelector('input:checked');

    if (!selectedEL) {
      return;
    }
    el.querySelector('.p-control-select__header-label').innerHTML = selectedEL.parentElement.querySelector('.p-control-select__value').innerHTML;
    el.querySelector('.p-control-select__header-availability').innerHTML = selectedEL.parentElement.querySelector('.p-control-select__availability').innerHTML;
  }


  [...document.querySelectorAll('.p-control-select')].forEach((item) => {
    item.addEventListener('change', () => {
      update(item);
    });
    update(item);
  });
}

/**
 * Инициализирует компонент выбора количества
 */
function initProductCounter() {
  function update(input, command) {
    const val = parseInt(input.value, 10);
    if (command === 'UP') {
      input.value = val + 1;
    } else if (command === 'DOWN') {
      input.value = Math.max(0, val - 1);
    }
  }

  [...document.querySelectorAll('.p-control-counter')].forEach((item) => {
    const input = item.querySelector('.p-control-counter__input');

    item.querySelector('.p-control-counter__plus').addEventListener('click', () => {
      update(input, 'UP');
    });
    item.querySelector('.p-control-counter__minus').addEventListener('click', () => {
      update(input, 'DOWN');
    });
  });
}

function initCartButton() {
  const buttonEl = document.querySelector('.p-control-fixed__add-to-cart');

  if (!buttonEl) {
    return;
  }

  function addToCart() {
    buttonEl.classList.toggle('added');
  }

  buttonEl.addEventListener('click', () => {
    addToCart();
  });

}

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
  $('.p-control-select__header').dropdown({
    display: 'static',
  });

  initProductSelect();
  initProductCounter();
  initCartButton();
});
