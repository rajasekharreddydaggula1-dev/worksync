import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getTasks = () => api.get('/tasks');
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.patch(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.patch(`/projects/${id}`, data);

export const getUsers = () => api.get('/users');
export const getAnalytics = () => api.get('/analytics');
export const getActivities = () => api.get('/activities');
export const getNotifications = () => api.get('/notifications');
export const markAllRead = () => api.patch('/notifications/read-all');
