const express = require('express');
const path = require('path');
const viewsRouter = require("./routes/views.routes");
const handlebars = require("express-handlebars");
const http = require('http');
const { Server } = require("socket.io");
const products = require('./products.json');

const app = express();
const PORT = 8080;

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);

httpServer.listen(PORT, () => {
    console.log(`Aplicación corriendo en el puerto: ${PORT}`);
  });

  io.on('connection', (socket) => {

    socket.on("message", (data) => {
        console.log(data)
    })

    io.emit('products', { products: products });

    socket.on('createProduct', (newProduct) => {
        const maxId = Math.max(...products.map(product => product.id)); 
        newProduct.id = maxId + 1;
    
        products.push(newProduct);
    
        io.emit('products', { products });
    });

    socket.on('deleteProduct', (id) => {
        const productId = parseInt(id, 10);
    
        if (!isNaN(productId)) {
            const index = products.findIndex((product) => product.id === productId);
            
            if (index !== -1) {
                products.splice(index, 1);
                io.emit('products', { products });
            } else {
                console.log('No se encontró el producto con el ID especificado.');
            }
        } else {
            console.log('El ID proporcionado no es un número válido.');
        }
    });
});