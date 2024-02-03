const fs = require('fs/promises');
const path = require('path');
const { readData } = require('../middlewares/readFiles.middleware');
const { validateDataTypes, findAvailableId, getProductsValidations, validateProductID } = require('../common/common');

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

async function getProducts(req, res) {
    const { limit } = req.query;
    const limitNumber = Number(limit);

    const validationResult = getProductsValidations(res,limit, products, limitNumber);

    if (validationResult) return res.status(validationResult.status).json(validationResult.response);
    

    const productsLimit = products.filter(product => product.id <= limit)

    return res.status(200).json({
        products: productsLimit,
    });
} 

async function getProductById(req, res) {
    try {
        const { pid } = req.params;
        const productId = parseInt(pid);

        if (isNaN(productId) || productId <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número positivo',
            });
        }

        const product = products.find(product => product.id === productId);

        if (!product) {
            return res.status(404).json({
                ok: false,
                message: 'El producto que estás buscando no fue encontrado',
            });
        }

        return res.status(200).json({
            product: product,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor',
        });
    }
}

async function addProduct(req, res) {
    try {
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

        validateDataTypes(res, title, description, code, price, stock, category, thumbnails)

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

        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));

        return res.status(200).json({
            ok: true,
            product: newProduct,
            message: "Producto agregado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al agregar el producto',
        });
    }
}

async function updateProduct(req, res) {
    try {
        const { pid } = req.params;
        const productId = parseInt(pid);

        if (isNaN(productId) || productId <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número positivo',
            });
        }

        const existingProductIndex = products.findIndex((product) => product.id === productId);

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
            return res.status(400).json({
                ok: false,
                message: 'Tipos de datos inválidos en los campos actualizados',
            });
        }

        products[existingProductIndex] = updatedProduct;

        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));

        return res.status(200).json({
            ok: true,
            product: updatedProduct,
            message: "Producto actualizado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al actualizar el producto',
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { pid } = req.params;
        const productId = parseInt(pid);

        if (isNaN(productId) || productId <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número positivo',
            });
        }

        const existingProductIndex = products.findIndex((product) => product.id === productId);

        if (existingProductIndex === -1) {
            return res.status(400).json({
                ok: false,
                message: 'El producto que estás buscando no existe',
            });
        }

        // Obtén el producto existente
        const existingProduct = products[existingProductIndex];

        // Elimina el producto de la lista
        products.splice(existingProductIndex, 1);

        products.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePath, JSON.stringify(products));

        return res.status(200).json({
            ok: true,
            product: existingProduct,
            message: "Producto eliminado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al eliminar el producto',
        });
    }
}

module.exports = {
    readProducts,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};