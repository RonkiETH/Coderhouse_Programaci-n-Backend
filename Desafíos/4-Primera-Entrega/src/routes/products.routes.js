const { Router } = require("express");
const path = require('path')
const fs = require('fs/promises');
const router = Router();

// Controllers
// const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/products.controller')

let products;
const filePath = path.resolve(__dirname, '../products.json');
async function readProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { error: 'Error al leer el archivo de productos: ' + error.message };
    }
}

router.use(async (req, res, next) => {
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

const findAvailableId = (products) =>  {
    const usedIds = new Set(products.map(product => product.id));
    let id = 1;
    
    while (usedIds.has(id)) {
        id++;
    }

    return id;
}

router.get('/', async (req,res) => {
    const { limit } = req.query;

    if (!limit) {
        res.status(200).json({ ok: true, products });
        return;
    }

    const limitNumber = Number(limit);

    if (isNaN(limitNumber) || !Number.isInteger(limitNumber)) {
        res.status(401).json({
            ok: false,
            message: 'El limit para ver la cantidad de usuarios debe ser un número entero'
        });
        return;
    }

    if (limitNumber <= 0 || limitNumber > products.length) {
        res.status(400).json({
            ok: false,
            message: 'Ingresaste 0 o más productos de los que realmente hay',
        });
        return;
    }

    const productsLimit = products.filter(product => product.id <= limit)

    return res.status(200).json({
        products: productsLimit,
    });
}) 

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        res.status(401).json({
            ok: false,
            message: 'El ID para buscar el producto debe ser un número'
        });
        return;
    }

    const productId = parseInt(pid);

    if (productId <= 0 || productId > products.length) {
        res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe'
        });
        return;
    }

    const product = products.find(product => product.id === productId);

    if (!product) {
        res.status(404).json({
            ok: false,
            message: 'El producto que estás buscando no fue encontrado'
        });
        return;
    }

    return res.status(200).json({
        product: product,
    });
});

router.post(`/`, async (req,res) => {
    const { 
        title, 
        description, 
        code, 
        price, 
        status = true, 
        stock, 
        category,
        thumbnails
    } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({
            ok: false,
            message: 'Todos los campos son obligatorios, excepto "thumbnails"',
        });
        return;
    }

    if (
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof code !== 'string' ||
        typeof price !== 'number' ||
        typeof stock !== 'number' ||
        typeof category !== 'string' ||
        !Array.isArray(thumbnails) ||
        !thumbnails.every(item => typeof item === 'string')
    ) {
        res.status(400).json({
            ok: false,
            message: 'Tipos de datos inválidos en los campos',
        });
        return;
    }

    const lastId = findAvailableId(products);

    const newProduct = {
        id: lastId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    products.push(newProduct);

    try {
        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));
        return {
            ok: true,
            response: res.status(200).json({
                ok: true,
                product: newProduct,
                message: "Producto agregado con éxito"
            }),
        };
    } catch (error) {
        return {
            ok: false,
            response: res.status(500).json({
                ok: false,
                message: 'Error al agregar el producto',
            }),
        };
    }
});

router.put('/:pid', async (req,res) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        res.status(401).json({
            ok: false,
            message: 'El ID para buscar el producto debe ser un número'
        });
        return;
    }

    const productId = parseInt(pid);

    if (productId <= 0 || productId > products.length) {
        res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe'
        });
        return;
    }

    const existingProductIndex = products.findIndex((product) => product.id === parseInt(pid));

    if (existingProductIndex === -1) {
        return res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe',
        });
    }

    // Obtén el producto existente
    const existingProduct = products[existingProductIndex];

    const updatedProduct = {
        ...existingProduct,
        ...req.body,
    };

    if (typeof updatedProduct.title !== 'undefined' && typeof updatedProduct.title !== 'string' ||
        typeof updatedProduct.description !== 'undefined' && typeof updatedProduct.description !== 'string' ||
        typeof updatedProduct.code !== 'undefined' && typeof updatedProduct.code !== 'string' ||
        typeof updatedProduct.price !== 'undefined' && typeof updatedProduct.price !== 'number' ||
        typeof updatedProduct.status !== 'undefined' && typeof updatedProduct.status !== 'boolean' ||
        typeof updatedProduct.stock !== 'undefined' && typeof updatedProduct.stock !== 'number' ||
        typeof updatedProduct.category !== 'undefined' && typeof updatedProduct.category !== 'string' ||
        typeof updatedProduct.thumbnails !== 'undefined' && (!Array.isArray(updatedProduct.thumbnails) || !updatedProduct.thumbnails.every(item => typeof item === 'string'))) {
        res.status(400).json({
            ok: false,
            message: 'Tipos de datos inválidos en los campos actualizados',
        });
        return;
    }

    products[existingProductIndex] = updatedProduct;

    try {
        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));
        return {
            ok: true,
            response: res.status(200).json({
                ok: true,
                product: updatedProduct,
                message: "Producto actualizado con éxito"
            }),
        };
    } catch (error) {
        return {
            ok: false,
            response: res.status(500).json({
                ok: false,
                message: 'Error al actualizar el producto',
            }),
        };
    }

    
});

router.delete('/:pid', async(req,res) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        res.status(401).json({
            ok: false,
            message: 'El ID para buscar el producto debe ser un número'
        });
        return;
    }

    const productId = parseInt(pid);

    if (productId <= 0 || productId > products.length) {
        res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe'
        });
        return;
    }

    const existingProductIndex = products.findIndex((product) => product.id === parseInt(pid));

    if (existingProductIndex === -1) {
            res.status(400).json({
                ok: false,
                message: 'El producto que estás buscando no existe',
        });
        return;
    }

    try {
    // Obtén el producto existente
    const existingProduct = products[existingProductIndex];

    // Elimina el producto de la lista
    products.splice(existingProductIndex, 1);

    // Guarda la lista actualizada de productos en el archivo
        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));
        return {
            ok: true,
            response: res.status(200).json({
                ok: true,
                product: existingProduct,
                message: "Producto eliminado con éxito"
            }),
        };
    } catch (error) {
        return {
            ok: false,
            response: res.status(500).json({
                ok: false,
                message: 'Error al eliminar el producto',
            }),
        };
    }
});

module.exports = router;