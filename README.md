# IncorpoFlow – Company Incorporation Tool

A full‑stack application for multi‑step company incorporation with draft persistence and admin view.  
Built with **Node.js**, **Express**, **React**, **PostgreSQL**, and **Docker**.

---

##   Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development (without Docker)](#development-without-docker)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    - [Database Setup](#database-setup)
  - [Docker Setup (Recommended for Deployment / Easy Testing)](#docker-setup-recommended-for-deployment--easy-testing)
    - [Environment Files Explained](#environment-files-explained)
    - [Quick Start with Docker](#quick-start-with-docker)
    - [Database Persistence](#database-persistence)
    - [Useful Docker Commands](#useful-docker-commands)
- [API Testing](#api-testing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

##  Features

- **Multi‑step form**: Company Information (Step 1) → Shareholder Details (Step 2)
- **Draft persistence**: Data saved instantly, survives browser refresh
- **Admin view**: List all companies with their shareholders
- **RESTful API** with validation and error handling
- **Fully containerised** with Docker for easy deployment and testing

---

## 🛠️ Tech Stack

| Layer       | Technologies                                    |
|-------------|-------------------------------------------------|
| Backend     | Node.js, Express, Sequelize (ORM), PostgreSQL  |
| Frontend    | React, React Hook Form, Axios                   |
| DevOps      | Docker, Docker Compose, Nginx                    |

---

##  Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** (for local development)
- **PostgreSQL** 15+ (for local development) – *optional if you use Docker*
- **Docker** and **Docker Compose** (for containerised setup)

---

## 💻 Development (without Docker)

Run the backend and frontend directly on your machine for active development.

### Backend Setup

```bash
cd backend

```
# Copy environment variables template
cp .env.example .env


# Edit .env with your local PostgreSQL credentials
```bash
  DB_HOST=localhost
  DB_PORT=5432
  DB_NAME=company_incorporation_dev
  DB_USER=postgres
  DB_PASSWORD=yourpassword
```
# Install dependencies

```bash
npm install
```

# Run database migrations
```bash
npm run migrate

```
# (Optional) Seed initial data
```bash
npm run seed

```
# Start development server with auto‑reload
```bash
npm run dev

```
Backend API will be available at http://localhost:3000/api.

 
```
```
# Frontend Setup
```bash
cd frontend

```
# Install dependencies
```bash
npm install

```
# Start development server
```bash
npm start

```
Frontend will be available at http://localhost:3001 (or another port if 3001 is busy).


#  Database Setup (local)
Make sure PostgreSQL is running and create the database

```SQL
CREATE DATABASE company_incorporation_dev;

```
Then run migrations as shown above.

# Docker Setup (Recommended for Deployment / Easy Testing)
With Docker, you don’t need to install Node.js or PostgreSQL on your host – everything runs in isolated containers.

Environment Files Explained
We use two separate .env files to keep concerns separate

| file          |     Location   |                           Purpose                                 |         Uses When               |
|---------------|----------------|-------------------------------------------------------------------|---------------------------------|
| .env          |  project root  | Configuration for Docker Compose (database password, ports, etc.) | Running docker-compose up       |
|  backend/.env |   backend/     | Configuration for running the backend locally (without Docker)    | Running npm run dev on your host|
----------------------------------------------------------------------------------------------------------------------------------------
Never commit real secrets. Both files are listed in .gitignore.
Example templates are provided (.env.docker.example and backend/.env.example).


# Quick Start with Docker

1. Clone the repository
 ```bash
git clone https://github.com/rajanshah23/IncorpoFlow.git
cd IncorpoFlow
```

2. Set up environment variables for Docker
Copy the example environment file and edit it with your own secure passwords
```bash
cp .env.docker.example .env

```
Open .env and change at least POSTGRES_PASSWORD to a strong password.
All other variables are pre‑filled and should work as is.

3. Create the database data folder (on your host)
   PostgreSQL will store its data in a folder on your computer so it survives container restarts
```bash
# Linux / macOS
mkdir -p ./data/postgres

# Windows (PowerShell)
New-Item -ItemType Directory -Path .\data\postgres -Force

```
4. Build and start the containers
```bash
docker-compose up -d --build
```

This starts:
-PostgreSQL on port 5432 (mapped to host)
-Backend API on port 3000
-Frontend (served by Nginx) on port 80

5. Run database migrations (first time only)
The database is empty initially. Run migrations to create the tables:
```bash
 docker exec -it incorporflow_backend npm run migrate:docker
```
If you have seed data, also run:
```bash
 docker exec -it incorporflow_backend npm run seed:docker
```
6. Access the application
    -Frontend: http://localhost
    -Backend API: http://localhost:3000/api

7. Stopping the application
```bash
docker-compose down
```
Your database data remains in ./data/postgres and will be used next time you start.

# Database Persistence
  PostgreSQL data is stored in ./data/postgres on your host (bind mount).
  -This folder is not managed by Docker volumes – it's a plain directory.
  -Even docker-compose down -v does not delete this folder; -v only removes Docker volumes.
  
# To completely reset the database, stop the containers and delete the folder
```bash
docker-compose down
rm -rf ./data/postgres   # or remove manually
```

# Useful Docker Commands

|                  Command                                        |                          Description         |  
|-----------------------------------------------------------------|----------------------------------------------|
| docker-compose up -d                                            | Start all services in background             |
| docker-compose down                                             | Stop and remove containers (data persists)   |
| docker-compose logs -f backend                                  | Follow backend logs                          |
| docker exec -it incorporflow_backend sh                         | Open a shell in the backend container        |
| docker exec -it incorporflow_db psql -U postgres -d incorporflow| Connect to PostgreSQL inside container       |
| docker-compose up -d --build backend                            | Rebuild and restart only the backend         |
 
