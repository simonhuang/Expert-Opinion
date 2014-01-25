/**
 * New node file
 */

 function QuestionController($scope,$http){
  
 
  
  $scope.questions = [];
  $scope.button_color = ['success','primary','warning','danger'];
  
  $http.get('/api/questions').success(function (data){
		$scope.questions = data;
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
  
  $scope.downvote = function(question){
	  $http.get('/auth/check').success(function(data){
		  if(data=="true")$http.post('/api/vote/'+question.id,{'dir':-1});
		  else console.log("not logged in");
	  });
  };
  
  
  
  
};