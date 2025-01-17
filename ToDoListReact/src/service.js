import axios from 'axios';
const apiUrl = "http://localhost:5214";
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});
export const service = {
  getTasks: async () => {
    try {
      const result = await instance.get('/todos');
      return result.data;
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      const task = { name };
      const result = await instance.post('/todos', task);
      return result.data;
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
      throw error;
    }
  },
  setCompleted: async (id, name, isComplete) => {
    try {
      const taskUpdate = { name, isComplete };
      const result = await instance.put(`/todos/${id}`, taskUpdate);
      return result.data;
    } catch (error) {
      console.error('Error updating task completion:', error.response?.data || error.message);
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      const result = await instance.delete(`/todos/${id}`);
      return result.data;
    } catch (error) {
      console.error('Error deleting task:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default instance;
