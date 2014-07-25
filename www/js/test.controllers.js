angular.module('starter.test.controllers', [])

//登录窗口控制器
.controller('Sandcrawler', function($scope) {
  // Form data for the login modal
    //$scope.aaa = {};
    $scope.location="Hahaha";
    $scope.move = function() {
      $scope.location="Hahaha";
      $scope.$broadcast('move', $scope.location);
    }
    $scope.$on('sell',function(e,newLocation){
      $scope.location=newLocation;
    });
})
.controller('Droid', function($scope) {
    $scope.location="Owen Farm";
    $scope.sell = function() {
      $scope.location="Owen Farm";
      $scope.$emit('sell', $scope.location);
    }
    $scope.$on('move', function(e, newLocation){
      $scope.location=newLocation;
    })

})

.controller('Sandcrawler1', function($scope) {
  // Form data for the login modal
    //$scope.aaa = {};
    $scope.$on('requestDroidRecall1', function(e) {
        $scope.$broadcast('executeDroidRecall1');
    });
    $scope.$on('requestDroidRecall2', function(e) {
        $scope.$broadcast('executeDroidRecall2');
    });
})
.controller('Droid1', function($scope) {
    $scope.location = "HAHAHAHAHA";
    $scope.recallAllDroids = function() {
        $scope.$emit('requestDroidRecall1');
    }
    $scope.$on('executeDroidRecall2', function() { 
        $scope.location = "Owen Farm"
    });
})
.controller('Droid2', function($scope) {
    $scope.location = "Owen Farm";
    $scope.recallAllDroids = function() {
        $scope.$emit('requestDroidRecall2');
    }
    $scope.$on('executeDroidRecall1', function() { 
        $scope.location = "HAHAHAHAHA"
    });
})

.controller('MainCtrl', function($scope, instance) {
  $scope.change = function() {
       instance.name = $scope.test;
  };
})
.controller('sideCtrl', function($scope, instance) {
    $scope.add = function() {
        $scope.name = instance.name;
    };
});