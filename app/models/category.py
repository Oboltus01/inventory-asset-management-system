class Category:
    def __init__(
        self,
        category_id=None,
        name=None,
        description=None,
    ):
        self.id = category_id
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }