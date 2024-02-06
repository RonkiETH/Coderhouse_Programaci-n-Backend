import Router from "express";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawData = fs.readFileSync(`${__dirname}/../users.json`);
const users = JSON.parse(rawData);

const router = Router();

//Rute de inserción de usuarios
router.get('/insertion', async (req, res) => {
  try {
    let result = await user
  } catch (error) {
    
  }
}

// GET /api/users/
router.get(`/`, (req, res) => {
  return res.json({
    ok: true,
    usuarios: users.usuarios,
  });
});

// GET /api/users/:userId
router.get(`/:userId`, (req, res) => {
  console.log("PARAMS", req.params);
  const userId = req.params.userId;

  if (isNaN(userId)) {
    return res.status(400).json({
      ok: true,
      message: `no existe el usuario con el id ${userId}`,
      queryParams: req.query,
    });
  }

  const usuario = users.usuarios.find((u) => {
    return u.id === Number(userId);
  });

  if (!usuario) {
    return res.json({
      ok: true,
      message: `no existe el usuario con el id ${userId}`,
      usuario,
      queryParams: req.query,
    });
  }

  return res.json({ ok: true, message: `usuario id: ${userId}`, usuario });
});

// POST /api/users/
router.post(`/`, (req, res) => {
  const user = req.body;
  console.log("🚀 ~ router.post ~ user:", user);
  const lastId = users.usuarios[users.usuarios.length - 1].id;
  const newUser = {
    id: lastId,
    ...user,
  };
  res.json({ ok: true, message: `usuario creado`, usuario: newUser });
});

// PUT/api/users/:userId
router.put(`/:userId`, (req, res) => {});

// DELETE /api/users/:userId
router.delete(`/:userId`, (req, res) => {});

export default router;
