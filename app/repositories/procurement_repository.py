from repositories.database import DatabaseManager


class ProcurementRepository:
    def __init__(self):
        self.db = DatabaseManager()
        
    def create_request(self, employee_id, category_id, item_name, reason, status="new"):
        connection = self.db.get_connection()
        cursor = connection.cursor(dictionary=True)

        sql = """
            INSERT INTO procurement_requests
                (employee_id, category_id, item_name, reason, status)
            VALUES (%s, %s, %s, %s, %s);
        """

        cursor.execute(sql, (employee_id, category_id, item_name, reason, status))
        connection.commit()

        new_id = cursor.lastrowid

        cursor.close()
        connection.close()

        return {
            "id": new_id,
            "employee_id": employee_id,
            "category_id": category_id,
            "item_name": item_name,
            "reason": reason,
            "status": status
        }

    def get_all_requests(self):
        connection = self.db.get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                pr.id,
                pr.employee_id,
                e.full_name AS employee_name,
                pr.category_id,
                c.name AS category_name,
                pr.item_name,
                pr.reason,
                pr.status,
                pr.created_at,
                pr.updated_at
            FROM procurement_requests pr
            JOIN employees e ON pr.employee_id = e.id
            JOIN categories c ON pr.category_id = c.id
            ORDER BY pr.id;
        """

        cursor.execute(query)
        rows = cursor.fetchall()

        cursor.close()
        connection.close()

        return rows