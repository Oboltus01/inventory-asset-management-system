from repositories.database import DatabaseManager
from models.asset import Asset


class AssetRepository:
    def __init__(self):
        self.db = DatabaseManager()

    def get_all_assets(self):
        connection = self.db.get_connection()

        if connection is None:
            return []

        try:
            cursor = connection.cursor(dictionary=True)

            sql = """
                SELECT
                    id,
                    name,
                    category_id,
                    employee_id,
                    status
                FROM assets
                ORDER BY id;
            """

            cursor.execute(sql)
            rows = cursor.fetchall()

            assets = []

            for row in rows:
                asset = Asset(
                    asset_id=row["id"],
                    name=row["name"],
                    category_id=row["category_id"],
                    employee_id=row["employee_id"],
                    status=row["status"],
                    location=None,
                )
                assets.append(asset.to_dict())

            return assets

        finally:
            cursor.close()
            connection.close()