<!-- @format -->

# RailCoach Management System

A Railway Coach Management System built with React (Vite) for the frontend and Node.js/Express with MongoDB for the backend. This repo contains everything needed to run and develop the application locally: user authentication, coach management, maintenance tasks, and admin features.

## Quick links

- Frontend: [Frontend](Frontend)
- Backend: [Backend](Backend)

## Key features

- User authentication (signup/login) with JWT
- Coach CRUD and profile pages
- Create and track maintenance tasks
- Role-based access for admins and department users
- Dashboard with charts and summaries

## Tech stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JSON Web Tokens (JWT), bcrypt for password hashing
- Dev tools: nodemon, dotenv

## Project structure

Top-level layout (important files and folders):

```
React+Node/
├─ Backend/         # Express API, controllers, models, routes
├─ Frontend/        # Vite + React application
└─ README.md        # This file
```

See the folders `Frontend` and `Backend` for full structure and source files.

## Prerequisites

- Node.js v14 or newer
- npm or yarn
- MongoDB (local or Atlas)

## Setup

1. Clone the repository and open the project root:

```bash
git clone <repository-url>
cd React+Node
```

2. Backend setup

```bash
cd Backend
npm install
# create .env (see Environment variables below)
```

3. Frontend setup

```bash
cd ../Frontend
npm install
```

## Environment variables (Backend)

Create a `.env` file inside the `Backend` folder with at least:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/railcoach
JWT_TOCKEN=your_jwt_secret_here
```

Replace values as appropriate. Do not commit `.env` to source control.

## Running the apps

Start the backend server (from `Backend`):

```bash
cd Backend
npm start
```

Start the frontend dev server (from `Frontend`):

```bash
cd Frontend
npm run dev
```

Default URLs:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## API overview

Base path: `/api/v1`

- POST `/singup` — create a new user
- POST `/login` — login and receive JWT (token stored in cookie)

Coach routes:

- POST `/coachdata` — create a coach

Task routes:

- POST `/taskdata` — create maintenance task
- GET `/alltaskdata` — list tasks

Request/response details and exact route handlers are implemented in `Backend/route` and `Backend/Controller`.

## Data models (summary)

- User: `first_name`, `last_name`, `email`, `password` (hashed), `role`
- Coach: `coachNo`, `coachtype`, `depot`, `satus`, `lasrMaintenace`, `nextDueDate`
- Task: `selectCoach` (ref), `task`, `priority`, `department`, `assignedBy` (ref), `description`

## Authentication & Security

- JWT tokens, stored as httpOnly cookies
- Passwords hashed with bcrypt
- Token expiry set in server code (commonly 2 hours)

## Scripts

Backend (in `Backend`):

```bash
npm start    # start server with nodemon
```

Frontend (in `Frontend`):

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Troubleshooting

- Database connection errors: ensure MongoDB is running and `MONGO_URL` is correct
- Port conflicts: update `PORT` in `.env` or stop the process using the port
- Dependency issues: remove `node_modules` and `package-lock.json`, then `npm install`

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit and push your changes
4. Open a pull request

## License

This project is licensed under the ISC License.

## Author & Support

Author: Your Name
For support: dhruvamaheshwari0@gmail.com

---

If you'd like, I can also:

- add a short `CONTRIBUTING.md`
- create `.env.example` in `Backend`
- commit and push this change for you
