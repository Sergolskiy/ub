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

    $('.footer-slider').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        items: 1,
        dots: false,
        smartSpeed: 500,
        thumbs: false,
        autoplay: true
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


    if($(window).width() > 768) {
        $('.product-block__slider').owlCarousel({
            loop: true,
            items: 1,
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item'
        });
    } else {
        $('.product-block__slider').owlCarousel({
            loop: true,
            items: 1,
            thumbs: false,
            dots: true
        });
    }



    $('.mobile-menu-btn, .mobile-menu__close').click(function (e) {
        e.preventDefault();
        $('.mobile-menu').toggleClass('open');
        $('body').toggleClass('hidden');
    });

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

    $('.header__category').click(function () {
        $('.header__category').toggleClass('open');
    });
    $('.block-title__select').click(function () {
        $(this).toggleClass('open');
    });

    $('.header__category-link').click(function () {
        $('.header__category span').html($(this).html());
    });

    $('.to-top, #toUp').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
    });

    $('.header__city-name').click(function (e) {
        e.preventDefault();
        $(this).next().addClass('open');
    });

    $('.cart-popup .popup-city__close').click(function (e) {
        e.preventDefault();
        $('.cart-popup').removeClass('open');
    });

    $('.product-block__buy, .header__cart').click(function (e) {
        e.preventDefault();
        $('.cart-popup').addClass('open');
    });

    $('.mobile-menu__main-link.town').click(function () {
        $('.header__city-name').click();
        $('.header__city').toggle();
    });

    $('.header__profile').click(function (e) {
        e.preventDefault();
        $('.header__profile').nextAll('.popup-personal').addClass('open');
    });

    $('.mobile-menu__main-link.cab').click(function (e) {
        e.preventDefault();
        $('.header__profile').click();
    });

    $('.popup-city__close').click(function () {
        $(this).closest('.popup-city').removeClass('open');
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

    $(document).click(function (e) {
        if($(window).width() > 992){
            if (e.target.closest('.popup-city-n') == undefined && e.target.className != 'header__city-name' && e.target.className != 'mobile-menu__main-link') {
                $('.popup-city-n').removeClass('open');
            }
            if (e.target.closest('.popup-personal') == undefined && e.target.className != 'header__profile' && e.target.className != 'header__sign-in-link') {
                $('.popup-personal').removeClass('open');
            }
        }

        if (e.target.className == 'seller-letter open') {
            $('.seller-letter').removeClass('open');
        }

        if (e.target.className == 'cart-popup open') {
            $('.cart-popup').removeClass('open');
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


    $(document).keyup(function (e) {
        if (e.which == 27) {
            $('.popup-city-n').removeClass('open');
            $('.popup-personal').removeClass('open');
            $('.placement-overlay').hide();
        }
    });

    $('.header__menu-link--rozm').click(function () {
        $('.placement-overlay').show();
    });
    $('.cancel.f-right, .save.f-right').click(function () {
        $('.placement-overlay').hide();
    });

    var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    if (mac) {
        $('body').addClass('ios');
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

    $('.catalog__view-btn--toggle').click(function () {
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


    $(window).scroll(function () {
        if($(this)[0].pageYOffset > 900){
            $('#toUp').addClass('show');
        } else {
            $('#toUp').removeClass('show');
        }


        if($(this)[0].pageYOffset > 200){
            $('.product-fixed').addClass('open');
        } else {
            $('.product-fixed').removeClass('open');
        }
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

    $('.clear-search').click(function () {
         $('.header__search-input').val('');
    });

    $('.popup-city__title').click(function () {
        $('.popup-city__title').removeClass('active');
        $(this).addClass('active');

        $('.reg-content').removeClass('open');
        $('.reg-content').eq($(this).index()).addClass('open');
    });

});