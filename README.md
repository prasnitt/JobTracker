# Job Application Tracker
Track and manage all the jobs you’ve applied to in one place. This app helps you stay organized during your job hunt. Good luck!

## Overview
Job Application Tracker is a web application that allows users to:
- Add, update, and delete(TBD)  job applications.
- Track the status of applications (e.g., Applied, Interview, Offer, Rejected).
- View a dashboard of all job applications.

The app is built with a modern tech stack and deployed using CI/CD pipelines.

## CI/CD
| Service           | Build Status                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| Frontend App CI/CD | [![Frontend App CI/CD](https://github.com/prasnitt/JobTracker/actions/workflows/frontend-ci-cd.yml/badge.svg?branch=main)](https://github.com/prasnitt/JobTracker/actions/workflows/frontend-ci-cd.yml) |
| Backend API CI/CD  | [![Backend API CI/CD](https://github.com/prasnitt/JobTracker/actions/workflows/backend-ci-cd.yml/badge.svg?branch=main)](https://github.com/prasnitt/JobTracker/actions/workflows/backend-ci-cd.yml) |

## Technologies Used

### Backend API:
- C# .NET 8
- SQLite
- Swagger UI for API documentation

### Frontend App:
- React with Vite
- Tailwind CSS
- [ShadCN Library](https://ui.shadcn.com/) for components

### CI/CD and Infrastructure:
- GitHub Actions
- Frontend app deployed on Azure Static Web Apps
- Backend API deployed on Azure Web Apps

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- .NET 8 SDK

### Backend API Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/JobTracker.Api
   ```
2. Update the `appsettings.json` file (e.g., CORS setting for Frontend server).
3. Run the following command to start the server:
   ```bash
   dotnet run
   ```
4. Open [http://localhost:5141/swagger](http://localhost:5141/swagger) to access the Swagger document APIs.

### Frontend App Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/job-tracker-app/
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Add your Confluent Cloud API keys and AWS credentials to a `.env` file.
4. Start the application:
   ```bash
   npm run dev
   ```
5. You will be able to access the frontend app at the specific local endpoint (e.g., `http://localhost:5173/`).

TODO: Screenshots

## Future Improvements

### Backend:
1. Add Authentication & Authorization for APIs
2. Use a better SQL server (e.g., MSSQL, Postgres)
3. Use Terraform for infrastructure as code (IaC)
4. Explore additional improvements as needed

### Frontend:
1. Get a better design for the entire app
2. Make it responsive (for both Desktop and Mobile)


