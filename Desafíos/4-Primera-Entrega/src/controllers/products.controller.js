const { 
    findAvailableId,
} = require('../helpers/products.helpers');

const controller = {};

controller.getProducts = async (req, res, products) => {
    const { limit } = req.query;

    if (!limit) {
        return { 
            ok: true, 
            products 
        };
    }

    if (isNaN(limit)) {
        return {
            ok: false,
            response: res.status(401).json({
                ok: false,
                message: 'Error del lado del cliente',
            }),
        };
    }

    if (limit <= 0 || limit > products.length) {
        return {
            ok: false,
            response: res.status(400).json({
                ok: false,
                message: 'Ingresaste 0 o más productos de los que realmente hay',
            }),
        };
    }

    const productsLimit = products.filter(product => product.id <= limit)

    return res.status(200).json({
        products: productsLimit,
    });
};

controller.getProductById = async (req, res, products) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        return {
            ok: false,
            response: res.status(401).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número',
            }),
        };
    }

    if (pid <= 0 || pid > products.length) {
        return {
            ok: false,
            response: res.status(400).json({
                ok: false,
                message: 'El producto que estás buscando no existe',
            }),
        };
    }

    return res.status(200).json({
        products: products.filter(product => product.id === parseInt(pid)),
    });
};

controller.addProduct = async (req, res, products) => {
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
        return {
            ok: false,
            message: 'Todos los campos son obligatorios, excepto "thumbnails"',
        };
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
        return {
            ok: false,
            message: 'Tipos de datos inválidos en los campos',
        };
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
        await fs.writeFile('../products.json', JSON.stringify(products));
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
};

controller.updateProduct = async (req, res, products) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        return {
            ok: false,
            response: res.status(401).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número',
            }),
        };
    }

    if (pid <= 0 || pid > products.length) {
        return {
            ok: false,
            response: res.status(400).json({
                ok: false,
                message: 'El producto que estás buscando no existe',
            }),
        };
    }

    const existingProductIndex = productsFilter.findIndex((product) => product.id === parseInt(pid));

    if (existingProductIndex === -1) {
        return res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe',
        });
    }

    // Obtén el producto existente
    const existingProduct = productsFilter[existingProductIndex];

    // Actualiza el producto con los campos proporcionados en el body
    const updatedProduct = {
        ...existingProduct,
        ...req.body,
    };

    // Realiza las validaciones de tipo de datos
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

    // Actualiza el producto en la lista
    products[existingProductIndex] = updatedProduct;

    // Guarda la lista actualizada de productos en el archivo
    try {
        await fs.writeFile('../products.json', JSON.stringify(products));
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
};

controller.deleteProduct = async (req, res, products) => {
    const { pid } = req.params;

    if (isNaN(pid)) {
        return {
            ok: false,
            response: res.status(401).json({
                ok: false,
                message: 'El ID para buscar el producto debe ser un número',
            }),
        };
    }

    if (pid <= 0 || pid > products.length) {
        return {
            ok: false,
            response: res.status(400).json({
                ok: false,
                message: 'El producto que estás buscando no existe',
            }),
        };
    }

    const existingProductIndex = products.findIndex((product) => product.id === parseInt(pid));

    if (existingProductIndex === -1) {
        return res.status(400).json({
            ok: false,
            message: 'El producto que estás buscando no existe',
        });
    }

    try {
    // Obtén el producto existente
    const existingProduct = products[existingProductIndex];

    // Elimina el producto de la lista
    products.splice(existingProductIndex, 1);

    // Guarda la lista actualizada de productos en el archivo
    
    await fs.writeFile('../products.json', JSON.stringify(products));
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
};

module.exports = controller;
