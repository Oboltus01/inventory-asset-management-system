from http.server import HTTPServer, BaseHTTPRequestHandler
import json

from repositories.database import DatabaseManager
from services.asset_service import AssetService
from services.employee_service import EmployeeService
from services.procurement_service import ProcurementService
from services.report_service import ReportService

class InventoryHandler(BaseHTTPRequestHandler):
    def do_GET(self):        
        if self.path == "/api/health":
            self.handle_health()
        elif self.path == "/api/assets":
            self.handle_get_assets()
        elif self.path == "/api/employees":
            self.handle_get_employees()
        elif self.path == "/api/procurement":
            self.handle_get_procurement()
        elif self.path == "/api/reports":
            self.handle_get_reports()
        else:
            self.send_json_response(404, {"error": "Endpoint not found"})
            
    def do_POST(self):
        if self.path == "/api/employees":
            self.handle_create_employee()
        else:
            self.send_json_response(404, {"error": "Endpoint not found"})

    def handle_health(self):
        db = DatabaseManager()
        db_status = db.test_connection()

        response = {
            "status": "ok",
            "service": "Inventory Asset Management Backend",
            "database": "connected" if db_status else "not connected"
        }

        self.send_json_response(200, response)

    def handle_get_assets(self):
        service = AssetService()
        assets = service.get_all_assets()

        response = {
            "count": len(assets),
            "items": assets
        }

        self.send_json_response(200, response)

    def handle_get_employees(self):
        service = EmployeeService()
        employees = service.get_all_employees()

        response = {
            "count": len(employees),
            "items": employees
        }

        self.send_json_response(200, response)
        
    def handle_create_employee(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_json_response(400, {"error": "Invalid JSON"})
            return

        service = EmployeeService()
        result = service.create_employee(data)

        if result.get("success"):
            self.send_json_response(201, result)
        else:
            self.send_json_response(400, result)

    def handle_get_procurement(self):
        service = ProcurementService()
        requests = service.get_all_requests()

        response = {
            "count": len(requests),
            "items": requests
        }

        self.send_json_response(200, response)

    def handle_get_reports(self):
        service = ReportService()
        report = service.get_summary()

        response = {
            "status": "ok",
            "report": report
        }

        self.send_json_response(200, response)

    def send_json_response(self, status_code, data):
        body = json.dumps(data, indent=4, default=str).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    server = HTTPServer(("0.0.0.0", 8001), InventoryHandler)
    print("Inventory backend started on http://0.0.0.0:8001")
    server.serve_forever()


if __name__ == "__main__":
    main()