class Asset:
    def __init__(
        self,
        asset_id=None,
        name=None,
        category_id=None,
        employee_id=None,
        status="active",
        location=None,
    ):
        self.id = asset_id
        self.name = name
        self.category_id = category_id
        self.employee_id = employee_id
        self.status = status
        self.location = location

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category_id": self.category_id,
            "employee_id": self.employee_id,
            "status": self.status,
            "location": self.location,
        }