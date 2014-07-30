angular.module('icyl.services', ['ngResource'])

//本地存储函数
.factory('Storage', ['$window', function($window) {
  return {
    kset: function(key, value) {
      $window.localStorage.setItem(key, value);
    },
    kget: function(key) {
      return $window.localStorage.getItem(key);
    },
    kremove: function(key) {
      $window.localStorage.removeItem(key);
    }
  };
}])

//alert函数
.factory('Alert', ['$window', function($window) {
  return function(msg) {
    $window.alert(msg);
  };
}])



//数据模型函数
.factory('Data', ['$resource', function($resource){
  return {
    User: $resource('http://:baseurl/:path/lp.php', 
                    {
                      baseurl:'localhost', 
                      path:'PHPServ'//, 
                      //callback: 'JSON_CALLBACK'
                    }, 
                    {
                      signin: {method:'POST', params:{c:'user', a:'get_token'}},
                      signup: {method:'POST', params:{c:'user', a:'register'}},
                      //signin: {method:'JSONP', params:{c:'user', a:'get_token'}},
                      //signup: {method:'JSONP', params:{c:'user', a:'register'}},
                      checktoken: {method:'JSONP', params:{c:'user', a:'user_verify'}},
                      update_detail: {method:'POST'},
                      update_avatar: {method:'POST'},
                      update_mobile: {method:'POST'},
                      update_password: {method:'POST'}
                    }),
    Post: $resource('http://:baseurl/:path/lp.php',
                    {
                      baseurl:'localhost',
                      path:'good'},
                    {
                      signin: {method:'POST', params:{c:'user', a:'get_token'}},
                      singup: {method:'POST', params:{c:'user', a:'register'}}
                    })
  };
}])



//用户操作函数
.factory('User', 
  ['$ionicModal', '$ionicAnimation', 'Storage', 'Data', 'Alert', 
  function($ionicModal, $ionicAnimation, Storage, Data, Alert) {
    return {
      userLogin: function($scope) {
        $scope.loginData = {
          rememberPwd: false
        };

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

          Data.User.signin($scope.loginData, function(data) {

          if (data.err_code == 0) { 
              Alert(data.data.user + '，欢迎回来！' ); 
              $scope.loginmodal.remove();
              $ionicModal.fromTemplateUrl('templates/main/login.html', {
               scope: $scope
              }).then(function(modal) {
               $scope.loginmodal = modal;
              });
              if ($scope.loginData.rememberPwd == true) {
                Storage.kset('password', data.data.password);
              }
              Storage.kset('username', data.data.username);
              Storage.kset('token', data.data.token);
              //Alert(data.data.token+'=='+data.data.username+'=='+data.data.password+'=='+$scope.loginData.rememberPwd);
              $scope.loginData = {};
            }
            else {
              Alert(data.err_code + '：' + data.err_msg);
              $scope.loginData = {};
            }
          }, function(err){
              console.log(' request fail for login !!!!! ' + err);
          });
        }
      },

      userRegister: function($scope) {
        $scope.registerData = {
          username: 'alexgzhou',
          password: '123456789',
          repeatpassword: '123456789',
          name: '周天舒',
          mobile: '13282037883',
          gender: false
        };

        //Alert(registerData.gender);

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/main/register.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.registermodal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegister = function() {
          $scope.registermodal.hide();
        };

        // Open the login modal
        $scope.register = function() {
          $scope.registermodal.show();
        };

        $scope.prelogin = function() {
          $scope.closeRegister();
          $scope.login();
        };

        // Perform the register action when the user submits the register form
        $scope.doRegister = function() {
          //$scope.registerData.gender = $scope.registerData.genderFlag ? '女': '男';

          console.log('正在注册', $scope.registerData);

          Data.User.signup($scope.registerData, function(data) {
            //Alert($scope.registerData.genderFlag);
            
            if (data.err_code == 0) { 
              Alert(data.data.user + ' 注册成功，用户名：' + data.data.username ); 
              $scope.registermodal.remove();
              $scope.registerData = {};
              $scope.registerData.gender = false;
              $ionicModal.fromTemplateUrl('templates/main/register.html', {
               scope: $scope
              }).then(function(modal) {
               $scope.registermodal = modal;
              });
              $scope.login(); 
            }
            else {
              Alert(data.err_code + '：' + data.err_msg);
              $scope.registerData = {};
              $scope.registerData.gender = false;
            }
          }, function(err){
              console.log(' request fail for register !!!!! ' + err);
          });
        };
      },

      userLogout: function($scope) {

      }



    }
}])


//页面行为函数
.factory('Actions', ['User', function(User) {
  return {
    mineClick: {
      allowed: function($scope) {
        $scope.mineNgclick = '';
        $scope.minehref = '#/main/mine';
      },
      denied: function($scope) {
        User.userLogin($scope);
        User.userRegister($scope);
        $scope.mineNgclick = 'login()';
        $scope.minehref = '#';
      }
    }



  };
}])


//安全认证函数
.factory('Identification', ['Storage', 'Data', 'Actions', function(Storage, Data, Actions) {
  return {
    checkToken: function($scope) {
      console.log(Storage.kget('token')+"#2");

      if (Storage.kget('username') && Storage.kget('password')) {
        if (Storage.kget('token')) {
          Data.User.checktoken({token: Storage.kget('token')}, function(data) {
            if (data.err_code == 0) { 
              Actions.mineClick.allowed($scope);
            }
            else {
              
            }
      }




      if (Storage.kget('token')) {
        Data.User.checktoken({token: Storage.kget('token')}, function(data) {
          if (data.err_code == 0) { 
            Actions.mineClick.allowed($scope);
          }
          else if (Storage.kget('username') && Storage.kget('password')) {
            Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
              if (data.err_code == 0) { 
                Storage.kset('token', data.data.token);
                Actions.mineClick.allowed($scope);
              }
              else {
                Actions.mineClick.denied($scope);
              }
            }, function(err) {
              console.log(' request fail for login !!!!! ' + err);
            });
          }
          else {
            Actions.mineClick.denied($scope);
          }
        }, function(err) {
          console.log(' request fail for login !!!!! ' + err);
        });
      }
      else if(Storage.kget('username') && Storage.kget('password')) {

      }
    }



  };
}])





;