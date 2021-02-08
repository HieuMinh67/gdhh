from extensions import ma, db
from .models import Profile


class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta(ma.SQLAlchemyAutoSchema.Meta):
        model = Profile
        include_fk = True
        load_instance = True
        sqla_session = db.session
        transient = True

    id = ma.auto_field(dump_only=True)


profile_schema = ProfileSchema()
profiles_schema = ProfileSchema(many=True)
