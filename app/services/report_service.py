from repositories.database import DatabaseManager


class ReportService:
    def __init__(self):
        self.db = DatabaseManager()

    def get_summary(self):
        connection = self.db.get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT COUNT(*) AS total_assets FROM assets;")
        total_assets = cursor.fetchone()["total_assets"]

        cursor.execute("SELECT COUNT(*) AS total_employees FROM employees;")
        total_employees = cursor.fetchone()["total_employees"]

        cursor.execute("SELECT COUNT(*) AS total_procurement_requests FROM procurement_requests;")
        total_procurement_requests = cursor.fetchone()["total_procurement_requests"]

        cursor.execute("SELECT COUNT(*) AS assigned_assets FROM assets WHERE status = 'assigned';")
        assigned_assets = cursor.fetchone()["assigned_assets"]

        cursor.execute("SELECT COUNT(*) AS available_assets FROM assets WHERE status = 'available';")
        available_assets = cursor.fetchone()["available_assets"]

        cursor.close()
        connection.close()

        return {
            "total_assets": total_assets,
            "total_employees": total_employees,
            "total_procurement_requests": total_procurement_requests,
            "assigned_assets": assigned_assets,
            "available_assets": available_assets
        }