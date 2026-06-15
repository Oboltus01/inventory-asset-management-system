# Inventory and Asset Management System

## Overview

**Inventory and Asset Management System** is a web-based application for managing company assets, employees, categories, procurement requests, and reports.

The project demonstrates a small enterprise-style system with a Python backend, MariaDB database, frontend interface, Docker Compose deployment, and phpMyAdmin for database inspection.

---

## Project Preview

### Frontend

![Frontend Assets Page](docs/screenshots/frontend_assets.png)

### Backend API

![Assets API Response](docs/screenshots/api_assets.png)

### Database

![Database Assets Table](docs/screenshots/database_assets_table.png)

### Docker Containers

![Docker Containers in VS Code](docs/screenshots/docker_containers_vscode.png)

![Docker Containers Ports](docs/screenshots/docker_containers_ports.png)

---

## Main Features

| Feature | Description |
|---|---|
| Asset Management | Register, view, and track company assets |
| Employee Management | Link assets to responsible employees |
| Category Management | Organize assets by categories |
| Procurement Workflow | Track equipment purchase requests |
| Reports | Show inventory summaries and statistics |
| Audit Logging | Track important system actions |
| Docker Deployment | Run the full system with Docker Compose |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Python |
| Database | MariaDB 11.4 |
| Frontend | HTML, CSS, JavaScript |
| Web Server | Nginx |
| Database UI | phpMyAdmin |
| Deployment | Docker, Docker Compose |

---

## Docker Services

| Service | Container Name | Port |
|---|---|---|
| Backend | `inventory_backend` | `8001:8001` |
| Frontend | `inventory_frontend` | `3000:80` |
| MariaDB | `inventory_mariadb` | `3307:3306` |
| phpMyAdmin | `inventory_phpmyadmin` | `8081:80` |

---

## Project Structure

```text
Inventory_Asset_Management_System
│
├── app
│   ├── main.py
│   ├── api
│   ├── config
│   ├── models
│   ├── repositories
│   └── services
│
├── db
│   └── schema.sql
│
├── docs
│   ├── project_documentation.md
│   └── screenshots
│
├── frontend
│   ├── index.html
│   ├── css
│   └── js
│
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── .env
└── README.md
```

---

## How to Run

From the project root folder:

```text
E:\Devops_2079_04Aug2025\CourseLessons\Lesson_081_09Jun2026\LessonFiles\Inventory_Asset_Management_System
```

Run:

```powershell
docker compose up -d --build
```

Check running containers:

```powershell
docker ps
```

---

## Application URLs

| Application | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend Assets API | `http://localhost:8001/api/assets` |
| phpMyAdmin | `http://localhost:8081` |

---

## Database Initialization

If the database schema needs to be imported manually, run this command from the project root folder:

```powershell
Get-Content .\db\schema.sql | docker exec -i inventory_mariadb mariadb -u inventory_user -pinventory_pass inventory_db
```

---

## Example API Response

Endpoint:

```text
GET http://localhost:8001/api/assets
```

Example response:

```json
{
  "count": 5,
  "items": [
    {
      "id": 1,
      "name": "Dell Latitude 5420",
      "category_id": 1,
      "category_name": "laptops",
      "employee_id": 1,
      "employee_name": "Admin User",
      "location": "IT Office",
      "status": "assigned"
    },
    {
      "id": 2,
      "name": "HP Monitor 24",
      "category_id": 2,
      "category_name": "monitors",
      "employee_id": null,
      "employee_name": null,
      "location": "Storage Room",
      "status": "available"
    }
  ]
}
```

---

## Screenshots

Project screenshots are stored in:

```text
docs/screenshots
```

| Screenshot | Description |
|---|---|
| `frontend_assets.png` | Frontend Assets page |
| `api_assets.png` | Backend Assets API response |
| `database_assets_table.png` | Assets table in phpMyAdmin |
| `docker_containers_vscode.png` | Running containers in VS Code |
| `docker_containers_ports.png` | Running containers and exposed ports in Docker Desktop |

---

## Documentation

Full project documentation is available here:

```text
docs/project_documentation.md
```

---

## Current Status

Implemented:

- Docker Compose environment
- MariaDB database
- Backend container
- Frontend container
- phpMyAdmin container
- Database schema
- Assets API
- Basic frontend structure
- Asset creation form
- Initial asset test data
- Project documentation
- Screenshots for project presentation

In progress:

- Employee management improvements
- Procurement workflow
- Reports page
- Audit logging improvements
- Additional validation

---

## Future Improvements

Possible future improvements:

- Add authentication
- Add user roles
- Add asset search and filters
- Add asset edit form
- Add asset delete/archive option
- Add CSV export
- Add PDF reports
- Add dashboard charts
- Add automated tests
- Add CI/CD pipeline
- Add backup and restore scripts

---

## Author

Course final project: **Inventory and Asset Management System**
