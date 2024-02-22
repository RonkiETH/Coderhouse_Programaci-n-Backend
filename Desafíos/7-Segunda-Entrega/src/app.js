const express = require("express");
const path = require('path');
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const dotenv = require('dotenv'); // Importa dotenv
const indexRoutes = require("./routes/index.routes");

dotenv.config(); // Carga las variables de entorno

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => {
    console.log("🚀 ~ file: app.js:16 ~ CONECTADO!:", conn);
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:19 ~ err:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API = "api";

app.engine("handlebars", handlebars.engine());


app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));

app.use(`/${API}`, indexRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
