angular.module('myApp').controller('EditProductController', function($scope, $routeParams, ProductService,$timeout) {
    var productId = $routeParams.id; 
    $scope.product = {
        id: "",
        ProductName: "",
        StockQuantity: "",
        Price: "",
        Image: null
    };
// Dosya yüklendiğinde çağrılacak fonksiyon
$scope.onFileDropped = function(base64Data) {
    // Use $timeout to delay the $apply and avoid conflict with ongoing digest cycles
    $timeout(function() {
        $scope.product.Image = base64Data;
        console.log("Yüklenen Resim (Base64):", $scope.product.Image);
    });
};
    ProductService.getProduct(productId).then(function(response) {
        console.log("**********"+response.data.Image.replace('"',''))
        $scope.product = response.data;
        $scope.product.Image = response.data.Image;
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

