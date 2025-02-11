angular.module('myApp').controller('ProductController', function($scope, ProductService) {
    $scope.products = [];
    
    $scope.loadProducts = function() {
        debugger;
        getProducts();
    };
$('#search-results tbody').on('click', '.delete-btn', function() {
    var productId = $(this).data('id');
    $scope.deleteproduct = {
        id: productId
    };
    ProductService.deleteProduct($scope.deleteproduct)
    .then(function(response) {
        getProducts();
    });
});

$('#search-results tbody').on('click', '.edit-btn', function() {
    var productId = $(this).data('id');
    window.location.href = "/#!/edit-product/"+productId;
});

    $scope.loadProducts();

    function getProducts(){
        ProductService.getProducts().then(function(data) {
            $scope.products = data;
            console.log(data);
            setTimeout(function() {
                $('#search-results').DataTable({
                    destroy: true, 
                    responsive: true,
                    data: $scope.products,
                    columns: [
                        { title: "ID", data: "id" },
                        { title: "Ürün Adı", data: "ProductName" },
                        { title: "Fiyat", data: "Price" },
                        { title: "Adet", data: "StockQuantity" },
                        {
                            title: "Düzenle",
                            data: null,
                            render: function(data, type, row) {
                                return `<button class="edit-btn" data-id="${row.id}">Düzenle</button>`;
                            }
                        },
                        {
                            title: "Sil",
                            data: null,
                            render: function(data, type, row) {
                                return `<button class="delete-btn" data-id="${row.id}">Sil</button>`;
                            }
                        }
                    ]
                });
            }, 0);
        }).catch(function(error) {
            console.error('Ürünleri çekerken hata oluştu:', error);
        });
    }
});

