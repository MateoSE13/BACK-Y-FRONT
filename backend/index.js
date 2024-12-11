// backend/app.js o servidor principal

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Asegúrate de que el cuerpo de la solicitud se pueda analizar

app.post('/api/tasks', (req, res) => {
  const { taskName, description } = req.body;
  if (!taskName || !description) {
    return res.status(400).json({ error: 'Se requiere nombre y descripción para la tarea' });
  }

  // Aquí deberías agregar la lógica para guardar la tarea en la base de datos
  console.log('Tarea agregada:', { taskName, description });
  res.status(201).json({ message: 'Tarea agregada correctamente' });
});

app.listen(8080, () => {
  console.log('Backend corriendo en el puerto 8080');
});
