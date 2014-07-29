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

//AJAX数据操作函数
.factory('Data', ['$resource', function($resource){
    return {
      User: $resource('http://:baseurl/:path/lp.php' 
                      ,{baseurl:'localhost'
                      , path:'PHPServ'
                      , callback: 'JSON_CALLBACK' 
                      } 
                      ,{
                          //signin: {method:'POST', params:{c:'user', a:'get_token'}}
                        //, signup: {method:'POST', params:{c:'user', a:'register'}}
                        signin: {method:'JSONP', params:{c:'user', a:'get_token'}}
                        ,signup: {method:'JSONP', params:{c:'user', a:'register'}}
                        , update_detail: {method:'POST'}
                        , update_avatar: {method:'POST'}
                        , update_mobile: {method:'POST'}
                        , update_password: {method:'POST'}
                      }),
      Post: $resource('http://:baseurl/:path/lp.php'
                      ,{baseurl:'localhost'
                      , path:'good'}
                      ,{
                          signin: {method:'POST', params:{c:'user', a:'get_token'}}
                        , singup: {method:'POST', params:{c:'user', a:'register'}}
                      })
    };
}])

.factory('Alert', ['$window', function($window) {
  return function(msg) {
    $window.alert(msg);
  };
}]);
