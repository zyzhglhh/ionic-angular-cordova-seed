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

//参数传递函数
.factory('Params', function() {
  return {
    outStr: '',
    outObj: {},
  };
})

//数据模型函数
.factory('Data', ['$resource', function($resource){
  return {
    User: $resource('http://:baseurl/:path/lp.php', 
                    {
                      baseurl:'localhost', 
                      path:'PHPServ' 
                      //, callback: 'JSON_CALLBACK' //jsonp_flag
                    }, 
                    {
                      signin: {method:'POST', params:{c:'user', a:'get_token'}},//json_flag
                      signup: {method:'POST', params:{c:'user', a:'register'}}, //json_flag
                      checktoken: {method:'POST', params:{c:'user', a:'user_verify'}}, //json_flag
                      // signin: {method:'JSONP', params:{c:'user', a:'get_token'}}, //jsonp_flag
                      // signup: {method:'JSONP', params:{c:'user', a:'register'}},  //jsonp_flag
                      //checktoken: {method:'JSONP', params:{c:'user', a:'user_verify'}}, //jsonp_flag
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
  ['$ionicModal', '$ionicAnimation', 'Storage', 'Data', 'Alert', '$state',
  function($ionicModal, $ionicAnimation, Storage, Data, Alert, $state) {
    return {
      userLogin: function($scope) {
        $scope.loginData = {
          username: 'alexgzhou',
          password: '123456789',
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
              //Alert(data.data.user + '，欢迎回来！' ); 
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
              $scope.mine.mineNgclick = '';
              $scope.mine.minehref = '#/main/mine';
              //Alert(data.data.token+'=='+data.data.username+'=='+data.data.password+'=='+$scope.loginData.rememberPwd);
              $scope.loginData = {};
              $state.go('main.mine');
              console.log('#10 in User.userLogin.doLogin ' + ": " + $scope.mine.mineNgclick); //test
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



    };
}])



//页面行为函数
.factory('Actions', ['User', function(User) {
  return {
    mineClick: {
      allowed: function($scope) {
        $scope.mine.mineNgclick = '';
        $scope.mine.minehref = '#/main/mine';
        console.log('#9 in Actions.mineClick.allowed' + ": " + $scope.mine.minehref); //test
      },
      denied: function($scope) {
        User.userLogin($scope);
        User.userRegister($scope);
        console.log('#7 in Actions.mineClick.denied ' + $scope.loginData.rememberPwd + ": " + $scope.mine.mineNgclick); //test
        $scope.mine.mineNgclick = 'login()';
        $scope.mine.minehref = '#';
        console.log($scope); //test
      }
    }



  };
}])



//安全认证函数
.factory('Identification', ['Storage', 'Data', 'Actions', function(Storage, Data, Actions) {
  return {
    checkToken: function($scope) {
      
      $scope.mine = {};
      console.log('#4 in Identification.checkToken ' + Storage.kget('token') + ": " + $scope.mine.minehref); //test

      if (Storage.kget('username') && Storage.kget('password')) {
        if (Storage.kget('token')) {
          Data.User.checktoken({token: Storage.kget('token')}, function(data) {
            if (data.err_code == 0) { 
              Actions.mineClick.allowed($scope);
              console.log('#10 in Identification.checkToken' + ": " + $scope.mine.minehref); //test
            }
            else {
              Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
                if (data.err_code == 0) { 
                  Storage.kset('token', data.data.token);
                  Actions.mineClick.allowed($scope);
                  console.log('#11 in Identification.checkToken' + ": " + $scope.mine.minehref); //test
                }
                else {
                  Actions.mineClick.denied($scope);
                  console.log('#12 in Identification.checkToken' + ": " + $scope.mine.mineNgclick); //test
                }
              }, function(err) {
                console.log(' request fail for get_token !!!!! ' + err);
              });
            }
          }, function(err) {
              console.log(' request fail for check_token !!!!! ' + err);
          });
        }
        else {
          Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
            if (data.err_code == 0) { 
                Storage.kset('token', data.data.token);
                Actions.mineClick.allowed($scope);
                console.log('#13 in Identification.checkToken' + ": " + $scope.mine.minehref); //test
              }
              else {
                Actions.mineClick.denied($scope);
                console.log('#14 in Identification.checkToken' + ": " + $scope.mine.mineNgclick); //test
              }
            }, function(err) {
              console.log(' request fail for get_token !!!!! ' + err);
            });
        }
      }
      else {
        if (Storage.kget('token')) {
          console.log('#5 in Identification.checkToken ' + Storage.kget('token') ); //test
          console.dir({token: Storage.kget('token')});  //test
          Data.User.checktoken({token: Storage.kget('token')}, function(data) {
            if (data.err_code == 0) { 
              Actions.mineClick.allowed($scope);
              console.log('#15 in Identification.checkToken' + ": " + $scope.mine.minehref); //test
            }
            else {
              console.log('#6 in Identification.checkToken ' + data.err_msg + ": " + $scope.mine.mineNgclick); //test
              Actions.mineClick.denied($scope);
            }
          }, function(err) {
              console.log(' request fail for check_token without username and password !!!!! ' + err);
          });
        }
        else {
          Actions.mineClick.denied($scope);
          console.log('#16 in Identification.checkToken' + ": " + $scope.mine.mineNgclick); //test
        }
      }
    }



  };
}])

;