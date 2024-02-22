const { Router } = require("express");
const cartModel = require("../models/Cart");
const productModel = require("../models/Product");
const { isValidObjectId } = require('mongoose');

const router = Router();

router.post('/', async (req, res) => {
    try {
        // Crear un nuevo carrito utilizando el modelo
        const newCart = new cartModel();

        // Guardar el carrito en la base de datos
        await newCart.save();

        return res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        console.error("Error al crear un nuevo carrito:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al crear un nuevo carrito.' });
    }
});

router.get('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId;

        // Validamos que cartId sea un ObjectId válido antes de hacer la consulta
        if (!isValidObjectId(cartId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de carrito no válido.' });
        }

        // Buscar el carrito por su ID y hacemos un populate de los productos
        const populatedCart = await cartModel.findById(cartId).populate('products.product');

        if (!populatedCart) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado.' });
        }

        const cart = populatedCart.toObject();

        // Renderizar la vista del carrito
        res.render('cart', { title: 'Detalles del Carrito', cart: cart });
    } catch (error) {
        console.error("Error al obtener los productos del carrito por ID:", error);
        res.status(500).render('error', { message: 'Error al obtener los productos del carrito.' });
    }
});

router.post('/:cId/products/:pId', async (req, res) => {
    try {
        const cartId = req.params.cId;
        const productId = req.params.pId;
    
        // Validamos que cartId y productId sean ObjectId válidos antes de hacer la consulta
        if (!isValidObjectId(cartId) || !isValidObjectId(productId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de carrito o producto no válido.' });
        }
    
        // Buscamos el carrito por su ID y el producto por su ID
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);
    
        if (!cart || !product) {
            return res.status(404).json({ status: 'error', payload: 'Carrito o producto no encontrado.' });
        }
    
        // Verificamos si hay suficiente stock para agregar al carrito
        if (product.stock < 1) {
            return res.status(400).json({ status: 'error', payload: 'No hay suficiente stock disponible para agregar al carrito.' });
        }
    
        // Verificamos si el producto ya existe en el carrito
        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
    
        // Obtenemos la cantidad del cuerpo de la solicitud o establecemos 1 por defecto
        const quantity = req.query.quantity || 1;
    
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, aumentamos la cantidad según lo especificado
            cart.products[existingProductIndex].quantity += parseInt(quantity, 10);
        } else {
            // Si el producto no está en el carrito, agregamos la cantidad según lo especificado
            cart.products.push({ product: productId, quantity: parseInt(quantity, 10) });
        }
    
        // Disminuimos el stock del producto según la cantidad
        product.stock -= parseInt(quantity, 10);
    
        // Guardamos los cambios en el carrito y el producto
        await cart.save();
        await product.save();
    
        return res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al agregar el producto al carrito.' });
    }
});

router.delete('/:cId/products/:pId', async (req, res) => {
    try {
        const cartId = req.params.cId;
        const productId = req.params.pId;
    
        // Validar que cartId y productId sean ObjectId válidos antes de hacer la consulta
        if (!isValidObjectId(cartId) || !isValidObjectId(productId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de carrito o producto no válido.' });
        }
    
        // Buscar el carrito por su ID y el producto por su ID
        const cart = await cartModel.findById(cartId);
        const product = await productModel.findById(productId);
    
        if (!cart || !product) {
            return res.status(404).json({ status: 'error', payload: 'Carrito o producto no encontrado.' });
        }
    
        // Buscamos el índice del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
    
        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado en el carrito.' });
        }
    
        // Eliminamos el producto del carrito
        cart.products.splice(productIndex, 1);
    
        // Guardamos los cambios en el carrito
        await cart.save();
    
        return res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al eliminar el producto del carrito.' });
    }
});

router.put('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId;

        // Validamos que cartId sea un ObjectId válido antes de hacer la consulta
        if (!isValidObjectId(cartId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de carrito no válido.' });
        }

        // Buscamos el carrito por su ID
        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado.' });
        }

        // Validamos el formato del arreglo de productos en la solicitud
        if (!Array.isArray(req.body.products)) {
            return res.status(400).json({ status: 'error', payload: 'El cuerpo de la solicitud debe contener un arreglo de productos.' });
        }

        // Iteramos sobre los productos en la solicitud y actualizamos la cantidad en el carrito
        for (const productInfo of req.body.products) {
            const productId = productInfo.product;
            const newQuantity = productInfo.quantity;

            // Validamos que productId sea un ObjectId válido antes de hacer la consulta
            if (!isValidObjectId(productId)) {
                return res.status(400).json({ status: 'error', payload: `ID de producto "${productId}" no válido.` });
            }

            // Buscamos el producto por su ID
            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(404).json({ status: 'error', payload: `Producto con ID "${productId}" no encontrado.` });
            }

            // Verificamos si hay suficiente stock para actualizar la cantidad
            if (product.stock < newQuantity) {
                return res.status(400).json({ status: 'error', payload: `No hay suficiente stock disponible para actualizar la cantidad del producto con ID "${productId}" en el carrito.` });
            }

            // Buscamos el índice del producto en el carrito
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (productIndex !== -1) {
                // Actualizamos la cantidad del producto en el carrito
                cart.products[productIndex].quantity = newQuantity;

                // Disminuimos el stock del producto según la nueva cantidad en el carrito
                product.stock -= newQuantity;

                // Guardamos los cambios en el producto
                await product.save();
            }
        }

        // Guardar los cambios en el carrito
        await cart.save();

        return res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al actualizar el carrito.' });
    }
});


router.delete('/:cId', async (req, res) => {
    try {
        const cartId = req.params.cId;

        // Validamos que cartId sea un ObjectId válido antes de hacer la consulta
        if (!isValidObjectId(cartId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de carrito no válido.' });
        }

        // Buscamos el carrito por su ID
        const cart = await cartModel.findById(cartId);

        if (!cart) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado.' });
        }

        // Obtenemos los IDs de los productos en el carrito y las cantidades
        const productInfos = cart.products;

        // Restauramos el stock a cada producto
        for (const productInfo of productInfos) {
            const productId = productInfo.product;

            // Validamos que productId sea un ObjectId válido antes de hacer la consulta
            if (!isValidObjectId(productId)) {
                return res.status(400).json({ status: 'error', payload: `ID de producto "${productId}" no válido.` });
            }

            // Buscamos el producto por su ID y devolvemos el stock
            const product = await productModel.findById(productId);

            if (product) {
                // Aseguramos que la cantidad sea un número válido antes de sumarla al stock
                const quantityToAdd = parseInt(productInfo.quantity, 10) || 0;
                product.stock += quantityToAdd;
                await product.save();
            }

            // Limpiamos el arreglo de productos en el carrito
            cart.products = [];

            // Guardamos los cambios en el carrito
            await cart.save();
        }

        return res.json({ status: 'success', payload: 'Todos los productos del carrito han sido eliminados y el stock ha sido restaurado.' });
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al eliminar todos los productos del carrito.' });
    }
    
});

module.exports = router;