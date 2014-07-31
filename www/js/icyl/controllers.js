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
  
  
  Identification.checkToken($scope);
  $scope.mine.mineNgclick = "actions.login()";

}])


.controller('mainMine', ['$scope', 'Identification', 'Actions', 'User', function($scope, Identification, Actions, User) {
  //console.log("#3----------"+$scope.$id);  //=====================test
  //Identification.checkToken($scope);
  
  Identification.checkToken($scope);
  $scope.mine.mineNgclick = "actions.login()";

}])

.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
});
