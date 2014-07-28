angular.module('user.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('userService', function() {
  // Might use a resource here that returns a JSON array

  return {
    kset: function(key, value) {
      window.localStorage.setItem(key, value);
    },
    kget: function(key) {
      return window.localStorage.getItem(key);
    },
    kremove: function(key) {
      window.localStorage.removeItem(key);
    }
  }
});