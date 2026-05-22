import { configureStore, createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (_, a) => a.payload,
    addTask: (s, a) => [a.payload, ...s],
    updateTask: (s, a) => s.map(t => t._id === a.payload._id ? a.payload : t),
    removeTask: (s, a) => s.filter(t => t._id !== a.payload),
  },
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    setProjects: (_, a) => a.payload,
    addProject: (s, a) => [a.payload, ...s],
    updateProject: (s, a) => s.map(p => p._id === a.payload._id ? a.payload : p),
  },
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (_, a) => a.payload,
    updateUserStatus: (s, a) => s.map(u => u._id === a.payload._id ? a.payload : u),
  },
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: [],
  reducers: {
    addActivity: (s, a) => [a.payload, ...s].slice(0, 20),
    setActivities: (_, a) => a.payload,
  },
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: (s, a) => [a.payload, ...s].slice(0, 15),
    clearNotifications: () => [],
  },
});

export const { setTasks, addTask, updateTask, removeTask } = tasksSlice.actions;
export const { setProjects, addProject, updateProject } = projectsSlice.actions;
export const { setUsers, updateUserStatus } = usersSlice.actions;
export const { addActivity, setActivities } = activitiesSlice.actions;
export const { addNotification, clearNotifications } = notificationsSlice.actions;

export default configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    projects: projectsSlice.reducer,
    users: usersSlice.reducer,
    activities: activitiesSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
});
