angular.module('icyl.controllers', [])

//主容器控制器
.controller('mainContainer', ['$scope', 'Actions', function($scope, Actions){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

//默认主页控制器
.controller('mainDefault', ['$scope', 'Identification', 'Actions', 'User', function($scope, Identification, Actions, User) {
  

  //console.log("#2----------"+$scope.$id);  //=====================test
  //Params.outObj = $scope;
  
  //$scope.mine = {};
  //$scope.mine.mineNgclick = "actions.login()";
  Identification.checkToken().then(function(data) {
  	if (data.err_code == 0) {
  		Actions.mineClick.allowed($scope);
  	}
  	else {
  		Actions.mineClick.denied($scope);
  	}
  }, function(err) {
  	console.log('错误：' + err);
  });
  //$scope.mine.mineNgclick = "actions.login()";

}])


.controller('mainMine', ['$scope', 'Identification', 'Actions', 'User', function($scope, Identification, Actions, User) {
  //console.log("#3----------"+$scope.$id);  //=====================test
  //Identification.checkToken($scope);
  
  //$scope.mine = {};
  //$scope.mine.mineNgclick = "actions.login()";
  Identification.checkToken().then(function(data) {
  	if (data.err_code == 0) {
  		Actions.mineClick.allowed($scope);
  	}
  	else {
  		Actions.mineClick.denied($scope);
  	}
  }, function(err) {
  	console.log('错误：' + err);
  });
  //$scope.mine.mineNgclick = "actions.login()";

}])

.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
})

.controller('mainSinger', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

.controller('mainNotice', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

.controller('mainSignup', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

.controller('mainMessage', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

.controller('mainStyle', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

.controller('mainDetails', ['$scope', function($scope){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

;
