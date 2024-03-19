const { Router } = require("express");
const passport = require("passport");
const authMdw = require("../middlewares/auth.middleware");
const router = Router();

// Ruta GET para la página de inicio de sesión
router.get("/login", (req, res) => {
    // Renderiza la página de inicio de sesión
    res.render("login", { title: "Iniciar Sesión" });
});

router.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/api/products",
        failureRedirect: "/api/faillogin",
        failureFlash: true, // Display flash messages if needed
    })
);

router.get("/faillogin", async (req, res) => {
    res.send({ error: "login strategy failed" });
});

// Ruta GET para la página de registro
router.get("/register", (req, res) => {
    // Renderiza la página de registro
    res.render("register", { title: "Registrarse" });
});

router.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/api/session/login",
        failureRedirect: "/api/failregister",
        failureFlash: true,
    })
);

router.get("/failregister", async (req, res) => {
    res.send({ error: "register strategy failed" });
});

router.get("/profile", authMdw, async (req, res) => {
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

module.exports = router;