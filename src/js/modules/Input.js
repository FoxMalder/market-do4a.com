export default function Input() {
  const $input = $('.input-field__input');

  $input.each(function() {
    if ($(this).val() !== '') {
      $(this).parent().addClass('active');
    }
  });

  $input.on('focus', function() {
    $(this).parent().addClass('active');
  });

  $input.on('blur', function() {
    if ($(this).val() === '') {
      $(this).parent().removeClass('active');
    }
  });
}