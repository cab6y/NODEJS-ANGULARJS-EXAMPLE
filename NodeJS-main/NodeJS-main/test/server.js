const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    // İstemciye başlangıçta bir mesaj gönder
    ws.send(JSON.stringify({ message: 'Hello from Node.js server!' }));

    // İstemciden gelen mesajları dinleme
    ws.on('message', (message) => {
        console.log('Received: %s', message);
        // İstemciye geri bir mesaj gönder
        ws.send(JSON.stringify({ message: 'Message received!' }));
    });

    // Bağlantı kapandığında yapılacak işlemler
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Hata yönetimi
    ws.on('error', (error) => {
        console.log('Error: ', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
