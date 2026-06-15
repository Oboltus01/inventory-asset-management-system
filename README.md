Inventory and Asset Management System
Project Description

The Inventory and Asset Management System is a web-based application for managing company assets, employees, categories, procurement requests, and reports.

The project demonstrates a small enterprise-style system with:

Python backend
MariaDB database
HTML/CSS/JavaScript frontend
Docker Compose deployment
phpMyAdmin for database inspection
Modular project structure
REST-style API endpoints
Main Features
Asset registration and tracking
Asset assignment to employees
Asset categorization
Procurement request management
Inventory reports
Audit logging concept
Docker-based deployment
Project Structure
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
Technologies Used
Python
MariaDB 11.4
Docker
Docker Compose
phpMyAdmin
HTML
CSS
JavaScript
Nginx
Docker Services
Service	Container Name	Port
Backend	inventory_backend	8001:8001
Frontend	inventory_frontend	3000:80
MariaDB	inventory_mariadb	3307:3306
phpMyAdmin	inventory_phpmyadmin	8081:80
How to Run

From the project root folder:

E:\Devops_2079_04Aug2025\CourseLessons\Lesson_081_09Jun2026\LessonFiles\Inventory_Asset_Management_System

Run:

docker compose up -d --build

Check running containers:

docker ps
Application URLs

Frontend:

http://localhost:3000

Backend Assets API:

http://localhost:8001/api/assets

phpMyAdmin:

http://localhost:8081
Database Initialization

If the database schema needs to be imported manually, run this command from the project root folder:

Get-Content .\db\schema.sql | docker exec -i inventory_mariadb mariadb -u inventory_user -pinventory_pass inventory_db
Example API Test

Open in browser:

http://localhost:8001/api/assets

Example response:

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
Screenshots

Project screenshots are stored in:

docs\screenshots

Recommended screenshots:

docker_containers_vscode.png
docker_containers_ports.png
api_assets.png
database_assets_table.png
frontend_assets.png
Documentation

Full project documentation is available here:

docs\project_documentation.md
Current Status

Implemented:

Docker Compose environment
MariaDB database
Backend container
Frontend container
phpMyAdmin container
Database schema
Assets API
Basic frontend structure
Asset creation form
Initial asset test data

In progress:

Employee management improvements
Procurement workflow
Reports page
Audit logging improvements
Additional validation
Future Improvements

Possible future improvements:

Add authentication
Add user roles
Add asset search and filters
Add asset edit form
Add asset delete/archive option
Add CSV export
Add PDF reports
Add dashboard charts
Add automated tests
Add CI/CD pipeline
Add backup and restore scripts
Author

Course final project: Inventory and Asset Management System