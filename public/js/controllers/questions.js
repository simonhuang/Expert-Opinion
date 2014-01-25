/**
 * New node file
 */

 app.controller('QuestionController', function ($scope,$http){
  
 
  
  $scope.questions = [];
  
  $scope.create = function(){
    var node = $scope.tree.currentNode;
    if(node){
      if(node.folder){
        $scope.selectID = node.id;
        $scope.id = node.id;
        $scope.name = '';
        $scope.folder = false;
        $scope.cost = undefined;
        $scope.desc = undefined;
        $scope.mode = CREATE_MODE;
        
        $http.get('/api/items').success(function (data){
			$scope.items = [data];
			$scope.items.forEach(function(item,i){
				console.log(item);
			});
		});
        
      }
    }
  };
  
  $scope.deleteItem = function (item){
    $http.delete('/api/items/'+item.id).success(function(data){
      $scope.update();
    });
  };
  
  
  
});