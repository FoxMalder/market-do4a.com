$(function () {
    var Auth = {
        init: function init() {
            $('.header-login-trigger, [data-action="showAuthForm"]').on('click', this.showPopup.bind(this));
            $('[data-action="showRegForm"]').on('click', this.showRegPopup.bind(this));
        },

        showPopup: function showPopup(e) {
            e.preventDefault();

            $.fancybox.open($('#authPopup'), {
                afterShow: this.authFormBind.bind(this)
            });
        },

        authFormBind: function authFormBind() {
            $('#sign-in form').off('submit').on('submit', this.submit.bind(this));
            // $('#authPopup .auth-popup__register').on('click', this.showRegPopup.bind(this));
        },

        regFormBind: function regFormBind() {
            $('#registrations form').off('submit').on('submit', this.regFormSubmit.bind(this));
        },

        submit: function submit(e) {
            var formData;
            e.preventDefault();

            formData = $(e.currentTarget).serializeArray();
            formData.push({name: 'authAjax', value: 'Y'});

            $.ajax({
                url: $(e.currentTarget).attr('action'),
                type: 'post',
                dataType: 'json',
                data: formData,
                success: function (data) {
                    if (data.status == 'ok') {
                        document.location.href = document.location.href;
                    } else {
                        var $el = $('.fancybox-inner #sign-in');
                        $el.find('.auth-popup__error').html(data.error).toggleClass('hidden', false);

                        if (data.captcha != undefined) {
                            $row = $el.find('.auth-popup__captcha-row');
                            $row.find('input[name="captcha_sid"]').val(data.captcha);
                            $row.find('img.auth-popup__captcha-image').attr('src', $row.find('img.auth-popup__captcha-image').attr('data-src') + data.captcha);
                            $row.toggleClass('hidden');
                        }
                        //$.colorbox.resize();
                    }
                },
                fail: function () {
                    alert('Что-то пошло не так. Попробуйте ещё раз');
                }
            });
        },

        showRegPopup: function showRegPopup(e) {
            e.preventDefault();

            $.fancybox.open($('#regPopup'), {
                afterShow: this.regFormBind.bind(this),
                beforeClose: function () {
                    if (this.reloadAfterClose) {
                        document.location = document.location.href;
                    }
                }.bind(this)
            });
        }
        ,

        regFormSubmit: function regFormSubmit(e) {
            var formData;
            e.preventDefault();

            formData = $(e.currentTarget).serializeArray();
            formData.push({name: 'authAjax', value: 'Y'});

            $.ajax({
                url: $(e.currentTarget).attr('action'),
                type: 'post',
                dataType: 'json',
                data: formData,
                success: function (data) {
                    if (data.status == 'ok') {
                        this.reloadAfterClose = true;
                        $('.fancybox-inner #registrations').html('<div class="auth-popup__success-register">Вы успешно зарегистрированы!<br/><a href="' + document.location.href + '">Продолжить...</a></div>');
                    } else {
                        var $el = $('.fancybox-inner #registrations');
                        $el.find('.auth-popup__error').html(data.error).toggleClass('hidden', false);
                    }
                },
                fail: function () {
                    alert('Что-то пошло не так. Попробуйте ещё раз');
                }
            });
        },
    };

    Auth.authFormBind();
    Auth.regFormBind();
});