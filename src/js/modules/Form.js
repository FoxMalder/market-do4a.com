import axios from 'axios';
import $$ from 'dom7';


/**
 * Отправка формы
 * @param url {String}
 * @param formData {FormData}
 * @returns {Promise<T>}
 */
export function sendForm(url, formData) {
  if (global.demo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  return axios.post(url, formData)
    .then((response) => response.data)
    .then((response) => {
      if (response.success === 1) {
        return response.data;
      }
      const error = new Error(response.message);
      error.response = response;
      throw error;
    });
}


/**
 * Обработчик отправки формы
 * @param event {Event}
 */
export function handleForm(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const $body = $$(form).find('.form-body');
  const $button = $$(form).find('[type="submit"]');

  $body.addClass('form-body_loading');
  $button.attr('disabled', 'true');

  sendForm(form.action, new FormData(form))
    .then(() => {
      $body
        .removeClass('form-body_loading')
        .addClass('form-body_success');

      $button
        .removeClass('btn-red')
        .addClass('btn-green')
        .html(`<i class="btn-icon icon icon-done"></i> ${$button.data('success') || 'Заявка отправлена'}`);
    })
    .catch(() => {
      $body
        .removeClass('form-body_loading')
        .addClass('form-body_error');

      setTimeout(() => {
        $body.removeClass('form-body_error');
        $button.removeAttr('disabled');
      }, 2000);
    });
}
