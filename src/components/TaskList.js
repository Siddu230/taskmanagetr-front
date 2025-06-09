import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ sortBy, priorityFilter }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {};
        if (priorityFilter) params.priority = priorityFilter;
        if (sortBy) params.sortBy = sortBy;
        const response = await axios.get(`${API_URL}/tasks`, { params });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [sortBy, priorityFilter]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      {!loading && tasks.length === 0 && !error && <p>No tasks available.</p>}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;