angular.module('myApp') 
.controller('HomeController', function($scope) {
    
    const socket = new WebSocket('ws://localhost:8080'); 

    socket.onopen = function(event) {
        console.log('WebSocket bağlantısı açıldı:', event);
        console.log('WebSocket bağlantısı açıldı!')
    };

    socket.onmessage = function(event) {
        console.log('Sunucudan gelen mesaj:', event.data);
        $scope.response = event.data;  
        $scope.$apply();  
    };

    $scope.sendMessage = function() {
        alert("Butona tıklandı!");

        const message = 'SİVASSPOR';
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    };
});
