jQuery(document).ready(function ($) {
    $(window).stellar();

    var links = $('.nav').find('li');
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
	
	button.click(function(){
		var slide = button.parent()
		var height = slide.css( "height" );
		if (height === "600px"){
			$(slide).animate({"height":"160px"}, 500);
		}
		else{
			$(slide).animate({"height":"600px"}, 500);
		}
	});
	
	
	var data = [
		{
			value: 30,
			color : "#fa5d48"
		},
		{
			value : 80,
			color:"#36BA3F"
		}		
	];
				

	var ctx = document.getElementById("answerChart1").getContext("2d");
	var myNewChart = new Chart(ctx).Pie(data);
	
});