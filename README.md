# Real-Time Workspace Dashboard (MERN Stack)

A real-time collaborative workspace dashboard built with MongoDB, Express, React, and Node.js + Socket.IO.

## Features
- 📋 Kanban-style task board (Todo / In-Progress / Done)
- 👥 Team member presence & status
- ⚡ Live activity feed via Socket.IO
- 🔔 Real-time broadcast notifications
- 📊 Live stats cards

## Project Structure
```
Dashboard/
├── server/          # Node.js + Express + Socket.IO backend
│   ├── src/
│   │   ├── models/  # Mongoose models (Task, User)
│   │   ├── routes/  # REST API routes
│   │   ├── socket/  # Socket.IO event handlers
│   │   └── index.js
│   ├── seed.js      # Sample data seeder
│   └── .env
└── client/          # React frontend
    └── src/
        ├── components/
        ├── hooks/
        ├── api/
        ├── socket.js
        └── App.js
```

## Setup & Run

### Prerequisites
- Node.js >= 16
- MongoDB running locally on port 27017

### 1. Start Backend
```bash
cd server
npm install
node seed.js        # seed sample data (optional)
npm run dev         # starts on http://localhost:5000
```

### 2. Start Frontend
```bash
cd client
npm start           # starts on http://localhost:3000
```

Open http://localhost:3000 to view the dashboard.
