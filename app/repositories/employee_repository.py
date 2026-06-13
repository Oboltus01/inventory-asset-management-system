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
    def create_employee(self, full_name, email, department, position):
        connection = self.db.get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
            INSERT INTO employees (full_name, email, department, position)
            VALUES (%s, %s, %s, %s);
        """

        cursor.execute(query, (full_name, email, department, position))
        connection.commit()

        new_id = cursor.lastrowid

        cursor.close()
        connection.close()

        return {
            "id": new_id,
            "full_name": full_name,
            "email": email,
            "department": department,
            "position": position
        }