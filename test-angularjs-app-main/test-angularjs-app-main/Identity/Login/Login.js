angular.module('myApp')
.controller('LoginController', function($scope, $http, API_BASE_URL,IdentityService) {
    if (sessionStorage.length > 0) {
        window.location.href = "/";
    }

    $scope.login = {
        username: '',
        password: ''
    };

    $scope.login = function() {
        const userData = {
            username: $scope.user.username,
            password: $scope.user.password
        };
        IdentityService.login(userData)
        .then(function(response) {
           
            
        })
    };
});
