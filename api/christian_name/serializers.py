from extensions import ma
from .models import ChristianName


class ChristianNameSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ChristianName


christian_names_schema = ChristianNameSchema(many=True)
