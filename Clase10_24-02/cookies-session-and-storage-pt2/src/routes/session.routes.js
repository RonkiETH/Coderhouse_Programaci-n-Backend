const { Router } = require('express');

const router = Router();

router.get("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username !== "Ronki" || password !== "123456") {
        return res.json({ message: "Login fallido" })
    }

    req.session.user = username
    req.session.admin = true

    return res.json({ message: "Login exitoso" })
})

router.get("/logout", async (req, res) => {
    req.session.destroy(error => {
        if(!error) return res.json({ message: "Logout successful"})
        return res.send({ message: "Error on logout", body: error})
    });
    res.redirect("/login");
})

router.get("/welcome", async (req, res) => {
    const { name } = req.query;

    const counter = req.session?.counter;

    if(!counter) {
        req.session.counter = 1
        return res.send(`Bienvenido ${name}`)
    }

    req.session.counter++
    res.send(`Visitas: ${req.session.counter} - Usuario: ${name}`);
})

module.exports = router;