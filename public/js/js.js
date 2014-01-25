

jQuery(document).ready(function ($) {
	
	
	
	
    $(window).stellar();
    
    

    var links = $('.nav').find('li');
    mywindow = $(window);
    htmlbody = $('html,body');


    
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 1000, 'easeInOutQuint');
    }

	
	$('.downButton').click(function(){
		var slide = $(this).parent();
		var height = slide.css( "height" );
		if (height === "600px"){
			$(slide).animate({"height":"160px"}, 500);
			$(this).rotate(0);
		}
		else{
			$(slide).animate({"height":"600px"}, 500);
			$(this).rotate(180);
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
		
		
		
	//var ctx = document.getElementById("answerChart").getContext("2d");
	//var myNewChart = new Chart(ctx).Pie(data);
	
	
	
	data = {
	labels : ["Noobz","Average","Expert"],
	datasets : [
			{
				fillColor : "#36BA3F",
				strokeColor : "rgba(220,220,220,1)",
				data : [65,59,90]
			},
			{
				fillColor : "#fa5d48",
				strokeColor : "rgba(151,187,205,1)",
				data : [28,48,40]
			}
		]
	}
	//ctx = document.getElementById("levelChart").getContext("2d");
	//myNewChart = new Chart(ctx).Bar(data);
});