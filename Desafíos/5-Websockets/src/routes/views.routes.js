const { Router } = require('express');
const router = Router();
const fs = require('fs/promises');
const path = require('path');
const { readData } = require('../middlewares/readFiles.middleware');

const filePath = path.resolve(__dirname, '../products.json');
let products;

async function readProducts(req, res, next) {
    try {
        products = await readData(filePath);
        next();
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: 'Error al intentar leer el archivo de productos' 
        });
    }
}

router.use(readProducts);

router.get("/", (req, res) => {
    res.render("index",)
})

router.get("/products", (req, res) => {
    res.render("home", {products: products})
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
})


module.exports = router