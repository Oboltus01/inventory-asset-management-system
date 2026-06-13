class ProcurementRequest:
    def __init__(
        self,
        request_id=None,
        asset_name=None,
        quantity=1,
        status="pending",
        requested_by=None,
    ):
        self.id = request_id
        self.asset_name = asset_name
        self.quantity = quantity
        self.status = status
        self.requested_by = requested_by

    def to_dict(self):
        return {
            "id": self.id,
            "asset_name": self.asset_name,
            "quantity": self.quantity,
            "status": self.status,
            "requested_by": self.requested_by,
        }