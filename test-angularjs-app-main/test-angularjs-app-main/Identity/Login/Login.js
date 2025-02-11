angular.module('myApp')
.controller('LoginController', function($scope, $http,API_BASE_URL) {
    if (sessionStorage.length > 0) {
        window.location.href = "/";
    }

    $scope.login = {
        username: '',
        password: ''
    };
    console.log(sessionStorage.user)

    $scope.login = function() {
        const userData = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        $http.post(API_BASE_URL+'/login', userData)
        .then(function(response) {
            debugger;
            if(response.data != false){
                console.log("**************"+response.data);
                $scope.loggedIn = true;
                $scope.user =  JSON.stringify(response.data);
                sessionStorage.user = JSON.stringify(response.data);
                console.log(sessionStorage.user + "-------------");
                window.location.href = "/";
            }
            
        })
        .catch(function(error) {
            console.error('Hata:', error);
        });
    };
});
