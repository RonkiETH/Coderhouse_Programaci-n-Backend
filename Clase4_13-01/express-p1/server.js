const express = require("express");
const users = require('./users.json');

const PORT = 6500;

const app = express();

const gendersAllowed = ["f", "m"];

app.use(express.urlencoded({ extends: true }));

app.get("/", (req,res) => {
    res.send(`API CORRIENDO EN EL PUERTO ${PORT}`)
});

app.get("/saludar/:nombre/:apellido/:square?", (req,res) => {
    console.log("Parámetros en el request", req.params);
    const { nombre, apellido, square } = req.params

    res.send(`API SALUDANDO A ${nombre} ${apellido} ${square}`)
});

app.get("/bienvenida", (req,res) => {
    res.send(`<h1>Hola, soy una página web</h1>`)
});

app.get("/usuarios", (req,res) => {
    console.log("Query Params", req.query);
    const { sexo, edad, color, hijos = "no" } = req.query

    const usersList = users.usuarios;

    if (
        !sexo || 
        !gendersAllowed.includes((!sexo ? "" : sexo).toLocaleLowerCase())) {
        return res.json({ 
            message: "Todos los usuarios", 
            users: usersList 
        });
    }

    const usersFilter = users.usuarios.filter((user) => user.sexo === sexo);
    res.json({ 
        message: 'Enviando un usuario', 
        user: usersFilter,
        sexo, 
        edad, 
        color, 
        hijos 
    })
});

app.listen(PORT, () => {
    console.log("Servidor corriendo");
})
