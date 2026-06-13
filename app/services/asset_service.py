from repositories.asset_repository import AssetRepository


class AssetService:
    def __init__(self):
        self.repository = AssetRepository()

    def get_all_assets(self):
        return self.repository.get_all_assets()