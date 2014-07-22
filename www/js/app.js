// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('main', {
      url:'/main',
      abstract: true,
      templateUrl: 'templates/main.html'
      //,controller: 'MainView'
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
        'main-default': {
          templateUrl: 'templates/main/default.html'
        }
      }
    });

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.pet-index', {
      url: '/pets',
      views: {
        'pets-tab': {
          templateUrl: 'templates/tabs/pet-index.html',
          controller: 'PetIndexCtrl'
        }
      }
    })

    .state('tab.pet-detail', {
      url: '/pet/:petId',
      views: {
        'pets-tab': {
          templateUrl: 'templates/tabs/pet-detail.html',
          controller: 'PetDetailCtrl'
        }
      }
    })

    .state('tab.main', {
      url: '/main',
      views: {
        'main-tab': {
          templateUrl: 'templates/tabs/mainbutton.html',
          controller: 'MainTab'
        }
      }
    })

    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'adopt-tab': {
          templateUrl: 'templates/tabs/adopt.html'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/tabs/about.html'
        }
      }
    });

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('test', {
      url: "/test",
      abstract: true,
      templateUrl: "templates/test.html"
    })

    // the pet tab has its own child nav-view and history
    .state('test.pet-index', {
      url: '/pets',
      views: {
        'pets-test': {
          templateUrl: 'templates/test/pet-index.html',
          controller: 'PetIndexCtrl'
        }
      }
    })

    .state('test.pet-detail', {
      url: '/pet/:petId',
      views: {
        'pets-test': {
          templateUrl: 'templates/test/pet-detail.html',
          controller: 'PetDetailCtrl'
        }
      }
    })

    .state('test.main', {
      url: '/main',
      views: {
        'main-test': {
          templateUrl: 'templates/test/mainbutton.html',
          controller: 'MainTab'
        }
      }
    })

    .state('test.adopt', {
      url: '/adopt',
      views: {
        'adopt-test': {
          templateUrl: 'templates/test/adopt.html'
        }
      }
    })

    .state('test.about', {
      url: '/about',
      views: {
        'about-test': {
          templateUrl: 'templates/test/about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/default');

});

