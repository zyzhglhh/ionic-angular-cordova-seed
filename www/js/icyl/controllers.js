angular.module('icyl.controllers', [])

//主容器控制器
.controller('mainContainer', ['$scope', 'Actions', function($scope, Actions){
    //Actions.mineClick($scope);
    //console.log("#1----------"+$scope.$id);  //=====================test
}])

//默认主页控制器
.controller('mainDefault', ['$scope', 'Identification', 'Actions', function($scope, Identification, Actions) {
  

  //console.log("#2----------"+$scope.$id);  //=====================test
  //Params.outObj = $scope;
  var checkin = Identification.checkToken($scope);
  console.log("#2----------"+checkin+"====="+$scope.$id);  //=====================test
  if (checkin) {
  	Actions.mineClick.allowed($scope);
  }
  else {
  	Actions.mineClick.denied($scope);
  }


}])


.controller('mainMine', ['$scope', 'Identification', 'Actions', function($scope, Identification, Actions) {
  //console.log("#3----------"+$scope.$id);  //=====================test
  //Identification.checkToken($scope);
  var checkin = Identification.checkToken($scope);
  console.log("#2----------"+checkin+"====="+$scope.$id);  //=====================test
  if (checkin) {
  	Actions.mineClick.allowed($scope);
  }
  else {
  	Actions.mineClick.denied($scope);
  }


}])

.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
});
