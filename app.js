//Crear el servidor
const express = require('express');
const app = express();
// Que tome el puerto establecido a la nube (render )
const puerto = process.env.PORT || 3000;
app.use(express.json()); //Habilitacion para recibir datos

//Arreglo de objeto de categorias
let categorias = [
    {id:1, nombre:"cocina", descripcion:"Elementos para cocinar"},
    {id:2, nombre:"Limpieza", descripcion:"Elementos para Limpieza"},
    {id:3, nombre:"Eletronica", descripcion:"Elementos para Electronica"},
    {id:4, nombre:"Ropa bebe", descripcion:"Elementos para bebe"},
    {id:5, nombre:"Linea blanca", descripcion:"Elementos de linea blanca"},
    {id:6, nombre:"Jardineria", descripcion:"Elementos de Jardineria"},
    {id:7, nombre:"Salud", descripcion:"Elementos para la salud"},
    {id:8, nombre:"Muebles", descripcion:"Elementos para Sala y demas"},
    {id:9, nombre:"Lacteos", descripcion:"Elementos para beber"},
    {id:10, nombre:"Licores", descripcion:"Elementos para fiestas"},
    {id:528, nombre:"Licores", descripcion:"Elementos para fiestas"},
]

//Solicitud , respuesta
app.get('/socios/v1/categorias', (req, res) => {
    //1° Verificar si existe categorias
    if(categorias.length > 0){
        //Existen categorias
        res.status(200).json({
            estado:1,
            mensaje:"Existen categorias",
            //var : contenido 
            categories: categorias
        })
    }else{
        //No existen categorias
        res.status(404).json({
            estado:0,
            mensaje:"No se encontraron categorias",
            categories: categorias

        })

    }
    //2° Mostrarla con un estado y mensaje
    //3° No existe, mostrar estado y mensaje
    //4° En formato JSON
})

app.get('/socios/v1/categorias/:id', (req, res) => {
    //  Solo una categoria

    // Obtener el ID de la categoría desde los parámetros de la URL
    const categoryId = req.params.id;

    //Programación funcional
    // Buscar la categoría por su ID en tu arreglo (supongo que tienes un arreglo llamado 'categorias')
    const categoriaEncontrada = categorias.find(categoria => categoria.id == categoryId);
    if (categoriaEncontrada) {
        // Si se encontró la categoría, devolverla en formato JSON
        res.status(200).json({
            estado: 1,
            mensaje: "Categoría encontrada",
            category: categoriaEncontrada
        });
    } else{
        // Si no se encontró la categoría, devolver un mensaje de error en JSON
        res.status(404).json({
            estado: 0,
            mensaje: "Categoría no encontrada",
            category: null
        });
    } 
});


app.post('/socios/v1/categorias', (req, res) => {
    // Crear un recurso - Crear una categoria
    //Requerimos
    //id = generar un numero aleatorio
    //nombre y descripcion = Body
    const {nombre, descripcion} = req.body;
    const id = Math.round (Math.random()*1000);
    //Comprobar que el cliente (chrome, edge, insomnia, posman, etc) = ususario = programador

    if(nombre==undefined || descripcion==undefined){
    //Hya un error en la solicitud por parte del programador
    res.status(400).json({
        estado:0,
        mensaje:"Faltan parametros en la solicitud"
    })
    }else{
        //En javascript como agregar un nuevo elemento a un arreglo
        const categoria = {id:id, nombre:nombre, descripcion:descripcion};
        const logitudInicial = categorias.length;
        categorias.push(categoria)
        if(categorias.length>logitudInicial){
            //Todo ok de parte del cliente y servidor
            res.status(201).json({
                estado:1,
                mensaje:"Categoria creada",
                categoria: categoria
            })

        }else{
            //Error del servidor - Creador de la API, de la base de datos, quien configura, etc
            res.status(500).json({
                estado:0,
                mensaje:"Ocurrio un errro desconocido"

            })
        }
            
    }

    res.send('Crear una categoria');


})


app.put('/socios/v1/categorias/:id', (req, res) => {
    //ID viene ? = params
    //nombre y desccripcion ? = body
    const{id}=req.params;
    const{nombre, descripcion } = req.body;
    if(nombre==undefined || descripcion==undefined){
        res.status(400),json({
            estado:0,
            mensaje:"Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar = categorias.findIndex(categoria => categoria.id == id)
        if(posActualizar !=-1){
            //Si encontro la categoria con el id buscado
            //Actualizar la categoria
            categorias[posActualizar].nombre=nombre;
            categorias[posActualizar].descripcion=descripcion;
            res.status(200).json({
                estado:1,
                mensaje:"Categoria actualizada",
                categoria: categorias[posActualizar]
            })

        }else{
            //No se encontro la categoria con el id buscar
            res.status(404).json({
                estado:0,
                mensaje:"No se encontraron categorias"
            })

        }

    }
    // Actualizar un recurso - Actualizar una categoria
    //res.send('Actualizar una categoria por su id');

})


app.delete('/socios/v1/categorias/:id', (req, res) => {
    //Eliminar un recurso - Eliminar una categoria
    const{id}=req.params;
    const indiceEliminar = categorias.findIndex(categoria => categoria.id == id);
    if(indiceEliminar!=-1){
        //Borrar una categoria
        categorias.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"Categoria eliminada con exito",
        })

    }else{
        //categia no encontrada 
        res.status(404).json({
            estado:0,
            mensaje:"No se encontraron categorias"
        });
    
    }

    //res.send('Eliminar una categoria por su id');
    
})

app.listen(puerto, () =>{
    console.log('Servidor corriendo en el puerto: ', puerto);
})