const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para que el frontend se conecte
app.use(cors());
app.use(express.json()); // Para parsear JSON en el cuerpo de la solicitud

let tasks = []; // Esto es solo un ejemplo, deberías usar una base de datos en producción.

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

// Agregar una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'La tarea no puede estar vacía.' });
  }

  const newTask = { id: Date.now(), task }; // Usamos Date.now() como ID único por simplicidad
  tasks.push(newTask);

  res.status(201).json(newTask); // Devuelve la tarea recién agregada
});

// Eliminar una tarea por ID
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));

  res.status(200).json({ message: 'Tarea eliminada correctamente.' });
});

app.listen(8080, () => {
  console.log('Backend corriendo en el puerto 8080');
});
