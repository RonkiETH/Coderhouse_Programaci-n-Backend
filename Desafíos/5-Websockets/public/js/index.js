const socket = io();

socket.emit("message", "Cliente conectado")

  // Escucha el evento 'products' y actualiza la lista de productos
  socket.on('products', (data) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    data.products.forEach((product) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <p>
        <b>Id: </b>${product.id}
        <b>Título: </b>${product.title}
        <b>Descripción: </b>${product.description} - 
        <b>Código: </b>${product.code} - 
        <b>Precio: </b>${product.price} -
        <b>Stock: </b>${product.stock} -
        <b>Categoría: </b>${product.category}
      </p>
      `;
      productList.appendChild(li);
    });
  });

  document.getElementById('addProduct').addEventListener('submit', (event) => {
    // event.preventDefault();
  
    const title = document.getElementById('title').value,
      description = document.getElementById('description').value,
      code = document.getElementById('code').value,
      price = document.getElementById('price').value,
      stock = document.getElementById('stock').value,
      category = document.getElementById('category').value;
  
    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
    };

    socket.emit('createProduct', newProduct);
  });
  
  document.getElementById('deleteProduct').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const id = parseInt(document.getElementById('id').value, 10);
  
    socket.emit('deleteProduct', id);
  });