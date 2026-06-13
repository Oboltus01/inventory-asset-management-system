from repositories.employee_repository import EmployeeRepository


class EmployeeService:
    def __init__(self):
        self.repository = EmployeeRepository()

    def get_all_employees(self):
        return self.repository.get_all_employees()