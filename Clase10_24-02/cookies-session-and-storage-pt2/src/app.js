const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const session = require("express-session");
const sessionRoutes = require("./routes/session.routes");
const AuthMiddleware = require("./middleware/auth.middleware");
// const cookiesRoutes = require("./routes/cookies.routes");
// const viewsRoutes = require("./routes/views.routes");

const PORT = 5000;

//ENV
const SECRET_SESSION = 'adasdasdasd'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "views"));

// app.use("/api/cookies/", cookiesRoutes);
// app.use("/api/views/", viewsRoutes);
app.use("/api/session/", sessionRoutes);
app.use("/api/private", AuthMiddleware, (req, res) => {
  if(req.session.admin) {
    return res.send("Welcome to the private area");
  }
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});