angular.module('myApp')
.controller('MenuBarController', function($scope, $http) {
    if (sessionStorage.length > 0) {
        debugger;
        user = JSON.parse(sessionStorage.user)
        $scope.isLoggedIn = true;
        $scope.username = user.username;
    } else {
        $scope.isLoggedIn = false;
    }

    $scope.logout = function() {
        sessionStorage.clear(); 
        $http.post('http://localhost:3000/logout')
        .then(function(response) {
            window.location.href = "/";
        })
        .catch(function(error) {
            console.error('Hata:', error);
        });
        $scope.isLoggedIn = false; 
    };
});
