angular.module('myApp')
.controller('CreateUserController', function($scope,IdentityService) {
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

        IdentityService.addUser(userData)
        .then(function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Kayıt Başarılı!',
                text: 'Giriş Sayfasın Yönlendiriliyorsunuz.',
                confirmButtonText: 'Tamam'
            }).then(function() {
                window.location.href = "/#!/Login";
            $scope.user = {
                username: '',
                email: '',
                password: ''
            };
            });;
            
        })
        .catch(function(error) {
            alert("Ürün eklenirken bir hata oluştu.");
        });
    };
});
