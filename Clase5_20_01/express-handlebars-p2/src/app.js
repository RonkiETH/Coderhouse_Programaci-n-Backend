const express = require("express");
const handlebars = require('express-handlebars');
const path = require('path')
const usersRoutes = require("./routes/users.routes");
const petsRoutes = require("./routes/pets.routes");
const viewRoutes = require("./routes/views.routes")

const app = express();
const PORT = 5000;
const API_PREFIX = "api";

const users = [
  {
    name: "Luis",
    lastName: "Espinoza",
    age: 26,
    phone: "1234567890",
    email: "correo@gmail.com"
  },
  {
    name: "Jorge",
    lastName: "Macri",
    age: 30,
    phone: "1234567890",
    email: "correo@gmail.com"
  },
  {
    name: "Pedro",
    lastName: "Picapiedra",
    age: 46,
    phone: "1234567890",
    email: "correo@gmail.com"
  },
  {
    name: "Santiago",
    lastName: "Pucapto",
    age: 56,
    phone: "1234567890",
    email: "correo@gmail.com"
  },
  {
    name: "Felipe",
    lastName: "Pigña",
    age: 26,
    phone: "1234567890",
    email: "correo@gmail.com"
  },
]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración Handlebars
app.engine("handlebars", handlebars.engine());
app.set('views', path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(`/static`, express.static(__dirname + "/public"));
// USERS ROUTES
// /api/users
app.use(`/${API_PREFIX}/users`, usersRoutes);

// PETS ROUTES
// /api/pets
app.use(`/${API_PREFIX}/pets`, petsRoutes);

// Views Routes
app.use("/", viewRoutes)


// Views Handlebars Engine
app.get('/saludar', (req, res) => {
  const randomUser = Math.ceil(Math.random() * users.length);

  const userRender = users[randomUser]

  res.render('index', { name: userRender.name })
})

app.get('/user', (req, res) => {
  const randomUser = Math.ceil(Math.random() * users.length);

  const userRender = users[randomUser]

  res.render('users', { user: userRender })
})

app.listen(PORT, () => {
  console.log(`UP AND RUNNING ON PORT: ${PORT}`);
});
