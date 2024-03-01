const express = require("express");
const path = require('path');
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const indexRoutes = require("./routes/index.routes");
const authMiddleware = require("./middlewares/auth.middleware");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET_SESSION = process.env.SECRET_SESSION;

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
app.use(
  expressSession({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);

const API = "api";

app.engine("handlebars", handlebars.engine());


app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));

app.use(`/${API}`, indexRoutes);
app.use

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
