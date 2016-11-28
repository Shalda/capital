requirejs.config({
    baseUrl: './js'
});

define(["jquery", "domReady", "slick", "jquery.maskedinput"], function ($) {
    "use strict";
    //burger menu header
    $('.header-navigation__item').hover(function () {
        $(this)
            .find('#submenu')
            .stop()
            .slideToggle()
    });
    
    //arrow-icon for language 
    $('.phone-button').click(function () {
        $(this)
            .stop()
            .toggleClass('active_arrow'),
            $('.header-phone')
                .stop()
                .find('.phone__menu')
                .slideToggle('fast')
    });

    //arrow-icon for language 
    $('.lang-button').click(function () {
        $(this)
            .stop()
            .toggleClass('active_arrow'),
            $('#language')
                .stop()
                .find('.language-menu')
                .slideToggle('fast')
    });

    //phonenumber input
    $("#phone-field").mask("+38(999)99-99-999");


    //search toogle
    $('.search').click(function () {
        $('.search-form ')
            .stop()
            .toggleClass('active_field');
            $(' #search-field')
                .stop()
                .toggleClass('active_search')

    });
    $('.icon-cross').click(function () {
        $('.search-form ')
            .stop()
            .toggleClass('active_field');
            $(' #search-field')
                .stop()
                .toggleClass('active_search')

    });

    //slick slider
    $('.main-banner').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    // selector for slider buttons
    $('.slick-next').addClass('icon-next');
    $('.slick-prev').addClass('icon-prev');


    // main contnent height on homepage
    function setHeight(){
      var footerHeight = $('#site-footer').height();
      var headerHeight = $('#site-header').height();
      var mainFooter = $('.icon-next').height();
      var mainHeight;
        mainSize();
        function mainSize() {
            if ($(window).width() >= '950'){
                mainHeight = $(window).height() - (footerHeight + headerHeight);
            }else {
                mainHeight = $(window).height() - (headerHeight + mainFooter);
            }};



    $('#site-main').css('height',  mainHeight);
    };

    $(window).on('load resize', setHeight);

});