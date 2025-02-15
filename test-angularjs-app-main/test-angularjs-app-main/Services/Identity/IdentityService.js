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

    this.login = function(userData) {
        $http.post(API_BASE_URL + '/login', userData)
        .then(function(response) {
            if (response.data !== false) {
                console.log("**************" + response.data);
                $scope.loggedIn = true;
                $scope.user = JSON.stringify(response.data);
                sessionStorage.user = JSON.stringify(response.data);
                console.log(sessionStorage.user + "-------------");
                window.location.href = "/";
            } else  if (response.data == false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Giriş Başarısız!',
                    text: 'Kullanıcı adı veya şifre hatalı.',
                    confirmButtonText: 'Tamam'
                });
            }
        })
        .catch(function(error) {
            console.error('Hata:', error);
            Swal.fire({
                icon: 'error',
                title: 'Bir hata oluştu!',
                text: 'Sunucuya bağlanırken bir hata meydana geldi.',
                confirmButtonText: 'Tamam'
            });
        });
    };
    
});


