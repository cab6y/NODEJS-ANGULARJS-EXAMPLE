const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws'); 
const UserController = require('./users'); 
const ProductController = require('./product'); 
const cors = require('cors');
const session = require('express-session');
const swaggerSetup = require("./swagger-setup"); 


const app = express();
app.use(bodyParser.json()); 
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],  
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json()); 

app.use(session({
    secret: 'ŞEBİNKARAHİSAR', 
    resave: false,         
    saveUninitialized: true,  
    cookie: { secure: false }
}));

UserController(app); 
ProductController(app);
swaggerSetup(app); 

// WEB SOCKET KULLANIMI
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Yeni bir istemci bağlandı!');

    // İlk bağlanınca istemciye mesaj at
    ws.send(JSON.stringify({ message: 'Hello from Node.js server!' }));

    ws.on('message', (message) => {
        console.log('Received: %s', message);
        ws.send(JSON.stringify({ message: message.toString() }));
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.log('Error: ', error);
    });
});

// HTTP Sunucusunu Başlat
app.server = app.listen(3000, () => {
    console.log('Sunucu 3000 portunda çalışıyor...');
    console.log('Swagger UI: http://localhost:3000/api-docs');
});
