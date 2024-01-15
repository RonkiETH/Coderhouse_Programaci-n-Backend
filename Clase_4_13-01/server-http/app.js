const http = require('http');

const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log("Procesando la petición");
    res.end("Hola, esta es mi primera respuesta desde el servidor")
});

server.listen(PORT, () => {
    console.log("Servidor ejecutándose");
})