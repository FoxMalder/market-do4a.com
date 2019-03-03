$(document).ready(function () {
    $('.article-preview').owlCarousel({
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
});