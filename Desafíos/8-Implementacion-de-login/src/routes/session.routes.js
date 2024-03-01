// session.routes.js

const { Router } = require("express");
const userModel = require("../models/User");

const router = Router();

// Ruta GET para la página de inicio de sesión
router.get("/login", (req, res) => {
  // Renderiza la página de inicio de sesión
  res.render("login", { title: "Iniciar Sesión" });
});

// Ruta GET para la página de registro
router.get("/register", (req, res) => {
  // Renderiza la página de registro
  res.render("register", { title: "Registrarse" });
});

// Ruta GET para cerrar sesión
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: 'error', payload: 'Internal Server Error' });
    }
    return res.redirect("/api/session/login");
  });
});

router.get("/profile", async (req, res) => {
    if (req.session.user) {
      // Utiliza la información almacenada en la sesión
      const { email, isAdmin, firstName, lastName } = req.session.user;
  
      // Muestra la información en la consola para asegurarte de que sea correcta
      console.log("User information in profile route:", { email, isAdmin });
  
      return res.render("profile", { title: "Perfil", user: { email, isAdmin, firstName, lastName } });
    } else { 
      return res.redirect("/api/session/login");
    }
  });
  
  

// Ruta POST para iniciar sesión
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
          email,
          isAdmin: true,
        };
      } else {
        const findUser = await userModel.findOne({ email });
  
        if (!findUser) {
          console.log("User not found in the database");
          return res.json({ message: `user not registered` });
        }
  
        if (findUser.password !== password) {
          console.log("Incorrect password");
          return res.json({ message: `wrong password` });
        }
  
        req.session.user = {
          email,
          isAdmin: false,
          firstName: findUser.first_name,
          lastName: findUser.last_name,
        };
      }
  
      console.log("Session after login:", req.session);
  
      return res.redirect("/api/products");
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: 'error', payload: 'Internal Server Error' });
    }
  });
  
// Ruta POST para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const addUser = {
      first_name,
      last_name,
      email,
      age,
      password,
    };

    const newUser = await userModel.create(addUser);

    if (!newUser) {
      return res.status(500).json({ message: `Error al registrar el usuario` });
    }

    req.session.user = { email, firstName: first_name, lastName: last_name };
    return res.redirect("/api/session/login");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 'error', payload: 'Internal Server Error' });
  }
});

module.exports = router;

