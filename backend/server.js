// Crear archivo server.js

// Importar las dependencias necesarias
const express = require('express'); // Framework web para Node.js
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes HTTP
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
/*El uso del middleware cors en tu aplicación Express permite que tu servidor backend
 acepte solicitudes de origen cruzado (CORS) desde dominios diferentes. 
 Esto es particularmente útil en aplicaciones de cliente-servidor modernas 
 donde el frontend y el backend están en servidores diferentes. */

 // Crear una instancia de Express
const app = express();


// Middleware para habilitar CORS
app.use(cors());
// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Inicializar un array para almacenar las tareas y un contador de ID
let tasks = [];
let id = 1;
// Obtener todas las tareas
app.get('/api/tasks', (req,res) => {
    res.json(tasks);
});
// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const task = { id: id++, text: req.body.text, completed: false };
    tasks.push(task);
    res.json(task);
});
// Actualizar una tarea
app.put('/api/tasks/:id', (req,res)=>{
    const taskId = parseInt(req.params.id,10);
    const task = tasks.find(task => task.id === taskId);
    if(task){
        task.completed = !task.completed;
        res.json(task);
    }else{
        res.status(404).send('Task not found');
    }
});
// Eliminar una tarea
app.delete('/api/tasks/:id', (req,res)=>{
    const taskId = parseInt(req.params.id,10);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});
// Iniciar el servidor
app.listen(5000, ()=>{
    console.log('Server running on http://localhost: 5000');
});