angular.module('icyl.controllers', [])

//主容器控制器
.controller('mainContainer', ['$scope', 'Actions', function($scope, Actions){
    //Actions.mineClick($scope);
}])

//默认主页控制器
.controller('mainDefault', ['$scope', 'Identification', function($scope, Identification) {
  


  Identification.checkToken($scope);

  //User.userLogin($scope);
  //User.userRegister($scope);



  // // Form data for the login modal
  // $scope.loginData = {
  //   rememberPwd: false
  // };

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/main/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.loginmodal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.loginmodal.hide();
  // };

  // // Open the login modal
  // $scope.login = function() {
  //   $scope.loginmodal.show();
  // };

  // $scope.preRegister = function() {
  //   $scope.closeLogin();
  //   $scope.register();
  // };

  // // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('正在登录', $scope.loginData);

  //   Data.User.signin($scope.loginData, function(data) {

  //   if (data.err_code == 0) { 
  //       Alert(data.data.user + '，欢迎回来！' ); 
  //       $scope.loginmodal.remove();
  //       $ionicModal.fromTemplateUrl('templates/main/login.html', {
  //        scope: $scope
  //       }).then(function(modal) {
  //        $scope.loginmodal = modal;
  //       });
  //       if ($scope.loginData.rememberPwd == true) {
  //         Storage.kset('password', data.data.password);
  //       }
  //       Storage.kset('username', data.data.username);
  //       Storage.kset('token', data.data.token);
  //       //Alert(data.data.token+'=='+data.data.username+'=='+data.data.password+'=='+$scope.loginData.rememberPwd);
  //       $scope.loginData = {};
  //     }
  //     else {
  //       Alert(data.err_code + '：' + data.err_msg);
  //       $scope.loginData = {};
  //     }
  //   }, function(err){
  //       console.log(' request fail for login !!!!! ' + err);
  //   });

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   // $timeout(function() {
  //   //   $scope.loginmodal.remove();
  //   //   $scope.loginData = {};
  //   //   $ionicModal.fromTemplateUrl('templates/main/login.html', {
  //   //     scope: $scope
  //   //   }).then(function(modal) {
  //   //     $scope.loginmodal = modal;
  //   //   });
  //   // }, 1000);
  // };


  //User.userregister($scope);

  // $scope.registerData = {
  //   username: 'alexgzhou',
  //   password: '123456789',
  //   repeatpassword: '123456789',
  //   name: '周天舒',
  //   mobile: '13282037883',
  //   gender: false
  // };

  // //Alert(registerData.gender);

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/main/register.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.registermodal = modal;
  // });

  // // Triggered in the login modal to close it
  // $scope.closeRegister = function() {
  //   $scope.registermodal.hide();
  // };

  // // Open the login modal
  // $scope.register = function() {
  //   $scope.registermodal.show();
  // };

  // $scope.prelogin = function() {
  //   $scope.closeRegister();
  //   $scope.login();
  // };

  // // Perform the register action when the user submits the register form
  // $scope.doRegister = function() {
  //   //$scope.registerData.gender = $scope.registerData.genderFlag ? '女': '男';

  //   console.log('正在注册', $scope.registerData);

  //   Data.User.signup($scope.registerData, function(data) {
  //     //Alert($scope.registerData.genderFlag);
      
  //     if (data.err_code == 0) { 
  //       Alert(data.data.user + ' 注册成功，用户名：' + data.data.username ); 
  //       $scope.registermodal.remove();
  //       $scope.registerData = {};
  //       $scope.registerData.gender = false;
  //       $ionicModal.fromTemplateUrl('templates/main/register.html', {
  //        scope: $scope
  //       }).then(function(modal) {
  //        $scope.registermodal = modal;
  //       });
  //       $scope.login(); 
  //     }
  //     else {
  //       Alert(data.err_code + '：' + data.err_msg);
  //       $scope.registerData = {};
  //       $scope.registerData.gender = false;
  //     }
  //   }, function(err){
  //       console.log(' request fail for register !!!!! ' + err);
  //   });



  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   // $timeout(function() {
  //   //   $scope.registermodal.remove();
  //   //   $scope.registerData = {};
  //   //   $ionicModal.fromTemplateUrl('templates/main/register.html', {
  //   //     scope: $scope
  //   //   }).then(function(modal) {
  //   //     $scope.registermodal = modal;
  //   //   });
  //   // }, 1000);
  // };

}])

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

.controller('mainMine', ['$scope', function($scope){}])

.controller('MainTab', function($scope, $rootScope) {
  $scope.addmain = function() {
  	$rootScope.MaiViewName = "main";
  };
});
