from extensions import ma
from .models import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True


user_schema = UserSchema()
users_schema = UserSchema(many=True, only=('id', 'email', 'roles', 'is_active'))
