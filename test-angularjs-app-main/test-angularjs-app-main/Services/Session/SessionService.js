angular.module('myApp', [])
  .service('SessionService', function($sessionStorage, $localStorage) {
    
    // Oturum açma işlemi
    this.startSession = function(username, userId) {
      $sessionStorage.username = username;  // Oturum bilgilerini sessionStorage'da sakla
      $sessionStorage.userId = userId;
    };

    // Oturumdan çıkma işlemi
    this.endSession = function() {
      delete $sessionStorage.username;
      delete $sessionStorage.userId;
    };

    // Oturum bilgisi al
    this.getSession = function() {
      return {
        username: $sessionStorage.username,
        userId: $sessionStorage.userId
      };
    };

    // Kullanıcı giriş durumu
    this.isUserLoggedIn = function() {
      return !!$sessionStorage.username;
    };
  });
