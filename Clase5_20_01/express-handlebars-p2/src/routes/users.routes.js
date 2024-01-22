const { Router } = require("express");

const router = Router();

let users = [
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


// GET /api/users/
router.get(`/`, (req, res) => {
  return res.json({
    ok: true,
    users
  });
});

router.post('/', (req, res) => {
  const userBody = req.body,
    newUser = {
      ...userBody
    };

    users.push(newUser);

    res.json({
      ok: true,
      user: newUser
    })
})

module.exports = router;
