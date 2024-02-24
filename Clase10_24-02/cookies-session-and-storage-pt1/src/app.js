const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const cookiesRoutes = require("./routes/cookies.routes");
const viewsRoutes = require("./routes/views.routes");

const PORT = 5000;

//ENV
const COOKIE_SIGN = 'adasdasdasd'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SIGN));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));

app.use("/api/cookies/", cookiesRoutes);
app.use("/api/views/", viewsRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});