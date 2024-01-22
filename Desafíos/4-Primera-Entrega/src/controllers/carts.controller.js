const fs = require('fs/promises');
const path = require('path');
const { readData } = require('../middlewares/readFiles.middleware');

const filePathCarts = path.resolve(__dirname, '../carts.json');
const filePathProducts = path.resolve(__dirname, '../products.json');
let carts;
let products;

async function readCarts(req, res, next) {
    try {
        carts = await readData(filePathCarts);
        next();
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: 'Error interno del servidor' 
        });
    }
}

async function readProducts(req, res, next) {
    try {
        products = await readData(filePathProducts);
        next();
    } catch (error) {
        res.status(500).json({ 
            ok: false, 
            message: 'Error interno del servidor' 
        });
    }
}

const findAvailableId = (carts) =>  {
    const usedIds = new Set(carts.map(cart => cart.id));
    let id = 1;
    
    while (usedIds.has(id)) {
        id++;
    }

    return id;
}

async function createCart(req, res) {
    const lastId = findAvailableId(carts);

    const newCart = {
        id: lastId,
        products: []
    };

    carts.push(newCart);

    try {
        carts.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePathCarts, JSON.stringify(carts));
        return res.status(200).json({
            ok: true,
            cart: newCart,
            message: "Carrito agregado con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al agregar el carrito',
        });
    }
}

async function getCartById(req, res) {
    const { cid } = req.params;

    if (isNaN(cid)) {
        res.status(401).json({
            ok: false,
            message: 'El ID para buscar el carrito debe ser un número'
        });
        return;
    }

    const cartId = parseInt(cid);

    if (cartId <= 0 || cartId > carts.length) {
        res.status(400).json({
            ok: false,
            message: 'El carrito que estás buscando no existe'
        });
        return;
    }

    const cart = carts.find(cart => cart.id === cartId);

    if (!cart) {
        res.status(404).json({
            ok: false,
            message: 'El carrito que estás buscando no fue encontrado'
        });
        return;
    }

    return res.status(200).json({
        id: cartId,
        products: cart.products
    });
}

async function addProductToCart(req, res) {
    const { cid, pid } = req.params;

    if (isNaN(cid) || isNaN(pid)) {
        return res.status(400).json({
            ok: false,
            message: 'Los parámetros de la solicitud deben ser números',
        });
    }

    const cartId = parseInt(cid);
    const productId = parseInt(pid);

    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
        return res.status(404).json({
            ok: false,
            message: 'El carrito especificado no existe',
        });
    }

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            ok: false,
            message: 'El producto especificado no existe',
        });
    }

    const existingCart = carts[cartIndex];
    const existingProduct = products[productIndex];

    // Verifica si el producto ya existe en el carrito
    const existingCartItem = existingCart.products.find(item => item.product.id === productId);

    if (existingCartItem) {
        // Si el producto ya existe, incrementa la cantidad
        existingCartItem.product.quantity += 1;
    } else {
        // Si el producto no existe, agrégalo como un nuevo objeto en el array
        existingCart.products.push({
            product: {
                id: existingProduct.id,
                quantity: 1,
            }
        });
    }

    try {
        carts.sort((a, b) => a.id - b.id);
        await fs.writeFile(filePathCarts, JSON.stringify(carts));
        return res.status(200).json({
            ok: true,
            message: "Producto agregado al carrito con éxito",
            cart: existingCart,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al agregar el producto al carrito',
        });
    }
}

module.exports = {
    readCarts,
    readProducts,
    createCart,
    getCartById,
    addProductToCart,
};
