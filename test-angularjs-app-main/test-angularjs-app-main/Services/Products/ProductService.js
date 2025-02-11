angular.module('myApp').service('ProductService', function($http, API_BASE_URL) {
    this.getProducts = function() {
        return $http.get(API_BASE_URL + '/list-product')
            .then(function(response) {
                return response.data; 
            })
            .catch(function(error) {
                console.error('Hata:', error);
                throw error;
            });
    };
    this.addProduct = function(product) {
        debugger;
        return $http.post(API_BASE_URL + '/add-product', product)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Ürün eklenirken hata oluştu:', error);
                throw error;
            });
    };
    this.deleteProduct = function(jsondata) {
        debugger;
        return $http.post(API_BASE_URL + '/rem-product', jsondata)
        .catch(function(error) {
            console.error('Ürün silinirken hata oluştu:', error);
            throw error;
        });
    };
    this.getProduct = function(productid) {
        return $http.get(API_BASE_URL + '/get-product/' + productid);  // URL parametresini kullanıyoruz
    };

    this.updateProduct = function(product) {
        debugger;
        return $http.put(API_BASE_URL + '/update-product' , product);  // URL parametresini kullanıyoruz
    };
});


