const express = require('express');
const fs = require('fs/promises');
const PORT = 5000;
const app = express();

let products; 

// Función para leer los productos desde el archivo
async function readProducts() {
    try {
        const data = await fs.readFile('../products.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error al leer el archivo de productos:', error.message);
    }
}

// Middleware para leer los productos antes de cada solicitud
app.use(async (req, res, next) => {
    try {
        products = await readProducts();
        next();
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: 'Error interno del servidor' 
        });
    }
});

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
app.get('/products', async (req, res) => {
    const { limit } = req.query;

    if (!limit) {
        return res.json({ products });
    }

    if (isNaN(limit)) {
        return res.status(401).json({
            ok: false,
            message: 'Error del lado del cliente',
        });
    }

    if (limit <= 0 || limit > products.length) {
        return res.status(400).json({
            ok: false,
            message: 'Ingresaste 0 o más productos de los que realmente hay',
        });
    }

    const productsFilter = products.filter((product) => product.id <= limit);

    return res.status(200).json({
        products: productsFilter,
    });
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        return res.status(401).json({
            ok: false,
            message: 'Error del lado del cliente',
        });
    }

    if (pid <= 0 || pid > products.length) {
        return res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe',
        });
    }

    const productsFilter = products.filter((product) => product.id == parseInt(pid));

    return res.status(200).json({
        products: productsFilter,
    });
});

app.listen(PORT, () => {
    console.log(`API RUNNING IN PORT: ${PORT}`);
});