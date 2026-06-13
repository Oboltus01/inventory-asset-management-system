class Employee:
    def __init__(
        self,
        employee_id=None,
        name=None,
        department=None,
        email=None,
    ):
        self.id = employee_id
        self.name = name
        self.department = department
        self.email = email

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "department": self.department,
            "email": self.email,
        }