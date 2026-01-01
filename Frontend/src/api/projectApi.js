import axios from 'axios';

export const API_BASE = 'http://localhost:5000'; 

export const getAllProjects = async () => {
  try {
    const res = await axios.get(`${API_BASE}/`); 
    return res.data;
  } catch (err) {
    console.error('Error fetching projects:', err.response?.data || err.message);
    throw err;
  }
};

export const createProject = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/create`, formData);
    return res.data;
  } catch (err) {
    console.error('Error creating project:', err.response?.data || err.message);
    throw err;
  }
};

export const updateProject = async (formData) => {
    try {
    const res = await axios({
      method: 'put',           
      url: `${API_BASE}/update`,
      data: formData,         
      headers: { 
        'Content-Type': 'multipart/form-data', 
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error updating project:', err.response?.data || err.message);
    throw err;
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting project:', err.response?.data || err.message);
    throw err;
  }
};
