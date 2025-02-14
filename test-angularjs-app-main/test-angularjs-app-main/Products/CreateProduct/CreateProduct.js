angular.module('myApp')
.controller('CreateProductController', function($scope, ProductService, $timeout) {
    $scope.filebase64 = "";
    $scope.newProduct = {
        ProductName: "",
        StockQuantity: "",
        Price: "",
        Image: null
    };

    // Dosya yüklendiğinde çağrılacak fonksiyon
    $scope.onFileDropped = function(base64Data) {
        // Use $timeout to delay the $apply and avoid conflict with ongoing digest cycles
        $timeout(function() {
            $scope.newProduct.Image = base64Data;
            console.log("Yüklenen Resim (Base64):", $scope.newProduct.Image);
        });
    };

    $scope.createProduct = function() {
        if ($scope.newProduct.ProductName && $scope.newProduct.StockQuantity && $scope.newProduct.Price) {
            ProductService.addProduct($scope.newProduct)
                .then(function(response) {
                    alert("************Ürün başarıyla eklendi***********!");
                    console.log(response);
                    window.location.href = "/#!/products";
                    $scope.newProduct = { ProductName: "", StockQuantity: "", Price: "", Image: null };
                })
                .catch(function(error) {
                    alert("Ürün eklenirken bir hata oluştu.");
                });
        } else {
            alert("Lütfen tüm alanları doldurun!");
        }
    };
});

angular.module('myApp')
.directive('fileDropzone', function() {
    return {
        restrict: 'A',
        scope: {
            file: '=',
            onFileDropped: '&' // Dosya düştüğünde çalışacak fonksiyon
        },
        link: function(scope, element) {
            var processDragOverOrEnter = function(event) {
                event.preventDefault();
                event.stopPropagation();
                element.addClass('dragging');
            };

            var processDragLeave = function(event) {
                event.preventDefault();
                element.removeClass('dragging');
            };

            var processDrop = function(event) {
                event.preventDefault();
                event.stopPropagation();
                element.removeClass('dragging');

                var files = (event.originalEvent || event).dataTransfer.files;
                if (files.length > 0) {
                    var file = files[0];
                    var reader = new FileReader();

                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            var base64String = loadEvent.target.result;
                            scope.file = base64String;

                            // Controller'a Base64'ü gönder
                            scope.onFileDropped({ base64Data: base64String });
                        });
                    };

                    reader.readAsDataURL(file);
                }
            };

            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragleave', processDragLeave);
            element.bind('drop', processDrop);
        }
    };
});
