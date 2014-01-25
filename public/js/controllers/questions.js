/**
 * New node file
 */

 function QuestionController($scope,$http,$timeout){
  
 
  var sortType = 0;
  $scope.questions = [];
  $scope.button_color = ['success','primary','warning','danger'];
  
  $scope.authed = false;
  
  $http.get('/auth/check').success(function(data){
	  if(data=="true")$scope.authed = true;
	  //console.log($scope.authed);
  });
  
  $scope.update = function(){
	  $http.get('/api/questions').success(function (data){
			$scope.questions = data;
			if(sortType==0)$scope.sortByHot();
			else $scope.sortByNew();
	
		$timeout($scope.setGraphs,300);
		$timeout($scope.setQuestions,200);
	});
 };
 
 $scope.setQuestions = function(){
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
		
 };
  
  $scope.setGraphs = function(){
	  console.log("test");
	  for(var i=0;i<$scope.questions.length;i++){
			
			var yesPerc = $scope.getYesPerc($scope.questions[i]);
			var noPerc = $scope.getNoPerc($scope.questions[i]);
			
			var data = [{
    			value: noPerc,
    			color : "#fa5d48"
    		},{
    			value : yesPerc,
    			color:"#36BA3F"
    		}];

	    	var ctx = document.getElementById("answerChart"+(i)).getContext("2d");
	    	var myNewChart = new Chart(ctx).Pie(data);
			
			console.log($scope.questions[i]);
			
			var data2 = {
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
					};
			
			var ctx2 = document.getElementById("levelChart"+(i)).getContext("2d");
	    	var myNewChart2 = new Chart(ctx2).Bar(data2);
			
		}
  };
  
  $scope.getYesPerc = function(question){
	  if(question.value_yes+question.value_no==0)return 0;
	  var perc = (question.value_yes)/(0.0+question.value_yes+question.value_no);
	  return Math.round(perc * 10000)/100;
  };
  
  $scope.getNoPerc = function(question){
	  if(question.value_yes+question.value_no==0)return 0;
	  var perc = (question.value_no)/(0.0+question.value_yes+question.value_no);
	  return Math.round(perc * 10000)/100;
  };
  
  
  
  
  
  $scope.indexOf = function(question){
	  return $scope.questions.indexOf(question)%4+1;
  };
  
  $scope.ask = function(){
	  $http.get('/auth/check').success(function(data){
		  var quest = {'title':$scope.title,
				  'category':$scope.category,
				  'tags':[]};
		  console.log($scope.category+" "+quest);
		  if(data=="true")$http.put('/api/question',quest).success(
				  function(data){
					  $scope.update();
			  console.log("question");
		  });
		  else {
			alert("Please login");
			console.log("not logged in");
		  }
	  });
  };
  
  $scope.answer = function(question,ans){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true"){
			  $http.post('/api/answer/'+question.id,{'ans':ans}).success(
			  function(data){
				  $scope.update();
			  });
		  }
		  else {
			alert("Please login");
			console.log("not logged in");
		  }
	  });
  };
  
  $scope.upvote = function(question){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true"){
			  $http.post('/api/vote/'+question.id,{'dir':1}).success(
					  function(data){
						  $scope.update();
					  });
			 
		  }
		  else {
			alert("Please login");
			console.log("not logged in");
		  }
	  });
			  
  };
  
  $scope.getScore = function(question){
	  var val = question.num_up - question.num_down;
	  if(val>=0)return "+"+val;
	  else return val;
  };
  
  $scope.downvote = function(question){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true"){
			  $http.post('/api/vote/'+question.id,{'dir':-1}).success(
				function(data){
					$scope.update();
				});
			  
		  }
		 else {
			alert("Please login");
			console.log("not logged in");
		  }
	  });
  };
  
  $scope.indexQuestion = function(question){
	  return $scope.questions.indexOf(question);
  };
  
  
  $scope.sortByHot = function(){
	  sortType = 0;
	$scope.questions.sort(function(a,b){
		return (b.num_up-b.num_down)-(a.num_up-a.num_down);
	});
  };
  
  $scope.sortByNew = function(){
	  sortType = 1;
		$scope.questions.sort(function(a,b){
			return (b.time-a.time);
		});
	  };
  
  
  //Init
  $scope.update();
  
  
  
};