angular.module('starter.controllers', [])

//登录窗口控制器
.controller('mainDefault', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/main/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('正在登录', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.modal.remove();
    }, 1000);
  };

  $scope.$on('modal.removed', function() {
  	$scope.loginData = {};
	$ionicModal.fromTemplateUrl('templates/main/login.html', {
	  scope: $scope
	}).then(function(modal) {
	  $scope.modal = modal;
	});
  });
})


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
})


.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
});
