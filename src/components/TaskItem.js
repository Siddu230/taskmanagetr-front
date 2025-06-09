import React, { useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/tasks/${task.id}`);
      onDeleteTask(task.id);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`task-item priority-${task.priority}`}>
      {isEditing ? (
        <TaskForm
          taskToEdit={task}
          onEditTask={(updatedTask) => {
            onEditTask(updatedTask);
            setIsEditing(false);
          }}
        />
      ) : (
        <div>
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          <h3>{task.title}</h3>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline || 'No deadline'}</p>
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;