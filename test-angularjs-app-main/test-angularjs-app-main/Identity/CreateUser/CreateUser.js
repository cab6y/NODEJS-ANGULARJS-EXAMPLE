angular.module('myApp')
.controller('CreateUserController', function($scope, $http,API_BASE_URL) {
    $scope.user = {
        username: '',
        email: '',
        password: ''
    };

    $scope.createUser = function() {
        const userData = {
            username: $scope.user.username,
            email: $scope.user.email,
            password: $scope.user.password
        };

        $http.post(API_BASE_URL+'/add-user', userData)
        .then(function(response) {
            console.log('Başarıyla eklendi:', response.data);
            window.location.href = "/#!/login"
        })
        .catch(function(error) {
            console.error('Hata:', error);
        });
    };
});
