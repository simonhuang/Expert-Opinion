jQuery(document).ready(function ($) {


    $(window).stellar();

    var links = $('.nav').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    slide.waypoint(function (event, direction) {

        dataslide = $(this).attr('data-slide');

        if (direction === 'down') {
            $('.nav ul li[data-slide="' + dataslide + '"]').attr('id', 'active').prev().removeAttr('id');
        }

        else {
            $('.nav ul li[data-slide="' + dataslide + '"]').attr('id', 'active').next().removeAttr('id');
        }

    });
 
    mywindow.scroll(function () {
		
        if (mywindow.scrollTop() < 60) {
            $('.nav ul li[data-slide="1"]').attr('id', 'active');
            $('.nav ul li[data-slide="2"]').removeAttr('id', 'active');
        }
    });

    
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 1000, 'easeInOutQuint');
    }



    
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });

    button.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });


});