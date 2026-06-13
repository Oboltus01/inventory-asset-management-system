from repositories.database import DatabaseManager


class EmployeeRepository:
    def __init__(self):
        self.db = DatabaseManager()

    def get_all_employees(self):
        connection = self.db.get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            SELECT
                id,
                full_name,
                email,
                department,
                position,
                is_active,
                created_at
            FROM employees
            ORDER BY id;
        """

        cursor.execute(query)
        rows = cursor.fetchall()

        cursor.close()
        connection.close()

        return rows