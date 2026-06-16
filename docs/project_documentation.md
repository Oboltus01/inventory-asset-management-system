# Inventory and Asset Management System

## 1. Project Overview

The **Inventory and Asset Management System** is a web-based application for managing company assets, employees, categories, procurement requests, and reports.

The system is designed as a small enterprise-style application with a relational database, REST-style backend API, frontend interface, audit logging concept, and Docker-based deployment.

The main goal of the project is to track company equipment from registration to assignment, availability, procurement, and reporting.

---

## 2. Main Features

### Asset Management

The system allows users to manage company assets such as laptops, monitors, network devices, office equipment, and other company resources.

Each asset contains:

- Asset name
- Serial number
- Category
- Assigned employee
- Location
- Status
- Purchase date
- Price
- Notes

Example statuses:

- available
- assigned
- maintenance
- retired

---

### Employee Management

Employees can be stored in the system and linked to assigned assets.

Each employee contains:

- Employee ID
- Full name
- Department
- Email
- Position

This makes it possible to see which employee is responsible for each asset.

---

### Category Management

Assets are grouped by categories.

Examples:

- laptops
- monitors
- network devices
- office equipment
- software licenses
- other

Categories help organize the inventory and simplify filtering and reporting.

---

### Procurement Workflow

The procurement module is used to register requests for new equipment.

A procurement request may include:

- Employee
- Category
- Item name
- Reason
- Status
- Creation date
- Update date

Example request statuses:

- new
- approved
- rejected
- purchased

---

### Reports

The reporting module provides summarized information about the inventory.

Examples of useful reports:

- Total number of assets
- Available assets
- Assigned assets
- Total employees
- Procurement request statistics

---

### Audit Logging

Important actions can be recorded in the audit log.

Examples:

- Asset created
- Asset updated
- Asset assigned
- Procurement request created
- Procurement status changed

Audit logging helps track system activity and improves reliability.

---

## 3. Project Architecture

The project uses a modular structure.

```text
Inventory_Asset_Management_System
│
├── app
│   ├── main.py
│   ├── api
│   │   ├── assets_api.py
│   │   ├── employees_api.py
│   │   ├── procurement_api.py
│   │   └── reports_api.py
│   │
│   ├── config
│   │   ├── db_config.py
│   │   └── settings.py
│   │
│   ├── models
│   │   ├── asset.py
│   │   ├── category.py
│   │   ├── employee.py
│   │   └── procurement_request.py
│   │
│   ├── repositories
│   │   ├── asset_repository.py
│   │   ├── audit_repository.py
│   │   ├── database.py
│   │   ├── employee_repository.py
│   │   └── procurement_repository.py
│   │
│   └── services
│       ├── asset_service.py
│       ├── audit_service.py
│       ├── employee_service.py
│       ├── procurement_service.py
│       └── report_service.py
│
├── db
│   └── schema.sql
│
├── docs
│   ├── project_documentation.md
│   └── screenshots
│       ├── api_assets.png
│       ├── database_assets_table.png
│       ├── docker_containers_ports.png
│       ├── docker_containers_vscode.png
│       └── frontend_assets.png
│
├── frontend
│   ├── index.html
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
│
├── scripts
│   └── git_checkpoint.ps1
│
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── .env
└── README.md
```

---

## 4. Technology Stack

### Backend

- Python
- Custom HTTP API structure
- mysql-connector-python
- python-dotenv

### Database

- MariaDB 11.4

### Frontend

- HTML
- CSS
- JavaScript
- Nginx container for serving static files

### DevOps and Deployment

- Docker
- Docker Compose
- phpMyAdmin for database inspection
- Git checkpoint script

---

## 5. Docker Services

The system runs with Docker Compose and contains several containers.

| Service | Container Name | Port Mapping | Purpose |
|---|---|---|---|
| MariaDB | `inventory_mariadb` | `3307:3306` | Stores application data |
| Backend | `inventory_backend` | `8001:8001` | Provides API endpoints |
| Frontend | `inventory_frontend` | `3000:80` | Serves the web interface |
| phpMyAdmin | `inventory_phpmyadmin` | `8081:80` | Provides database inspection UI |

---

### MariaDB

Container name:

```text
inventory_mariadb
```

Port mapping:

```text
3307:3306
```

Purpose:

- Stores all application data
- Contains assets, employees, categories, procurement requests, and audit logs

---

### Backend

Container name:

```text
inventory_backend
```

Port mapping:

```text
8001:8001
```

Purpose:

- Provides REST-style API endpoints
- Connects frontend with the database
- Handles business logic through services and repositories

---

### Frontend

Container name:

```text
inventory_frontend
```

Port mapping:

```text
3000:80
```

Purpose:

- Serves the web interface
- Allows the user to view and manage assets, employees, procurement requests, and reports from the browser

---

### phpMyAdmin

Container name:

```text
inventory_phpmyadmin
```

Port mapping:

```text
8081:80
```

Purpose:

- Provides a graphical interface for inspecting and managing the MariaDB database

