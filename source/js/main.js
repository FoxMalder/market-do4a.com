import svg4everybody from "svg4everybody";
svg4everybody();

import mreSlider from './slider';

$(document).ready(function () {


    var $brandsList = $('.brands__list');
    var $starSlider = $('.stars__slider');
    var $bestArticles = $('.best-articles__slider');
    var starSliderInited = false;

    function sliderInit() {
        if ( $(window).width() < 768 && !starSliderInited) {
            starSliderInited = true;
            $starSlider.addClass('owl-carousel');
            $brandsList.addClass('owl-carousel');

            $bestArticles.owlCarousel({
                loop: false,
                items: 1,
                nav: false,
                dots: false,
                // center: true,
                margin: 10,
                autoWidth: true,
                responsive: {
                    768: {
                        center: false,
                        margin: 24,
                    },
                    1240: {
                        autoWidth: false,
                        items: 3,
                    },
                },
            });

            $starSlider.owlCarousel({
                loop: true,
                items: 1,
                nav: false,
                dots: false,
                margin: 10,
                autoWidth: true,
                autoHeight: true,
                center: true,
            });
            $brandsList.owlCarousel({
                loop: false,
                items: 1,
                nav: false,
                dots: false,
                margin: 10,
                autoWidth: true,
                autoHeight: true,
                // center: true,
            });

        } else if ( $(window).width() >= 768 ) {
            $bestArticles.trigger('destroy.owl.carousel');
            $starSlider.trigger('destroy.owl.carousel');
            $brandsList.trigger('destroy.owl.carousel');
            $bestArticles.removeClass('owl-carousel');
            $starSlider.removeClass('owl-carousel');
            $brandsList.removeClass('owl-carousel');
            starSliderInited = false;

            new mreSlider(document.getElementById('best-articles'));
            new mreSlider(document.getElementById('stars-slider'));

        }
    }

    sliderInit();
    $(window).resize(sliderInit);


    $('.header-control__menu-btn').on('click', function () {
        $('.mobile-menu').toggleClass('opened');
    });

    // var $heroSliderLink = $('.hero-slider-control__item');
    //
    // $heroSliderLink.on('click', function () {
    //     $heroSliderLink.removeClass('active');
    //     $(this).addClass('active');
    //
    //     $('.hero-slider__slide').removeClass('active');
    //     $('.hero-slider__slide[data-slide="' + $(this).data('slide') + '"]').addClass('active');
    // });

    $('.hero-slider__sliders').owlCarousel({
        // animateOut: 'slideOutDown',
        // animateIn: 'flipInX',
        animateOut: 'fadeOut',
        loop: true,
        items: 1,
        smartSpeed: 450,
        // autoplay: true,
        // autoplayTimeout: 1000,
    });


    // $('.best-articles__slider').owlCarousel({
    //     loop: false,
    //     items: 1,
    //     nav: false,
    //     dots: false,
    //     // center: true,
    //     margin: 10,
    //     autoWidth: true,
    //     responsive: {
    //         768: {
    //             center: false,
    //             margin: 24,
    //         },
    //         1240: {
    //             autoWidth: false,
    //             items: 3,
    //         },
    //     },
    // });
    $('.set-block__slider').owlCarousel({
        loop: true,
        items: 1,
        center: true,
        autoWidth: true,
        // stagePadding: 10,
        nav: false,
        dots: false,
        margin: 10,
        navContainerClass: 'slider-nav',
        navText: [
            '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M16.5 5.96968L7.5 5.96968L7.5 9.5498L0 5.21968L7.5 0.88955L7.5 4.46968L16.5 4.46968L16.5 5.96968Z"/>\n' +
            '</svg>',
            '<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3.96978L9.5 3.96978L9.5 0.389649L17 4.71978L9.5 9.0499L9.5 5.46978L0.5 5.46978L0.5 3.96978Z"/>\n' +
            '</svg>',
        ],
        navClass: [
            'btn slider-nav__button slider-nav__button_left',
            'btn slider-nav__button slider-nav__button_right',
        ],
        responsive: {
            768: {
                autoWidth: false,
                center: false,
                margin: 0,
                nav: true,
            },
        },
    });
});