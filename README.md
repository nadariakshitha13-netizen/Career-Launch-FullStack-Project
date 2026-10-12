# Career Launch — Student Career & Internship Portal

Beginner-friendly full-stack JavaScript Framework PBL starter project.

## Features included
- Student registration and login using bcrypt password hashing and JWT
- Protected student profile endpoint
- Browse, search, and filter job/internship opportunities
- Admin-only create, edit, and delete opportunity endpoints
- Students can apply to an opportunity and view their own application tracker
- Application status values: Applied, Shortlisted, Interview, Rejected, Selected
- React UI with pages for login/register, opportunities, and my applications

## Technology
React + Vite, React Router, Axios, Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs.

## Requirements
Install Node.js LTS and MongoDB Community locally, or use a MongoDB Atlas connection string.

## Run locally
1. Open this folder in VS Code.
2. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   Edit `.env`: set `MONGO_URI`, a long random `JWT_SECRET`, and `ADMIN_EMAIL`/`ADMIN_PASSWORD`.
   ```bash
   npm run dev
   ```
3. Frontend in a second terminal:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
4. Open the local URL printed by Vite (normally http://localhost:5173).
5. Register a student account. To make an admin account, register with the exact `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured in `.env`; only that email/password pair is assigned the admin role. Change the example credentials before running. Do not use this simple setup for production.

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT)
- `GET /api/opportunities` (public)
- `POST /api/opportunities` (admin)
- `PUT /api/opportunities/:id` (admin)
- `DELETE /api/opportunities/:id` (admin)
- `POST /api/applications/:opportunityId` (student)
- `GET /api/applications/my` (student)
- `PATCH /api/applications/:id/status` (admin)
- `GET /api/health`

## Before submission
- Run and test the application on your own machine.
- Add your real name, enrollment number, faculty details, and actual screenshots to the report.
- Complete the testing table with actual results; do not claim tests or deployment you did not perform.
- The included report is a draft aligned to the university report structure, not a claim that the app has been deployed or externally audited.
