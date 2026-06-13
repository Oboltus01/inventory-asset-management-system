class Asset:
    def __init__(
        self,
        asset_id=None,
        name=None,
        category_id=None,
        category_name=None,
        employee_id=None,
        employee_name=None,
        status="active",
        location=None,
    ):
        self.id = asset_id
        self.name = name
        self.category_id = category_id
        self.category_name = category_name
        self.employee_id = employee_id
        self.employee_name = employee_name
        self.status = status
        self.location = location

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category_id": self.category_id,
            "category_name": self.category_name,
            "employee_id": self.employee_id,
            "employee_name": self.employee_name,
            "status": self.status,
            "location": self.location,
        }