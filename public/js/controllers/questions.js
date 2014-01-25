/**
 * New node file
 */

 function QuestionController($scope,$http){
  
 
  
  $scope.questions = [];
  
  $http.get('/api/questions').success(function (data){
		$scope.questions = data;
		$scope.questions.forEach(function(item,i){
			console.log(item);
		});
	});
  
  $scope.indexOf = function(question){
	  return $scope.questions.indexOf(question)%4+1;
  };
  
  $scope.ask = function(question,category){
	  $http.get('/auth/check').success(function(data){
		  var q = {'title':question,
				  'category':category};
		  
		  if(data=="true")$http.put('/api/question/',q);
		  else console.log("not logged in");
	  });
  }
  
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