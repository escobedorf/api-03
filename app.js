const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json());

// Base de datos ficticia de productos
let productos = [
    { id: 1, nombre: "Laptop HP", descripcion: "Una potente laptop HP con procesador Intel Core i7 y pantalla de 15 pulgadas.", precio: 799.99 },
    { id: 2, nombre: "Samsung Galaxy S21", descripcion: "El último smartphone de Samsung con cámara de alta resolución y pantalla OLED de 6.2 pulgadas.", precio: 999.99 },
    { id: 3, nombre: "Televisor LG", descripcion: "Un televisor LG de 55 pulgadas con resolución 4K para una experiencia de visualización impresionante.", precio: 699.99 },
    { id: 4, nombre: "Tenis Nike Air Max", descripcion: "Zapatillas Nike Air Max con amortiguación de aire para una comodidad excepcional durante el ejercicio.", precio: 129.99 },
    { id: 5, nombre: "Bicicleta de montaña", descripcion: "Una bicicleta de montaña Trek con cuadro de aluminio y suspensiones delanteras para un ciclismo aventurero.", precio: 599.99 },
    { id: 6, nombre: "Cámara Canon", descripcion: "Una cámara DSLR Canon con sensor APS-C de 24.1 megapíxeles para fotografías de alta calidad.", precio: 499.99 },
    { id: 7, nombre: "Aspiradora Dyson", descripcion: "Una aspiradora inalámbrica Dyson con potente succión y filtro avanzado para una limpieza eficiente.", precio: 399.99 },
    { id: 8, nombre: "Auriculares Sony", descripcion: "Auriculares inalámbricos Sony con cancelación de ruido y sonido de alta resolución.", precio: 349.99 },
    { id: 9, nombre: "Libro 'El Hobbit' ", descripcion: "Una edición especial del libro 'El Hobbit' con ilustraciones a color y tapa dura.", precio: 19.99 },
    { id: 10, nombre: "Mesa de comedor", descripcion: "Una elegante mesa de comedor de roble con capacidad para 6 personas y acabado resistente a arañazos.", precio: 449.99 }
];

// Rutas para manipular productos
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

app.get('/socios/v1/productos/:id', (req, res) => {
    const productId = req.params.id;
    const productoEncontrado = productos.find(producto => producto.id == productId);
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

app.post('/socios/v1/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const id = Math.round(Math.random() * 1000);
    if (nombre == undefined || descripcion == undefined || precio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        });
    } else {
        const producto = { id: id, nombre: nombre, descripcion: descripcion, precio: precio };
        const longitudInicial = productos.length;
        productos.push(producto);
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

app.put('/socios/v1/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    if (nombre == undefined || descripcion == undefined || precio == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parametros en la solicitud"
        });
    } else {
        const posActualizar = productos.findIndex(producto => producto.id == id);
        if (posActualizar != -1) {
            productos[posActualizar].nombre = nombre;
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

app.delete('/socios/v1/productos/:id', (req, res) => {
    const { id } = req.params;
    const indiceEliminar = productos.findIndex(producto => producto.id == id);
    if (indiceEliminar != -1) {
        productos.splice(indiceEliminar, 1);
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

app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto:', puerto);
});
