class ProductManager {

    constructor() {
        this.products = []
    }

    addProduct(
            title = "",
            description = "",
            price = 0,
            thumbnail = "",
            code = "",
            stock = 0
        ) {

            // Validaciones

            // Título
            if(typeof title !== "string") return console.error("El título debe ser una cadena de texto")

            if (title === undefined) return console.error("El titulo del producto no puede estar vacio");

            // Descripción
            if(typeof description !== "string") return console.error("La descripción del producto debe ser una cadena de texto")

            if (description === undefined) return console.error("La descripción del producto no puede estar vacía");

            // Precio
            if(typeof price !== "number") return console.error("El precio del producto debe ser un número")

            if (price === undefined) return console.error("Debes especificar el precio del producto");

            if (price === 0) return console.error("El precio del producto no puede ser $0");

            if(Math.sign(price) === -1) return console.error("El precio no puede ser negativo");

            // Thumbnail
            if(typeof thumbnail !== "string") return console.error("El thumbnail debe ser una cadena de texto")

            if (thumbnail === undefined) return console.error("El thumbnail del producto no puede estar vacío");

            // Code
            if(typeof code !== "string") return console.error("El código debe ser una cadena de texto");

            if (code === undefined) return console.error("El código del producto no puede estar vacío");

            const codeIndex = this.products.findIndex((product) => product.code === code);

            // Validamos que no exista otro producto con ese código
            if (codeIndex !== -1) return console.error("Ya existe un producto registrado con este código");

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this.products.length + 1
            }

        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(idProducto) {
        const product = this.products.find(product => product.id === idProducto);
    
        if (!product) {
            console.error(`Not Found: El id ${idProducto} no existe`);
        }
    
        return product;
    }
}

// Testing

// Se creará una instancia de la clase “ProductManager”
let productManager = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productManager.getProducts());

// Se llamará al método “addProduct” con los campos:
    // title: “producto prueba”
    // description:”Este es un producto prueba”
    // price:200,
    // thumbnail:”Sin imagen”
    // code:”abc123”,
    // stock:25

// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

productManager.addProduct("Producto prueba", "Este en un producto prueba", 200, "Sin imagen", "abc123", 25);

// Agrego otro producto para mostrar que el id se incrementa
productManager.addProduct("Producto prueba 2", "Este en un producto prueba 2", 200, "Sin imagen", "abc456", 25);


// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productManager.getProducts());

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct("Producto prueba", "Este en un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(productManager.getProducts());

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(2));
productManager.getProductById(3);