import { useSelector } from 'react-redux';
import { MdFolder, MdCheckBox, MdDoneAll, MdSync, MdWarning } from 'react-icons/md';
import StatsCard from '../components/StatsCard';
import ProjectOverviewChart from '../components/ProjectOverviewChart';
import TaskPieChart from '../components/TaskPieChart';
import UpcomingTasks from '../components/UpcomingTasks';
import RecentProjects from '../components/RecentProjects';
import TeamActivity from '../components/TeamActivity';

const weeklyData = [
  { day: 'Mon', completed: 4, inProgress: 6, pending: 3 },
  { day: 'Tue', completed: 6, inProgress: 5, pending: 4 },
  { day: 'Wed', completed: 5, inProgress: 8, pending: 2 },
  { day: 'Thu', completed: 8, inProgress: 4, pending: 5 },
  { day: 'Fri', completed: 7, inProgress: 6, pending: 3 },
  { day: 'Sat', completed: 3, inProgress: 2, pending: 1 },
  { day: 'Sun', completed: 2, inProgress: 1, pending: 2 },
];

export default function DashboardPage() {
  const tasks = useSelector(s => s.tasks);
  const projects = useSelector(s => s.projects);
  const activities = useSelector(s => s.activities);

  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done').length;

  const stats = [
    { title: 'Total Projects', value: projects.length || 24, icon: MdFolder, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', growth: 12 },
    { title: 'Total Tasks', value: tasks.length || 153, icon: MdCheckBox, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', growth: 8 },
    { title: 'Completed Tasks', value: done || 89, icon: MdDoneAll, iconBg: 'bg-green-100', iconColor: 'text-green-600', growth: 16 },
    { title: 'In Progress', value: inProgress || 37, icon: MdSync, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', growth: -5 },
    { title: 'Overdue Tasks', value: overdue || 8, icon: MdWarning, iconBg: 'bg-red-100', iconColor: 'text-red-500', growth: -3 },
  ];

  return (
    <div className="p-5 lg:p-6 space-y-5 min-h-full bg-[#F1F5F9]">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => <StatsCard key={i} {...s} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProjectOverviewChart data={weeklyData} />
        </div>
        <TaskPieChart completed={done || 89} inProgress={inProgress || 37} todo={todo || 27} />
      </div>

      {/* Upcoming + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UpcomingTasks tasks={tasks} />
        <TeamActivity activities={activities} />
      </div>

      {/* Projects Table */}
      <RecentProjects projects={projects} />
    </div>
  );
}
