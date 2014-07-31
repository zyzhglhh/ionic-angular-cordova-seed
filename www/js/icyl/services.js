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

        //console.log("#18----------"+$scope.$id);  //=====================test
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/main/login.html', {
          scope: $scope
          //,animation: 'no-animation'
        }).then(function(modal) {
          $scope.loginmodal = modal;
          //console.log("#17----------"+$scope.$id);  //=====================test
        });

        // Triggered in the login modal to close it
        $scope.actions.closeLogin = function() {
          $scope.loginmodal.hide();
        },

        // Open the login modal
        $scope.actions.login = function() {
          $scope.loginmodal.show();
          //console.log("#login----------"+$scope.$id);  //=====================test
        };

        $scope.actions.preRegister = function() {
          $scope.actions.closeLogin();
          $scope.actions.register();
        };

        // Perform the login action when the user submits the login form
        $scope.actions.doLogin = function() {
          console.log('正在登录', $scope.loginData);

          Data.User.signin($scope.loginData, function(data) {

          if (data.err_code == 0) { 
              Alert(data.data.user + ' 您好，欢迎回来！' ); 
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
              $state.go('main.mine'); //===================使用$state.go跳转到main.mine页面
              //console.log("#16----------"+$scope.$id);  //=====================test
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
          //,animation: 'no-animation'
        }).then(function(modal) {
          $scope.registermodal = modal;
        });

        // Triggered in the login modal to close it
        $scope.actions.closeRegister = function() {
          $scope.registermodal.hide();
        };

        // Open the login modal
        $scope.actions.register = function() {
          $scope.registermodal.show();
        };

        $scope.actions.prelogin = function() {
          $scope.actions.closeRegister();
          $scope.actions.login();
        };

        // Perform the register action when the user submits the register form
        $scope.actions.doRegister = function() {
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
              $scope.actions.login(); 
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
        $scope.mine.minehref = "#/main/mine";
        //console.log("#15----------"+$scope.$id);  //=====================test
      },
      denied: function($scope) {
        $scope.actions = {};
        User.userLogin($scope);
        User.userRegister($scope);
        //$scope.mine.mineNgclick = "actions.login()";  //这句语句在$resource之后actions.login()失效,可能和异步AJAX有关，具体原因还需详细分析？
        $scope.mine.minehref = "#";
        //console.log("#14----------"+$scope.$id);  //=====================test
      }
    }



  };
}])



//安全认证函数
.factory('Identification', 
        ['Storage', 
         'Data', 
         'Actions', 
         function(
          Storage
          , Data 
          , Actions
         ) {
  return {
    checkToken: function($scope) {
      
      $scope.mine = {};
      //console.log("#4----------"+$scope.$id);  //=====================test

      if (Storage.kget('username') && Storage.kget('password')) {
        if (Storage.kget('token')) {
          Data.User.checktoken({token: Storage.kget('token')}, function(data) {
            if (data.err_code == 0) { 
              Actions.mineClick.allowed($scope);
              //console.log("#5----------"+$scope.$id);  //=====================test
              //return true;
            }
            else {
              Data.User.signin({username: Storage.kget('username'), password: Storage.kget('password')}, function(data) {
                if (data.err_code == 0) { 
                  Storage.kset('token', data.data.token);
                  Actions.mineClick.allowed($scope);
                  //console.log("#6----------"+$scope.$id);  //=====================test
                  //return true;
                }
                else {
                  Actions.mineClick.denied($scope);
                  //console.log("#7----------"+$scope.$id);  //=====================test
                  //return false;
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
                //console.log("#8----------"+$scope.$id);  //=====================test
                //return true;
              }
              else {
                Actions.mineClick.denied($scope);
                //console.log("#9----------"+$scope.$id);  //=====================test
                //return false;
              }
            }, function(err) {
              console.log(' request fail for get_token !!!!! ' + err);
            });
        }
      }
      else {
        if (Storage.kget('token')) {
          //console.log("#10----------"+$scope.$id);  //=====================test
          Data.User.checktoken({token: Storage.kget('token')}, function(data) {
            if (data.err_code == 0) { 
              Actions.mineClick.allowed($scope);
              //console.log("#11----------"+$scope.$id);  //=====================test
              // return true;
            }
            else {
              //console.log("#12----------"+$scope.$id);  //=====================test
              Actions.mineClick.denied($scope);
              // return false;
            }
          }, function(err) {
              console.log(' request fail for check_token without username and password !!!!! ' + err);
          });
        }
        else {
          Actions.mineClick.denied($scope);
          //console.log("#13----------"+$scope.$id);  //=====================test
          // return false;
        }
      }
    }



  };
}])

;