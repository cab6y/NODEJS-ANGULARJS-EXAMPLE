angular.module('myApp').controller('CreateProductController', function($scope, ProductService) {

    $scope.newProduct = {
        ProductName: "",
        StockQuantity: "",
        Price: ""
    };

    $scope.createProduct = function() {
        if ($scope.newProduct.ProductName && $scope.newProduct.StockQuantity && $scope.newProduct.Price) {
            ProductService.addProduct($scope.newProduct)
                .then(function(response) {
                    alert("************Ürün başarıyla eklendi***********!");
                    console.log(response);
                    window.location.href = "/#!/products";
                    // Formu sıfırla
                    $scope.newProduct = {
                        ProductName: "",
                        StockQuantity: "",
                        Price: ""
                    };
                })
                .catch(function(error) {
                    alert("Ürün eklenirken bir hata oluştu.");
                });
        } else {
            alert("Lütfen tüm alanları doldurun!");
        }
    };
});
