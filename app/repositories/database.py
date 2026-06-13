import mysql.connector
from mysql.connector import Error

from config.db_config import DB_CONFIG


class DatabaseManager:
    def __init__(self):
        self.config = DB_CONFIG

    def get_connection(self):
        try:
            connection = mysql.connector.connect(**self.config)
            return connection
        except Error as error:
            print(f"Database connection error: {error}")
            return None

    def test_connection(self):
        connection = self.get_connection()

        if connection is None:
            return False

        try:
            cursor = connection.cursor()
            cursor.execute("SELECT DATABASE();")
            database_name = cursor.fetchone()[0]
            print(f"Connected to database: {database_name}")
            return True
        except Error as error:
            print(f"Database test error: {error}")
            return False
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()