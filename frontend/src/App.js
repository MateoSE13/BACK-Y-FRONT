import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Almacenar las tareas
  const [newTask, setNewTask] = useState(''); // Para la tarea nueva
  const [error, setError] = useState(null); // Para manejar los errores

  // Función para obtener las tareas desde el backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://backend:8080/api/tasks');
        const data = await response.json();
        setTasks(data.tasks); // Actualiza las tareas en el estado
      } catch (error) {
        setError('Error al obtener tareas'); // Establece el mensaje de error
        console.error('Error al obtener tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  // Función para agregar una nueva tarea
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.trim()) {
      setError('Por favor ingresa una tarea');
      return;
    }

    try {
      const response = await fetch('http://backend:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newTask }), // Enviar la tarea en formato JSON
      });

      if (!response.ok) {
        throw new Error('Error al agregar tarea');
      }

      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]); // Agregar la tarea a la lista
      setNewTask(''); // Resetea el campo de texto
      setError(null); // Elimina cualquier mensaje de error previo
    } catch (error) {
      setError('Error al agregar tarea');
      console.error('Error al agregar tarea:', error);
    }
  };

  // Función para eliminar una tarea
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://backend:8080/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar tarea');
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId)); // Elimina la tarea del estado
    } catch (error) {
      setError('Error al eliminar tarea');
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Tareas</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Agregar tarea"
          className="task-input"
        />
        <button type="submit" className="task-button">
          Agregar
        </button>
      </form>

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.task}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-button"
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <li>No hay tareas disponibles</li>
        )}
      </ul>
    </div>
  );
}

export default App;
