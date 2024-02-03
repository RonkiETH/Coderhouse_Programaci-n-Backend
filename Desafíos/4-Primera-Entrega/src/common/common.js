const validateDataTypes = (res, title, description, code, price, stock, category, thumbnails) => {

        if (!title) return res.status(400).json({ ok: false, message: 'El campo "title" es obligatorio' });
        
        if (!description) return res.status(400).json({ ok: false, message: 'El campo "description" es obligatorio' });
        
        if (!code) return res.status(400).json({ ok: false, message: 'El campo "code" es obligatorio' });
        
        if (!price) return res.status(400).json({ ok: false, message: 'El campo "price" es obligatorio' });
        
        if (!stock) return res.status(400).json({ ok: false, message: 'El campo "stock" es obligatorio' });
        
        if (!category) return res.status(400).json({ ok: false, message: 'El campo "category" es obligatorio' });
        
        if (typeof title !== "string") return res.status(400).json({ ok: false, message: "El título debe ser un string" })

        if (typeof description !== "string") return res.status(400).json({ ok: false, message: "La descripción debe ser un string" })

        if (typeof code !== "string") return res.status(400).json({ ok: false, message: "El código debe ser un string" })

        if (typeof price !== "number") return res.status(400).json({ ok: false, message: "El precio debe ser un número" })

        if (typeof stock !== "number") return res.status(400).json({ ok: false, message: "El stock debe ser un número" })

        if (typeof category !== "string") return res.status(400).json({ ok: false, message: "La categoría debe ser un string" })

        if (!Array.isArray(thumbnails) || !thumbnails.every(item => typeof item === 'string')) return res.status(400).json({ ok: false, message: "Los thumbnails deben ser un Array de strings" })
}

const findAvailableId = (data) => {
    const usedIds = new Set(data.map(data => data.id));
    let id = 1;

    while (usedIds.has(id)) {
        id++;
    }

    return id;
}

const getProductsValidations = (res,limit, products, limitNumber) => {
    if (!limit) return res.status(200).json({ ok: true,products });
        
    if (isNaN(limitNumber) || !Number.isInteger(limitNumber)) return res.status(401).json({ ok: false, message: 'El limit para ver la cantidad de usuarios debe ser un número entero' });
    
    if (limitNumber <= 0 || limitNumber > products.length) return res.status(400).json({ ok: false, message: 'Ingresaste 0 o más productos de los que realmente hay' });

    return null;
}

// const validateProductID = (res, productId) => {
//     if (isNaN(productId) || productId <= 0) {
//         return res.status(400).json({
//             ok: false,
//             message: 'El ID para buscar el producto debe ser un número positivo',
//         });
//     }
// }

module.exports = {
    validateDataTypes,
    findAvailableId,
    getProductsValidations,

}