---

## 6. Database Structure

The database contains the following main tables:

```text
assets
categories
employees
procurement_requests
audit_logs
```

---

### assets

Stores company assets.

Main fields:

- id
- name
- serial_number
- category_id
- employee_id
- location
- status
- purchase_date
- price
- notes
- created_at
- updated_at

---

### categories

Stores asset categories.

Main fields:

- id
- name
- description
- created_at

---

### employees

Stores employee data.

Main fields:

- id
- full_name
- email
- department
- position
- is_active
- created_at

---

### procurement_requests

Stores equipment purchase requests.

Main fields:

- id
- employee_id
- category_id
- item_name
- reason
- status
- created_at
- updated_at

---

### audit_logs

Stores system activity logs.

Main fields:

- id
- entity_type
- entity_id
- action
- description
- created_at

---

## 7. API Endpoints

### Health API

Base path:

```text
/api/health
```

Example request:

```text
GET http://localhost:8001/api/health
```

Purpose:

- Check that the backend is running
- Check database connection status

---

### Assets API

Base path:

```text
/api/assets
```

Example request:

```text
GET http://localhost:8001/api/assets
```

Purpose:

- View assets
- Create assets
- Display assets in the frontend table
- Use search/filter in the frontend

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

### Categories API

Base path:

```text
/api/categories
```

Purpose:

- View asset categories
- Fill category dropdown lists in frontend forms

---

### Employees API

Base path:

```text
/api/employees
```

Purpose:

- View employees
- Add employees
- Use employees when assigning assets
- Use search/filter in the frontend

---

### Procurement API

Base path:

```text
/api/procurement
```

Purpose:

- Create procurement requests
- View existing requests
- Track request statuses
- Use search/filter in the frontend

---

### Reports API

Base path:

```text
/api/reports
```

Purpose:

- Show inventory statistics
- Show asset distribution
- Show procurement summaries
- Provide data for the frontend dashboard

---

## 8. Application Layers

The project is divided into several logical layers.

### API Layer

Location:

```text
app\api
```

Responsibility:

- Receive HTTP requests
- Parse request data
- Call service functions
- Return JSON responses

---

### Service Layer

Location:

```text
app\services
```

Responsibility:

- Contains business logic
- Validates operations
- Coordinates repositories
- Calls audit logging when needed

---

### Repository Layer

Location:

```text
app\repositories
```

Responsibility:

- Works directly with the database
- Executes SQL queries
- Converts database rows into Python dictionaries or models

---

### Model Layer

Location:

```text
app\models
```

Responsibility:

- Describes main project entities
- Keeps the project structure clean and understandable

---

### Configuration Layer

Location:

```text
app\config
```

Responsibility:

- Loads environment variables
- Stores database connection settings
- Keeps configuration separated from application logic

---

## 9. Environment Configuration

The project uses a `.env` file for configuration.

Example:

```env
DB_HOST=inventory_mariadb
DB_PORT=3306
DB_NAME=inventory_db
DB_USER=inventory_user
DB_PASSWORD=inventory_pass
BACKEND_PORT=8001
```

The backend reads these values and uses them to connect to MariaDB.

---

## 10. How to Run the Project

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

Open the frontend:

```text
http://localhost:3000
```

Open the backend health API:

```text
http://localhost:8001/api/health
```

Open the backend assets API:

```text
http://localhost:8001/api/assets
```

Open phpMyAdmin:

```text
http://localhost:8081
```

---

## 11. Database Initialization

If the database schema needs to be loaded manually, run this command from the project root folder:

```powershell
Get-Content .\db\schema.sql | docker exec -i inventory_mariadb mariadb -u inventory_user -pinventory_pass inventory_db
```

This command imports the SQL schema into the MariaDB container.

---

## 12. Example Test

To test the Health API, open in the browser:

```text
http://localhost:8001/api/health
```

Expected result:

```json
{
  "status": "ok",
  "service": "Inventory Asset Management Backend",
  "database": "connected"
}
```

To test the Assets API, open in the browser:

```text
http://localhost:8001/api/assets
```

Expected example result:

```text
The API should return JSON with the total asset count and the asset records.
```

---

## 13. Current Project Status

Implemented:

- Docker Compose configuration
- MariaDB container
- Backend container
- Frontend nginx container
- phpMyAdmin container
- Database schema
- Health API
- Assets API
- Categories API
- Employees API
- Procurement API
- Reports API
- Asset creation form
- Employee creation form
- Procurement request creation form
- Report dashboard
- Search/filter for assets
- Search/filter for employees
- Search/filter for procurement requests
- Git checkpoint script
- Screenshots for project presentation

---

## 14. Future Improvements

Possible improvements:

- Add authentication
- Add user roles
- Add asset edit form
- Add asset delete/archive option
- Add CSV export
- Add PDF reports
- Add dashboard charts
- Add automated tests
- Add CI/CD pipeline
- Add backup and restore scripts

---

## 15. Screenshots

Project screenshots are stored in:

```text
docs\screenshots
```
