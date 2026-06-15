from repositories.asset_repository import AssetRepository


class AssetService:
    def __init__(self):
        self.repository = AssetRepository()

    def get_all_assets(self):
        return self.repository.get_all_assets()
    
    def create_asset(self, data):
        name = data.get("name")
        category_id = data.get("category_id")
        employee_id = data.get("employee_id")
        location = data.get("location")
        status = data.get("status", "available")

        allowed_statuses = ["available", "assigned", "maintenance", "retired"]

        if not name or not category_id:
            return {
                "success": False,
                "error": "name and category_id are required"
            }

        if status not in allowed_statuses:
            return {
                "success": False,
                "error": "invalid asset status"
            }

        asset = self.repository.create_asset(
            name,
            category_id,
            employee_id,
            status,
            location
        )

        return {
            "success": True,
            "asset": asset
        }