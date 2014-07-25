angular.module('starter.controllers', [])

//登录窗口控制器
.controller('mainDefault', function($scope, $ionicModal, $ionicAnimation, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/main/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginmodal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.loginmodal.show();
  };

  $scope.preRegister = function() {
    $scope.closeLogin();
    $scope.register();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('正在登录', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.loginmodal.remove();
      $scope.loginData = {};
      $ionicModal.fromTemplateUrl('templates/main/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.loginmodal = modal;
      });
    }, 1000);
  };




  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/main/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registermodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registermodal.hide();
  },

  // Open the login modal
  $scope.register = function() {
    $scope.registermodal.show();
  };

  $scope.prelogin = function() {
    $scope.closeRegister();
    $scope.login();
  };

  // Perform the login action when the user submits the login form
  $scope.doRegister = function() {
    console.log('正在注册', $scope.registerData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.registermodal.remove();
      $scope.registerData = {};
      $ionicModal.fromTemplateUrl('templates/main/register.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.registermodal = modal;
      });
    }, 1000);
  };

})

// .controller('UserRegister', function($scope, $rootScope, $ionicAnimation) {

// })

//.controller('register', function($scope, $ionicModal, $timeout) {})
// .controller('register', function($scope, $ionicModal, $timeout) {
//   // Form data for the login modal
//   $scope.registerData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/main/register.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeRegister = function() {
//     $scope.modal.hide();
//   },

//   // Open the login modal
//   $scope.register = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doRegister = function() {
//     console.log('正在登录', $scope.registerData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.modal.remove();
//     }, 1000);
//   };

//   $scope.$on('modal.removed', function() {
//     $scope.registerData = {};
//     $ionicModal.fromTemplateUrl('templates/main/register.html', {
//       scope: $scope
//     }).then(function(modal) {
//       $scope.modal = modal;
//     });
//   });
// })


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
