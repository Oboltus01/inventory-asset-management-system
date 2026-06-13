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
                    a.id,
                    a.name,
                    a.category_id,
                    c.name AS category_name,
                    a.employee_id,
                    e.full_name AS employee_name,
                    a.status
                FROM assets a
                JOIN categories c ON a.category_id = c.id
                LEFT JOIN employees e ON a.employee_id = e.id
                ORDER BY a.id;
            """

            cursor.execute(sql)
            rows = cursor.fetchall()

            assets = []

            for row in rows:
                asset = Asset(
                    asset_id=row["id"],
                    name=row["name"],
                    category_id=row["category_id"],
                    category_name=row.get("category_name"),
                    employee_id=row["employee_id"],
                    employee_name=row.get("employee_name"),
                    status=row["status"],
                    location=row.get("employee_name"),
                )
                assets.append(asset.to_dict())

            return assets

        finally:
            cursor.close()
            connection.close()