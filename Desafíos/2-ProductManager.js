const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.initialize();
    }

    initialize() {
        if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    findAvailableId(products) {
        const usedIds = new Set(products.map(product => product.id));
        let id = 1;
        
        while (usedIds.has(id)) {
            id++;
        }
    
        return id;
    }

    addProduct(product = {
        title: "",
        description: "",
        price: 0,
        thumbnail: "",
        code: "",
        stock: 0
    }) {
        const products = this.getProducts();

        const newProduct = {
        id: this.findAvailableId(products),
        ...product,
        };

        // Validations

        // Product
        if(typeof product !== "object") throw new Error("El producto agregado debe ser un objeto")

        // Title
        if(typeof product.title !== "string") throw new Error("El título debe ser una cadena de texto")

        if (product.title === undefined) throw new Error("El titulo del producto no puede estar vacio");

        // Description
        if(typeof product.description !== "string") throw new Error("La descripción del producto debe ser una cadena de texto")

        if (product.description === undefined) throw new Error("La descripción del producto no puede estar vacía");

        // Price
        if(typeof product.price !== "number") throw new Error("El precio del producto debe ser un número")

        if (product.price === undefined) throw new Error("Debes especificar el precio del producto");

        if (product.price === 0) throw new Error("El precio del producto no puede ser $0");

        if(Math.sign(product.price) === -1) throw new Error("El precio no puede ser negativo");

        // Thumbnail
        if(typeof product.thumbnail !== "string") throw new Error("El thumbnail debe ser una cadena de texto")

        if (product.thumbnail === undefined) throw new Error("El thumbnail del producto no puede estar vacío");

        // Code
        if(typeof product.code !== "string") throw new Error("El código debe ser una cadena de texto");

        if (product.code === undefined) throw new Error("El código del producto no puede estar vacío");

        const codeIndex = products.findIndex((existingProduct) => existingProduct.code === product.code);

        // Validate that no other product with this code exists
        if (codeIndex !== -1) throw new Error("Ya existe un producto registrado con este código");

        products.push(newProduct);
        this.saveProducts(products);
        return newProduct;
    }

    getProducts() {
        const fileContent = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(fileContent);
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((product) => product.id === id);
    
        if (!product) {
            throw new Error("El producto que buscas no existe");
        } else {
            return product;
        }
    }

    updateProduct(id, updatedFields = {}) {
        // Validations

        // Product
        if (typeof updatedFields !== "object") throw new Error("El producto actualizado debe ser un objeto");

        const products = this.getProducts();
        const index = products.findIndex((product) => product.id === id);

        if (index !== -1) {
            // Actualizar solo los campos proporcionados
            products[index] = { ...products[index], ...updatedFields };

            // Validaciones específicas para cada campo si se proporcionan en updatedFields
            if ("title" in updatedFields) {
                if (typeof updatedFields.title !== "string") throw new Error("El título debe ser una cadena de texto");
                if (updatedFields.title === "") throw new Error("El título del producto no puede estar vacío");
            }
            
            if ("description" in updatedFields) {
                if (typeof updatedFields.description !== "string") throw new Error("La descripción del producto debe ser una cadena de texto");
                if (updatedFields.description === "") throw new Error("La descripción del producto no puede estar vacía");
            }

            if ("price" in updatedFields) {
                if (typeof updatedFields.price !== "number") throw new Error("El precio del producto debe ser un número");
                if (updatedFields.price === undefined) throw new Error("Debes especificar el precio del producto");
                if (updatedFields.price === 0) throw new Error("El precio del producto no puede ser $0");
                if (Math.sign(updatedFields.price) === -1) throw new Error("El precio no puede ser negativo");
            }

            if ("thumbnail" in updatedFields) {
                if (typeof updatedFields.thumbnail !== "string") throw new Error("El thumbnail debe ser una cadena de texto");
                if (updatedFields.thumbnail === "") throw new Error("El thumbnail del producto no puede estar vacío");
            }

            if ("code" in updatedFields) {
                if (typeof updatedFields.code !== "string") throw new Error("El código debe ser una cadena de texto");
                if (updatedFields.code === "") throw new Error("El código del producto no puede estar vacío");

                const codeIndex = products.findIndex((existingProduct) => existingProduct.code === updatedFields.code);

                // Validate that no other product with this code exists
                if (codeIndex !== -1 && codeIndex !== index) throw new Error("Ya existe un producto con este código");
            }
            if ("stock" in updatedFields) {
                if (typeof updatedFields.stock !== "number") throw new Error("El stock del producto debe ser un número");
            }

            this.saveProducts(products);
            return products[index];
        } else {
            throw new Error("El producto que deseas actualizar no existe");
        }
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex((product) => product.id === id);

        if (index === -1) {
            throw new Error("No se puede eliminar. El producto con el ID especificado no existe.");
        }

        const updatedProducts = products.filter((product) => product.id !== id);
        this.saveProducts(updatedProducts);
    }

    saveProducts(products) {
        products.sort((a, b) => a.id - b.id);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

// Ejemplo de uso

//1. Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('products.json');

//2. Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

//3. Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

productManager.addProduct({
    title: 'Producto prueba',
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code:"abc123",
    stock: 25
});

//4. El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

// Si bien el producto se agrega igual, ya que contiene las mismas características, su ID es distinto
productManager.addProduct({
    title: 'Producto prueba',
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code:"luis123",
    stock: 25
});

productManager.addProduct({
    title: 'Producto prueba',
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code:"jor987",
    stock: 25
});

//5. Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts())

//6.1 Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado
console.log(productManager.getProductById(1));

//6.2 En caso de no existir, debe arrojar un error.
//TODO: Descomentar la línea de abajo para poder probar este error.
// console.log(productManager.getProductById(15));

//7. Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
productManager.updateProduct(1, {
    title: "Producto de prueba actualizado",
    price: 500,
    code: "apz124"
})
console.log(productManager.getProductById(1));

//8.0 Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto
console.log(productManager.getProducts());
productManager.deleteProduct(2);

// Se muestra sin ese producto
console.log(productManager.getProducts());

//8.1 Que arroje un error en caso de no existir.
//TODO: Descomentar la línea de abajo para poder probar este error.
// productManager.deleteProduct(10);

//TODO: Test extra: Luego de la eliminación del producto con el id 2, agrego 2 productos más, el primero se agrega con el id 2, y el segundo con el id 4, y posteriormente, se ordenan y se guardan ordenados por id en el archivo products.json
productManager.addProduct({
    title: 'Producto prueba',
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code:"lon123",
    stock: 25
});

productManager.addProduct({
    title: 'Producto prueba',
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code:"asd123",
    stock: 25
});