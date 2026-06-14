from repositories.procurement_repository import ProcurementRepository


class ProcurementService:
    def __init__(self):
        self.repository = ProcurementRepository()

    def get_all_requests(self):
        return self.repository.get_all_requests()
    
    def create_request(self, data):
        required_fields = [
            "employee_id",
            "category_id",
            "item_name",
            "reason"
        ]

        for field in required_fields:
            if field not in data:
                return {
                    "success": False,
                    "error": f"Missing field: {field}"
                }

        request = self.repository.create_request(
            employee_id=data["employee_id"],
            category_id=data["category_id"],
            item_name=data["item_name"],
            reason=data["reason"],
            status=data.get("status", "new")
        )

        return {
            "success": True,
            "request": request
        }