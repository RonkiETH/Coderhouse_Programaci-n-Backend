import path from "path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js"

const PORT = 3000;
const app = express();

const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", viewsRouter);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado: ", socket.id);

    socket.on("message", (data) => {
        console.log(data)
    })

    socket.emit("evento_para_socket_individual", "Este mensaje sólo lo debe recibir el socket");

    socket.broadcast.emit("evento_para_todos_menos_el_socket_actual", "Este evento lo verán todos los sockets conectados, MENOS el socket actual desde qel que se envió el mensaje");

    io.emit("evento_para_todos", "Este mensaje lo reciben todos los sockets conectados")
})