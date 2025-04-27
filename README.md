# Job Application Tracker
   You can track and update all the jobs applied to various companies using this app. Good luck with your job hunt.

## CI/CD

| Service   | Build Status                                                                 |
|-----------|-----------------------------------------------------------------------------|
| Frontend App CI/CD  | [![Frontend App CI/CD](https://github.com/prasnitt/JobTracker/actions/workflows/frontend-ci-cd.yml/badge.svg?branch=main)](https://github.com/prasnitt/JobTracker/actions/workflows/frontend-ci-cd.yml) |
| Backend API CI/CD   | [![Backend API CI/CD](https://github.com/prasnitt/JobTracker/actions/workflows/backend-ci-cd.yml/badge.svg?branch=main)](https://github.com/prasnitt/JobTracker/actions/workflows/backend-ci-cd.yml)   |


TODO: CICD diagram will come here

## Technologies Used:

### Backend API: 

- C# .net 8 for backend API
- SQL Lite for Backend Server
- Swagger UI for API documentation

### Fronend App:

- React with Vite
- Tail wind CSS
- [ShadCN Library](https://ui.shadcn.com/) for components

### CI/CD and Infrastructure:

- Github Actions
- Fronend app deployed on Azure Static Webapp
- Fronend api deployed on Azure Webapp


## Setup and Installation  

1. Prerequisites  

    - Node.js (v16 or higher)  
    - .net 8 SDK 
    - Docker (for building and deploying images)  
    - (optional) Confluent Cloud account with API keys  

2. Clone the repository:  
    ```bash
    git clone https://github.com/prasnitt/JobTracker.git
    cd JobTracker
    ```

3. Backend API setup

    1. Go to the following directory:  
     ```bash
     cd backend/JobTracker.Api
     ```
    2. Update the `appsettings.json` file (e.g., CORS setting for Fronend server).
    3. Run the following command to start the server:  
     ```bash
     dotnet run
    ```
    4. Open [http://localhost:5141/swagger](http://localhost:5141/swagger) to access the Swagger document APIs.

4. Fronend App setup

    1. Go to the following directory:  
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

     5. You will able to access the front end app at the specic local endpoint (e.g. `http://localhost:5173/` )  and open this page.


TODO: Screenshots


## Future Improvements  

1. Backend:

    1. Add Authentication & Authorization for APIs
    2. Use bette SQL server (E.g. MSSQL, Postgres etc)
    3. Use Terraform for infrastructure as code (IaC).
    4. Explore additional improvements as needed.

1. Fronend:

    1. Get a bette design of entire app.
    2. Make responsive (for both Desktop and Mobile)
    