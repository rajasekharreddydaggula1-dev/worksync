# WorkSync Dashboard

> **Smart Project & Team Management System**

A real-time collaborative workspace dashboard built with the **MERN Stack** — MongoDB, Express.js, React.js, Node.js — powered by Socket.IO for live updates.

---

## Preview

![WorkSync Dashboard](client/src/assets/dashboard.png)

---

## Features

- 📊 **Live Stats Cards** — Total projects, tasks, completed, in-progress, overdue
- 📈 **Interactive Charts** — Weekly line chart + task status pie chart (Recharts)
- 📋 **Task Management** — Add, filter, delete tasks with priority & due dates
- 📁 **Project Tracking** — Project cards with progress bars and team members
- 👥 **Team Overview** — Member cards with online/busy/offline status
- ⚡ **Real-Time Updates** — Socket.IO broadcasts changes to all connected users
- 🔔 **Notifications** — Live broadcast notifications with toast alerts
- 🌙 **Dark Theme** — Clean modern dark UI built with Tailwind CSS
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 19 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| State Management | Redux Toolkit |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Real-Time | Socket.IO |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Notifications | React Toastify |

---

## Project Structure

```
Dashboard/
├── client/                   # React frontend
│   └── src/
│       ├── api/              # Axios API calls
│       ├── assets/           # Logo, images
│       ├── components/       # Reusable UI components
│       │   ├── Sidebar.jsx
│       │   ├── Navbar.jsx
│       │   ├── StatsCard.jsx
│       │   ├── ProjectOverviewChart.jsx
│       │   ├── TaskPieChart.jsx
│       │   ├── UpcomingTasks.jsx
│       │   ├── RecentProjects.jsx
│       │   └── TeamActivity.jsx
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Page components
│       │   ├── DashboardPage.jsx
│       │   ├── ProjectsPage.jsx
│       │   ├── TasksPage.jsx
│       │   ├── TeamPage.jsx
│       │   └── OtherPages.jsx
│       ├── store/            # Redux store & slices
│       ├── socket.js         # Socket.IO client
│       └── App.js
│
└── server/                   # Node.js backend
    └── src/
        ├── models/           # Mongoose models (Task, User)
        ├── routes/           # REST API routes
        ├── socket/           # Socket.IO event handlers
        ├── index.js          # MongoDB version
        └── index-no-mongo.js # In-memory version (no DB needed)
```

---

## Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Overview — stats, charts, activity, upcoming tasks |
| Projects | `/projects` | Project cards with progress, create new projects |
| Tasks | `/tasks` | Task table with filters, add/delete tasks |
| Team | `/team` | Team member cards with status and task counts |
| Notifications | `/notifications` | Live notification feed |
| Settings | `/settings` | Settings panel |

---

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB (optional — in-memory mode available)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/worksync-dashboard.git
cd worksync-dashboard
```

### 2. Start the Backend

```bash
cd server
npm install
```

**With MongoDB:**
```bash
npm run dev
```

**Without MongoDB (in-memory, works instantly):**
```bash
npm run dev:nomongo
```

Server runs on **http://localhost:5000**

### 3. Start the Frontend

```bash
cd client
npm install
npm start
```

Frontend runs on **http://localhost:3000**

---

## Real-Time Events

| Event | Trigger | Effect |
|---|---|---|
| `task:created` | New task added | Appears on all connected screens |
| `task:updated` | Task status changed | Updates live across all users |
| `task:deleted` | Task removed | Disappears for everyone instantly |
| `project:created` | New project added | Shows in all project grids |
| `activity:new` | Any task action | Logged in team activity feed |
| `notification:receive` | Broadcast sent | Toast popup for all users |

> Open the dashboard in **two browser tabs** to see real-time sync in action.

---

## Sample Data

The in-memory server comes preloaded with:
- **5 Projects** — WorkSync Platform, Mobile App Redesign, API Gateway Migration, Analytics Dashboard, Auth Service Upgrade
- **8 Tasks** — spread across Todo, In Progress, and Done
- **5 Team Members** — Alice, Bob, Carol, David, Eve
- **5 Activity Logs** — pre-populated feed
- **3 Notifications** — success, warning, and info types

---

## Scripts

### Server
| Command | Description |
|---|---|
| `npm run dev` | Start with MongoDB (nodemon) |
| `npm run dev:nomongo` | Start with in-memory data (no DB needed) |
| `npm start` | Start in production mode |

### Client
| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |

---

## Environment Variables

Create a `.env` file in the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/workspace_dashboard
CLIENT_URL=http://localhost:3000
```

---

## License

MIT License — free to use and modify.

---

*WorkSync Dashboard — Smart Project & Team Management System*
