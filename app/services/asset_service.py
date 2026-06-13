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
        status = data.get("status", "available")

        if not name or not category_id:
            return {
                "success": False,
                "error": "name and category_id are required"
            }

        asset = self.repository.create_asset(
            name,
            category_id,
            employee_id,
            status
        )

        return {
            "success": True,
            "asset": asset
        }