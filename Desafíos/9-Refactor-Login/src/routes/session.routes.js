// session.routes.js

const { Router } = require("express");
const userModel = require("../models/User");
const { createHash, isValidPasswd } = require("../utils/encrypt");

const router = Router();

// Ruta GET para cerrar sesión
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: 'error', payload: 'Internal Server Error' });
    }
    return res.redirect("/api/views/login");
  });
});

// Ruta POST para iniciar sesión
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const session = req.session;

      const findUser = await userModel.findOne({ email });

      if (!findUser) return res.json({ message: `User is not registered` });
  
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        session.user = {
          email,
          isAdmin: true,
        };
      } else {
        const findUser = await userModel.findOne({ email });
  
        if (!findUser) {
          console.log("User not found in the database");
          return res.json({ message: `user not registered` });
        }

        const isValidComparePsw = await isValidPasswd(password, findUser.password);

        if (!isValidComparePsw) {
          return res.json({ message: `Wrong password` });
        }
  
        session.user = {
          email,
          isAdmin: false,
          firstName: findUser.first_name,
          lastName: findUser.last_name,
        };
      }
  
      console.log("Session after login:", session);
  
      return res.redirect("/api/products");
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ status: 'error', payload: 'Internal Server Error' });
    }
  });

router.post("/register", async (req, res) => {
    try {
      console.log("BODY REGISTER***", req.body);
      const { first_name, last_name, email, age, password } = req.body;
  
      const pswHashed = await createHash(password);
  
      const addUser = {
        first_name,
        last_name,
        email,
        age,
        password: pswHashed,
      };
      // creando el usurio en mongo
      const newUser = await userModel.create(addUser); // promesa
  
      if (!newUser) {
        return res
          .status(500)
          .json({ message: `we have some issues register this user` });
      }
  
      // session del usuario
      req.session.user = { email, firstName: first_name, lastName: last_name };
      return res.redirect("/api/views/login");
    } catch (error) {
      // atrapa todos los reject de todas las promesas
      console.log(
        "🚀 ~ file: session.routes.js:77 ~ router.post ~ error:",
        error
      );
    }
  });

module.exports = router;