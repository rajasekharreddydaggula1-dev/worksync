import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store, {
  setTasks, addTask, updateTask, removeTask,
  setProjects, addProject,
  setUsers,
  addActivity, setActivities,
  addNotification,
} from './store';
import socket from './socket';
import { getTasks, getProjects, getUsers, getActivities, getNotifications } from './api';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import KanbanPage from './pages/KanbanPage';
import TeamPage from './pages/TeamPage';
import ReportsPage from './pages/ReportsPage';
import { NotificationsPage, CalendarPage, SettingsPage } from './pages/OtherPages';

function AppInner() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([getTasks(), getProjects(), getUsers(), getActivities(), getNotifications()])
      .then(([t, p, u, a, n]) => {
        dispatch(setTasks(t.data));
        dispatch(setProjects(p.data));
        dispatch(setUsers(u.data));
        dispatch(setActivities(a.data));
        n.data.forEach(notif => dispatch(addNotification(notif)));
      })
      .catch(() => toast.error('Failed to connect to server. Is the backend running?'));

    socket.emit('user:online', { name: 'Alice Johnson', role: 'Admin' });
  }, [dispatch]);

  const onTaskCreated = useCallback((task) => {
    dispatch(addTask(task));
    toast.info(`📌 New task: "${task.title}"`);
  }, [dispatch]);

  const onTaskUpdated = useCallback((task) => {
    dispatch(updateTask(task));
  }, [dispatch]);

  const onTaskDeleted = useCallback((id) => {
    dispatch(removeTask(id));
  }, [dispatch]);

  const onProjectCreated = useCallback((project) => {
    dispatch(addProject(project));
    toast.success(`📁 New project: "${project.name}"`);
  }, [dispatch]);

  const onActivityNew = useCallback((activity) => {
    dispatch(addActivity(activity));
  }, [dispatch]);

  const onNotification = useCallback((notif) => {
    dispatch(addNotification(notif));
    toast.success(`🔔 ${notif.message}`);
  }, [dispatch]);

  useEffect(() => {
    socket.on('task:created', onTaskCreated);
    socket.on('task:updated', onTaskUpdated);
    socket.on('task:deleted', onTaskDeleted);
    socket.on('project:created', onProjectCreated);
    socket.on('activity:new', onActivityNew);
    socket.on('notification:receive', onNotification);
    return () => {
      socket.off('task:created', onTaskCreated);
      socket.off('task:updated', onTaskUpdated);
      socket.off('task:deleted', onTaskDeleted);
      socket.off('project:created', onProjectCreated);
      socket.off('activity:new', onActivityNew);
      socket.off('notification:receive', onNotification);
    };
  }, [onTaskCreated, onTaskUpdated, onTaskDeleted, onProjectCreated, onActivityNew, onNotification]);

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-bg">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col lg:ml-60 overflow-hidden">
          <Navbar setOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/kanban" element={<KanbanPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
