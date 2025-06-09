import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask, taskToEdit, onEditTask }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : 'Low');
  const [deadline, setDeadline] = useState(taskToEdit ? taskToEdit.deadline : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const taskData = { title, priority, deadline };

    try {
      if (taskToEdit) {
        // Edit existing task
        const response = await axios.put(`${API_URL}/tasks/${taskToEdit.id}`, taskData);
        onEditTask(response.data);
      } else {
        // Add new task
        const response = await axios.post(`${API_URL}/tasks`, taskData);
        onAddTask(response.data);
      }
      // Reset form
      setTitle('');
      setPriority('Low');
      setDeadline('');
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        disabled={loading}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;