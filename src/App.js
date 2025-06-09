import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const handleAddTask = (newTask) => {
    // This will be handled by TaskList's useEffect
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div className="filter-sort">
        <label>Filter by Priority: </label>
        <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label style={{ marginLeft: '20px' }}>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">None</option>
          <option value="priority">Priority</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
      <TaskList sortBy={sortBy} priorityFilter={priorityFilter} />
    </div>
  );
};

export default App;