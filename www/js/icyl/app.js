// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var dependencies = ['ionic'
                   ,'icyl.services'
                   //,'icyl.directives'
                   //,'icyl.filters'
                   ,'icyl.controllers'
                   //,'icyl.controllers.users'
                   ,'icyl.controllers.test'
                   ,'icyl.services.test'
                   ,'w5c.validator'];

angular.module('icyl', dependencies)

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('main', {
      url:'/main',
      abstract: true,
      templateUrl: 'templates/main.html',
      controller: 'mainContainer'
    })

    // .state('main.default', {
    //   url:'/default',
    //   views: {
    //     'main-default-header': {
    //       templateUrl: 'templates/main/header.html'
    //     },
    //     'main-default-content': {
    //       templateUrl: 'templates/main/content.html'
    //     },
    //     'main-default-footer': {
    //       templateUrl: 'templates/main/footer.html'
    //     }
    //   }
    // })
    
    .state('main.default', {
      url:'/default',
      views: {
        'main-container': {
          templateUrl: 'templates/main/default.html',
          controller: 'mainDefault'
        }
      }
    })

    .state('main.mine', {
      url:'/mine',
      views: {
        'main-container': {
          templateUrl: 'templates/main/mine.html',
          controller: 'mainMine'
        }
      }
    })

    .state('main.singer', {
      url:'/singer',
      views: {
        'main-container': {
          templateUrl: 'templates/main/singer.html',
          controller: 'mainSinger'
        }
      }
    })


    // .state('main.register', {
    //   url:'/register',
    //   views: {
    //     'main-default': {
    //       templateUrl: 'templates/main/register.html',
    //       controller: 'UserRegister'
    //     }
    //   }
    // })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/default');

}])

.config(['w5cValidatorProvider', function (w5cValidatorProvider) {

     // 全局配置
     w5cValidatorProvider.config({
         blurTrig   : false,
         showError  : true,
         removeError: true

     });
     w5cValidatorProvider.setRules({
         email   : {
             required: "输入的邮箱地址不能为空",
             email   : "输入邮箱地址格式不正确"
         },
         username: {
             required: "输入的用户名不能为空",
             pattern : "用户名必须输入字母、数字、下划线,以字母开头"
         },
         password: {
             required : "密码不能为空",
             minlength: "密码长度不能小于{minlength}",
             maxlength: "密码长度不能大于{maxlength}"
         },
         repeat_password  : {
                repeat: "两次填写的密码不一致"
         },
         chinese_name : {
             required : "姓名不能为空",
             pattern  : "请正确输入中文姓名"
         },
         mobile  : {
             required: "手机号不能为空",
             pattern : "请填写正确手机号",
             minlength: "手机号长度不能小于{minlength}",
             maxlength: "手机号长度不能大于{maxlength}"
         }
     });
 }]);

