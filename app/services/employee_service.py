from repositories.employee_repository import EmployeeRepository


class EmployeeService:
    def __init__(self):
        self.repository = EmployeeRepository()

    def get_all_employees(self):
        return self.repository.get_all_employees()
    
    def create_employee(self, data):
        full_name = data.get("full_name")
        email = data.get("email")
        department = data.get("department")
        position = data.get("position")

        if not full_name or not email:
            return {
                "success": False,
                "error": "full_name and email are required"
            }

        employee = self.repository.create_employee(
            full_name,
            email,
            department,
            position
        )

        return {
            "success": True,
            "employee": employee
        }