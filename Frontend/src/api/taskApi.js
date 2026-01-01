import axios from 'axios';

const API_BASE = 'http://localhost:5000/tasks';

export const getTasksByProject = async (projectId) => {
  try {
    const res = await axios.get(`${API_BASE}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching tasks:', err.response?.data || err.message);
    throw err;
  }
};

export const createTask = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/create`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    console.error('Error creating task:', err.response?.data || err.message);
    throw err;
  }
};

export const updateTask = async (formData) => {
  try {
    const res = await axios.put(`${API_BASE}/update`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    console.error('Error updating task:', err.response?.data || err.message);
    throw err;
  }
};

export const deleteTask = async (taskId, projectId) => {
  try {
    const res = await axios.delete(`${API_BASE}/delete`, { data: { taskId, projectId } });
    return res.data;
  } catch (err) {
    console.error('Error deleting task:', err.response?.data || err.message);
    throw err;
  }
};

export const changeTaskStatus = async (taskId) => {
  try {
    const res = await axios.put(`${API_BASE}/update/status/${taskId}`);
    return res.data;
  } catch (err) {
    console.error('Error changing status:', err.response?.data || err.message);
    throw err;
  }
};
