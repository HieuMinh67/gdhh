from extensions import ma, db
from .models import Profile


class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
        include_fk = True
        load_instance = True
        sqla_session = db.session
        transient = True


profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)
