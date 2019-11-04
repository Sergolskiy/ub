$(document).ready(function () {

    $('.mobile-menu-btn, .mobile-menu__close').click(function (e) {
        e.preventDefault();
        $('.mobile-menu').toggleClass('open');
        $('body').toggleClass('hidden');
    });


    $('.header__category').click(function () {
        $('.header__category').toggleClass('open');
    });

    $('.header__category-link').click(function () {
        $('.header__category span').html($(this).html());
    });

    $('.header__city-name').click(function (e) {
        e.preventDefault();
        $(this).next().addClass('open');
    });
    
    $('.cart-popup .popup-city__close').click(function (e) {
        e.preventDefault();
        $('.cart-popup').removeClass('open');
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

        if (e.target.closest('.header-t-catalog-wrap') == undefined) {
            $('.header-t-catalog').hide();
            $('.header-t-catalog-first').removeClass('open');
        }

    });
    
    $(document).keyup(function (e) {
        if (e.which == 27) {
            $('.popup-city-n').removeClass('open');
            $('.popup-personal').removeClass('open');
            $('.placement-overlay').hide();
            $('.header-t-catalog').hide();
            $('.header-t-catalog-first').removeClass('open');
        }
    });

    $('.header__menu-link--rozm').click(function () {
        $('.placement-overlay').show();
    });

    var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    if (mac) {
        $('body').addClass('ios');
    }
    
    $('.cancel.f-right, .save.f-right').click(function () {
        $('.placement-overlay').hide();
    });

    $('.clear-search').click(function () {
        $('.header__search-input').val('');
    });


    $('.header-t-catalog-first .header-t-catalog__item').hover(function () {
        $('.header-t-catalog__third .header-t-catalog__items').css({"-webkit-transform":"translateY(0)"});
        $('.header-t-catalog__third .header-t-catalog__to-top').hide();
        $('.header-t-catalog__third .header-t-catalog__to-bottom').hide();
        $('.header-t-catalog__third').hide();

        $('.header-t-catalog__second .header-t-catalog__items').css({"-webkit-transform":"translateY(0)"});
        $('.header-t-catalog__second .header-t-catalog__to-top').hide();
        $('.header-t-catalog__second .header-t-catalog__to-bottom').hide();
        $('.header-t-catalog__second').hide();

        if($(this).hasClass('header-t-catalog__item--hasundercat')){
            var id = $(this).attr('id');
            var secondClass = '.header-t-catalog__second--'+id;
            if($(secondClass).length > 0){
                $(secondClass).show();
                if($(secondClass).find('.header-t-catalog__items').height() > $('.header-t-catalog').height()){
                    $(secondClass).find('.header-t-catalog__to-bottom').show();
                }
            }
        }

    }, function () {
    });

    $('.header-t-catalog__second .header-t-catalog__item').hover(function () {
        $('.header-t-catalog__third .header-t-catalog__items').css({"-webkit-transform":"translateY(0)"});
        $('.header-t-catalog__third .header-t-catalog__to-top').hide();
        $('.header-t-catalog__third .header-t-catalog__to-bottom').hide();
        $('.header-t-catalog__third').hide();

        if($(this).hasClass('header-t-catalog--undercat')) {
            var id = $(this).attr('id');
            var thirdClass = '.header-t-catalog__third--' + id;
            if ($(thirdClass).length > 0) {
                $(thirdClass).show();
                if ($(thirdClass).find('.header-t-catalog__items').height() > $('.header-t-catalog').height()) {
                    $(thirdClass).find('.header-t-catalog__to-bottom').show();
                }
            }
        }
    }, function () {
    });

    $(document).on('click', '.header-t-catalog__to-bottom', function () {
        var heightWrap = $(this).parent().height();
        var currentTransform = parseInt($(this).prev().css('transform').split(',')[5]);
        var listHeight = $(this).prev().height();


        if(listHeight > heightWrap*2){
            // if First scroll
            if(isNaN(currentTransform)){
                $(this).prev().css({"-webkit-transform":"translateY(-"+(heightWrap - 145)+"px)"});
            } else {
                // if last scroll
                if((heightWrap - currentTransform) > (listHeight - heightWrap)){
                    $(this).prev().css({"-webkit-transform":"translateY(-"+(listHeight - heightWrap)+"px)"});
                    $(this).hide();
                } else {
                    $(this).prev().css({"-webkit-transform":"translateY(-"+(heightWrap - currentTransform - 145)+"px)"});
                }
            }

        } else {
            $(this).prev().css({"-webkit-transform":"translateY(-"+(listHeight - heightWrap)+"px)"});
            $(this).hide();
        }

        // $(this).hide();
        $(this).prev().prev().show();
    });

    $(document).on('click', '.header-t-catalog__to-top', function () {

        var heightWrap = $(this).parent().height();
        var currentTransform = parseInt($(this).next().css('transform').split(',')[5]);
        var listHeight = $(this).next().height();

        if(listHeight > heightWrap*2){

            // if last scroll
            if((currentTransform + heightWrap ) > 0){
                console.log(1);
                $(this).next().css({"-webkit-transform":"translateY(0px)"});
                $(this).hide();
            } else {
                $(this).next().css({"-webkit-transform":"translateY(-"+(currentTransform*-1 - heightWrap + 145)+"px)"});
            }


        } else {
            // $(this).prev().css({"-webkit-transform":"translateY(-"+(listHeight - heightWrap)+"px)"});
            $(this).next().css({"-webkit-transform":"translateY(0px)"});
            $(this).hide();
        }

        // $(this).prev().css({'transform': 'translateY(-' + $(this).prev().height() - $(this).parent().height() + 'px)'})



        // $(this).hide();
        $(this).next().next().show();
    });

    $(document).on('click', '.header-t-catalog-wrap .header__search-btn--catalog', function () {
        if($('.header-t-catalog-first').hasClass('open')){
            $('.header-t-catalog').hide();
            $('.header-t-catalog-first').removeClass('open');
            return;
        }
        $('.header-t-catalog').show();
        $('.header-t-catalog-first').addClass('open');
        if($('.header-t-catalog').find('.header-t-catalog__items').height() > $('.header-t-catalog').height()){
            $('.header-t-catalog').find('.header-t-catalog__to-bottom').show();
        }
    });

    $('.header__search-select .block-title__select-item').click(function () {
        $('.header__search-select span').text($(this).text());
    });

    var bLazy = new Blazy();

});