// import ready from 'domready';
// console.log('simple.js');

import 'simplebar';

import '@/fancybox';
import '@/modules/Input';
import '@/modules/system.auth.form';

import './scss/main.scss';

// import '@/common';
import '@/App';
// import App from '@/App';

// $(function () {
//     $('form.js-form').submit(function (e) {
//         e.preventDefault();
//         let $form = $(this);
//         let actionUrl = $form.attr('action');
//         let $errorBlock = $form.find('.js-error-text');
//         let $successBlock = $form.find('.js-success-text');

//         $errorBlock.html('');
//         $successBlock.html('');

//         data = {
//             type: "POST",
//             dataType: "json",
//             url: actionUrl,
//             data: $form.serializeArray(),
//             success: function (data) {
//                 if (data.success) {
//                     $successBlock.html(data.message);
//                 } else {
//                     $errorBlock.html(data.message);
//                 }
//             }
//         };

//         $.ajax(data);
//         return false;
//     })
// });
//
// ready(() => {
//   global.App = App;
//   global.App.init();
// });


console.log(module, module.hot);
console.log('process:', process);
