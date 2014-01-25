/**
 * New node file
 */

 function QuestionController($scope,$http){
  
 
  
  $scope.questions = [];
  $scope.button_color = ['success','primary','warning','danger'];
  
  $http.get('/api/questions').success(function (data){
		$scope.questions = data;
		
		var data = [{
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
		
		$scope.questions.forEach(function(item,i){
			console.log(item);
		});
	});
  
  $scope.indexOf = function(question){
	  return $scope.questions.indexOf(question)%4+1;
  };
  
  $scope.ask = function(){
	  $http.get('/auth/check').success(function(data){
		  var quest = {'title':$scope.title,
				  'category':$scope.category};
		  console.log($scope.category+" "+quest);
		  if(data=="true")$http.put('/api/question',quest).success(
				  function(data){
			  console.log("question");
		  });
		  else console.log("not logged in");
	  });
  };
  
  $scope.answer = function(question,ans){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true")$http.post('/api/answer/'+question.id,{'ans':ans});
		  else console.log("not logged in");
	  });
  };
  
  $scope.upvote = function(question){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true")$http.post('/api/vote/'+question.id,{'dir':1});
		  else console.log("not logged in");
	  });
			  
  };
  
  $scope.getScore = function(question){
	  var val = question.num_up - question.num_down;
	  if(val>=0)return "+"+val;
	  else return "-"+val;
  };
  
  $scope.downvote = function(question){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true")$http.post('/api/vote/'+question.id,{'dir':-1});
		  else console.log("not logged in");
	  });
  };
  
  $scope.indexQuestion = function(question){
	  return questions.indexOf(question);
  };
  
  
  
  
};