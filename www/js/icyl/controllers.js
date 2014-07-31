angular.module('icyl.controllers', [])

//主容器控制器
.controller('mainContainer', ['$scope', 'Actions', function($scope, Actions){
    //Actions.mineClick($scope);
    console.log("#1----------"+$scope.$id);  //=====================test
}])

//默认主页控制器
.controller('mainDefault', ['$scope', 'Identification', 'Params', function($scope, Identification, Params) {
  

  console.log("#2----------"+$scope.$id);  //=====================test
  Params.outObj = $scope;
  Identification.checkToken(Params.outObj);


}])


.controller('mainMine', ['$scope', 'Identification', function($scope, Identification) {
  console.log("#3----------"+$scope.$id);  //=====================test
  Identification.checkToken($scope);
}])

.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
});
