angular.module('myApp').service('IdentityService', function($http, API_BASE_URL) {
    this.addUser = function(userData) {
        console.log("************"+ userData);
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


