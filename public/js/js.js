setTimeout(function(){
	$('.slide').click(function(){
		var height = $( this ).css( "height" );
		if (height === "500px"){
			$(this).animate({"height":"160px"}, 500);
		}
		else{
			$(this).animate({"height":"500px"}, 500);
		}
	});
}, 1000);

jQuery(document).ready(function ($) {
	
	
	
	
    $(window).stellar();
    
    

    var links = $('.nav').find('li');
    slide = $('.slide');
    button = $('.button');
    mywindow = $(window);
    htmlbody = $('html,body');


    
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 1000, 'easeInOutQuint');
    }

    button.click(function (e) {
    	
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);

    });
	


	var ctx = document.getElementById("myChart").getContext("2d");
	var myNewChart = new Chart(ctx).Pie(data);
	
	

});