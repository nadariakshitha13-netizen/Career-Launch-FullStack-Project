# Career Launch — Student Career & Internship Portal

Career Launch is a full-stack JavaScript web application that helps students explore internship and job opportunities, apply for positions, and track their application status.

## Features

* Student registration and login using bcrypt password hashing and JWT authentication
* Protected student profile endpoint
* Browse, search, and filter job and internship opportunities
* Admin-only opportunity management endpoints
* Apply for opportunities and view personal applications
* Track application statuses: Applied, Shortlisted, Interview, Rejected, and Selected
* React user interface with login, registration, opportunities, and applications pages

## Technologies Used

* **Frontend:** React.js, Vite, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **Language:** JavaScript

## Requirements

* Node.js LTS
* MongoDB Community Server or MongoDB Atlas
* Visual Studio Code
* Git

## Run Locally

### 1. Backend setup

Open a terminal in the project folder and run:

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as a reference. Configure the MongoDB connection, JWT secret, administrator email, and administrator password.

Start the backend:

```bash
npm run dev
```

### 2. Frontend setup

Open a second terminal in the project folder and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

### 3. Database

Ensure MongoDB is running or that your MongoDB Atlas connection is configured correctly.

## API Overview

| Method | Endpoint                           | Purpose                           |
| ------ | ---------------------------------- | --------------------------------- |
| POST   | `/api/auth/register`               | Register a student                |
| POST   | `/api/auth/login`                  | Sign in                           |
| GET    | `/api/auth/me`                     | Get authenticated user details    |
| GET    | `/api/opportunities`               | View opportunities                |
| POST   | `/api/opportunities`               | Create an opportunity (admin)     |
| PUT    | `/api/opportunities/:id`           | Update an opportunity (admin)     |
| DELETE | `/api/opportunities/:id`           | Delete an opportunity (admin)     |
| POST   | `/api/applications/:opportunityId` | Apply for an opportunity          |
| GET    | `/api/applications/my`             | View personal applications        |
| PATCH  | `/api/applications/:id/status`     | Update application status (admin) |
| GET    | `/api/health`                      | Check backend health              |

## Project Structure

```text
Career_Launch_Project/
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── docs/
├── README.md
└── .gitignore
```

## Testing

The application was run locally during development. The student login, opportunities listing, and application workflow were checked.

Add further test cases and screenshots based on the tests actually completed on your machine.

## Future Enhancements

* Email notifications for application updates
* Advanced search and filtering
* Resume upload and profile management
* Deployment to a hosting platform
* Improved administrator dashboard

## Security Note

Keep `.env` files and credentials private. Do not commit passwords, JWT secrets, or database credentials to GitHub. This project is a learning prototype and should be reviewed and secured before production use.
