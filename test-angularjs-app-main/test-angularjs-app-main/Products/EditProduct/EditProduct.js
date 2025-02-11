angular.module('myApp').controller('EditProductController', function($scope, $routeParams, ProductService) {
    var productId = $routeParams.id; 
    $scope.product = {
        id: "",
        ProductName: "",
        StockQuantity: "",
        Price: ""
    };

    ProductService.getProduct(productId).then(function(response) {
        $scope.product = response.data;
        console.log("Ürün verisi başarıyla alındı:", $scope.product);
    }).catch(function(error) {
        console.error('Ürün yüklenirken hata oluştu:', error);
        $scope.product = null;
    });

    $scope.createProduct = function() {
        if ($scope.product.ProductName && $scope.product.StockQuantity && $scope.product.Price) {
            ProductService.updateProduct($scope.product)
                .then(function(response) {
                    alert("Ürün başarıyla güncellendi!");
                    console.log(response);
                    window.location.href = "/#!/products";  
                })
                .catch(function(error) {
                    alert("Ürün güncellenirken bir hata oluştu.");
                    console.error(error);
                });
        } else {
            alert("Lütfen tüm alanları doldurun!");
        }
    };
});
