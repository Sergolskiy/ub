


$(document).ready(function () {
    $('.home-slider__items').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:1,
        dots: true,
        smartSpeed: 500
    });
    $('.catalog-services__slider').owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        items:1,
        dots: true,
        smartSpeed: 500
    });
    $('.advertisement__items').owlCarousel({
        loop:true,
        margin:15,
        nav:true,
        items:2,
        dots: true,
        smartSpeed: 500
    });

    $('.mobile-menu-btn').click(function (e) {
        e.preventDefault();
         $('.header__menu-items').toggleClass('open');
    });

    // catalog-bar__items

    $('.catalog-bar__tabs-item').click(function (e) {
        e.preventDefault();
        $('.catalog-bar__tabs-item').removeClass('catalog-bar__tabs-item--active');
         $(this).addClass('catalog-bar__tabs-item--active');
         console.log($('.catalog-bar__items').width());
         console.log($(this).index());
         $('.catalog-bar__items').css('transform', 'translateX(-'+  $('.catalog-bar__items').width() * $(this).index() +'px)');
    });

    $('.mobile-catalog').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
         $('.catalog-bar').slideToggle();
    });

    $('.header__category').click(function () {
        $('.header__category').toggleClass('open');
    });

    $('.header__category-link').click(function () {
        $('.header__category span').html( $(this).html());
    })
});