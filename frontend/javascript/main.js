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
                .find('.phone-menu')
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
    $('.main-banner').slick();

    // selector for slider buttons
    $('.slick-next').addClass('icon-next');
    $('.slick-prev').addClass('icon-prev');
});