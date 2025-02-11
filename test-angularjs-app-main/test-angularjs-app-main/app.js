var app = angular.module('myApp', ['ngRoute']).constant('API_BASE_URL', 'http://localhost:3000');


angular.module('myApp').directive('menubar', function() {
    return {
        restrict: 'E',
        templateUrl: 'Menu/MenuBar.html', 
        controller: "MenuBarController"
    };
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {  
            templateUrl: 'Home/Home.html',
            controller: 'HomeController'  
        })
        .when('/create-user', {  
            templateUrl: 'Identity/CreateUser/CreateUser.html',
            controller: 'CreateUserController'  
        })
        .when('/login', {  
            templateUrl: 'Identity/Login/Login.html',
            controller: 'LoginController'  
        })
        .when('/products', {  
            templateUrl: 'Products/Product.html',
            controller: 'ProductController'  
        })
        .when('/create-product', {  
            templateUrl: 'Products/CreateProduct/CreateProduct.html',
            controller: 'CreateProductController'  
        })
        .when('/edit-product/:id', {  
            templateUrl: 'Products/EditProduct/EditProduct.html',
            controller: 'EditProductController'  
        })
        .otherwise({
            redirectTo: '/'
        });
});
    


