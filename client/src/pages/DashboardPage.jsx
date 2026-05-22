import { useSelector } from 'react-redux';
import { MdFolder, MdCheckBox, MdDoneAll, MdSync, MdWarning } from 'react-icons/md';
import StatsCard from '../components/StatsCard';
import ProjectOverviewChart from '../components/ProjectOverviewChart';
import TaskPieChart from '../components/TaskPieChart';
import UpcomingTasks from '../components/UpcomingTasks';
import RecentProjects from '../components/RecentProjects';
import TeamActivity from '../components/TeamActivity';

export default function DashboardPage() {
  const tasks = useSelector(s => s.tasks);
  const projects = useSelector(s => s.projects);
  const activities = useSelector(s => s.activities);

  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length;

  const weeklyData = [
    { day: 'Mon', completed: 4, inProgress: 6, pending: 3 },
    { day: 'Tue', completed: 6, inProgress: 5, pending: 4 },
    { day: 'Wed', completed: 5, inProgress: 8, pending: 2 },
    { day: 'Thu', completed: 8, inProgress: 4, pending: 5 },
    { day: 'Fri', completed: 7, inProgress: 6, pending: 3 },
    { day: 'Sat', completed: 3, inProgress: 2, pending: 1 },
    { day: 'Sun', completed: 2, inProgress: 1, pending: 2 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">WorkSync – Smart Project & Team Management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Projects" value={projects.length} icon={MdFolder} color="bg-indigo-600" growth={12} />
        <StatsCard title="Total Tasks" value={tasks.length} icon={MdCheckBox} color="bg-blue-600" growth={8} />
        <StatsCard title="Completed" value={done} icon={MdDoneAll} color="bg-green-600" growth={15} />
        <StatsCard title="In Progress" value={inProgress} icon={MdSync} color="bg-yellow-600" growth={-3} />
        <StatsCard title="Overdue" value={overdue} icon={MdWarning} color="bg-red-600" growth={-5} subtitle="Needs attention" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProjectOverviewChart data={weeklyData} />
        </div>
        <TaskPieChart completed={done} inProgress={inProgress} todo={todo} />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UpcomingTasks tasks={tasks} />
        <TeamActivity activities={activities} />
      </div>

      {/* Projects Table */}
      <RecentProjects projects={projects} />
    </div>
  );
}
