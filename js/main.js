$(document).ready(function () {
    $('.best-articles__slider').owlCarousel({
        loop: false,
        items: 1,
        nav: false,
        dots: false,
        margin: 10,
        responsive: {
            768: {
                autoWidth: true,
                margin: 24,
            },
            1240: {
                autoWidth: false,
                items: 3,
            },
        },
    });
    $('.set-block__slider').owlCarousel({
        loop: true,
        items: 1,
        center: true,
        autoWidth: true,
        // stagePadding: 10,
        nav: false,
        dots: false,
        margin: 10,
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