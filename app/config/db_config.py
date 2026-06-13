import os


DB_CONFIG = {
    "host": os.getenv("DB_HOST", "db"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER", "inventory_user"),
    "password": os.getenv("DB_PASSWORD", "inventory_pass"),
    "database": os.getenv("DB_NAME", "inventory_db"),
}