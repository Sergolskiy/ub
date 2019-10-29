
$(document).ready(function () {
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

    $('.to-top, #toUp').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
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

});