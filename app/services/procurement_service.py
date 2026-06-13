from repositories.procurement_repository import ProcurementRepository


class ProcurementService:
    def __init__(self):
        self.repository = ProcurementRepository()

    def get_all_requests(self):
        return self.repository.get_all_requests()