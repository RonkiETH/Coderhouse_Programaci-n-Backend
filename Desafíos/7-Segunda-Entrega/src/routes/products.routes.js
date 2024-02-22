const { Router } = require("express");
const productModel = require("../models/Product");
const { isValidObjectId } = require('mongoose');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query, sort } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
        };

        // Filtro de consulta
        const filter = query ? { category: query } : {};

        // Realizar la consulta paginada
        const products = await productModel.paginate(filter, options);

        const productsDocs = products.docs.map(doc => doc.toObject());

        // Agrega este console.log para imprimir la información de los productos
        console.log(products.docs);

        // Renderizar la vista de productos
        return res.render('products', {
            title: 'Lista de Productos',
            products: productsDocs,
            nextPage: parseInt(page) + 1,
            prevPage: parseInt(page) - 1 > 0 ? parseInt(page) - 1 : null,
            hasNextPage: page < products.totalPages,
            hasPrevPage: page > 1,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&limit=${limit}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&limit=${limit}` : null,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).render('error', { message: 'Error al obtener productos.' });
    }
});

router.get('/:pId', async (req, res) => {
    try {
        const productId = req.params.pId;
    
        // Validar que productId sea un ObjectId válido antes de hacer la consulta
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de producto no válido.' });
        }
    
        const product = await productModel.findById(productId);
    
        if (!product) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado.' });
        }
        
        const productObject = product.toObject();
        return res.render('productDetails', { product: productObject });
    } 
    catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al obtener el producto.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        // Validar campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ status: 'error', payload: 'Todos los campos son obligatorios, excepto thumbnails.' });
        }

        // Crear el nuevo producto
        const newProduct = new productModel({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || [],
        });

        // Guardar el producto en la base de datos
        await newProduct.save();

        return res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      console.error("Error al agregar un nuevo producto:", error);
      return res.status(500).json({ status: 'error', payload: 'Error al agregar un nuevo producto.' });
    }
});

router.put('/:pId', async (req, res) => {
    try {
        const productId = req.params.pId;
    
        // Validamos que productId sea un ObjectId válido antes de hacer la actualización
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de producto no válido.' });
        }
    
        // Buscamos el producto por su ID
        const productToUpdate = await productModel.findById(productId);
    
        if (!productToUpdate) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado.' });
        }
    
        // Actualizamos los campos del producto según la solicitud
        for (const key in req.body) {
            if (req.body[key] !== undefined && req.body[key] !== null && productModel.schema.paths[key]) {
            // Verificamos si el campo existe en el modelo y tiene el mismo tipo de dato
            if (typeof req.body[key] === productToUpdate[key].constructor) {
                productToUpdate[key] = req.body[key];
            } else {
                return res.status(400).json({ status: 'error', payload: `Tipo de dato incorrecto para el campo ${key}.` });
            }
            }
        }
    
        // Guardamos los cambios en el producto actualizado
        await productToUpdate.save();
    
        return res.json({ status: 'success', payload: productToUpdate });
    } catch (error) {
        console.error("Error al actualizar el producto por ID:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al actualizar el producto.' });
    }
});

router.delete('/:pId', async (req, res) => {
    try {
        const productId = req.params.pId;
    
        // Validamos que productId sea un ObjectId válido antes de hacer la eliminación
        if (!isValidObjectId(productId)) {
            return res.status(400).json({ status: 'error', payload: 'ID de producto no válido.' });
        }
    
        // Buscamos y eliminamos el producto por su ID
        const deletedProduct = await productModel.findOneAndDelete(productId);
    
        if (!deletedProduct) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado.' });
        }
    
        return res.json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        console.error("Error al eliminar el producto por ID:", error);
        return res.status(500).json({ status: 'error', payload: 'Error al eliminar el producto.' });
    }
});



module.exports = router;
