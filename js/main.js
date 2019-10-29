$(document).ready(function () {
    $('.home-slider__items').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        dots: true,
        thumbs: false,
        smartSpeed: 500
    });
    $('.catalog-services__slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        items: 1,
        dots: true,
        thumbs: false,
        smartSpeed: 500
    });



    $('.advertisement__items').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        items: 2,
        dots: true,
        smartSpeed: 500,
        thumbs: false,
        responsive: {
            0: {
                items: 1,
            },
            540: {
                items: 2,
            },
            800: {
                items: 3,
            },
            1050: {
                items: 2,
            }
        }
    });

    if ($(window).width() < 720) {
        $('.catalog-services__mobile').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            items: 1,
            dots: true,
            thumbs: false,
            smartSpeed: 500
        });
    }
    if ($(window).width() < 1150) {
        $('.product-slider__inner').owlCarousel({
            loop: true,
            // margin: 15,
            nav: true,
            items: 5,
            dots: false,
            autoHeight:false,
            smartSpeed: 500,
            thumbs: false,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                    margin: 15,
                },
                // breakpoint from 480 up
                520: {
                    items: 3,
                },
                // breakpoint from 768 up
                768: {
                    items: 4,
                },
                930: {
                    items: 5,
                    margin: 0,
                }
            }
        });
    }

    $('.product-bottom .product-slider__inner').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        items: 5,
        dots: false,
        autoHeight:false,
        smartSpeed: 500,
        thumbs: false,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: 2,
            },
            // breakpoint from 480 up
            520: {
                items: 3,
            },
            // breakpoint from 768 up
            768: {
                items: 4,
            },
            930: {
                items: 4,
                margin: 45,
            }
        }
    });

    $.extend($.validator.messages, {
        required: "Обов'язкове поле",
        email: "Введіть валідний email",
    });

    $(".form-validate").validate();


    // catalog-bar__items

    $('.catalog-bar__tabs-item').click(function (e) {
        e.preventDefault();
        $('.catalog-bar__tabs-item').removeClass('catalog-bar__tabs-item--active');
        $(this).addClass('catalog-bar__tabs-item--active');
        console.log($('.catalog-bar__items').width());
        console.log($(this).index());
        $('.catalog-bar .catalog-bar__items').first().css('margin-left', '-' + $('.catalog-bar__items').width() * $(this).index() + 'px');
    });

    $('.mobile-catalog').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $('.catalog-bar').slideToggle();
        $('.filter').slideToggle();
        $('.search-category').slideToggle();
    });


    $('.block-title__select').click(function () {
        $(this).toggleClass('open');
    });







    $('.product-block__buy, .header__cart').click(function (e) {
        e.preventDefault();
        $('.cart-popup').addClass('open');
    });



    $('.filter__toggle').click(function () {
         $(this).toggleClass('close');
         $(this).next().slideToggle();
    });

    $('.open-reg-social').click(function () {
         $('.register-social').slideToggle();
    });

    $('.product-tabs__h-item').click(function () {
         $('.product-tabs__h-item').removeClass('active');
         $(this).addClass('active');

         $('.product-tabs__content').hide();
         $('.product-tabs__content').eq($(this).index()).show();

    });

    var flagPhone = true;

    $('.product-fixed__phone').click(function (e) {
        if(flagPhone){
            e.preventDefault();
            $(this).find('span').toggleClass('show');
            flagPhone = false;
        }
    });

    

    if($(window).width() > 992){
        $('.catalog-bar__content').hover(function () {
            if($(this).find('.catalog-bar__undercategory').length > 0){
                console.log(123);
                $('.main').addClass('open-menu');
                $('.catalog-bar').addClass('open');
            }
        }, function () {
            $('.main').removeClass('open-menu');
            $('.catalog-bar').removeClass('open');
        });
    }


    




    $('.product__like').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('product__like--active')
    });

    $('.product-fixed__like').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('product-fixed__like--active')
    });

    $('.action-viewed').click(function (e) {
        e.preventDefault();
        $(this).addClass('add');
    });

    $('.product__buy').click(function (e) {
        e.preventDefault();
        alert('action code in JS');
    });

    $('.catalog__view-btn--toggle').click(function (e) {
        e.preventDefault();
         $(this).next().toggleClass('open');
    });

    $('.catalog__view-list').click(function () {
         $(this).toggleClass('open');
    });

    $('.product-block__question').click(function () {
         $('.seller-letter').addClass('open');
         // $('.seller-letter .popup-city').addClass('open');
    });
    $('.seller-letter .popup-city__close').click(function () {
         $('.seller-letter').removeClass('open');
    });

    $('.filter-button-open').click(function () {
        $('.filter--fixed-wrap').addClass('open');
        $('body').addClass('hidden');
    });

    $('.filter--fixed-close').click(function () {
        $('.filter--fixed-wrap').removeClass('open');
        $('body').removeClass('hidden');
    });

    $('.filter--fixed-clear').click(function () {
        $('.filter__checkbox input[type=checkbox]').prop('checked',false);
        $('.filter__price-field').val('');
    });

    $('.filter__price-field').keydown(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) {
            e.preventDefault();
            return;
        }
    });

    if($( "#slider-range-max").length > 0) {
        $( function() {
            var min = parseInt($('.filter__min-num').html().replace(/\s/g, ''));
            var max = parseInt($('.filter__max-num').html().replace(/\s/g, ''));
            var handle = $( ".ui-slider-handle" );
            $( "#slider-range-max" ).slider({
                min: min,
                max: max,
                value: max,
                range: "max",
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.attr('data-val', ui.value );
                }
            });
        } );
    }


    $('.register-field__show-pass').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        if($(this).prev().attr('type') == 'text'){
            $(this).prev().attr('type', 'password');
        } else {
            $(this).prev().attr('type', 'text');
        }

    });

    $('.reviews-full__textarea').keyup(function (e) {
        var length = $(this).val().length;
        console.log(length);
        var maxLength = parseInt($('.reviews-full__textarea-num').data('length'));

    });




    $('.product-block__count-plus').click(function (e) {
        e.preventDefault();
        var count = parseInt($(this).parent().find('.product-block__count-i').html());
        count = count + 1;
        $(this).parent().find('.product-block__count-i').html(count);
    });

    $('.product-block__count-minus').click(function (e) {
        e.preventDefault();
        var count = parseInt($(this).parent().find('.product-block__count-i').html());
        if(count <= 1){
            return;
        }
        count = count - 1;
        $(this).parent().find('.product-block__count-i').html(count);
    });

    $('.product-mobile__seller-more, .characteristic-more').click(function (e) {
        e.preventDefault();
        $(this).prev().addClass('open');
        $(this).hide();
    });

    $('.hide-num').click(function (e) {
        if($(this).hasClass('hide-num'))
            e.preventDefault();
        $(this).removeClass('hide-num');
    });

    $('.popup-city__title').click(function () {
        $('.popup-city__title').removeClass('active');
        $(this).addClass('active');

        $('.reg-content').removeClass('open');
        $('.reg-content').eq($(this).index()).addClass('open');
    });


    $('.rait').hover(function(){
        var index = $(this).index();
        $('.rait').each(function(i){
            if(i <= index){
                $(this).addClass('active-hover');
            } else {
                $(this).addClass('no-active-hover');
            }
        });

    }, function(){
        $('.rait').removeClass('active-hover');
        $('.rait').removeClass('no-active-hover');
    });

    $('.rait').click(function(){
        var index = $(this).index();
        $('.rait').removeClass('active');
        $('.rait').each(function(i){
            if(i <= index){
                $(this).addClass('active');
            }
        });
    });



});

if($(document).find('html').attr('lang') == 'ru'){
    window.MagicZoom.optionCustomRu();
}
if($(document).find('html').attr('lang') == 'en'){
    window.MagicZoom.optionCustomEn();
}
if($(document).find('html').attr('lang') == 'ua'){
    window.MagicZoom.optionCustomUa();
}
