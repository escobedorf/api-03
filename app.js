// Importación de módulos
const express = require('express'); // Importa el módulo Express.js
const app = express(); // Crea una instancia de la aplicación Express
const puerto = process.env.PORT || 3000; // Define el puerto en el que el servidor escuchará las solicitudes entrantes (toma el valor del entorno o usa el puerto 3000 por defecto)
app.use(express.json()); // Configura el middleware para el manejo de solicitudes JSON

// Base de datos ficticia de productos
let productos = [
    { id: 1, nombre: "Laptop HP", descripcion: "Una potente laptop HP con procesador Intel Core i7 y pantalla de 15 pulgadas.", precio: 799.99 },
    { id: 2, nombre: "Samsung Galaxy S21", descripcion: "El último smartphone de Samsung con cámara de alta resolución y pantalla OLED de 6.2 pulgadas.", precio: 999.99 },
    { id: 3, nombre: "Televisor LG", descripcion: "Un televisor LG de 55 pulgadas con resolución 4K para una experiencia de visualización impresionante.", precio: 699.99 },
    { id: 4, nombre: "Tenis Nike Air Max", descripcion: "Nike Air Max con amortiguación de aire para una comodidad excepcional durante el ejercicio.", precio: 129.99 },
    { id: 5, nombre: "Bicicleta de montaña", descripcion: "Una bicicleta de montaña Trek con cuadro de aluminio y suspensiones delanteras para un ciclismo aventurero.", precio: 599.99 },
    { id: 6, nombre: "Cámara Canon", descripcion: "Una cámara DSLR Canon con sensor APS-C de 24.1 megapíxeles para fotografías de alta calidad.", precio: 499.99 },
    { id: 7, nombre: "Aspiradora Dyson", descripcion: "Una aspiradora inalámbrica Dyson con potente succión y filtro avanzado para una limpieza eficiente.", precio: 399.99 },
    { id: 8, nombre: "Auriculares Sony", descripcion: "Auriculares inalámbricos Sony con cancelación de ruido y sonido de alta resolución.", precio: 349.99 },
    { id: 9, nombre: "Libro 'El Hobbit' ", descripcion: "Una edición especial del libro 'El Hobbit' con ilustraciones a color y tapa dura.", precio: 19.99 },
    { id: 10, nombre: "Mesa de comedor", descripcion: "Una elegante mesa de comedor de roble con capacidad para 6 personas y acabado resistente a arañazos.", precio: 449.99 }
];

// Rutas para manipular productos

// Ruta para obtener todos los productos
app.get('/socios/v1/productos', (req, res) => {
    if (productos.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Existen productos",
            products: productos
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron productos",
            products: []
        });
    }
});

// Ruta para obtener un producto por ID
app.get('/socios/v1/productos/:id', (req, res) => {
    const productId = req.params.id; // Obtiene el parámetro de ID de la URL
    const productoEncontrado = productos.find(producto => producto.id == productId); // Busca el producto por ID en la base de datos
    if (productoEncontrado) {
        res.status(200).json({
            estado: 1,
            mensaje: "Producto encontrado",
            product: productoEncontrado
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Producto no encontrado",
            product: null
        });
    }
});

// Ruta para crear un nuevo producto
app.post('/socios/v1/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body; // Obtiene los datos del producto del cuerpo de la solicitud
    const id = Math.round(Math.random() * 1000); // Genera un ID aleatorio
    if (nombre == undefined || descripcion == undefined || precio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        });
    } else {
        const producto = { id: id, nombre: nombre, descripcion: descripcion, precio: precio }; // Crea el objeto de producto
        const longitudInicial = productos.length;
        productos.push(producto); // Agrega el producto a la base de datos
        if (productos.length > longitudInicial) {
            res.status(201).json({
                estado: 1,
                mensaje: "Producto creado",
                product: producto
            });
        } else {
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrió un error desconocido"
            });
        }
    }
});

// Ruta para actualizar un producto por ID
app.put('/socios/v1/productos/:id', (req, res) => {
    const { id } = req.params; // Obtiene el parámetro de ID de la URL
    const { nombre, descripcion, precio } = req.body; // Obtiene los datos actualizados del producto del cuerpo de la solicitud
    if (nombre == undefined || descripcion == undefined || precio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        });
    } else {
        const posActualizar = productos.findIndex(producto => producto.id == id); // Busca la posición del producto por ID en la base de datos
        if (posActualizar != -1) {
            productos[posActualizar].nombre = nombre; // Actualiza los datos del producto
            productos[posActualizar].descripcion = descripcion;
            productos[posActualizar].precio = precio;
            res.status(200).json({
                estado: 1,
                mensaje: "Producto actualizado",
                product: productos[posActualizar]
            });
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "Producto no encontrado"
            });
        }
    }
});

// Ruta para eliminar un producto por ID
app.delete('/socios/v1/productos/:id', (req, res) => {
    const { id } = req.params; // Obtiene el parámetro de ID de la URL
    const indiceEliminar = productos.findIndex(producto => producto.id == id); // Busca la posición del producto por ID en la base de datos
    if (indiceEliminar != -1) {
        productos.splice(indiceEliminar, 1); // Elimina el producto de la base de datos
        res.status(201).json({
            estado: 1,
            mensaje: "Producto eliminado con éxito"
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Producto no encontrado"
        });
    }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto:', puerto);
});


